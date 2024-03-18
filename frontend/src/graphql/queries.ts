/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../API';

type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCreatorBrandBriefs =
  /* GraphQL */ `query GetCreatorBrandBriefs($page: Int, $pageSize: Int, $country: String) {
  getCreatorBrandBriefs(page: $page, pageSize: $pageSize, country: $country) {
    items {
      id
      BriefName
      vertical
      objective
      brandBriefDetails
      brandBriefFilesUrl
      creativeInspirations
      active
      brandImageUrl
      tiktokAdvertiserId
      brandId
      adText
      country
      type
      createdAt
      updatedAt
      tikTokData {
        adIdentityId
        adgroupId
        campaignId
        adCaption
        displayName
        tikTokSparkAds
        callToAction
        landingPageUrl
        __typename
      }
      metaData {
        adgroupId
        campaignId
        adCaption
        callToAction
        landingPageUrl
        __typename
      }
      youtubeData {
        adgroupId
        campaignId
        adCaption
        callToAction
        landingPageUrl
        __typename
      }
      manualData {
        adCaption
        __typename
      }
      creativeRequestsCount
      brandInfo {
        id
        name
        toneVoice
        pillars
        description
        internalMission
        strapLine
        userEmail
        tiktokHandle
        vertical
        metaData
        briefs {
          nextToken
          __typename
        }
        hashtags
        personalDescription
        createdAt
        updatedAt
        userProfileBrandId
        __typename
      }
      __typename
    }
    totalPages
    currentPage
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetCreatorBrandBriefsQueryVariables,
    APITypes.GetCreatorBrandBriefsQuery
  >;
export const creativeRequestStatusEmail =
  /* GraphQL */ `query CreativeRequestStatusEmail(
  $emailType: EMAIL_TYPE!
  $name: String
  $email: String
  $brandBriefName: String
  $feedback: String
  $creativeUniqueId: String
  $creativeRequestUrl: String
) {
  creativeRequestStatusEmail(
    emailType: $emailType
    name: $name
    email: $email
    brandBriefName: $brandBriefName
    feedback: $feedback
    creativeUniqueId: $creativeUniqueId
    creativeRequestUrl: $creativeRequestUrl
  )
}
` as GeneratedQuery<
    APITypes.CreativeRequestStatusEmailQueryVariables,
    APITypes.CreativeRequestStatusEmailQuery
  >;
export const getCreativeRequests =
  /* GraphQL */ `query GetCreativeRequests($page: Int, $pageSize: Int, $brandId: String) {
  getCreativeRequests(page: $page, pageSize: $pageSize, brandId: $brandId) {
    items {
      id
      brandBriefId
      creatorId
      briefDescription
      ad_id
      status
      tiktokCreativeUrl
      creativePreviewUrl
      tiktokVideoCode
      creativeTiktokHandle
      creativeYoutubeHandle
      creativeInstagramHandle
      creatorDescription
      creatorName
      creatorImage
      approvedAds {
        id
        creativeRequestId
        creativeRequest {
          id
          brandBriefId
          creatorId
          briefDescription
          ad_id
          status
          tiktokCreativeUrl
          creativePreviewUrl
          tiktokVideoCode
          creativeTiktokHandle
          creativeYoutubeHandle
          creativeInstagramHandle
          brandComment
          adminComment
          creatorComment
          adminApproval
          creatorVisibility
          BriefName
          type
          email
          uniqueId
          createdAt
          updatedAt
          brandName
          __typename
        }
        identity_id
        item_id
        ad_id
        ad_group_id
        campaing_id
        advertiser_id
        user_profile_id
        accessToken
        ad_report
        ad_comment
        status
        adName
        approvedAdType
        owner
        createdAt
        updatedAt
        __typename
      }
      brandComment
      adminComment
      creatorComment
      adminApproval
      creatorVisibility
      BriefName
      type
      email
      uniqueId
      createdAt
      updatedAt
      brandName
      __typename
    }
    totalPages
    currentPage
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetCreativeRequestsQueryVariables,
    APITypes.GetCreativeRequestsQuery
  >;
export const getCreativeRequestsCount =
  /* GraphQL */ `query GetCreativeRequestsCount($brandId: String) {
  getCreativeRequestsCount(brandId: $brandId)
}
` as GeneratedQuery<
    APITypes.GetCreativeRequestsCountQueryVariables,
    APITypes.GetCreativeRequestsCountQuery
  >;
export const getCampaignSpent =
  /* GraphQL */ `query GetCampaignSpent($userId: String, $campaignId: String) {
  getCampaignSpent(userId: $userId, campaignId: $campaignId)
}
` as GeneratedQuery<
    APITypes.GetCampaignSpentQueryVariables,
    APITypes.GetCampaignSpentQuery
  >;
export const getBrandBriefs =
  /* GraphQL */ `query GetBrandBriefs($page: Int, $pageSize: Int, $brandId: String) {
  getBrandBriefs(page: $page, pageSize: $pageSize, brandId: $brandId) {
    items {
      id
      BriefName
      vertical
      objective
      brandBriefDetails
      brandBriefFilesUrl
      creativeInspirations
      active
      tiktokAdvertiserId
      creativeRequests {
        items {
          id
          brandBriefId
          creatorId
          briefDescription
          ad_id
          status
          tiktokCreativeUrl
          creativePreviewUrl
          tiktokVideoCode
          creativeTiktokHandle
          creativeYoutubeHandle
          creativeInstagramHandle
          brandComment
          adminComment
          creatorComment
          adminApproval
          creatorVisibility
          BriefName
          type
          email
          uniqueId
          createdAt
          updatedAt
          brandName
          __typename
        }
        nextToken
        __typename
      }
      brandId
      brandProfile {
        id
        name
        toneVoice
        pillars
        description
        internalMission
        strapLine
        userEmail
        tiktokHandle
        vertical
        metaData
        briefs {
          nextToken
          __typename
        }
        hashtags
        personalDescription
        createdAt
        updatedAt
        userProfileBrandId
        __typename
      }
      adText
      country
      type
      createdAt
      updatedAt
      tikTokData {
        adIdentityId
        adgroupId
        campaignId
        adCaption
        displayName
        tikTokSparkAds
        callToAction
        landingPageUrl
        __typename
      }
      metaData {
        adgroupId
        campaignId
        adCaption
        callToAction
        landingPageUrl
        __typename
      }
      youtubeData {
        adgroupId
        campaignId
        adCaption
        callToAction
        landingPageUrl
        __typename
      }
      manualData {
        adCaption
        __typename
      }
      creativeRequestsCount
      __typename
    }
    totalPages
    currentPage
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetBrandBriefsQueryVariables,
    APITypes.GetBrandBriefsQuery
  >;
export const getBrandAvatar = /* GraphQL */ `query GetBrandAvatar {
  getBrandAvatar
}
` as GeneratedQuery<
  APITypes.GetBrandAvatarQueryVariables,
  APITypes.GetBrandAvatarQuery
>;
export const creativeRequestsByCreator =
  /* GraphQL */ `query CreativeRequestsByCreator(
  $page: Int
  $pageSize: Int
  $creatorId: String
) {
  creativeRequestsByCreator(
    page: $page
    pageSize: $pageSize
    creatorId: $creatorId
  ) {
    items {
      id
      brandBriefId
      creatorId
      creatorProfile {
        id
        name
        description
        brand {
          nextToken
          __typename
        }
        owner
        userType
        tiktokHandler
        instagramHandler
        youtubeHandler
        bestPractices {
          nextToken
          __typename
        }
        tiktokAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        facebookAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        youtubeAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        userPaymentDetails {
          id
          fullName
          firstAddress
          secondAddress
          country
          accountNumber
          postCode
          swiftCode
          documentID
          owner
          createdAt
          updatedAt
          __typename
        }
        userWallet {
          id
          currentBalance
          currentBalanceZar
          totalEarned
          totalEarnedZar
          extraBalance
          extraBalanceZar
          createdAt
          updatedAt
          owner
          __typename
        }
        lastLoginDate
        email
        phoneNumber
        country
        hashtags
        profileContent
        avatar
        vertical
        termsAndConditions
        createdAt
        updatedAt
        __typename
      }
      briefDescription
      ad_id
      status
      tiktokCreativeUrl
      creativePreviewUrl
      tiktokVideoCode
      creativeTiktokHandle
      creativeYoutubeHandle
      creativeInstagramHandle
      approvedAds {
        items {
          id
          creativeRequestId
          identity_id
          item_id
          ad_id
          ad_group_id
          campaing_id
          advertiser_id
          user_profile_id
          accessToken
          ad_report
          ad_comment
          status
          adName
          approvedAdType
          owner
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      brandComment
      adminComment
      creatorComment
      adminApproval
      creatorVisibility
      BriefName
      type
      email
      uniqueId
      createdAt
      updatedAt
      brandName
      __typename
    }
    totalPages
    currentPage
    __typename
  }
}
` as GeneratedQuery<
    APITypes.CreativeRequestsByCreatorQueryVariables,
    APITypes.CreativeRequestsByCreatorQuery
  >;
export const getGPTresponse =
  /* GraphQL */ `query GetGPTresponse($data: GPT_INPUT) {
  getGPTresponse(data: $data) {
    responseType
    BRAND_NAME
    BRAND_NAME_REFRESH
    BRAND_PILLARS
    BRAND_PILLARS_REFRESH
    BRAND_VALUES
    BRAND_MISSION_STATEMENT
    BRAND_TAGLINE_STATEMENT
    BRAND_TAGLINE_STATEMENT_REFRESH
    BRAND_MISSION_STATEMENT_REFRESH
    error
    message
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetGPTresponseQueryVariables,
    APITypes.GetGPTresponseQuery
  >;
export const sendEmail = /* GraphQL */ `query SendEmail($data: EMAIL_INPUT) {
  sendEmail(data: $data)
}
` as GeneratedQuery<APITypes.SendEmailQueryVariables, APITypes.SendEmailQuery>;
export const getWalletInfo =
  /* GraphQL */ `query GetWalletInfo($data: GET_WALLET_INFO_INPUT) {
  getWalletInfo(data: $data) {
    total_cost
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetWalletInfoQueryVariables,
    APITypes.GetWalletInfoQuery
  >;
export const sendContentSubmissionEmail =
  /* GraphQL */ `query SendContentSubmissionEmail(
  $email: String
  $name: String
  $brandBriefName: String
) {
  sendContentSubmissionEmail(
    email: $email
    name: $name
    brandBriefName: $brandBriefName
  )
}
` as GeneratedQuery<
    APITypes.SendContentSubmissionEmailQueryVariables,
    APITypes.SendContentSubmissionEmailQuery
  >;
export const getCreativeRequestCountBetweenDates =
  /* GraphQL */ `query GetCreativeRequestCountBetweenDates(
  $startDate: AWSDateTime!
  $endDate: AWSDateTime!
) {
  getCreativeRequestCountBetweenDates(startDate: $startDate, endDate: $endDate)
}
` as GeneratedQuery<
    APITypes.GetCreativeRequestCountBetweenDatesQueryVariables,
    APITypes.GetCreativeRequestCountBetweenDatesQuery
  >;
export const getCreativeEarnings =
  /* GraphQL */ `query GetCreativeEarnings($creatorId: ID!) {
  getCreativeEarnings(creatorId: $creatorId)
}
` as GeneratedQuery<
    APITypes.GetCreativeEarningsQueryVariables,
    APITypes.GetCreativeEarningsQuery
  >;
export const getCreativeEarningsByCreative =
  /* GraphQL */ `query GetCreativeEarningsByCreative($creativeRequestId: ID!) {
  getCreativeEarningsByCreative(creativeRequestId: $creativeRequestId)
}
` as GeneratedQuery<
    APITypes.GetCreativeEarningsByCreativeQueryVariables,
    APITypes.GetCreativeEarningsByCreativeQuery
  >;
export const getApprovedAdsCountWithinRange =
  /* GraphQL */ `query GetApprovedAdsCountWithinRange(
  $startDate: AWSDateTime!
  $endDate: AWSDateTime!
  $status: String!
) {
  getApprovedAdsCountWithinRange(
    startDate: $startDate
    endDate: $endDate
    status: $status
  )
}
` as GeneratedQuery<
    APITypes.GetApprovedAdsCountWithinRangeQueryVariables,
    APITypes.GetApprovedAdsCountWithinRangeQuery
  >;
export const getUserProfile = /* GraphQL */ `query GetUserProfile($id: ID!) {
  getUserProfile(id: $id) {
    id
    name
    description
    brand {
      items {
        id
        name
        toneVoice
        pillars
        description
        internalMission
        strapLine
        userEmail
        tiktokHandle
        vertical
        metaData
        briefs {
          nextToken
          __typename
        }
        hashtags
        personalDescription
        createdAt
        updatedAt
        userProfileBrandId
        __typename
      }
      nextToken
      __typename
    }
    owner
    userType
    tiktokHandler
    instagramHandler
    youtubeHandler
    bestPractices {
      items {
        id
        headLine
        description
        urlPath
        active
        owner
        createdAt
        updatedAt
        userProfileBestPracticesId
        __typename
      }
      nextToken
      __typename
    }
    tiktokAccountAccess {
      access_token
      advertiser_id
      advertisers_list {
        advertiser_id
        advertiser_name
        __typename
      }
      __typename
    }
    facebookAccountAccess {
      access_token
      advertiser_id
      advertisers_list {
        advertiser_id
        advertiser_name
        __typename
      }
      __typename
    }
    youtubeAccountAccess {
      access_token
      advertiser_id
      advertisers_list {
        advertiser_id
        advertiser_name
        __typename
      }
      __typename
    }
    userPaymentDetails {
      id
      fullName
      firstAddress
      secondAddress
      country
      accountNumber
      postCode
      swiftCode
      documentID
      owner
      userTransactions {
        items {
          id
          paymentStatus
          paymentAmount
          paymentAmountZar
          userProfileId
          owner
          createdAt
          updatedAt
          userPaymentDetailsUserTransactionsId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    userWallet {
      id
      currentBalance
      currentBalanceZar
      totalEarned
      totalEarnedZar
      extraBalance
      extraBalanceZar
      createdAt
      updatedAt
      owner
      __typename
    }
    lastLoginDate
    email
    phoneNumber
    country
    hashtags
    profileContent
    avatar
    vertical
    termsAndConditions
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserProfileQueryVariables,
  APITypes.GetUserProfileQuery
>;
export const listUserProfiles = /* GraphQL */ `query ListUserProfiles(
  $filter: ModelUserProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      brand {
        items {
          id
          name
          toneVoice
          pillars
          description
          internalMission
          strapLine
          userEmail
          tiktokHandle
          vertical
          metaData
          hashtags
          personalDescription
          createdAt
          updatedAt
          userProfileBrandId
          __typename
        }
        nextToken
        __typename
      }
      owner
      userType
      tiktokHandler
      instagramHandler
      youtubeHandler
      bestPractices {
        items {
          id
          headLine
          description
          urlPath
          active
          owner
          createdAt
          updatedAt
          userProfileBestPracticesId
          __typename
        }
        nextToken
        __typename
      }
      tiktokAccountAccess {
        access_token
        advertiser_id
        advertisers_list {
          advertiser_id
          advertiser_name
          __typename
        }
        __typename
      }
      facebookAccountAccess {
        access_token
        advertiser_id
        advertisers_list {
          advertiser_id
          advertiser_name
          __typename
        }
        __typename
      }
      youtubeAccountAccess {
        access_token
        advertiser_id
        advertisers_list {
          advertiser_id
          advertiser_name
          __typename
        }
        __typename
      }
      userPaymentDetails {
        id
        fullName
        firstAddress
        secondAddress
        country
        accountNumber
        postCode
        swiftCode
        documentID
        owner
        userTransactions {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      userWallet {
        id
        currentBalance
        currentBalanceZar
        totalEarned
        totalEarnedZar
        extraBalance
        extraBalanceZar
        createdAt
        updatedAt
        owner
        __typename
      }
      lastLoginDate
      email
      phoneNumber
      country
      hashtags
      profileContent
      avatar
      vertical
      termsAndConditions
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserProfilesQueryVariables,
  APITypes.ListUserProfilesQuery
>;
export const userProfilesByUserType =
  /* GraphQL */ `query UserProfilesByUserType(
  $userType: USER_TYPES!
  $sortDirection: ModelSortDirection
  $filter: ModelUserProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  userProfilesByUserType(
    userType: $userType
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      description
      brand {
        items {
          id
          name
          toneVoice
          pillars
          description
          internalMission
          strapLine
          userEmail
          tiktokHandle
          vertical
          metaData
          hashtags
          personalDescription
          createdAt
          updatedAt
          userProfileBrandId
          __typename
        }
        nextToken
        __typename
      }
      owner
      userType
      tiktokHandler
      instagramHandler
      youtubeHandler
      bestPractices {
        items {
          id
          headLine
          description
          urlPath
          active
          owner
          createdAt
          updatedAt
          userProfileBestPracticesId
          __typename
        }
        nextToken
        __typename
      }
      tiktokAccountAccess {
        access_token
        advertiser_id
        advertisers_list {
          advertiser_id
          advertiser_name
          __typename
        }
        __typename
      }
      facebookAccountAccess {
        access_token
        advertiser_id
        advertisers_list {
          advertiser_id
          advertiser_name
          __typename
        }
        __typename
      }
      youtubeAccountAccess {
        access_token
        advertiser_id
        advertisers_list {
          advertiser_id
          advertiser_name
          __typename
        }
        __typename
      }
      userPaymentDetails {
        id
        fullName
        firstAddress
        secondAddress
        country
        accountNumber
        postCode
        swiftCode
        documentID
        owner
        userTransactions {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      userWallet {
        id
        currentBalance
        currentBalanceZar
        totalEarned
        totalEarnedZar
        extraBalance
        extraBalanceZar
        createdAt
        updatedAt
        owner
        __typename
      }
      lastLoginDate
      email
      phoneNumber
      country
      hashtags
      profileContent
      avatar
      vertical
      termsAndConditions
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.UserProfilesByUserTypeQueryVariables,
    APITypes.UserProfilesByUserTypeQuery
  >;
export const getUserPaymentDetails =
  /* GraphQL */ `query GetUserPaymentDetails($id: ID!) {
  getUserPaymentDetails(id: $id) {
    id
    fullName
    firstAddress
    secondAddress
    country
    accountNumber
    postCode
    swiftCode
    documentID
    owner
    userTransactions {
      items {
        id
        paymentStatus
        paymentAmount
        paymentAmountZar
        userProfileId
        owner
        createdAt
        updatedAt
        userPaymentDetailsUserTransactionsId
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetUserPaymentDetailsQueryVariables,
    APITypes.GetUserPaymentDetailsQuery
  >;
export const listUserPaymentDetails =
  /* GraphQL */ `query ListUserPaymentDetails(
  $filter: ModelUserPaymentDetailsFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserPaymentDetails(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      fullName
      firstAddress
      secondAddress
      country
      accountNumber
      postCode
      swiftCode
      documentID
      owner
      userTransactions {
        items {
          id
          paymentStatus
          paymentAmount
          paymentAmountZar
          userProfileId
          owner
          createdAt
          updatedAt
          userPaymentDetailsUserTransactionsId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ListUserPaymentDetailsQueryVariables,
    APITypes.ListUserPaymentDetailsQuery
  >;
export const getUserWallet = /* GraphQL */ `query GetUserWallet($id: ID!) {
  getUserWallet(id: $id) {
    id
    currentBalance
    currentBalanceZar
    totalEarned
    totalEarnedZar
    extraBalance
    extraBalanceZar
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserWalletQueryVariables,
  APITypes.GetUserWalletQuery
>;
export const listUserWallets = /* GraphQL */ `query ListUserWallets(
  $filter: ModelUserWalletFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserWallets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      currentBalance
      currentBalanceZar
      totalEarned
      totalEarnedZar
      extraBalance
      extraBalanceZar
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserWalletsQueryVariables,
  APITypes.ListUserWalletsQuery
>;
export const userWalletsByOwner = /* GraphQL */ `query UserWalletsByOwner(
  $owner: String!
  $sortDirection: ModelSortDirection
  $filter: ModelUserWalletFilterInput
  $limit: Int
  $nextToken: String
) {
  userWalletsByOwner(
    owner: $owner
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      currentBalance
      currentBalanceZar
      totalEarned
      totalEarnedZar
      extraBalance
      extraBalanceZar
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UserWalletsByOwnerQueryVariables,
  APITypes.UserWalletsByOwnerQuery
>;
export const getUserTransactions =
  /* GraphQL */ `query GetUserTransactions($id: ID!) {
  getUserTransactions(id: $id) {
    id
    paymentStatus
    paymentAmount
    paymentAmountZar
    userProfileId
    owner
    createdAt
    updatedAt
    userPaymentDetailsUserTransactionsId
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetUserTransactionsQueryVariables,
    APITypes.GetUserTransactionsQuery
  >;
export const listUserTransactions = /* GraphQL */ `query ListUserTransactions(
  $filter: ModelUserTransactionsFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      paymentStatus
      paymentAmount
      paymentAmountZar
      userProfileId
      owner
      createdAt
      updatedAt
      userPaymentDetailsUserTransactionsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserTransactionsQueryVariables,
  APITypes.ListUserTransactionsQuery
>;
export const getApprovedAds = /* GraphQL */ `query GetApprovedAds($id: ID!) {
  getApprovedAds(id: $id) {
    id
    creativeRequestId
    creativeRequest {
      id
      brandBriefId
      creatorId
      creatorProfile {
        id
        name
        description
        brand {
          nextToken
          __typename
        }
        owner
        userType
        tiktokHandler
        instagramHandler
        youtubeHandler
        bestPractices {
          nextToken
          __typename
        }
        tiktokAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        facebookAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        youtubeAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        userPaymentDetails {
          id
          fullName
          firstAddress
          secondAddress
          country
          accountNumber
          postCode
          swiftCode
          documentID
          owner
          createdAt
          updatedAt
          __typename
        }
        userWallet {
          id
          currentBalance
          currentBalanceZar
          totalEarned
          totalEarnedZar
          extraBalance
          extraBalanceZar
          createdAt
          updatedAt
          owner
          __typename
        }
        lastLoginDate
        email
        phoneNumber
        country
        hashtags
        profileContent
        avatar
        vertical
        termsAndConditions
        createdAt
        updatedAt
        __typename
      }
      briefDescription
      ad_id
      status
      tiktokCreativeUrl
      creativePreviewUrl
      tiktokVideoCode
      creativeTiktokHandle
      creativeYoutubeHandle
      creativeInstagramHandle
      approvedAds {
        items {
          id
          creativeRequestId
          identity_id
          item_id
          ad_id
          ad_group_id
          campaing_id
          advertiser_id
          user_profile_id
          accessToken
          ad_report
          ad_comment
          status
          adName
          approvedAdType
          owner
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      brandComment
      adminComment
      creatorComment
      adminApproval
      creatorVisibility
      BriefName
      type
      email
      uniqueId
      createdAt
      updatedAt
      brandName
      __typename
    }
    identity_id
    item_id
    ad_id
    ad_group_id
    campaing_id
    advertiser_id
    user_profile_id
    accessToken
    ad_report
    ad_comment
    status
    adName
    approvedAdType
    owner
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetApprovedAdsQueryVariables,
  APITypes.GetApprovedAdsQuery
>;
export const listApprovedAds = /* GraphQL */ `query ListApprovedAds(
  $filter: ModelApprovedAdsFilterInput
  $limit: Int
  $nextToken: String
) {
  listApprovedAds(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      creativeRequestId
      creativeRequest {
        id
        brandBriefId
        creatorId
        creatorProfile {
          id
          name
          description
          owner
          userType
          tiktokHandler
          instagramHandler
          youtubeHandler
          lastLoginDate
          email
          phoneNumber
          country
          hashtags
          profileContent
          avatar
          vertical
          termsAndConditions
          createdAt
          updatedAt
          __typename
        }
        briefDescription
        ad_id
        status
        tiktokCreativeUrl
        creativePreviewUrl
        tiktokVideoCode
        creativeTiktokHandle
        creativeYoutubeHandle
        creativeInstagramHandle
        approvedAds {
          nextToken
          __typename
        }
        brandComment
        adminComment
        creatorComment
        adminApproval
        creatorVisibility
        BriefName
        type
        email
        uniqueId
        createdAt
        updatedAt
        brandName
        __typename
      }
      identity_id
      item_id
      ad_id
      ad_group_id
      campaing_id
      advertiser_id
      user_profile_id
      accessToken
      ad_report
      ad_comment
      status
      adName
      approvedAdType
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApprovedAdsQueryVariables,
  APITypes.ListApprovedAdsQuery
>;
export const approvedAdsById = /* GraphQL */ `query ApprovedAdsById(
  $id: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApprovedAdsFilterInput
  $limit: Int
  $nextToken: String
) {
  approvedAdsById(
    id: $id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      creativeRequestId
      creativeRequest {
        id
        brandBriefId
        creatorId
        creatorProfile {
          id
          name
          description
          owner
          userType
          tiktokHandler
          instagramHandler
          youtubeHandler
          lastLoginDate
          email
          phoneNumber
          country
          hashtags
          profileContent
          avatar
          vertical
          termsAndConditions
          createdAt
          updatedAt
          __typename
        }
        briefDescription
        ad_id
        status
        tiktokCreativeUrl
        creativePreviewUrl
        tiktokVideoCode
        creativeTiktokHandle
        creativeYoutubeHandle
        creativeInstagramHandle
        approvedAds {
          nextToken
          __typename
        }
        brandComment
        adminComment
        creatorComment
        adminApproval
        creatorVisibility
        BriefName
        type
        email
        uniqueId
        createdAt
        updatedAt
        brandName
        __typename
      }
      identity_id
      item_id
      ad_id
      ad_group_id
      campaing_id
      advertiser_id
      user_profile_id
      accessToken
      ad_report
      ad_comment
      status
      adName
      approvedAdType
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApprovedAdsByIdQueryVariables,
  APITypes.ApprovedAdsByIdQuery
>;
export const approvedAdsByCreativeRequestId =
  /* GraphQL */ `query ApprovedAdsByCreativeRequestId(
  $creativeRequestId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApprovedAdsFilterInput
  $limit: Int
  $nextToken: String
) {
  approvedAdsByCreativeRequestId(
    creativeRequestId: $creativeRequestId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      creativeRequestId
      creativeRequest {
        id
        brandBriefId
        creatorId
        creatorProfile {
          id
          name
          description
          owner
          userType
          tiktokHandler
          instagramHandler
          youtubeHandler
          lastLoginDate
          email
          phoneNumber
          country
          hashtags
          profileContent
          avatar
          vertical
          termsAndConditions
          createdAt
          updatedAt
          __typename
        }
        briefDescription
        ad_id
        status
        tiktokCreativeUrl
        creativePreviewUrl
        tiktokVideoCode
        creativeTiktokHandle
        creativeYoutubeHandle
        creativeInstagramHandle
        approvedAds {
          nextToken
          __typename
        }
        brandComment
        adminComment
        creatorComment
        adminApproval
        creatorVisibility
        BriefName
        type
        email
        uniqueId
        createdAt
        updatedAt
        brandName
        __typename
      }
      identity_id
      item_id
      ad_id
      ad_group_id
      campaing_id
      advertiser_id
      user_profile_id
      accessToken
      ad_report
      ad_comment
      status
      adName
      approvedAdType
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ApprovedAdsByCreativeRequestIdQueryVariables,
    APITypes.ApprovedAdsByCreativeRequestIdQuery
  >;
export const approvedAdsByAd_id = /* GraphQL */ `query ApprovedAdsByAd_id(
  $ad_id: String!
  $sortDirection: ModelSortDirection
  $filter: ModelApprovedAdsFilterInput
  $limit: Int
  $nextToken: String
) {
  approvedAdsByAd_id(
    ad_id: $ad_id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      creativeRequestId
      creativeRequest {
        id
        brandBriefId
        creatorId
        creatorProfile {
          id
          name
          description
          owner
          userType
          tiktokHandler
          instagramHandler
          youtubeHandler
          lastLoginDate
          email
          phoneNumber
          country
          hashtags
          profileContent
          avatar
          vertical
          termsAndConditions
          createdAt
          updatedAt
          __typename
        }
        briefDescription
        ad_id
        status
        tiktokCreativeUrl
        creativePreviewUrl
        tiktokVideoCode
        creativeTiktokHandle
        creativeYoutubeHandle
        creativeInstagramHandle
        approvedAds {
          nextToken
          __typename
        }
        brandComment
        adminComment
        creatorComment
        adminApproval
        creatorVisibility
        BriefName
        type
        email
        uniqueId
        createdAt
        updatedAt
        brandName
        __typename
      }
      identity_id
      item_id
      ad_id
      ad_group_id
      campaing_id
      advertiser_id
      user_profile_id
      accessToken
      ad_report
      ad_comment
      status
      adName
      approvedAdType
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApprovedAdsByAd_idQueryVariables,
  APITypes.ApprovedAdsByAd_idQuery
>;
export const approvedAdsByAd_group_id =
  /* GraphQL */ `query ApprovedAdsByAd_group_id(
  $ad_group_id: String!
  $sortDirection: ModelSortDirection
  $filter: ModelApprovedAdsFilterInput
  $limit: Int
  $nextToken: String
) {
  approvedAdsByAd_group_id(
    ad_group_id: $ad_group_id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      creativeRequestId
      creativeRequest {
        id
        brandBriefId
        creatorId
        creatorProfile {
          id
          name
          description
          owner
          userType
          tiktokHandler
          instagramHandler
          youtubeHandler
          lastLoginDate
          email
          phoneNumber
          country
          hashtags
          profileContent
          avatar
          vertical
          termsAndConditions
          createdAt
          updatedAt
          __typename
        }
        briefDescription
        ad_id
        status
        tiktokCreativeUrl
        creativePreviewUrl
        tiktokVideoCode
        creativeTiktokHandle
        creativeYoutubeHandle
        creativeInstagramHandle
        approvedAds {
          nextToken
          __typename
        }
        brandComment
        adminComment
        creatorComment
        adminApproval
        creatorVisibility
        BriefName
        type
        email
        uniqueId
        createdAt
        updatedAt
        brandName
        __typename
      }
      identity_id
      item_id
      ad_id
      ad_group_id
      campaing_id
      advertiser_id
      user_profile_id
      accessToken
      ad_report
      ad_comment
      status
      adName
      approvedAdType
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ApprovedAdsByAd_group_idQueryVariables,
    APITypes.ApprovedAdsByAd_group_idQuery
  >;
export const approvedAdsByCampaing_id =
  /* GraphQL */ `query ApprovedAdsByCampaing_id(
  $campaing_id: String!
  $sortDirection: ModelSortDirection
  $filter: ModelApprovedAdsFilterInput
  $limit: Int
  $nextToken: String
) {
  approvedAdsByCampaing_id(
    campaing_id: $campaing_id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      creativeRequestId
      creativeRequest {
        id
        brandBriefId
        creatorId
        creatorProfile {
          id
          name
          description
          owner
          userType
          tiktokHandler
          instagramHandler
          youtubeHandler
          lastLoginDate
          email
          phoneNumber
          country
          hashtags
          profileContent
          avatar
          vertical
          termsAndConditions
          createdAt
          updatedAt
          __typename
        }
        briefDescription
        ad_id
        status
        tiktokCreativeUrl
        creativePreviewUrl
        tiktokVideoCode
        creativeTiktokHandle
        creativeYoutubeHandle
        creativeInstagramHandle
        approvedAds {
          nextToken
          __typename
        }
        brandComment
        adminComment
        creatorComment
        adminApproval
        creatorVisibility
        BriefName
        type
        email
        uniqueId
        createdAt
        updatedAt
        brandName
        __typename
      }
      identity_id
      item_id
      ad_id
      ad_group_id
      campaing_id
      advertiser_id
      user_profile_id
      accessToken
      ad_report
      ad_comment
      status
      adName
      approvedAdType
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ApprovedAdsByCampaing_idQueryVariables,
    APITypes.ApprovedAdsByCampaing_idQuery
  >;
export const approvedAdsByAdvertiser_id =
  /* GraphQL */ `query ApprovedAdsByAdvertiser_id(
  $advertiser_id: String!
  $sortDirection: ModelSortDirection
  $filter: ModelApprovedAdsFilterInput
  $limit: Int
  $nextToken: String
) {
  approvedAdsByAdvertiser_id(
    advertiser_id: $advertiser_id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      creativeRequestId
      creativeRequest {
        id
        brandBriefId
        creatorId
        creatorProfile {
          id
          name
          description
          owner
          userType
          tiktokHandler
          instagramHandler
          youtubeHandler
          lastLoginDate
          email
          phoneNumber
          country
          hashtags
          profileContent
          avatar
          vertical
          termsAndConditions
          createdAt
          updatedAt
          __typename
        }
        briefDescription
        ad_id
        status
        tiktokCreativeUrl
        creativePreviewUrl
        tiktokVideoCode
        creativeTiktokHandle
        creativeYoutubeHandle
        creativeInstagramHandle
        approvedAds {
          nextToken
          __typename
        }
        brandComment
        adminComment
        creatorComment
        adminApproval
        creatorVisibility
        BriefName
        type
        email
        uniqueId
        createdAt
        updatedAt
        brandName
        __typename
      }
      identity_id
      item_id
      ad_id
      ad_group_id
      campaing_id
      advertiser_id
      user_profile_id
      accessToken
      ad_report
      ad_comment
      status
      adName
      approvedAdType
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ApprovedAdsByAdvertiser_idQueryVariables,
    APITypes.ApprovedAdsByAdvertiser_idQuery
  >;
export const approvedAdsByUser_profile_id =
  /* GraphQL */ `query ApprovedAdsByUser_profile_id(
  $user_profile_id: String!
  $sortDirection: ModelSortDirection
  $filter: ModelApprovedAdsFilterInput
  $limit: Int
  $nextToken: String
) {
  approvedAdsByUser_profile_id(
    user_profile_id: $user_profile_id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      creativeRequestId
      creativeRequest {
        id
        brandBriefId
        creatorId
        creatorProfile {
          id
          name
          description
          owner
          userType
          tiktokHandler
          instagramHandler
          youtubeHandler
          lastLoginDate
          email
          phoneNumber
          country
          hashtags
          profileContent
          avatar
          vertical
          termsAndConditions
          createdAt
          updatedAt
          __typename
        }
        briefDescription
        ad_id
        status
        tiktokCreativeUrl
        creativePreviewUrl
        tiktokVideoCode
        creativeTiktokHandle
        creativeYoutubeHandle
        creativeInstagramHandle
        approvedAds {
          nextToken
          __typename
        }
        brandComment
        adminComment
        creatorComment
        adminApproval
        creatorVisibility
        BriefName
        type
        email
        uniqueId
        createdAt
        updatedAt
        brandName
        __typename
      }
      identity_id
      item_id
      ad_id
      ad_group_id
      campaing_id
      advertiser_id
      user_profile_id
      accessToken
      ad_report
      ad_comment
      status
      adName
      approvedAdType
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ApprovedAdsByUser_profile_idQueryVariables,
    APITypes.ApprovedAdsByUser_profile_idQuery
  >;
export const approvedAdsByStatus = /* GraphQL */ `query ApprovedAdsByStatus(
  $status: String!
  $sortDirection: ModelSortDirection
  $filter: ModelApprovedAdsFilterInput
  $limit: Int
  $nextToken: String
) {
  approvedAdsByStatus(
    status: $status
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      creativeRequestId
      creativeRequest {
        id
        brandBriefId
        creatorId
        creatorProfile {
          id
          name
          description
          owner
          userType
          tiktokHandler
          instagramHandler
          youtubeHandler
          lastLoginDate
          email
          phoneNumber
          country
          hashtags
          profileContent
          avatar
          vertical
          termsAndConditions
          createdAt
          updatedAt
          __typename
        }
        briefDescription
        ad_id
        status
        tiktokCreativeUrl
        creativePreviewUrl
        tiktokVideoCode
        creativeTiktokHandle
        creativeYoutubeHandle
        creativeInstagramHandle
        approvedAds {
          nextToken
          __typename
        }
        brandComment
        adminComment
        creatorComment
        adminApproval
        creatorVisibility
        BriefName
        type
        email
        uniqueId
        createdAt
        updatedAt
        brandName
        __typename
      }
      identity_id
      item_id
      ad_id
      ad_group_id
      campaing_id
      advertiser_id
      user_profile_id
      accessToken
      ad_report
      ad_comment
      status
      adName
      approvedAdType
      owner
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApprovedAdsByStatusQueryVariables,
  APITypes.ApprovedAdsByStatusQuery
>;
export const getBestPractices =
  /* GraphQL */ `query GetBestPractices($id: ID!) {
  getBestPractices(id: $id) {
    id
    headLine
    description
    urlPath
    active
    owner
    createdAt
    updatedAt
    userProfileBestPracticesId
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetBestPracticesQueryVariables,
    APITypes.GetBestPracticesQuery
  >;
export const listBestPractices = /* GraphQL */ `query ListBestPractices(
  $filter: ModelBestPracticesFilterInput
  $limit: Int
  $nextToken: String
) {
  listBestPractices(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      headLine
      description
      urlPath
      active
      owner
      createdAt
      updatedAt
      userProfileBestPracticesId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBestPracticesQueryVariables,
  APITypes.ListBestPracticesQuery
>;
export const bestPracticesByActive = /* GraphQL */ `query BestPracticesByActive(
  $active: String!
  $sortDirection: ModelSortDirection
  $filter: ModelBestPracticesFilterInput
  $limit: Int
  $nextToken: String
) {
  bestPracticesByActive(
    active: $active
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      headLine
      description
      urlPath
      active
      owner
      createdAt
      updatedAt
      userProfileBestPracticesId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.BestPracticesByActiveQueryVariables,
  APITypes.BestPracticesByActiveQuery
>;
export const getBrandProfile = /* GraphQL */ `query GetBrandProfile($id: ID!) {
  getBrandProfile(id: $id) {
    id
    name
    toneVoice
    pillars
    description
    internalMission
    strapLine
    userEmail
    tiktokHandle
    vertical
    metaData
    briefs {
      items {
        id
        BriefName
        vertical
        objective
        brandBriefDetails
        brandBriefFilesUrl
        creativeInspirations
        active
        tiktokAdvertiserId
        creativeRequests {
          nextToken
          __typename
        }
        brandId
        brandProfile {
          id
          name
          toneVoice
          pillars
          description
          internalMission
          strapLine
          userEmail
          tiktokHandle
          vertical
          metaData
          hashtags
          personalDescription
          createdAt
          updatedAt
          userProfileBrandId
          __typename
        }
        adText
        country
        type
        createdAt
        updatedAt
        tikTokData {
          adIdentityId
          adgroupId
          campaignId
          adCaption
          displayName
          tikTokSparkAds
          callToAction
          landingPageUrl
          __typename
        }
        metaData {
          adgroupId
          campaignId
          adCaption
          callToAction
          landingPageUrl
          __typename
        }
        youtubeData {
          adgroupId
          campaignId
          adCaption
          callToAction
          landingPageUrl
          __typename
        }
        manualData {
          adCaption
          __typename
        }
        creativeRequestsCount
        __typename
      }
      nextToken
      __typename
    }
    hashtags
    personalDescription
    createdAt
    updatedAt
    userProfileBrandId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBrandProfileQueryVariables,
  APITypes.GetBrandProfileQuery
>;
export const listBrandProfiles = /* GraphQL */ `query ListBrandProfiles(
  $filter: ModelBrandProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  listBrandProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      toneVoice
      pillars
      description
      internalMission
      strapLine
      userEmail
      tiktokHandle
      vertical
      metaData
      briefs {
        items {
          id
          BriefName
          vertical
          objective
          brandBriefDetails
          brandBriefFilesUrl
          creativeInspirations
          active
          tiktokAdvertiserId
          brandId
          adText
          country
          type
          createdAt
          updatedAt
          creativeRequestsCount
          __typename
        }
        nextToken
        __typename
      }
      hashtags
      personalDescription
      createdAt
      updatedAt
      userProfileBrandId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBrandProfilesQueryVariables,
  APITypes.ListBrandProfilesQuery
>;
export const brandProfilesByUserEmail =
  /* GraphQL */ `query BrandProfilesByUserEmail(
  $userEmail: String!
  $sortDirection: ModelSortDirection
  $filter: ModelBrandProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  brandProfilesByUserEmail(
    userEmail: $userEmail
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      toneVoice
      pillars
      description
      internalMission
      strapLine
      userEmail
      tiktokHandle
      vertical
      metaData
      briefs {
        items {
          id
          BriefName
          vertical
          objective
          brandBriefDetails
          brandBriefFilesUrl
          creativeInspirations
          active
          tiktokAdvertiserId
          brandId
          adText
          country
          type
          createdAt
          updatedAt
          creativeRequestsCount
          __typename
        }
        nextToken
        __typename
      }
      hashtags
      personalDescription
      createdAt
      updatedAt
      userProfileBrandId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.BrandProfilesByUserEmailQueryVariables,
    APITypes.BrandProfilesByUserEmailQuery
  >;
export const getBrandBrief = /* GraphQL */ `query GetBrandBrief($id: ID!) {
  getBrandBrief(id: $id) {
    id
    BriefName
    vertical
    objective
    brandBriefDetails
    brandBriefFilesUrl
    creativeInspirations
    active
    tiktokAdvertiserId
    creativeRequests {
      items {
        id
        brandBriefId
        creatorId
        creatorProfile {
          id
          name
          description
          owner
          userType
          tiktokHandler
          instagramHandler
          youtubeHandler
          lastLoginDate
          email
          phoneNumber
          country
          hashtags
          profileContent
          avatar
          vertical
          termsAndConditions
          createdAt
          updatedAt
          __typename
        }
        briefDescription
        ad_id
        status
        tiktokCreativeUrl
        creativePreviewUrl
        tiktokVideoCode
        creativeTiktokHandle
        creativeYoutubeHandle
        creativeInstagramHandle
        approvedAds {
          nextToken
          __typename
        }
        brandComment
        adminComment
        creatorComment
        adminApproval
        creatorVisibility
        BriefName
        type
        email
        uniqueId
        createdAt
        updatedAt
        brandName
        __typename
      }
      nextToken
      __typename
    }
    brandId
    brandProfile {
      id
      name
      toneVoice
      pillars
      description
      internalMission
      strapLine
      userEmail
      tiktokHandle
      vertical
      metaData
      briefs {
        items {
          id
          BriefName
          vertical
          objective
          brandBriefDetails
          brandBriefFilesUrl
          creativeInspirations
          active
          tiktokAdvertiserId
          brandId
          adText
          country
          type
          createdAt
          updatedAt
          creativeRequestsCount
          __typename
        }
        nextToken
        __typename
      }
      hashtags
      personalDescription
      createdAt
      updatedAt
      userProfileBrandId
      __typename
    }
    adText
    country
    type
    createdAt
    updatedAt
    tikTokData {
      adIdentityId
      adgroupId
      campaignId
      adCaption
      displayName
      tikTokSparkAds
      callToAction
      landingPageUrl
      __typename
    }
    metaData {
      adgroupId
      campaignId
      adCaption
      callToAction
      landingPageUrl
      __typename
    }
    youtubeData {
      adgroupId
      campaignId
      adCaption
      callToAction
      landingPageUrl
      __typename
    }
    manualData {
      adCaption
      __typename
    }
    creativeRequestsCount
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBrandBriefQueryVariables,
  APITypes.GetBrandBriefQuery
>;
export const listBrandBriefs = /* GraphQL */ `query ListBrandBriefs(
  $filter: ModelBrandBriefFilterInput
  $limit: Int
  $nextToken: String
) {
  listBrandBriefs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      BriefName
      vertical
      objective
      brandBriefDetails
      brandBriefFilesUrl
      creativeInspirations
      active
      tiktokAdvertiserId
      creativeRequests {
        items {
          id
          brandBriefId
          creatorId
          briefDescription
          ad_id
          status
          tiktokCreativeUrl
          creativePreviewUrl
          tiktokVideoCode
          creativeTiktokHandle
          creativeYoutubeHandle
          creativeInstagramHandle
          brandComment
          adminComment
          creatorComment
          adminApproval
          creatorVisibility
          BriefName
          type
          email
          uniqueId
          createdAt
          updatedAt
          brandName
          __typename
        }
        nextToken
        __typename
      }
      brandId
      brandProfile {
        id
        name
        toneVoice
        pillars
        description
        internalMission
        strapLine
        userEmail
        tiktokHandle
        vertical
        metaData
        briefs {
          nextToken
          __typename
        }
        hashtags
        personalDescription
        createdAt
        updatedAt
        userProfileBrandId
        __typename
      }
      adText
      country
      type
      createdAt
      updatedAt
      tikTokData {
        adIdentityId
        adgroupId
        campaignId
        adCaption
        displayName
        tikTokSparkAds
        callToAction
        landingPageUrl
        __typename
      }
      metaData {
        adgroupId
        campaignId
        adCaption
        callToAction
        landingPageUrl
        __typename
      }
      youtubeData {
        adgroupId
        campaignId
        adCaption
        callToAction
        landingPageUrl
        __typename
      }
      manualData {
        adCaption
        __typename
      }
      creativeRequestsCount
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBrandBriefsQueryVariables,
  APITypes.ListBrandBriefsQuery
>;
export const brandBriefsByVertical = /* GraphQL */ `query BrandBriefsByVertical(
  $vertical: String!
  $sortDirection: ModelSortDirection
  $filter: ModelBrandBriefFilterInput
  $limit: Int
  $nextToken: String
) {
  brandBriefsByVertical(
    vertical: $vertical
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      BriefName
      vertical
      objective
      brandBriefDetails
      brandBriefFilesUrl
      creativeInspirations
      active
      tiktokAdvertiserId
      creativeRequests {
        items {
          id
          brandBriefId
          creatorId
          briefDescription
          ad_id
          status
          tiktokCreativeUrl
          creativePreviewUrl
          tiktokVideoCode
          creativeTiktokHandle
          creativeYoutubeHandle
          creativeInstagramHandle
          brandComment
          adminComment
          creatorComment
          adminApproval
          creatorVisibility
          BriefName
          type
          email
          uniqueId
          createdAt
          updatedAt
          brandName
          __typename
        }
        nextToken
        __typename
      }
      brandId
      brandProfile {
        id
        name
        toneVoice
        pillars
        description
        internalMission
        strapLine
        userEmail
        tiktokHandle
        vertical
        metaData
        briefs {
          nextToken
          __typename
        }
        hashtags
        personalDescription
        createdAt
        updatedAt
        userProfileBrandId
        __typename
      }
      adText
      country
      type
      createdAt
      updatedAt
      tikTokData {
        adIdentityId
        adgroupId
        campaignId
        adCaption
        displayName
        tikTokSparkAds
        callToAction
        landingPageUrl
        __typename
      }
      metaData {
        adgroupId
        campaignId
        adCaption
        callToAction
        landingPageUrl
        __typename
      }
      youtubeData {
        adgroupId
        campaignId
        adCaption
        callToAction
        landingPageUrl
        __typename
      }
      manualData {
        adCaption
        __typename
      }
      creativeRequestsCount
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.BrandBriefsByVerticalQueryVariables,
  APITypes.BrandBriefsByVerticalQuery
>;
export const brandBriefsByTiktokAdvertiserId =
  /* GraphQL */ `query BrandBriefsByTiktokAdvertiserId(
  $tiktokAdvertiserId: String!
  $sortDirection: ModelSortDirection
  $filter: ModelBrandBriefFilterInput
  $limit: Int
  $nextToken: String
) {
  brandBriefsByTiktokAdvertiserId(
    tiktokAdvertiserId: $tiktokAdvertiserId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      BriefName
      vertical
      objective
      brandBriefDetails
      brandBriefFilesUrl
      creativeInspirations
      active
      tiktokAdvertiserId
      creativeRequests {
        items {
          id
          brandBriefId
          creatorId
          briefDescription
          ad_id
          status
          tiktokCreativeUrl
          creativePreviewUrl
          tiktokVideoCode
          creativeTiktokHandle
          creativeYoutubeHandle
          creativeInstagramHandle
          brandComment
          adminComment
          creatorComment
          adminApproval
          creatorVisibility
          BriefName
          type
          email
          uniqueId
          createdAt
          updatedAt
          brandName
          __typename
        }
        nextToken
        __typename
      }
      brandId
      brandProfile {
        id
        name
        toneVoice
        pillars
        description
        internalMission
        strapLine
        userEmail
        tiktokHandle
        vertical
        metaData
        briefs {
          nextToken
          __typename
        }
        hashtags
        personalDescription
        createdAt
        updatedAt
        userProfileBrandId
        __typename
      }
      adText
      country
      type
      createdAt
      updatedAt
      tikTokData {
        adIdentityId
        adgroupId
        campaignId
        adCaption
        displayName
        tikTokSparkAds
        callToAction
        landingPageUrl
        __typename
      }
      metaData {
        adgroupId
        campaignId
        adCaption
        callToAction
        landingPageUrl
        __typename
      }
      youtubeData {
        adgroupId
        campaignId
        adCaption
        callToAction
        landingPageUrl
        __typename
      }
      manualData {
        adCaption
        __typename
      }
      creativeRequestsCount
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.BrandBriefsByTiktokAdvertiserIdQueryVariables,
    APITypes.BrandBriefsByTiktokAdvertiserIdQuery
  >;
export const byBrand = /* GraphQL */ `query ByBrand(
  $brandId: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelBrandBriefFilterInput
  $limit: Int
  $nextToken: String
) {
  byBrand(
    brandId: $brandId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      BriefName
      vertical
      objective
      brandBriefDetails
      brandBriefFilesUrl
      creativeInspirations
      active
      tiktokAdvertiserId
      creativeRequests {
        items {
          id
          brandBriefId
          creatorId
          briefDescription
          ad_id
          status
          tiktokCreativeUrl
          creativePreviewUrl
          tiktokVideoCode
          creativeTiktokHandle
          creativeYoutubeHandle
          creativeInstagramHandle
          brandComment
          adminComment
          creatorComment
          adminApproval
          creatorVisibility
          BriefName
          type
          email
          uniqueId
          createdAt
          updatedAt
          brandName
          __typename
        }
        nextToken
        __typename
      }
      brandId
      brandProfile {
        id
        name
        toneVoice
        pillars
        description
        internalMission
        strapLine
        userEmail
        tiktokHandle
        vertical
        metaData
        briefs {
          nextToken
          __typename
        }
        hashtags
        personalDescription
        createdAt
        updatedAt
        userProfileBrandId
        __typename
      }
      adText
      country
      type
      createdAt
      updatedAt
      tikTokData {
        adIdentityId
        adgroupId
        campaignId
        adCaption
        displayName
        tikTokSparkAds
        callToAction
        landingPageUrl
        __typename
      }
      metaData {
        adgroupId
        campaignId
        adCaption
        callToAction
        landingPageUrl
        __typename
      }
      youtubeData {
        adgroupId
        campaignId
        adCaption
        callToAction
        landingPageUrl
        __typename
      }
      manualData {
        adCaption
        __typename
      }
      creativeRequestsCount
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ByBrandQueryVariables, APITypes.ByBrandQuery>;
export const brandBriefByDate = /* GraphQL */ `query BrandBriefByDate(
  $type: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelBrandBriefFilterInput
  $limit: Int
  $nextToken: String
) {
  brandBriefByDate(
    type: $type
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      BriefName
      vertical
      objective
      brandBriefDetails
      brandBriefFilesUrl
      creativeInspirations
      active
      tiktokAdvertiserId
      creativeRequests {
        items {
          id
          brandBriefId
          creatorId
          briefDescription
          ad_id
          status
          tiktokCreativeUrl
          creativePreviewUrl
          tiktokVideoCode
          creativeTiktokHandle
          creativeYoutubeHandle
          creativeInstagramHandle
          brandComment
          adminComment
          creatorComment
          adminApproval
          creatorVisibility
          BriefName
          type
          email
          uniqueId
          createdAt
          updatedAt
          brandName
          __typename
        }
        nextToken
        __typename
      }
      brandId
      brandProfile {
        id
        name
        toneVoice
        pillars
        description
        internalMission
        strapLine
        userEmail
        tiktokHandle
        vertical
        metaData
        briefs {
          nextToken
          __typename
        }
        hashtags
        personalDescription
        createdAt
        updatedAt
        userProfileBrandId
        __typename
      }
      adText
      country
      type
      createdAt
      updatedAt
      tikTokData {
        adIdentityId
        adgroupId
        campaignId
        adCaption
        displayName
        tikTokSparkAds
        callToAction
        landingPageUrl
        __typename
      }
      metaData {
        adgroupId
        campaignId
        adCaption
        callToAction
        landingPageUrl
        __typename
      }
      youtubeData {
        adgroupId
        campaignId
        adCaption
        callToAction
        landingPageUrl
        __typename
      }
      manualData {
        adCaption
        __typename
      }
      creativeRequestsCount
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.BrandBriefByDateQueryVariables,
  APITypes.BrandBriefByDateQuery
>;
export const getCreativeRequest =
  /* GraphQL */ `query GetCreativeRequest($id: ID!) {
  getCreativeRequest(id: $id) {
    id
    brandBriefId
    creatorId
    creatorProfile {
      id
      name
      description
      brand {
        items {
          id
          name
          toneVoice
          pillars
          description
          internalMission
          strapLine
          userEmail
          tiktokHandle
          vertical
          metaData
          hashtags
          personalDescription
          createdAt
          updatedAt
          userProfileBrandId
          __typename
        }
        nextToken
        __typename
      }
      owner
      userType
      tiktokHandler
      instagramHandler
      youtubeHandler
      bestPractices {
        items {
          id
          headLine
          description
          urlPath
          active
          owner
          createdAt
          updatedAt
          userProfileBestPracticesId
          __typename
        }
        nextToken
        __typename
      }
      tiktokAccountAccess {
        access_token
        advertiser_id
        advertisers_list {
          advertiser_id
          advertiser_name
          __typename
        }
        __typename
      }
      facebookAccountAccess {
        access_token
        advertiser_id
        advertisers_list {
          advertiser_id
          advertiser_name
          __typename
        }
        __typename
      }
      youtubeAccountAccess {
        access_token
        advertiser_id
        advertisers_list {
          advertiser_id
          advertiser_name
          __typename
        }
        __typename
      }
      userPaymentDetails {
        id
        fullName
        firstAddress
        secondAddress
        country
        accountNumber
        postCode
        swiftCode
        documentID
        owner
        userTransactions {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      userWallet {
        id
        currentBalance
        currentBalanceZar
        totalEarned
        totalEarnedZar
        extraBalance
        extraBalanceZar
        createdAt
        updatedAt
        owner
        __typename
      }
      lastLoginDate
      email
      phoneNumber
      country
      hashtags
      profileContent
      avatar
      vertical
      termsAndConditions
      createdAt
      updatedAt
      __typename
    }
    briefDescription
    ad_id
    status
    tiktokCreativeUrl
    creativePreviewUrl
    tiktokVideoCode
    creativeTiktokHandle
    creativeYoutubeHandle
    creativeInstagramHandle
    approvedAds {
      items {
        id
        creativeRequestId
        creativeRequest {
          id
          brandBriefId
          creatorId
          briefDescription
          ad_id
          status
          tiktokCreativeUrl
          creativePreviewUrl
          tiktokVideoCode
          creativeTiktokHandle
          creativeYoutubeHandle
          creativeInstagramHandle
          brandComment
          adminComment
          creatorComment
          adminApproval
          creatorVisibility
          BriefName
          type
          email
          uniqueId
          createdAt
          updatedAt
          brandName
          __typename
        }
        identity_id
        item_id
        ad_id
        ad_group_id
        campaing_id
        advertiser_id
        user_profile_id
        accessToken
        ad_report
        ad_comment
        status
        adName
        approvedAdType
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    brandComment
    adminComment
    creatorComment
    adminApproval
    creatorVisibility
    BriefName
    type
    email
    uniqueId
    createdAt
    updatedAt
    brandName
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetCreativeRequestQueryVariables,
    APITypes.GetCreativeRequestQuery
  >;
export const listCreativeRequests = /* GraphQL */ `query ListCreativeRequests(
  $filter: ModelCreativeRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  listCreativeRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      brandBriefId
      creatorId
      creatorProfile {
        id
        name
        description
        brand {
          nextToken
          __typename
        }
        owner
        userType
        tiktokHandler
        instagramHandler
        youtubeHandler
        bestPractices {
          nextToken
          __typename
        }
        tiktokAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        facebookAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        youtubeAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        userPaymentDetails {
          id
          fullName
          firstAddress
          secondAddress
          country
          accountNumber
          postCode
          swiftCode
          documentID
          owner
          createdAt
          updatedAt
          __typename
        }
        userWallet {
          id
          currentBalance
          currentBalanceZar
          totalEarned
          totalEarnedZar
          extraBalance
          extraBalanceZar
          createdAt
          updatedAt
          owner
          __typename
        }
        lastLoginDate
        email
        phoneNumber
        country
        hashtags
        profileContent
        avatar
        vertical
        termsAndConditions
        createdAt
        updatedAt
        __typename
      }
      briefDescription
      ad_id
      status
      tiktokCreativeUrl
      creativePreviewUrl
      tiktokVideoCode
      creativeTiktokHandle
      creativeYoutubeHandle
      creativeInstagramHandle
      approvedAds {
        items {
          id
          creativeRequestId
          identity_id
          item_id
          ad_id
          ad_group_id
          campaing_id
          advertiser_id
          user_profile_id
          accessToken
          ad_report
          ad_comment
          status
          adName
          approvedAdType
          owner
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      brandComment
      adminComment
      creatorComment
      adminApproval
      creatorVisibility
      BriefName
      type
      email
      uniqueId
      createdAt
      updatedAt
      brandName
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCreativeRequestsQueryVariables,
  APITypes.ListCreativeRequestsQuery
>;
export const creativeRequestsByBrandBriefId =
  /* GraphQL */ `query CreativeRequestsByBrandBriefId(
  $brandBriefId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelCreativeRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  creativeRequestsByBrandBriefId(
    brandBriefId: $brandBriefId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      brandBriefId
      creatorId
      creatorProfile {
        id
        name
        description
        brand {
          nextToken
          __typename
        }
        owner
        userType
        tiktokHandler
        instagramHandler
        youtubeHandler
        bestPractices {
          nextToken
          __typename
        }
        tiktokAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        facebookAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        youtubeAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        userPaymentDetails {
          id
          fullName
          firstAddress
          secondAddress
          country
          accountNumber
          postCode
          swiftCode
          documentID
          owner
          createdAt
          updatedAt
          __typename
        }
        userWallet {
          id
          currentBalance
          currentBalanceZar
          totalEarned
          totalEarnedZar
          extraBalance
          extraBalanceZar
          createdAt
          updatedAt
          owner
          __typename
        }
        lastLoginDate
        email
        phoneNumber
        country
        hashtags
        profileContent
        avatar
        vertical
        termsAndConditions
        createdAt
        updatedAt
        __typename
      }
      briefDescription
      ad_id
      status
      tiktokCreativeUrl
      creativePreviewUrl
      tiktokVideoCode
      creativeTiktokHandle
      creativeYoutubeHandle
      creativeInstagramHandle
      approvedAds {
        items {
          id
          creativeRequestId
          identity_id
          item_id
          ad_id
          ad_group_id
          campaing_id
          advertiser_id
          user_profile_id
          accessToken
          ad_report
          ad_comment
          status
          adName
          approvedAdType
          owner
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      brandComment
      adminComment
      creatorComment
      adminApproval
      creatorVisibility
      BriefName
      type
      email
      uniqueId
      createdAt
      updatedAt
      brandName
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.CreativeRequestsByBrandBriefIdQueryVariables,
    APITypes.CreativeRequestsByBrandBriefIdQuery
  >;
export const creativeRequestsByCreatorId =
  /* GraphQL */ `query CreativeRequestsByCreatorId(
  $creatorId: ID!
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelCreativeRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  creativeRequestsByCreatorId(
    creatorId: $creatorId
    updatedAt: $updatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      brandBriefId
      creatorId
      creatorProfile {
        id
        name
        description
        brand {
          nextToken
          __typename
        }
        owner
        userType
        tiktokHandler
        instagramHandler
        youtubeHandler
        bestPractices {
          nextToken
          __typename
        }
        tiktokAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        facebookAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        youtubeAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        userPaymentDetails {
          id
          fullName
          firstAddress
          secondAddress
          country
          accountNumber
          postCode
          swiftCode
          documentID
          owner
          createdAt
          updatedAt
          __typename
        }
        userWallet {
          id
          currentBalance
          currentBalanceZar
          totalEarned
          totalEarnedZar
          extraBalance
          extraBalanceZar
          createdAt
          updatedAt
          owner
          __typename
        }
        lastLoginDate
        email
        phoneNumber
        country
        hashtags
        profileContent
        avatar
        vertical
        termsAndConditions
        createdAt
        updatedAt
        __typename
      }
      briefDescription
      ad_id
      status
      tiktokCreativeUrl
      creativePreviewUrl
      tiktokVideoCode
      creativeTiktokHandle
      creativeYoutubeHandle
      creativeInstagramHandle
      approvedAds {
        items {
          id
          creativeRequestId
          identity_id
          item_id
          ad_id
          ad_group_id
          campaing_id
          advertiser_id
          user_profile_id
          accessToken
          ad_report
          ad_comment
          status
          adName
          approvedAdType
          owner
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      brandComment
      adminComment
      creatorComment
      adminApproval
      creatorVisibility
      BriefName
      type
      email
      uniqueId
      createdAt
      updatedAt
      brandName
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.CreativeRequestsByCreatorIdQueryVariables,
    APITypes.CreativeRequestsByCreatorIdQuery
  >;
export const creativeRequestsByStatus =
  /* GraphQL */ `query CreativeRequestsByStatus(
  $status: CREATIVE_STATUS!
  $sortDirection: ModelSortDirection
  $filter: ModelCreativeRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  creativeRequestsByStatus(
    status: $status
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      brandBriefId
      creatorId
      creatorProfile {
        id
        name
        description
        brand {
          nextToken
          __typename
        }
        owner
        userType
        tiktokHandler
        instagramHandler
        youtubeHandler
        bestPractices {
          nextToken
          __typename
        }
        tiktokAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        facebookAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        youtubeAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        userPaymentDetails {
          id
          fullName
          firstAddress
          secondAddress
          country
          accountNumber
          postCode
          swiftCode
          documentID
          owner
          createdAt
          updatedAt
          __typename
        }
        userWallet {
          id
          currentBalance
          currentBalanceZar
          totalEarned
          totalEarnedZar
          extraBalance
          extraBalanceZar
          createdAt
          updatedAt
          owner
          __typename
        }
        lastLoginDate
        email
        phoneNumber
        country
        hashtags
        profileContent
        avatar
        vertical
        termsAndConditions
        createdAt
        updatedAt
        __typename
      }
      briefDescription
      ad_id
      status
      tiktokCreativeUrl
      creativePreviewUrl
      tiktokVideoCode
      creativeTiktokHandle
      creativeYoutubeHandle
      creativeInstagramHandle
      approvedAds {
        items {
          id
          creativeRequestId
          identity_id
          item_id
          ad_id
          ad_group_id
          campaing_id
          advertiser_id
          user_profile_id
          accessToken
          ad_report
          ad_comment
          status
          adName
          approvedAdType
          owner
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      brandComment
      adminComment
      creatorComment
      adminApproval
      creatorVisibility
      BriefName
      type
      email
      uniqueId
      createdAt
      updatedAt
      brandName
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.CreativeRequestsByStatusQueryVariables,
    APITypes.CreativeRequestsByStatusQuery
  >;
export const creativeRequestsByAdminApproval =
  /* GraphQL */ `query CreativeRequestsByAdminApproval(
  $adminApproval: ADMIN_STATUS!
  $sortDirection: ModelSortDirection
  $filter: ModelCreativeRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  creativeRequestsByAdminApproval(
    adminApproval: $adminApproval
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      brandBriefId
      creatorId
      creatorProfile {
        id
        name
        description
        brand {
          nextToken
          __typename
        }
        owner
        userType
        tiktokHandler
        instagramHandler
        youtubeHandler
        bestPractices {
          nextToken
          __typename
        }
        tiktokAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        facebookAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        youtubeAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        userPaymentDetails {
          id
          fullName
          firstAddress
          secondAddress
          country
          accountNumber
          postCode
          swiftCode
          documentID
          owner
          createdAt
          updatedAt
          __typename
        }
        userWallet {
          id
          currentBalance
          currentBalanceZar
          totalEarned
          totalEarnedZar
          extraBalance
          extraBalanceZar
          createdAt
          updatedAt
          owner
          __typename
        }
        lastLoginDate
        email
        phoneNumber
        country
        hashtags
        profileContent
        avatar
        vertical
        termsAndConditions
        createdAt
        updatedAt
        __typename
      }
      briefDescription
      ad_id
      status
      tiktokCreativeUrl
      creativePreviewUrl
      tiktokVideoCode
      creativeTiktokHandle
      creativeYoutubeHandle
      creativeInstagramHandle
      approvedAds {
        items {
          id
          creativeRequestId
          identity_id
          item_id
          ad_id
          ad_group_id
          campaing_id
          advertiser_id
          user_profile_id
          accessToken
          ad_report
          ad_comment
          status
          adName
          approvedAdType
          owner
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      brandComment
      adminComment
      creatorComment
      adminApproval
      creatorVisibility
      BriefName
      type
      email
      uniqueId
      createdAt
      updatedAt
      brandName
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.CreativeRequestsByAdminApprovalQueryVariables,
    APITypes.CreativeRequestsByAdminApprovalQuery
  >;
export const creativeRequestsByCreatorVisibility =
  /* GraphQL */ `query CreativeRequestsByCreatorVisibility(
  $creatorVisibility: CREATOR_VISIBILITY!
  $sortDirection: ModelSortDirection
  $filter: ModelCreativeRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  creativeRequestsByCreatorVisibility(
    creatorVisibility: $creatorVisibility
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      brandBriefId
      creatorId
      creatorProfile {
        id
        name
        description
        brand {
          nextToken
          __typename
        }
        owner
        userType
        tiktokHandler
        instagramHandler
        youtubeHandler
        bestPractices {
          nextToken
          __typename
        }
        tiktokAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        facebookAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        youtubeAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        userPaymentDetails {
          id
          fullName
          firstAddress
          secondAddress
          country
          accountNumber
          postCode
          swiftCode
          documentID
          owner
          createdAt
          updatedAt
          __typename
        }
        userWallet {
          id
          currentBalance
          currentBalanceZar
          totalEarned
          totalEarnedZar
          extraBalance
          extraBalanceZar
          createdAt
          updatedAt
          owner
          __typename
        }
        lastLoginDate
        email
        phoneNumber
        country
        hashtags
        profileContent
        avatar
        vertical
        termsAndConditions
        createdAt
        updatedAt
        __typename
      }
      briefDescription
      ad_id
      status
      tiktokCreativeUrl
      creativePreviewUrl
      tiktokVideoCode
      creativeTiktokHandle
      creativeYoutubeHandle
      creativeInstagramHandle
      approvedAds {
        items {
          id
          creativeRequestId
          identity_id
          item_id
          ad_id
          ad_group_id
          campaing_id
          advertiser_id
          user_profile_id
          accessToken
          ad_report
          ad_comment
          status
          adName
          approvedAdType
          owner
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      brandComment
      adminComment
      creatorComment
      adminApproval
      creatorVisibility
      BriefName
      type
      email
      uniqueId
      createdAt
      updatedAt
      brandName
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.CreativeRequestsByCreatorVisibilityQueryVariables,
    APITypes.CreativeRequestsByCreatorVisibilityQuery
  >;
export const creativeRequestsByDate =
  /* GraphQL */ `query CreativeRequestsByDate(
  $type: String!
  $updatedAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelCreativeRequestFilterInput
  $limit: Int
  $nextToken: String
) {
  creativeRequestsByDate(
    type: $type
    updatedAt: $updatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      brandBriefId
      creatorId
      creatorProfile {
        id
        name
        description
        brand {
          nextToken
          __typename
        }
        owner
        userType
        tiktokHandler
        instagramHandler
        youtubeHandler
        bestPractices {
          nextToken
          __typename
        }
        tiktokAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        facebookAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        youtubeAccountAccess {
          access_token
          advertiser_id
          __typename
        }
        userPaymentDetails {
          id
          fullName
          firstAddress
          secondAddress
          country
          accountNumber
          postCode
          swiftCode
          documentID
          owner
          createdAt
          updatedAt
          __typename
        }
        userWallet {
          id
          currentBalance
          currentBalanceZar
          totalEarned
          totalEarnedZar
          extraBalance
          extraBalanceZar
          createdAt
          updatedAt
          owner
          __typename
        }
        lastLoginDate
        email
        phoneNumber
        country
        hashtags
        profileContent
        avatar
        vertical
        termsAndConditions
        createdAt
        updatedAt
        __typename
      }
      briefDescription
      ad_id
      status
      tiktokCreativeUrl
      creativePreviewUrl
      tiktokVideoCode
      creativeTiktokHandle
      creativeYoutubeHandle
      creativeInstagramHandle
      approvedAds {
        items {
          id
          creativeRequestId
          identity_id
          item_id
          ad_id
          ad_group_id
          campaing_id
          advertiser_id
          user_profile_id
          accessToken
          ad_report
          ad_comment
          status
          adName
          approvedAdType
          owner
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      brandComment
      adminComment
      creatorComment
      adminApproval
      creatorVisibility
      BriefName
      type
      email
      uniqueId
      createdAt
      updatedAt
      brandName
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.CreativeRequestsByDateQueryVariables,
    APITypes.CreativeRequestsByDateQuery
  >;
export const getCreativeRequestEarnings =
  /* GraphQL */ `query GetCreativeRequestEarnings(
  $creatorId: ID!
  $creativeRequestEarningId: ID!
) {
  getCreativeRequestEarnings(
    creatorId: $creatorId
    creativeRequestEarningId: $creativeRequestEarningId
  ) {
    creativeRequestEarningId
    creativeRequestId
    creatorId
    amount
    creativeUniqueId
    currentEarnings
    month
    toDate
    fromDate
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetCreativeRequestEarningsQueryVariables,
    APITypes.GetCreativeRequestEarningsQuery
  >;
export const listCreativeRequestEarnings =
  /* GraphQL */ `query ListCreativeRequestEarnings(
  $creatorId: ID
  $creativeRequestEarningId: ModelIDKeyConditionInput
  $filter: ModelCreativeRequestEarningsFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCreativeRequestEarnings(
    creatorId: $creatorId
    creativeRequestEarningId: $creativeRequestEarningId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      creativeRequestEarningId
      creativeRequestId
      creatorId
      amount
      creativeUniqueId
      currentEarnings
      month
      toDate
      fromDate
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ListCreativeRequestEarningsQueryVariables,
    APITypes.ListCreativeRequestEarningsQuery
  >;
export const creativeRequestId = /* GraphQL */ `query CreativeRequestId(
  $creativeRequestId: ID!
  $updatedAtAmount: ModelCreativeRequestEarningsCreativeRequestEarningsByCreativeRequestIdAndUpdatedAtAndAmountCompositeKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelCreativeRequestEarningsFilterInput
  $limit: Int
  $nextToken: String
) {
  creativeRequestId(
    creativeRequestId: $creativeRequestId
    updatedAtAmount: $updatedAtAmount
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      creativeRequestEarningId
      creativeRequestId
      creatorId
      amount
      creativeUniqueId
      currentEarnings
      month
      toDate
      fromDate
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CreativeRequestIdQueryVariables,
  APITypes.CreativeRequestIdQuery
>;
