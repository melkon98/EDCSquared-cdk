import { BrandBrief, BrandProfile, CreateBrandBriefInput, CreateBrandBriefMutation, CreativeRequest, GetBrandBriefsQuery, GetCreativeRequestsQuery, UpdateBrandBriefMutation, UserProfile } from 'API';

export interface BrandBriefProps {
  data?: NonNullable<NonNullable<GetBrandBriefsQuery['getBrandBriefs']>['items']>
  requests: NonNullable<NonNullable<GetCreativeRequestsQuery['getCreativeRequests']>['items']>
  loading?: boolean;
  reqLoading?: boolean;
  spent?: string;
  images?: any;
  reqPagination?: number;
  briefPagination?: number;
  brand?: BrandProfile | null;
  profileState?: UserProfile | null;
  currentPage?: number;
  reqCurrentPage?: number;
  isTiktokLinked: boolean;
  contentStats: { all: number; approved: number };
  changePage: (type: string, page: number, limit: number) => Promise<void>;
  changeBriefPage: (type: string, page: number, limit: number) => Promise<void>;
}

export interface SaveBriefProps {
  getAdGroups: (campaignId: string) => void;
  getMetaAdGroups: (campaignId: string) => void;
  briefState?: BrandBrief;
  // loading: boolean;
  // response?: UpdateBrandBriefMutation['updateBrandBrief'] | CreateBrandBriefMutation['createBrandBrief'] | null;
  dataLoading: boolean;
  metaDataLoading: boolean;
  listAdGroups: Array<ISelectDropdown>;
  listMetaAdGroups: Array<ISelectDropdown>;
  listMetaCampaigns: Array<ISelectDropdown>;
  listCampaigns: Array<ISelectDropdown>;
  listIdentities: Array<ISelectDropdown>;
}
export interface IMeterValue {
  percentage: number;
  degree: number;
}

export interface ICreativeEntry {
  creativeLink?: string | null;
  videoLink?: string | null;
  creatorHandle?: string | null;
  briefName?: string | null;
  status?: string | null;
  briefId: string;
  id: string;
}

export interface ISelectredRequest {
  requestId: string;
  briefId: string;
  authCode: string;
}


export interface ICreatorUser {
  name: string;
  vertical: string;
  tiktokHandler: string;
  instagramHandler: string;
  description: string;
  youtubeHandler: string;
  id?: string | undefined;
}
export interface ICreateBriefError {
  BriefName: string | null;
  vertical: string | null;
  objective: string | null;
  brandBriefDetails: string | null;
  creativeInspirations: string | null;
  active: string | null;
  campaignId: string | null;
  adgroupId: string | null;
}

export interface ITikTokAccess {
  access_token: string;
  advertiser_id: string;
}

export interface ITikTokCreds {
  token: string;
  advertiser_id: string;
}

export interface ISelectDropdown {
  id: string;
  value: string;
  campaign_type: string;
}
