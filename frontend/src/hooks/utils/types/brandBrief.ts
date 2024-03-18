import { BrandBrief, CreateBrandBriefMutation, GetBrandBriefQuery, UpdateBrandBriefMutation } from 'API';

export type IUpdateBriefResponse = {
  updateStatus: (unknown) => void;
  response?: any;
  loading: boolean;
  error?: Error;
};

export type ICreateBriefResponse = {
  createBrief: (unknown) => void;
  data?: CreateBrandBriefMutation['createBrandBrief'] | null;
  loading: boolean;
  error?: Error;
};

export type IGetCampaignsListResponse = {
  getCampaignList: (unknown) => void;
  data?: string | null;
  loading: boolean;
  error?: Error;
};

export type IGetMetaCampaignsListResponse = {
  getMetaCampaignList: (unknown) => void;
  data?: string | null;
  loading: boolean;
  error?: Error;
};

export type IGetAdGroupsListResponse = {
  getAdGroupList: (unknown) => void;
  data?: string | null;
  loading: boolean;
  error?: Error;
};

export type IGetMetaAdGroupsListResponse = {
  getMetaAdGroupList: (unknown) => void;
  data?: string | null;
  loading: boolean;
  error?: Error;
};

export type IEditBriefResponse = {
  editBrief: (unknown) => void;
  data?: UpdateBrandBriefMutation['updateBrandBrief'] | null;
  loading: boolean;
  error?: Error;
};

export type IUseCreateAdResponse = {
  createAd: (unknown) => void;
  data?: boolean | string | null;
  loading: boolean;
  error?: Error;
};

export type IUseCreateMetaAdResponse = {
  create: (payload: unknown) => void;
  data?: boolean | string | null;
  loading: boolean;
  error?: Error;
};

export type IUseCreateManualAdResponse = {
  createManual: (payload: unknown) => void;
  data?: boolean | string | null;
  loading: boolean;
  error?: Error;
};

export type IUseGetVideoUrlResponse = {
  getVideoUrl: (unknown) => void;
  url?: string | null;
  loading: boolean;
  error?: Error;
};

export type IGetBrandBrief = {
  getBrandBriefData: (unknown) => void;
  briefData?: GetBrandBriefQuery['getBrandBrief'] | null;
  loading: boolean;
  error?: Error;
};
