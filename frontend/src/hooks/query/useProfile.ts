import { useLazyQuery, useMutation } from '@apollo/client';
import {
  AddCreativeEarningMutation,
  AddCreativeEarningMutationVariables,
  CreateUserProfileMutation,
  CreateUserProfileMutationVariables,
  GetCreativeEarningsByCreativeQuery,
  GetCreativeEarningsByCreativeQueryVariables,
  GetCreativeEarningsQuery,
  GetCreativeEarningsQueryVariables,
  GetUserProfileQuery,
  GetUserProfileQueryVariables,
  LinkCreatorInstagramAccountMutation,
  LinkCreatorInstagramAccountMutationVariables,
  LinkCreatorTikTokAccountMutation,
  LinkCreatorTikTokAccountMutationVariables,
  LinkCreatorYoutubeAccountMutation,
  LinkCreatorYoutubeAccountMutationVariables,
  LinkFacebookAccountMutation,
  LinkFacebookAccountMutationVariables,
  LinkTiktokAccountMutation,
  LinkTiktokAccountMutationVariables,
  LinkUserTypeMutation,
  LinkUserTypeMutationVariables,
  LinkYoutubeAccountMutation,
  LinkYoutubeAccountMutationVariables,
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables,
  ValidateTiktokAccessMutation,
  ValidateTiktokAccessMutationVariables,
} from 'API';
import {
  addCreativeEarning,
  createUserProfile as createUserQuery,
  linkCreatorInstagramAccount,
  linkCreatorTikTokAccount,
  linkCreatorYoutubeAccount,
  linkFacebookAccount,
  linkTiktokAccount,
  linkUserType,
  linkYoutubeAccount,
  updateUserProfile,
  validateTiktokAccess,
} from 'graphql/mutations';
import {
  getCreativeEarnings,
  getCreativeEarningsByCreative,
  getUserProfile as getUserProfileQuery,
} from 'graphql/queries';
import {
  CreateUserProfileProps,
  GetUserProfileProps,
  ILinkFacebookAccountResponse,
  ILinkInstagramCreatorAccountResponse,
  ILinkTiktokAccountResponse,
  ILinkTikTokCreatorAccountResponse,
  ILinkYoutubeAccountResponse,
  ILinkYoutubeCreatorAccountResponse,
  IValidateTiktokAccessTokenResponse,
  UpdateUserProfileProps,
  UserTypeSetterProps,
} from 'hooks/utils';
import { getQuery } from 'hooks/utils/helpers';

export const getUserProfile = (): GetUserProfileProps => {
  const [getProfile, { data, loading, error }] = useLazyQuery<
    GetUserProfileQuery,
    GetUserProfileQueryVariables
  >(getQuery(getUserProfileQuery));
  const profileData = data?.getUserProfile || null;
  const errorData =
    error || (profileData ? undefined : new Error('No User Found'));
  return {
    loading,
    getProfile,
    profileData,
    isProfileExists: !!profileData,
    error: errorData,
  };
};

export const createUserProfile = (): CreateUserProfileProps => {
  const [createProfile, { data, loading, error }] = useMutation<
    CreateUserProfileMutation,
    CreateUserProfileMutationVariables
  >(getQuery(createUserQuery));
  const profileData = data?.createUserProfile || null;
  const errorData =
    error || (profileData ? undefined : new Error('No User Found'));
  return { loading, createProfile, profileData, error: errorData };
};

export const useUserTypeSetter = (): UserTypeSetterProps => {
  const [setUserType, { data, loading, error }] = useMutation<
    LinkUserTypeMutation,
    LinkUserTypeMutationVariables
  >(getQuery(linkUserType));
  return { loading, setUserType, data, error };
};

export const UseUpdateUserProfile = (): UpdateUserProfileProps => {
  const [updateProfile, { data, loading, error }] = useMutation<
    UpdateUserProfileMutation,
    UpdateUserProfileMutationVariables
  >(getQuery(updateUserProfile));
  const profileData = data?.updateUserProfile || null;
  const errorData =
    error || (profileData ? undefined : new Error('No User Found'));
  return { loading, updateProfile, profileData, error: errorData };
};

export const UseGetCreativeEarnings = () => {
  const [getEarnings, { data, loading, error }] = useLazyQuery<
    GetCreativeEarningsQuery,
    GetCreativeEarningsQueryVariables
  >(getQuery(getCreativeEarnings));

  return { getEarnings, data, loading, error };
};

export const UseAddCreativeEarning = () => {
  const [addEarning, { data, loading, error }] = useMutation<
    AddCreativeEarningMutation,
    AddCreativeEarningMutationVariables
  >(getQuery(addCreativeEarning));
  return { addEarning, data, loading, error };
};

export const UseGetCreativeEarningsByCreativeId = () => {
  const [getEarningsByCreative, { data, loading, error }] = useLazyQuery<
    GetCreativeEarningsByCreativeQuery,
    GetCreativeEarningsByCreativeQueryVariables
  >(getQuery(getCreativeEarningsByCreative));

  return { getEarningsByCreative, data, loading, error };
};

export const useLinkTiktokAccount = (): ILinkTiktokAccountResponse => {
  const [linkTiktok, { data, loading, error }] = useMutation<
    LinkTiktokAccountMutation,
    LinkTiktokAccountMutationVariables
  >(getQuery(linkTiktokAccount));
  return {
    loading,
    linkTiktok,
    data: data?.linkTiktokAccount,
    error,
  };
};

export const useLinkFacebookAccount = (): ILinkFacebookAccountResponse => {
  const [linkFacebook, { data, loading, error }] = useMutation<
    LinkFacebookAccountMutation,
    LinkFacebookAccountMutationVariables
  >(getQuery(linkFacebookAccount));
  return {
    loading,
    linkFacebook,
    data: data?.linkFacebookAccount,
    error,
  };
};

export const useLinkYoutubeAccount = (): ILinkYoutubeAccountResponse => {
  const [linkYoutube, { data, loading, error }] = useMutation<
    LinkYoutubeAccountMutation,
    LinkYoutubeAccountMutationVariables
  >(getQuery(linkYoutubeAccount));
  return {
    loading,
    linkYoutube,
    data: data?.linkYoutubeAccount,
    error,
  };
};

export const useLinkYoutubeCreatorAccount =
  (): ILinkYoutubeCreatorAccountResponse => {
    const [linkYoutubeCreatorAccount, { data, loading, error }] = useMutation<
      LinkCreatorYoutubeAccountMutation,
      LinkCreatorYoutubeAccountMutationVariables
    >(getQuery(linkCreatorYoutubeAccount));
    return {
      loading,
      linkYoutubeCreatorAccount,
      data: data?.linkCreatorYoutubeAccount,
      error,
    };
  };

export const useLinkTikTokCreatorAccount =
  (): ILinkTikTokCreatorAccountResponse => {
    const [linkTikTokCreatorAccount, { data, loading, error }] = useMutation<
      LinkCreatorTikTokAccountMutation,
      LinkCreatorTikTokAccountMutationVariables
    >(getQuery(linkCreatorTikTokAccount));
    return {
      loading,
      linkTikTokCreatorAccount,
      data: data?.linkCreatorTikTokAccount,
      error,
    };
  };

export const useLinkInstagramCreatorAccount =
  (): ILinkInstagramCreatorAccountResponse => {
    const [linkInstagramCreatorAccount, { data, loading, error }] = useMutation<
      LinkCreatorInstagramAccountMutation,
      LinkCreatorInstagramAccountMutationVariables
    >(getQuery(linkCreatorInstagramAccount));
    return {
      loading,
      linkInstagramCreatorAccount,
      data: data?.linkCreatorInstagramAccount,
      error,
    };
  };

export const useValidateTiktokAccessToken =
  (): IValidateTiktokAccessTokenResponse => {
    const [validateTiktokAccessToken, { data, loading, error }] = useMutation<
      ValidateTiktokAccessMutation,
      ValidateTiktokAccessMutationVariables
    >(getQuery(validateTiktokAccess));
    return {
      loading,
      validateTiktokAccessToken,
      data: data?.validateTiktokAccess,
      error,
    };
  };
