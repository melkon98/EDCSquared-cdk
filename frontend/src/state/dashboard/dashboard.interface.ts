import { ApolloError } from '@apollo/client';
import { BrandBrief, BrandProfile, CreativeRequest, CreativeRequestsByCreatorQuery, GET_CREATIVE_REQUESTS_RESPONSE, GetCreativeRequestQuery, GetCreativeRequestsQuery, GetCreatorBrandBriefsQuery, UserProfile } from 'API';
import { Placement } from 'react-bootstrap/esm/types';

export interface ICreatorBriefListProps {
  briefList?: NonNullable<NonNullable<GetCreatorBrandBriefsQuery['getCreatorBrandBriefs']>['items']>,
  requestList: NonNullable<NonNullable<CreativeRequestsByCreatorQuery['creativeRequestsByCreator']>['items']>,
  requests?: NonNullable<NonNullable<GetCreativeRequestsQuery['getCreativeRequests']>['items']>,
  loading: boolean;
  requestLoading: boolean;
  reqLoading: boolean;
  // hasMore: boolean;
  profileCompletionPercentage?: number;
  images?: any;
  brands?: BrandProfile[];
  error?: ApolloError | null;
  briefPagination?: number;
  currentPage?: any;
  changePage: (type: string, page: number, limit: number) => void;
  changeBriefPage: (type: string, page: number, limit: number) => Promise<void>;
  reqPagination?: number;
  profileData?: UserProfile | null | undefined;
}

export interface IBriefListElems {
  briefName?: string | null;
  brandName?: string | null;
  vertical?: string;
  objective?: string | null;
  status?: string;
  id?: string;
  date?: string;
}

export interface IDashboardValue {
  label: string;
  placement: Placement;
  tooltip: string;
}
export interface ICreatorDashboardBox {
  Earnings: IDashboardValue;
  PreviousMonthEarnings: IDashboardValue;
  Approval: IDashboardValue;
  Conversion: IDashboardValue;
  ClickThrough: IDashboardValue;
  Profile: IDashboardValue;
  Content: IDashboardValue;
}

export interface IBrandDashboardBox {
  CreatorHandle: IDashboardValue;
  Objective: IDashboardValue;
  ViewCount: IDashboardValue;
  Engagement: IDashboardValue;
  Approved: IDashboardValue;
  EffectiveCostPer: IDashboardValue;
  ContentApproval: IDashboardValue;
  Invite: IDashboardValue;
  Brand: IDashboardValue;
  Brief: IDashboardValue;
}

export interface IAdminDashboardBox {
  Wallet: IDashboardValue;
  Approval: IDashboardValue;
  BrandBriefs: IDashboardValue;
  ContentSubmissions: IDashboardValue;
  CreatorSignUps: IDashboardValue;
  ContentApprovals: IDashboardValue;
  CurrentActiveCreative: IDashboardValue;
  ContentSubmissionsByCreators: IDashboardValue;
  CurrentEarnings: IDashboardValue;
  EarningsLifetime: IDashboardValue;
}

export interface INotification {
  type?: string;
  name?: string | null;
  creatorName?: string | null;
  status: string;
  time: string;
}
