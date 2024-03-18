export enum UserType {
  Talent = 'Talent',
  Client = 'Client',
  Recruiter = 'Recruiter',
  Admin = 'Admin',
}

export enum UnAuthType {
  SignIn = 'Sign In',
  SignUp = 'Sign Up',
  ForgotPassword = 'Forgot Password',
  ResetPassword = 'Reset Password',
  ConfirmPassword = 'Confirm Password',
  Reverify = 'Re-verify',
}

/* eslint-disable */
export interface PayloadType {
  [x: string]: any;
}

export interface FormProps {
  isLoading: boolean;
  performAction: (payload: PayloadType) => Promise<void>;
  buttonText?: string;
  showForgotPassword?: boolean;
  authType?: UnAuthType;
}
export interface VerifyformProps extends IAuthProps {
  resendVerification: (email: string) => void;
  email: string | null;
}

export interface IAuthProps {
  userType?: UserType;
  authType?: UnAuthType;
  formProps: FormProps;
}
