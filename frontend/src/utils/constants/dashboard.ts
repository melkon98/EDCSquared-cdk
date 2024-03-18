/* eslint-disable max-len */
import {
  IAdminDashboardBox,
  IBrandDashboardBox,
  ICreatorDashboardBox,
} from 'state/dashboard';

export const initialProfileState = { isLoading: false };

export const CreatorDashboardBoxes: ICreatorDashboardBox = {
  Earnings: {
    label: 'CURRENT MONTHS EARNINGS',
    placement: window.innerWidth < 1280 ? 'left' : 'right',
    tooltip: 'This is your earnings for the current calendar month. ',
  },
  PreviousMonthEarnings: {
    label: 'PREVIOUS MONTHS EARNINGS',
    placement: window.innerWidth < 1280 ? 'left' : 'right',
    tooltip: 'This is your earnings for the previous calendar month. ',
  },
  Profile: {
    label: 'your profile (completed)',
    placement: 'right',
    tooltip:
      'Complete your creator profile in full to showcase you and your skills to brands, and increase your chances of getting your content approved.',
  },
  Approval: {
    label: 'Approval rate',
    placement: window.innerWidth < 1280 ? 'left' : 'right',
    tooltip:
      'Approval rate equals, number of creatives submitted divided by number of creatives approved',
  },
  Conversion: {
    label: 'avg. earnings per creative ',
    placement: 'left',
    tooltip:
      'Average earnings per creative is total earnings divided by number of approved pieces of content',
  },
  ClickThrough: {
    label: 'Total earnings',
    placement: 'left',
    tooltip: 'This is your total earnings across all time.',
  },
  Content: {
    label: 'Content for good',
    placement: 'left',
    tooltip:
      'Support us on our mission to create a digital landscape full with more positive content. Click discover to find out more.',
  },
};

export const BrandDashboardBoxes: IBrandDashboardBox = {
  CreatorHandle: {
    label: 'Creator handle',
    placement: 'right',
    tooltip: '',
  },
  Objective: {
    label: 'Objective',
    placement: window.innerWidth < 1280 ? 'left' : 'right',
    tooltip: '',
  },
  ViewCount: {
    label: 'View count ',
    placement: window.innerWidth < 1280 ? 'right' : 'left',
    tooltip: '',
  },
  Engagement: {
    label: 'Engagement rate',
    placement: 'left',
    tooltip: '',
  },
  Brand: {
    label: 'Brand',
    placement: 'left',
    tooltip: '',
  },
  Brief: {
    label: 'Brand Activation',
    placement: 'left',
    tooltip: '',
  },
  Approved: {
    label: 'APPROVED CREATORS',
    placement: 'left',
    tooltip: '',
  },
  EffectiveCostPer: {
    label: 'EFFECTIVE COST PER CREATIVE',
    placement: 'left',
    tooltip: '',
  },
  ContentApproval: {
    label: 'CONTENT APPROVAL',
    placement: 'left',
    tooltip: '',
  },
  Invite: {
    label: 'Invite',
    placement: 'left',
    tooltip: '',
  },
};

export const AdminDashboardBoxes: IAdminDashboardBox = {
  Wallet: {
    label: 'LAST 24 HOUR CREATOR EARNINGS',
    placement: 'right',
    tooltip:
      'The total media spend spent across all pieces of content in the last 24 hours * by 0.10. So 10% of that total media spend.',
  },
  BrandBriefs: {
    label: 'BRAND BRIEFS ACTIVE',
    placement: 'right',
    tooltip: 'The number of active brand briefs.',
  },
  ContentSubmissions: {
    label: 'CONTENT  SUBMISSIONS',
    placement: window.innerWidth < 1280 ? 'left' : 'right',
    tooltip: 'The number of pieces of content uploaded in the last 24 hours.',
  },
  Approval: {
    label: 'ACTIVE CREATIVES',
    placement: 'left',
    tooltip:
      'Number of active creatives with media spend behind them in the last 24 hours.',
  },
  CreatorSignUps: {
    label: 'CREATOR SIGN UPS',
    placement: 'left',
    tooltip: 'The total number of Creator sign ups to EDC squared',
  },
  ContentSubmissionsByCreators: {
    label: 'CONTENT  SUBMISSIONS',
    placement: window.innerWidth < 1280 ? 'left' : 'right',
    tooltip: 'The total content submissions of all time',
  },
  ContentApprovals: {
    label: 'CONTENT APPROVALS',
    placement: 'left',
    tooltip:
      'The total number of pieces approved by admin and approved by brand. The percentage is the approved number divided by the Content Submissions number',
  },
  CurrentActiveCreative: {
    label: 'CURRENT ACTIVE CREATIVE',
    placement: 'left',
    tooltip:
      'The number of pieces of content active and that have had media spend behind them in the last 24 hours.',
  },
  CurrentEarnings: {
    label: 'CURRENT EARNINGS',
    placement: 'left',
    tooltip:
      'The number of pieces of content active and that have had media spend behind them in the last 24 hours.',
  },
  EarningsLifetime: {
    label: 'EARNINGS LIFETIME',
    placement: 'left',
    tooltip:
      'The number of pieces of content active and that have had media spend behind them in the last 24 hours.',
  },
};

export const AllowedProfileSizeKB = 500; // 500 KB
