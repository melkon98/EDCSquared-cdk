/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ApolloClient, ApolloLink } from '@apollo/client';
import Auth from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { useEffect, useRef, useState } from 'react';
import { setupApolloCache } from './apollo';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useApollo = (config) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isApolloInitialized, setIsApolloInitialized] = useState(false);
  const { awsPublic, awsPrivate } = config;
  const apolloClientRef = useRef<ApolloClient<unknown> | undefined>();
  const isLoggedInRef = useRef(loggedIn);

  isLoggedInRef.current = loggedIn;

  const isUserLoggedIn = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      return true;
    } catch {
      return false;
    }
  };

  const reconfigure = async () => {
    const isLogin = await isUserLoggedIn();
    const { endpoint, authenticationType } = awsPublic;

    const loggedOutConfig = {
      aws_appsync_graphqlEndpoint: endpoint,
      aws_appsync_authenticationType: authenticationType,
    };

    Auth.configure({
      ...config.awsAmplifyConfig,
      ...(isLogin ? {} : loggedOutConfig),
    });
    setLoggedIn(isLogin);
  };

  const apolloInit = async () => {
    const privateConfig = {
      url: awsPrivate.endpoint,
      region: awsPrivate.region,
      auth: {
        type: awsPrivate.authenticationType,
        credentials: async () => Auth.currentCredentials(),
        jwtToken: async () =>
          (await Auth.currentSession()).getIdToken().getJwtToken(),
      },
      disableOffline: true,
    };

    const publicConfig = {
      url: awsPublic.endpoint,
      region: awsPublic.region,
      auth: {
        type: awsPublic.authenticationType,
        credentials: async () => Auth.currentCredentials(),
        jwtToken: async () =>
          (await Auth.currentSession()).getIdToken().getJwtToken(),
      },
      disableOffline: true,
    };

    // overwrite authorization header
    let jwt;
    try {
      jwt = (await Auth.currentSession()).getIdToken().getJwtToken();
    } catch {
      jwt = null;
    }
    const headerMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: jwt,
        },
      }));
      return forward(operation);
    });

    const mainLink = ApolloLink.split(
      () => isLoggedInRef.current,
      ApolloLink.from([
        createAuthLink(privateConfig),
        headerMiddleware,
        createSubscriptionHandshakeLink(privateConfig),
      ]),
      ApolloLink.from([
        createAuthLink(publicConfig),
        headerMiddleware,
        createSubscriptionHandshakeLink(publicConfig),
      ])
    );

    const cache = await setupApolloCache();

    apolloClientRef.current = new ApolloClient({
      link: mainLink,
      cache,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
          nextFetchPolicy: 'cache-first',
        },
        query: {
          fetchPolicy: 'cache-first',
        },
      },
    });
    setIsApolloInitialized(true);
  };

  useEffect(() => {
    apolloInit();
    // Hub will fire every time Amplify.configure is called.
    // However, since we are later reconfiguring, this can cause an infinite loop.
    let firstConfigure = true;
    const listener = (data) => {
      const { payload } = data;
      if (
        (firstConfigure || payload.event !== 'configured') &&
        payload.event !== 'tokenRefresh_failure' &&
        payload.event !== 'parsingCallbackUrl'
      ) {
        firstConfigure = false;
        reconfigure();

        if (payload.event === 'signOut') apolloClientRef?.current?.resetStore();
      }
    };

    Hub.listen('auth', listener);
    // Amplify.configure trigger the callback
    Auth.configure(config.awsAmplifyConfig);

    return () => {
      Hub.remove('auth', listener);
    };
  }, []);

  const { current: client } = apolloClientRef;

  return {
    isApolloInitialized,
    client,
  };
};

export default useApollo;
