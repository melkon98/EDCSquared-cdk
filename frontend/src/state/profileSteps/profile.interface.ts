import { ApolloError } from '@apollo/client';
import { BrandProfile, UserProfile } from 'API';

export interface IProfileDetails {
  id: string;
  version: number;
}

export interface IProfile {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  version: number;
  referredBy?: string | null;
  profile?: IProfileDetails | null;
}

export interface IProfileState {
  data?: UserProfile | null;
  isLoading: boolean;
  error?: ApolloError | Error;
}

export interface ProfileContextType {
  profileState: IProfileState;
  setProfileState: React.Dispatch<React.SetStateAction<IProfileState>>;
  succModal: boolean;
  setSuccModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BrandContextType {
  brandState: BrandProfile | null;
  setBrandState: React.Dispatch<React.SetStateAction<BrandProfile>>;
}

export interface IUpdateBrendProfile {
  tiktokHandler?: string;
  youtubekHandler?: string;
  instagramHandler?: string;
  description?: string;
  profileContent?: string[];
  name?: string;
  tiktokAccountAccess?: ITiktokAccountAccess | null;
  facebookAccountAccess?: IFacebookAccountAccess | null;
  country?: string;
  avatar?: string;
  phoneNumber?: string;
}

export interface IUpdateCreatorProfile {
  tiktokHandler?: string;
  description?: string;
  name?: string;
  email?: string;
  tiktokAccountAccess?: ITiktokAccountAccess | null;
  family_name?: string;
  youtubeHandler?: string;
  instagramHandler?: string;
  phone_number?: string;
  profileContent?: string[];
  hashtags?: string[];
  country?: string;
  termsAndConditions?: boolean;
  avatar?: string | null;
  phoneNumber?: string;
  vertical?: string | null;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ITiktokAccountAccess {
  access_token: string | null;
  advertiser_id: string | null;
  advertisers_list: {
    advertiser_id: string | null | undefined;
    advertiser_name: string | null | undefined;
  }[];
}

export interface IFacebookAccountAccess {
  access_token: string | null | undefined;
  advertiser_id: string | null;
  advertisers_list: {
    advertiser_id: string | null | undefined;
    advertiser_name: string | null | undefined;
  }[];
}

export interface IUpdateBrendProfileError {
  tiktokHandler: string | null;
  description: string | null;
  userEmail?: string | null;
  name: string | null;
}

export interface IUpdateCreatorProfileError {
  tiktokHandler?: string | null;
  description?: string | null;
  name?: string | null;
  email?: string | null;
  tiktokAccountAccess?: ITiktokAccountAccess | null;
  family_name?: string | null;
  youtubeHandler?: string | null;
  instagramHandler?: string | null;
  phone_number?: string | null;
}

export interface IChangePasswordError {
  oldPassword: string | null;
  newPassword: string | null;
  confirmPassword: string | null;
}

export interface IProfileImageUpload {
  file?: HTMLInputElement | null;
  error?: string | null;
}