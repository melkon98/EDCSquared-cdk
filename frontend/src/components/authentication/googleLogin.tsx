import { FC, useContext, useState } from 'react';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { IconLoader, updateErrorState } from 'components';
import { withAuth } from 'state/auth';
import { authFailedErrorHeading, AuthProps, IErrorContextType } from 'utils';
import ErrorContext from 'state/error/error.context';

import './styles/login.scss';

export const GoogleLogin: FC<AuthProps> = ({ getAuth }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setErrorState } = useContext<IErrorContextType>(ErrorContext);

  const continueWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
      });
      getAuth();
    } catch (error) {
      setIsLoading(false);
      const { message } = error;
      updateErrorState(
        { title: authFailedErrorHeading, message },
        setErrorState
      );
    }
  };

  return (
    <div className="google-btn" onClick={continueWithGoogle}>
      <img src="/images/googleLogo.svg" height={25} width={25} />
      <span className="google-continue">
        Continue with Google &nbsp; {isLoading && <IconLoader />}
      </span>
    </div>
  );
};

export default withAuth(GoogleLogin);
