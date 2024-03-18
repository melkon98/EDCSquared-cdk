import { Auth, CognitoUser } from '@aws-amplify/auth';
import {
  getSuccessResponse,
  getErrorResponse,
  ApiCustomHookStateType,
  apiInitialState,
  ApiHookReturnType,
} from 'hooks/utils';
import { useCallback, useContext, useState } from 'react';
import { AuthContext } from 'state/auth';
import { AuthContextType } from 'state/types';
import ErrorContext from 'state/error/error.context';
import { confirmSignUpErrorHeading, IErrorContextType } from 'utils';
import { updateErrorState } from 'components';

export const useConfirmSignUp = (): ApiHookReturnType<CognitoUser, string> => {
  const [res, setRes] =
    useState<ApiCustomHookStateType<CognitoUser>>(apiInitialState);
  const { authState, setAuthState } = useContext<AuthContextType>(AuthContext);
  const { setErrorState, errorState } =
    useContext<IErrorContextType>(ErrorContext);

  const confirmSignUp = useCallback(
    async (code: string): Promise<void> => {
      const { email } = authState;
      setRes({ ...apiInitialState, isLoading: true });
      try {
        if (email) {
          const response = await Auth.confirmSignUp(email, code, {
            clientMetadata: { email },
          });
          if (authState.tempPasswd)
            await Auth.signIn(email, authState.tempPasswd);
          setRes(getSuccessResponse(response));
          setAuthState((current) => ({
            ...current,
            isVerified: true,
            tempPasswd: '',
            isLoggedIn: true,
          }));
        }
      } catch (error) {
        const { message } = error;
        setRes(getErrorResponse(message));
        updateErrorState(
          { title: confirmSignUpErrorHeading, message },
          setErrorState
        );
      }
    },
    [errorState, authState.email]
  );
  return { res, performAction: confirmSignUp };
};

export default useConfirmSignUp;
