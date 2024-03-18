import { Auth } from 'aws-amplify';
import React, { FC, useContext, useEffect } from 'react';
import { AuthContextType } from 'state/types/authTypes';
import { AuthContext } from 'state/auth';
import { AuthProps, initialAuthContext } from 'utils';

export function withAuth<T>(Component: React.FC<T & AuthProps>): React.FC<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const AuthConsumer: React.FC = (props: T) => {
    const { authState, setAuthState } =
      useContext<AuthContextType>(AuthContext);
    const { isLoggedIn, isLoading } = authState;
    const getAuth = async (): Promise<void> => {
      try {
        setAuthState({ ...initialAuthContext, isLoading: true });
        await Auth.currentAuthenticatedUser();
        const data = await Auth.currentUserInfo();
        const { attributes } = data || {};
        setAuthState({
          name: attributes.family_name,
          isLoggedIn: true,
          email: attributes.email,
          isVerified: attributes.email_verified,
          userId: attributes.sub,
          isLoading: false,
          tempPasswd: null,
        });
      } catch (error) {
        Auth.signOut();
        setAuthState({
          ...initialAuthContext,
          isLoading: false,
          isLoggedIn: false,
        });
      }
    };

    useEffect(() => {
      if ((isLoggedIn === null && !isLoading) || authState.tempPasswd === '') {
        getAuth();
      }
    }, [authState.isLoggedIn]);

    const authProps = {
      authState,
      setAuthState,
      getAuth,
    };

    return <Component {...props} {...authProps} />;
  };
  return AuthConsumer as FC<T>;
}
export default withAuth;
