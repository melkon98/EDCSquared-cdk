import { useLazyQuery } from '@apollo/client';
import {
  BestPracticesByActiveQuery,
  BestPracticesByActiveQueryVariables,
  BrandBrief,
  BrandBriefByDateQuery,
  BrandBriefByDateQueryVariables,
  BrandProfile,
  CreativeRequestsByAdminApprovalQuery,
  CreativeRequestsByAdminApprovalQueryVariables,
  CreativeRequestsByCreatorQuery,
  CreativeRequestsByCreatorQueryVariables,
  CreativeRequestsByStatusQuery,
  CreativeRequestsByStatusQueryVariables,
  GetApprovedAdsCountWithinRangeQuery,
  GetApprovedAdsCountWithinRangeQueryVariables,
  GetBrandAvatarQuery,
  GetBrandBriefsQuery,
  GetBrandBriefsQueryVariables,
  GetCampaignSpentQuery,
  GetCampaignSpentQueryVariables,
  GetCreativeRequestCountBetweenDatesQuery,
  GetCreativeRequestCountBetweenDatesQueryVariables,
  GetCreativeRequestsCountQuery,
  GetCreativeRequestsCountQueryVariables,
  GetCreativeRequestsQuery,
  GetCreativeRequestsQueryVariables,
  GetCreatorBrandBriefsQuery,
  GetCreatorBrandBriefsQueryVariables,
  ListBrandProfilesQuery,
  ListBrandProfilesQueryVariables,
  ListCreativeRequestsQuery,
  ListCreativeRequestsQueryVariables,
  ListUserWalletsQuery,
  ListUserWalletsQueryVariables,
} from 'API';
import {
  brandBriefByDate,
  creativeRequestsByAdminApproval,
  creativeRequestsByCreator,
  creativeRequestsByStatus,
  getApprovedAdsCountWithinRange,
  getBrandAvatar,
  getBrandBriefs,
  getCampaignSpent,
  getCreativeRequestCountBetweenDates,
  getCreativeRequests,
  getCreativeRequestsCount,
  getCreatorBrandBriefs,
  listBrandProfiles,
  listCreativeRequests as listAllRequestsQuery,
  listUserWallets,
} from 'graphql/queries';
import { bestPracticesByStatus } from 'hooks/utils';
import { getQuery } from 'hooks/utils/helpers';
import { useMemo } from 'react';
import { UnknownType } from 'utils';

export const getCreatorBriefList = () => {
  const [getBriefList, { data, loading, error }] = useLazyQuery<
    GetCreatorBrandBriefsQuery,
    GetCreatorBrandBriefsQueryVariables
  >(getQuery(getCreatorBrandBriefs));

  const briefList = useMemo(
    () =>
      data?.getCreatorBrandBriefs,
    [data?.getCreatorBrandBriefs]
  );
  return {
    loading,
    getBriefList,
    data: briefList,
    error,
  };
};

export const GetBrandList = () => {
  const [getBrandList, { data, loading, error }] = useLazyQuery<
    ListBrandProfilesQuery,
    ListBrandProfilesQueryVariables
  >(getQuery(listBrandProfiles));

  const brandList = data?.listBrandProfiles?.items;
  return {
    loading,
    getBrandList,
    data: brandList as UnknownType as Array<BrandProfile>,
    error,
  };
};

export const GetCreativeRequestsStats = () => {
  const [getCreativeRequestsStats, { data, loading, error }] = useLazyQuery<
    GetCreativeRequestsCountQuery,
    GetCreativeRequestsCountQueryVariables
  >(getQuery(getCreativeRequestsCount));

  return {
    loading,
    getCreativeRequestsStats,
    data: data?.getCreativeRequestsCount
      ? JSON.parse(data?.getCreativeRequestsCount)
      : null,
    error,
  };
};

export const getCreatorAllBriefs = () => {
  const [getAllBriefs, { data, loading }] = useLazyQuery<
    BrandBriefByDateQuery,
    BrandBriefByDateQueryVariables
  >(getQuery(brandBriefByDate));

  const briefList = data?.brandBriefByDate?.items;
  return {
    loading,
    getAllBriefs,
    data: briefList as UnknownType as Array<BrandBrief>,
  };
};

export const getCreatorRequests = () => {
  const [listCreativeRequests, { data, loading, error }] = useLazyQuery<
    CreativeRequestsByCreatorQuery,
    CreativeRequestsByCreatorQueryVariables
  >(getQuery(creativeRequestsByCreator));
  return {
    loading,
    listCreativeRequests,
    data: data?.creativeRequestsByCreator,
    error,
  };
};

export const getBrandBriefList = () => {
  const [getBrandBriefslist, { data, loading, error }] = useLazyQuery<
    GetBrandBriefsQuery,
    GetBrandBriefsQueryVariables
  >(getQuery(getBrandBriefs));

  return {
    loading,
    getBrandBriefslist,
    data: data?.getBrandBriefs,
    error,
  };
};

export const listAllRequests = () => {
  const [getAllRequests, { data, loading, error }] = useLazyQuery<
    ListCreativeRequestsQuery,
    ListCreativeRequestsQueryVariables
  >(getQuery(listAllRequestsQuery));

  const { items = [], nextToken } = data?.listCreativeRequests || {};
  return {
    loading,
    getAllRequests,
    data: items as UnknownType as Array<BrandBrief>,
    nextToken,
    error,
  };
};

export const listRequestsByStatus = () => {
  const [getRequestsByStatus, { data, loading, error }] = useLazyQuery<
    CreativeRequestsByStatusQuery,
    CreativeRequestsByStatusQueryVariables
  >(getQuery(creativeRequestsByStatus));

  const { items = [], nextToken } = data?.creativeRequestsByStatus || {};
  return {
    loading,
    getRequestsByStatus,
    data: items as UnknownType as Array<BrandBrief>,
    nextToken,
    error,
  };
};

export const getActiveBestPractice = () => {
  const [getActivePractice, { data, loading, error }] = useLazyQuery<
    BestPracticesByActiveQuery,
    BestPracticesByActiveQueryVariables
  >(getQuery(bestPracticesByStatus));

  const { items = [], nextToken } = data?.bestPracticesByActive || {};
  return {
    loading,
    getActivePractice,
    data: items,
    nextToken,
    error,
  };
};

export const GetCreativeRequestsCountBetweenDates = () => {
  const [getRequestsCountBetweenDates, { data, loading, error }] = useLazyQuery<
    GetCreativeRequestCountBetweenDatesQuery,
    GetCreativeRequestCountBetweenDatesQueryVariables
  >(getQuery(getCreativeRequestCountBetweenDates));

  return {
    loading,
    getRequestsCountBetweenDates,
    data: data?.getCreativeRequestCountBetweenDates,
    error,
  };
};

export const GetUserWallets = () => {
  const [getWallets, { data, loading, error }] = useLazyQuery<
    ListUserWalletsQuery,
    ListUserWalletsQueryVariables
  >(getQuery(listUserWallets));

  return {
    loading,
    getWallets,
    data: data?.listUserWallets,
    error,
  };
};

export const GetCreativeRequestsByAdminApproval =
  () => {
    const [listCreativeRequestsByAdminApproval, { data, loading, error }] =
      useLazyQuery<
        CreativeRequestsByAdminApprovalQuery,
        CreativeRequestsByAdminApprovalQueryVariables
      >(getQuery(creativeRequestsByAdminApproval));

    return {
      loading,
      listCreativeRequestsByAdminApproval,
      data: data?.creativeRequestsByAdminApproval?.items,
      nextToken: data?.creativeRequestsByAdminApproval?.nextToken,
      error,
    };
  };

export const GetCreativeRequests = () => {
  const [listCreativeRequests, { data, loading, error }] = useLazyQuery<
    GetCreativeRequestsQuery,
    GetCreativeRequestsQueryVariables
  >(getQuery(getCreativeRequests));
  const requests = data?.getCreativeRequests
  return { loading, listCreativeRequests, error, data: requests };
};

export const GetAvataras = () => {
  const [getAvatars, { data, loading, error }] = useLazyQuery<
    GetBrandAvatarQuery,
    GetBrandBriefsQueryVariables
  >(getQuery(getBrandAvatar));
  return {
    loading,
    getAvatars,
    error,
    data: data?.getBrandAvatar ? JSON.parse(data?.getBrandAvatar) : null,
  };
};

export const GetCampaignSpent = () => {
  const [getCampaignSpents, { data, loading, error }] = useLazyQuery<
    GetCampaignSpentQuery,
    GetCampaignSpentQueryVariables
  >(getQuery(getCampaignSpent));
  return { loading, getCampaignSpents, data: data?.getCampaignSpent || null };
};

export const UseGetApprovedAdsWithinRange = () => {
  const [getApprovedAds, { data, loading, error }] = useLazyQuery<
    GetApprovedAdsCountWithinRangeQuery,
    GetApprovedAdsCountWithinRangeQueryVariables
  >(getQuery(getApprovedAdsCountWithinRange));

  return {
    getApprovedAdsCountWithinRange: getApprovedAds,
    data,
    error,
    loading,
  };
};
