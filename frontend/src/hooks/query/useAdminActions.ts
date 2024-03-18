import {
  BrandBriefByDateQuery,
  BrandBriefByDateQueryVariables,
  ListBrandBriefsQuery,
  ListBrandBriefsQueryVariables,
  ListUserPaymentDetailsQuery,
  ListUserPaymentDetailsQueryVariables,
  UpdateBrandBriefMutation,
  UpdateBrandBriefMutationVariables,
  UpdateUserTransactionsMutation,
  UpdateUserTransactionsMutationVariables,
  UserPaymentDetails,
  UserProfilesByUserTypeQuery,
  UserProfilesByUserTypeQueryVariables,
  VideoPreviewUrlMutation,
  VideoPreviewUrlMutationVariables,
} from './../../API';
import {
  updateCreativeRequest,
  deleteCreativeRequest,
  updateUserTransactions,
  updateBrandBrief,
  videoPreviewUrl,
} from './../../graphql/mutations';
import { useLazyQuery, useMutation } from '@apollo/client';
import { getQuery } from 'hooks/utils/helpers';
import {
  DeleteCreativeRequestInput,
  DeleteCreativeRequestMutationVariables,
  ListApprovedAdsQuery,
  ListApprovedAdsQueryVariables,
  ListUserProfilesQuery,
  ListUserProfilesQueryVariables,
  UpdateCreativeRequestMutation,
  UpdateCreativeRequestMutationVariables,
  CreativeRequestsByDateQuery,
  CreativeRequestsByDateQueryVariables
} from 'API';
import {
  brandBriefByDate,
  creativeRequestsByDate,
  listApprovedAds,
  listBrandBriefs,
  listUserPaymentDetails,
  listUserProfiles,
  userProfilesByUserType,
} from 'graphql/queries';

export const GetListApprovedAds = () => {
  const [getListApprovedAdsData, { data, loading, error }] = useLazyQuery<
    ListApprovedAdsQuery,
    ListApprovedAdsQueryVariables
  >(getQuery(listApprovedAds));
  const adsData = data?.listApprovedAds || null;
  return {
    getListApprovedAdsData,
    loading,
    adsData,
    error,
  };
};

export const GetListCreativeRequests = () => {
  const [getListCreativeRequests, { data, loading, error }] = useLazyQuery<
    CreativeRequestsByDateQuery,
    CreativeRequestsByDateQueryVariables
  >(getQuery(creativeRequestsByDate));
  const creativeRequestsData = data?.creativeRequestsByDate?.items || null;
  return {
    getListCreativeRequests,
    loading,
    creativeRequestsData,
    error,
  };
};

export const GetUsersList = () => {
  const [getListUsersData, { data, loading, error }] = useLazyQuery<
    ListUserProfilesQuery,
    ListUserProfilesQueryVariables
  >(getQuery(listUserProfiles));
  const users = data?.listUserProfiles || null;
  return {
    getListUsersData,
    loading,
    users,
    error,
  };
};
export const DeleteCreativeRequest = () => {
  const [deleteRequest, { loading, error }] = useMutation<
    DeleteCreativeRequestInput,
    DeleteCreativeRequestMutationVariables
  >(getQuery(deleteCreativeRequest));
  return { loading, deleteRequest, error };
};

export const GetUsersPaymentDetails = () => {
  const [getUserPaymentDetails, { data, loading, error }] = useLazyQuery<
    ListUserPaymentDetailsQuery,
    ListUserPaymentDetailsQueryVariables
  >(getQuery(listUserPaymentDetails));
  const paymentDetails =
    (data?.listUserPaymentDetails?.items?.filter(
      (item) => item
    ) as UserPaymentDetails[]) || [];

  return {
    getUserPaymentDetails,
    loading,
    paymentDetails,
    error,
  };
};

export const UpdateUserTransactions = () => {
  const [updateTransactions, { loading, error }] = useMutation<
    UpdateUserTransactionsMutation,
    UpdateUserTransactionsMutationVariables
  >(getQuery(updateUserTransactions));
  return { loading, updateTransactions, error };
};

// Remove duplicated code
export const GetAdminBrendBriefs = () => {
  const [getListBrandBriefs, { data, loading, error }] = useLazyQuery<
    BrandBriefByDateQuery,
    BrandBriefByDateQueryVariables
  >(getQuery(brandBriefByDate));
  const brandBriefs = data?.brandBriefByDate;
  return {
    getListBrandBriefs,
    loading,
    brandBriefs,
    error,
  };
};

export const UpdateBriendBrief = () => {
  const [updateBrief, { loading, error }] = useMutation<
    UpdateBrandBriefMutation,
    UpdateBrandBriefMutationVariables
  >(getQuery(updateBrandBrief));
  return { loading, updateBrief, error };
};

export const GetVideoPreviwUrl = () => {
  const [getPreviewUrl, { loading, error, data }] = useMutation<
    VideoPreviewUrlMutation,
    VideoPreviewUrlMutationVariables
  >(getQuery(videoPreviewUrl));
  return { loading, getPreviewUrl, error, data: data?.videoPreviewUrl };
};

export const GetCreatorUsersList = () => {
  const [getCreatorUsers, { loading, error, data }] = useMutation<
    VideoPreviewUrlMutation,
    VideoPreviewUrlMutationVariables
  >(getQuery(videoPreviewUrl));
  return { loading, getCreatorUsers, error, data: data?.videoPreviewUrl };
};

export const GetCreativeUsers = () => {
  const [getCreativeUsers, { data, loading, error }] = useLazyQuery<
    UserProfilesByUserTypeQuery,
    UserProfilesByUserTypeQueryVariables
  >(getQuery(userProfilesByUserType));
  return {
    getCreativeUsers,
    loading,
    creativeUsers: data?.userProfilesByUserType,
    error,
  };
};