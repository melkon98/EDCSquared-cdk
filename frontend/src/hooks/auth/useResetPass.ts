import { Auth } from '@aws-amplify/auth';
import { useCallback, useContext, useState } from 'react';
import {
  ApiCustomHookStateType,
  ApiHookReturnType,
  apiInitialState,
  getSuccessResponse,
  getErrorResponse,
  SubmitPassowrdPayloadType,
} from 'hooks/utils';
import { AuthContextType } from 'state/types/authTypes';
import { AuthContext } from 'state/auth';
import ErrorContext from 'state/error/error.context';
import { IErrorContextType, passwordErrorHeading, UnknownType } from 'utils';
import { updateErrorState } from 'components';

export const useResetPass = (): ApiHookReturnType<
  string,
  SubmitPassowrdPayloadType
> => {
  const [res, setRes] =
    useState<ApiCustomHookStateType<string>>(apiInitialState);
  const { authState, setAuthState } = useContext<AuthContextType>(AuthContext);
  const { setErrorState, errorState } =
    useContext<IErrorContextType>(ErrorContext);

  const createNewPassword = useCallback(
    async ({ code, password }): Promise<void> => {
      setRes({ ...apiInitialState, isLoading: true });
      const { email } = authState;
      try {
        if (email) {
          await Auth.forgotPasswordSubmit(email, code, password);
          setRes(getSuccessResponse<UnknownType>({ email, password }));
          setAuthState((current) => ({
            ...current,
            email,
            password,
          }));
        }
      } catch (error) {
        const { message } = error;
        setRes(getErrorResponse(message));
        updateErrorState(
          { title: passwordErrorHeading, message },
          setErrorState
        );
      }
    },
    [errorState]
  );

  return { res, performAction: createNewPassword };
};

export default useResetPass;
