import { Auth } from '@aws-amplify/auth';
import { AuthContext } from 'state/auth';
import { AuthContextType } from 'state/types';
import { useCallback, useContext, useState } from 'react';
import {
  ApiCustomHookStateType,
  apiInitialState,
  ApiHookReturnType,
  getSuccessResponse,
  getErrorResponse,
} from 'hooks/utils';
import ErrorContext from 'state/error/error.context';
import { IErrorContextType, passwordErrorHeading } from 'utils';
import { updateErrorState } from 'components';

export const useForgetPass = (): ApiHookReturnType<string, string> => {
  const [res, setRes] =
    useState<ApiCustomHookStateType<string>>(apiInitialState);
  const { setAuthState } = useContext<AuthContextType>(AuthContext);
  const { setErrorState, errorState } =
    useContext<IErrorContextType>(ErrorContext);

  const sendForgetPasswordCode = useCallback(
    async (email): Promise<void> => {
      setRes({ ...apiInitialState, isLoading: true });
      try {
        await Auth.forgotPassword(email);
        setRes(getSuccessResponse<string>(email));
        setAuthState((current) => ({
          ...current,
          email,
        }));
      } catch (error) {
        const { message } = error;
        setRes(getErrorResponse(error?.message));
        updateErrorState(
          { title: passwordErrorHeading, message },
          setErrorState
        );
      }
    },
    [errorState]
  );

  return { res, performAction: sendForgetPasswordCode };
};

export default useForgetPass;
