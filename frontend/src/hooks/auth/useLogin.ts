// TODO: Remove unused code
import { Auth, CognitoUser } from '@aws-amplify/auth';
import { useCallback, useContext, useState } from 'react';
import {
  ApiCustomHookStateType,
  ApiHookReturnType,
  apiInitialState,
  LoginPayloadType,
  getSuccessResponse,
  getErrorResponse,
} from 'hooks/utils';
import { AuthContextType } from 'state/types';
import { AuthContext } from 'state/auth';
import {
  IErrorContextType,
  loginErrorHeading,
  unverifiedUser,
  userNotExists,
} from 'utils';
import ErrorContext from 'state/error/error.context';
import { updateErrorState } from 'components';

export const useLogin = () => {
  //   const [res, setRes] =
  //     useState<ApiCustomHookStateType<CognitoUser>>(apiInitialState);
  //   const { setAuthState } = useContext<AuthContextType>(AuthContext);
  //   const { setErrorState, errorState } =
  //     useContext<IErrorContextType>(ErrorContext);
  //   const { getToken, userId } = useAuth();

  //   const performLogin = useCallback(
  //     async (payload: LoginPayloadType): Promise<void> => {
  //       let error: Error | null = null;
  //       const token = (await getToken()) || '';
  //       const { email, password, username } = payload;
  //       setRes({ ...apiInitialState, isLoading: true });
  //       let response: CognitoUser | null = null;
  //       if (userId) {
  //         const validationData = { token, user: userId || '' };
  //         try {
  //           response = await Auth.signIn(email, password, validationData);
  //         } catch (err) {
  //           error = err;
  //         }
  //         if (error) {
  //           const { message } = error;
  //           try {
  //             if (error?.message === userNotExists && username) {
  //               await Auth.signUp({
  //                 username: email,
  //                 password,
  //                 attributes: { email, name: username },
  //                 clientMetadata: validationData,
  //               });
  //               response = await Auth.signIn(email, password, validationData);
  //             } else {
  //               if (error?.message === unverifiedUser) {
  //                 setAuthState((current) => ({
  //                   ...current,
  //                   email,
  //                   tempPasswd: password,
  //                 }));
  //                 await Auth.resendSignUp(email);
  //               } else {
  //                 updateErrorState(
  //                   { title: loginErrorHeading, message },
  //                   setErrorState
  //                 );
  //               }
  //               setRes(getErrorResponse(message));
  //             }
  //           } catch (e) {
  //             setRes(getErrorResponse(`${e.message} | ${message}`));
  //           }
  //         }

  //         if (response) {
  //           setRes(getSuccessResponse<CognitoUser>(response));
  //           const url = new URL(window.location.href);
  //           const authCode = url.searchParams.get('auth_code');
  //           if (!authCode) {
  //             setTimeout(() => window.location.reload(), 0);
  //           }
  //         }
  //       }
  //     },
  //     [errorState, userId]
  //   );
  //   return { res, performAction: performLogin };
};

export default useLogin;
