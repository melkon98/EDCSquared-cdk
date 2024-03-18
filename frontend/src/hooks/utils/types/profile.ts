import { UnknownType } from 'utils';

export type GetUserProfileProps = {
  getProfile: (unknown) => void;
  profileData?: UnknownType;
  loading: boolean;
  error?: Error;
  isProfileExists: boolean;
};

export type GetUserRegistrationEmailProps = {
  sendEmail: (unknown) => void;
  loading: boolean;
};

export type CreateUserProfileProps = {
  createProfile: (unknown) => void;
  profileData?: UnknownType;
  loading: boolean;
  error?: Error;
};

export type UserTypeSetterProps = {
  setUserType: (unknown) => void;
  data?: UnknownType;
  loading: boolean;
  error?: Error;
};

export type UpdateUserProfileProps = {
  updateProfile: (unknown) => Promise<unknown>;
  profileData?: UnknownType;
  loading: boolean;
  error?: Error;
};

export type ILinkTiktokAccountResponse = {
  linkTiktok: (unknown) => void;
  data?: UnknownType;
  loading: boolean;
  error?: Error;
};

export type ILinkFacebookAccountResponse = {
  linkFacebook: (unknown) => void;
  data?: UnknownType;
  loading: boolean;
  error?: Error;
};

export type ILinkYoutubeAccountResponse = {
  linkYoutube: (unknown) => void;
  data?: UnknownType;
  loading: boolean;
  error?: Error;
};

export type ILinkYoutubeCreatorAccountResponse = {
  linkYoutubeCreatorAccount: (unknown) => void;
  data?: UnknownType;
  loading: boolean;
  error?: Error;
};

export type ILinkTikTokCreatorAccountResponse = {
  linkTikTokCreatorAccount: (unknown) => void;
  data?: UnknownType;
  loading: boolean;
  error?: Error;
};

export type ILinkInstagramCreatorAccountResponse = {
  linkInstagramCreatorAccount: (unknown) => void;
  data?: UnknownType;
  loading: boolean;
  error?: Error;
};

export type IValidateTiktokAccessTokenResponse = {
  validateTiktokAccessToken: (unknown) => void;
  data?: UnknownType;
  loading: boolean;
  error?: Error;
};
