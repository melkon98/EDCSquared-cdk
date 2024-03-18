export const initialAuthContext = {
  isLoggedIn: null,
  email: null,
  isVerified: null,
  userId: null,
  isLoading: false,
  tempPasswd: null,
  name: null,
};

export const defaultSignUpState = {
  email: '',
  password: '',
  name: '',
};

export const defaultSignUpError: { [key: string]: null | string } = {
  email: null,
  password: null,
  firstName: null,
  lastName: null,
};

export const defaultLoginState = {
  email: '',
  password: '',
  remember: false,
};

export const defaultLoginError: { [key: string]: null | string } = {
  email: null,
  password: null,
};

export const defaultBrendProfileState = {
  name: '',
  userEmail: '',
  description: '',
  tiktokHandler: '',
};

export const defultCreatorProfileState = {
  name: '',
  family_name: '',
  email: '',
  description: '',
  tiktokHandler: '',
  youtubeHandler: '',
  instagramHandler: '',
  phone_number: '',
};

export const defaultCreatorProfileError = {
  name: null,
  family_name: null,
  email: null,
  description: null,
  tiktokHandler: null,
  youtubeHandler: null,
  instagramHandler: null,
  phone_number: null,
};

export const defaultBrendProfileError = {
  name: null,
  userEmail: null,
  description: null,
  tiktokHandler: null,
};

export const defaultResetPassState = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const defaultResetState = {
  code: '',
  password: '',
};

export const defaultResetError: { [key: string]: null | string } = {
  code: null,
  password: null,
};

export type UnAuthUserNameProps = {
  fullName: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
};
