import { formatServiceName } from '../utils/misc-utils';

export const APPROVED_ADS_TABLE_NAME = formatServiceName('approved-ads');
export const APPROVED_ADS_BY_ADGROUP_ID_INDEX_NAME = 'approvedAdsByAd_group_id';
export const APPROVED_ADS_BY_AD_ID_INDEX_NAME = 'approvedAdsByAd_id';
export const APPROVED_ADS_BY_ADVERTISER_ID_INDEX_NAME =
  'approvedAdsByAdvertiser_id';
export const APPROVED_ADS_BY_CAMPAING_ID_INDEX_NAME =
  'approvedAdsByCampaing_id';
export const APPROVED_ADS_BY_ID_INDEX_NAME = 'approvedAdsById';
export const APPROVED_ADS_BY_STATUS_INDEX_NAME = 'approvedAdsByStatus';
export const APPROVED_ADS_BY_USER_PROFILE_ID = 'approvedAdsByUser_profile_id';
export const APPROVED_ADS_BY_CREATIVE_REQUEST_ID = 'byCreativeRequestId';

export const BEST_PRACTICES_TABLE_NAME = formatServiceName('best-practices');
export const BEST_PRACTICES_BY_STATUS_INDEX_NAME = 'byStatus';
export const BEST_PRACTICES_TABLE_BY_USER_PROFILE_BEST_PRACTICE_ID =
  'gsi-UserProfile.bestPractices';

export const BRAND_BRIEFS_TABLE_NAME = formatServiceName('brand-briefs');
export const BRAND_BRIEFS_BY_DATE_INDEX_NAME = 'brandBriefByDate';
export const BRAND_BRIEFS_BY_COUNTRY_AND_CREATION_DATE_INDEX_NAME =
  'brandBriefsByCountryAndCreationDate';
export const BRAND_BRIEFS_BY_ADVERTISER_ID_INDEX_NAME = 'byAdvertiserId';
export const BRAND_BRIEFS_BY_BRAND_ID_INDEX_NAME = 'byBrand';
export const BRAND_BRIEFS_BY_VERTICAL_INDEX_NAME = 'byVertical';
export const BRAND_PROFILE_TABLE_NAME = formatServiceName('brand-profile');
export const BRAND_PROFILES_BY_USER_EMAIL_INDEX_NAME =
  'brandProfilesByUserEmail';
export const BRAND_PROFILES_BY_BRAND_PROFILE_USER_ID = 'gsi-UserProfile.brand';

export const CREATIVE_REQUESTS_EARNINGS_TABLE_NAME = formatServiceName(
  'creative-request-earnings'
);
export const CREATIVE_REQUESTS_EARNINGS_BY_CREATIVE_REQUEST_ID =
  'creativeRequestEarningsByCreativeRequestId';

export const CREATIVE_REQUESTS_TABLE_NAME =
  formatServiceName('creative-requests');
export const CREATIVE_REQUESTS_BY_ADMIN_APPROVAL_INDEX_NAME = 'byAdminApproval';
export const CREATIVE_REQUESTS_BY_BRAND_BRIEF_INDEX_NAME = 'byBrandBrief';
export const CREATIVE_REQUESTS_BY_CREATOR_VISIBILITY_INDEX_NAME =
  'byCreatorVisibility';
export const CREATIVE_REQUESTS_BY_STATUS_INDEX_NAME = 'byStatus';
export const CREATIVE_REQUESTS_BY_CREATOR_ID_AND_UDPATED_AT_INDEX_NAME =
  'creativeRequestsByCreatorId';
export const CREATIVE_REQUESTS_BY_DATE = 'creativeRequestsByDate';

export const USER_PAYMENT_DETAILS_TABLE_NAME = formatServiceName(
  'user-payment-details'
);

export const USER_PROFILES_TABLE_NAME = formatServiceName('user-profiles');
export const USER_PROFILES_BY_USER_TYPE_INDEX_NAME = 'byUserType';

export const USER_TRANSACTIONS_TABLE_NAME =
  formatServiceName('user-transactions');
export const USER_TRANSACTIONS_BY_USER_TRANSACTION_ID_INDEX_NAME =
  'userPaymentDetailsUserTransactionsId';

export const USER_WALLETS_TABLE_NAME = formatServiceName('user-wallets');
export const USER_WALLETS_BY_OWNER_INDEX_NAME = 'byOwner';

export const HOSTING_BUCKET_NAME = formatServiceName('hosting-bucket');
export const DEPLOYMENT_LOGIC_ID = 'DeployApp';

export const APP_DOMAIN = 'edcsquared.io';
export const TEST_APP_SUBDOMAIN = 'test';
