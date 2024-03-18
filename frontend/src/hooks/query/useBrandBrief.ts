import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CreateAdsMutation,
  CreateAdsMutationVariables,
  CreateBrandBriefMutation,
  CreateBrandBriefMutationVariables,
  CreateManualAdMutation,
  CreateManualAdMutationVariables,
  CreateMetaAdMutation,
  CreateMetaAdMutationVariables,
  GetBrandBriefQuery,
  GetBrandBriefQueryVariables,
  GetFacebookAdSetsMutation,
  GetFacebookAdSetsMutationVariables,
  GetFacebookCampaignMutation,
  GetFacebookCampaignMutationVariables,
  GetVideoFromAuthCodeMutation,
  GetVideoFromAuthCodeMutationVariables,
  ListAdGroupsMutation,
  ListAdGroupsMutationVariables,
  ListCampaignsMutation,
  ListCampaignsMutationVariables,
  UpdateBrandBriefMutation,
  UpdateBrandBriefMutationVariables,
  UpdateCreativeRequestMutation,
  UpdateCreativeRequestMutationVariables,
} from 'API';
import {
  createAds,
  createBrandBrief,
  createManualAd,
  createMetaAd,
  getFacebookAdSets,
  getFacebookCampaign,
  getVideoFromAuthCode,
  listAdGroups,
  listCampaigns,
  updateBrandBrief,
  updateCreativeRequest,
} from 'graphql/mutations';
import { getBrandBrief } from 'graphql/queries';
// import {
//   ICreateBriefResponse,
//   IEditBriefResponse,
//   IGetAdGroupsListResponse,
//   IGetBrandBrief,
//   IGetCampaignsListResponse,
//   IGetMetaAdGroupsListResponse,
//   IGetMetaCampaignsListResponse,
//   IUpdateBriefResponse,
//   IUseCreateAdResponse,
//   IUseCreateMetaAdResponse,
//   IUseCreateManualAdResponse,
//   IUseGetVideoUrlResponse,
// } from 'hooks/utils';
import { getQuery } from 'hooks/utils/helpers';

export const UpdateCreativeRequest = () => {
  const [updateRequest, { loading, error, data }] = useMutation<
    UpdateCreativeRequestMutation,
    UpdateCreativeRequestMutationVariables
  >(getQuery(updateCreativeRequest));
  return { loading, updateRequest, error, data };
};



export const getlistCampaigns = () => {
  const [getCampaignList, { data, loading, error }] = useMutation<
    ListCampaignsMutation,
    ListCampaignsMutationVariables
  >(getQuery(listCampaigns));
  return { loading, getCampaignList, error, data: data?.listCampaigns };
};

export const getlistMetaCampaigns = () => {
  const [getMetaCampaignList, { data, loading, error }] = useMutation<
    GetFacebookCampaignMutation,
    GetFacebookCampaignMutationVariables
  >(getQuery(getFacebookCampaign));
  return {
    loading,
    getMetaCampaignList,
    error,
    data: data?.getFacebookCampaign,
  };
};

export const getlistAdGroups = () => {
  const [getAdGroupList, { data, loading, error }] = useMutation<
    ListAdGroupsMutation,
    ListAdGroupsMutationVariables
  >(getQuery(listAdGroups));
  return { loading, getAdGroupList, error, data: data?.listAdGroups };
};

export const getlistMetaAdGroups = () => {
  const [getMetaAdGroupList, { data, loading, error }] = useMutation<
    GetFacebookAdSetsMutation,
    GetFacebookAdSetsMutationVariables
  >(getQuery(getFacebookAdSets));
  return { loading, getMetaAdGroupList, error, data: data?.getFacebookAdSets };
};

export const createCampaignBrief = () => {
  const [createBrief, { data, loading, error }] = useMutation<
    CreateBrandBriefMutation,
    CreateBrandBriefMutationVariables
  >(getQuery(createBrandBrief));
  return { loading, createBrief, error, data: data?.createBrandBrief };
};

export const editCampaignBrief = () => {
  const [editBrief, { data, loading, error }] = useMutation<
    UpdateBrandBriefMutation,
    UpdateBrandBriefMutationVariables
  >(getQuery(updateBrandBrief));
  return { loading, editBrief, error, data: data?.updateBrandBrief };
};

export const useCreateAd = () => {
  const [createAd, { data, loading, error }] = useMutation<
    CreateAdsMutation,
    CreateAdsMutationVariables
  >(getQuery(createAds));
  return { loading, createAd, error, data: data?.createAds };
};

export const useCreateMetaAd = () => {
  const [create, { data, loading, error }] = useMutation<
    CreateMetaAdMutation,
    CreateMetaAdMutationVariables
  >(getQuery(createMetaAd));
  return { loading, create, error, data: data?.createMetaAd };
};

export const useCreateManualAd = () => {
  const [createManual, { data, loading, error }] = useMutation<
    CreateManualAdMutation,
    CreateManualAdMutationVariables
  >(getQuery(createManualAd));
  return { loading, createManual, error, data: data?.createManualAd };
};


export const useGetVideoUrl = () => {
  const [getVideoUrl, { data, loading, error }] = useMutation<
    GetVideoFromAuthCodeMutation,
    GetVideoFromAuthCodeMutationVariables
  >(getQuery(getVideoFromAuthCode));
  return { loading, getVideoUrl, error, url: data?.getVideoFromAuthCode };
};

export const useGetBrandBrief = () => {
  const [getBrandBriefData, { data, loading }] = useLazyQuery<
    GetBrandBriefQuery,
    GetBrandBriefQueryVariables
  >(getQuery(getBrandBrief));
  const briefData = data?.getBrandBrief
    ? { ...data?.getBrandBrief, brand: undefined }
    : null;
  return {
    loading,
    getBrandBriefData,
    briefData,
  };
};
