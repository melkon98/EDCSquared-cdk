/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUserProfile = /* GraphQL */ `subscription OnCreateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $owner: String
) {
  onCreateUserProfile(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserProfileSubscriptionVariables,
  APITypes.OnCreateUserProfileSubscription
>;
export const onUpdateUserProfile = /* GraphQL */ `subscription OnUpdateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $owner: String
) {
  onUpdateUserProfile(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserProfileSubscriptionVariables,
  APITypes.OnUpdateUserProfileSubscription
>;
export const onDeleteUserProfile = /* GraphQL */ `subscription OnDeleteUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $owner: String
) {
  onDeleteUserProfile(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserProfileSubscriptionVariables,
  APITypes.OnDeleteUserProfileSubscription
>;
export const onCreateUserPaymentDetails = /* GraphQL */ `subscription OnCreateUserPaymentDetails(
  $filter: ModelSubscriptionUserPaymentDetailsFilterInput
  $owner: String
) {
  onCreateUserPaymentDetails(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserPaymentDetailsSubscriptionVariables,
  APITypes.OnCreateUserPaymentDetailsSubscription
>;
export const onUpdateUserPaymentDetails = /* GraphQL */ `subscription OnUpdateUserPaymentDetails(
  $filter: ModelSubscriptionUserPaymentDetailsFilterInput
  $owner: String
) {
  onUpdateUserPaymentDetails(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserPaymentDetailsSubscriptionVariables,
  APITypes.OnUpdateUserPaymentDetailsSubscription
>;
export const onDeleteUserPaymentDetails = /* GraphQL */ `subscription OnDeleteUserPaymentDetails(
  $filter: ModelSubscriptionUserPaymentDetailsFilterInput
  $owner: String
) {
  onDeleteUserPaymentDetails(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserPaymentDetailsSubscriptionVariables,
  APITypes.OnDeleteUserPaymentDetailsSubscription
>;
export const onCreateUserWallet = /* GraphQL */ `subscription OnCreateUserWallet(
  $filter: ModelSubscriptionUserWalletFilterInput
  $owner: String
) {
  onCreateUserWallet(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserWalletSubscriptionVariables,
  APITypes.OnCreateUserWalletSubscription
>;
export const onUpdateUserWallet = /* GraphQL */ `subscription OnUpdateUserWallet(
  $filter: ModelSubscriptionUserWalletFilterInput
  $owner: String
) {
  onUpdateUserWallet(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserWalletSubscriptionVariables,
  APITypes.OnUpdateUserWalletSubscription
>;
export const onDeleteUserWallet = /* GraphQL */ `subscription OnDeleteUserWallet(
  $filter: ModelSubscriptionUserWalletFilterInput
  $owner: String
) {
  onDeleteUserWallet(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserWalletSubscriptionVariables,
  APITypes.OnDeleteUserWalletSubscription
>;
export const onCreateUserTransactions = /* GraphQL */ `subscription OnCreateUserTransactions(
  $filter: ModelSubscriptionUserTransactionsFilterInput
  $owner: String
) {
  onCreateUserTransactions(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserTransactionsSubscriptionVariables,
  APITypes.OnCreateUserTransactionsSubscription
>;
export const onUpdateUserTransactions = /* GraphQL */ `subscription OnUpdateUserTransactions(
  $filter: ModelSubscriptionUserTransactionsFilterInput
  $owner: String
) {
  onUpdateUserTransactions(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserTransactionsSubscriptionVariables,
  APITypes.OnUpdateUserTransactionsSubscription
>;
export const onDeleteUserTransactions = /* GraphQL */ `subscription OnDeleteUserTransactions(
  $filter: ModelSubscriptionUserTransactionsFilterInput
  $owner: String
) {
  onDeleteUserTransactions(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserTransactionsSubscriptionVariables,
  APITypes.OnDeleteUserTransactionsSubscription
>;
export const onCreateApprovedAds = /* GraphQL */ `subscription OnCreateApprovedAds(
  $filter: ModelSubscriptionApprovedAdsFilterInput
) {
  onCreateApprovedAds(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApprovedAdsSubscriptionVariables,
  APITypes.OnCreateApprovedAdsSubscription
>;
export const onUpdateApprovedAds = /* GraphQL */ `subscription OnUpdateApprovedAds(
  $filter: ModelSubscriptionApprovedAdsFilterInput
) {
  onUpdateApprovedAds(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApprovedAdsSubscriptionVariables,
  APITypes.OnUpdateApprovedAdsSubscription
>;
export const onDeleteApprovedAds = /* GraphQL */ `subscription OnDeleteApprovedAds(
  $filter: ModelSubscriptionApprovedAdsFilterInput
) {
  onDeleteApprovedAds(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApprovedAdsSubscriptionVariables,
  APITypes.OnDeleteApprovedAdsSubscription
>;
export const onCreateBestPractices = /* GraphQL */ `subscription OnCreateBestPractices(
  $filter: ModelSubscriptionBestPracticesFilterInput
  $owner: String
) {
  onCreateBestPractices(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateBestPracticesSubscriptionVariables,
  APITypes.OnCreateBestPracticesSubscription
>;
export const onUpdateBestPractices = /* GraphQL */ `subscription OnUpdateBestPractices(
  $filter: ModelSubscriptionBestPracticesFilterInput
  $owner: String
) {
  onUpdateBestPractices(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateBestPracticesSubscriptionVariables,
  APITypes.OnUpdateBestPracticesSubscription
>;
export const onDeleteBestPractices = /* GraphQL */ `subscription OnDeleteBestPractices(
  $filter: ModelSubscriptionBestPracticesFilterInput
  $owner: String
) {
  onDeleteBestPractices(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteBestPracticesSubscriptionVariables,
  APITypes.OnDeleteBestPracticesSubscription
>;
export const onCreateBrandProfile = /* GraphQL */ `subscription OnCreateBrandProfile(
  $filter: ModelSubscriptionBrandProfileFilterInput
) {
  onCreateBrandProfile(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateBrandProfileSubscriptionVariables,
  APITypes.OnCreateBrandProfileSubscription
>;
export const onUpdateBrandProfile = /* GraphQL */ `subscription OnUpdateBrandProfile(
  $filter: ModelSubscriptionBrandProfileFilterInput
) {
  onUpdateBrandProfile(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateBrandProfileSubscriptionVariables,
  APITypes.OnUpdateBrandProfileSubscription
>;
export const onDeleteBrandProfile = /* GraphQL */ `subscription OnDeleteBrandProfile(
  $filter: ModelSubscriptionBrandProfileFilterInput
) {
  onDeleteBrandProfile(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteBrandProfileSubscriptionVariables,
  APITypes.OnDeleteBrandProfileSubscription
>;
export const onCreateBrandBrief = /* GraphQL */ `subscription OnCreateBrandBrief(
  $filter: ModelSubscriptionBrandBriefFilterInput
) {
  onCreateBrandBrief(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateBrandBriefSubscriptionVariables,
  APITypes.OnCreateBrandBriefSubscription
>;
export const onUpdateBrandBrief = /* GraphQL */ `subscription OnUpdateBrandBrief(
  $filter: ModelSubscriptionBrandBriefFilterInput
) {
  onUpdateBrandBrief(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateBrandBriefSubscriptionVariables,
  APITypes.OnUpdateBrandBriefSubscription
>;
export const onDeleteBrandBrief = /* GraphQL */ `subscription OnDeleteBrandBrief(
  $filter: ModelSubscriptionBrandBriefFilterInput
) {
  onDeleteBrandBrief(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteBrandBriefSubscriptionVariables,
  APITypes.OnDeleteBrandBriefSubscription
>;
export const onCreateCreativeRequest = /* GraphQL */ `subscription OnCreateCreativeRequest(
  $filter: ModelSubscriptionCreativeRequestFilterInput
) {
  onCreateCreativeRequest(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCreativeRequestSubscriptionVariables,
  APITypes.OnCreateCreativeRequestSubscription
>;
export const onUpdateCreativeRequest = /* GraphQL */ `subscription OnUpdateCreativeRequest(
  $filter: ModelSubscriptionCreativeRequestFilterInput
) {
  onUpdateCreativeRequest(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCreativeRequestSubscriptionVariables,
  APITypes.OnUpdateCreativeRequestSubscription
>;
export const onDeleteCreativeRequest = /* GraphQL */ `subscription OnDeleteCreativeRequest(
  $filter: ModelSubscriptionCreativeRequestFilterInput
) {
  onDeleteCreativeRequest(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCreativeRequestSubscriptionVariables,
  APITypes.OnDeleteCreativeRequestSubscription
>;
export const onCreateCreativeRequestEarnings = /* GraphQL */ `subscription OnCreateCreativeRequestEarnings(
  $filter: ModelSubscriptionCreativeRequestEarningsFilterInput
) {
  onCreateCreativeRequestEarnings(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCreativeRequestEarningsSubscriptionVariables,
  APITypes.OnCreateCreativeRequestEarningsSubscription
>;
export const onUpdateCreativeRequestEarnings = /* GraphQL */ `subscription OnUpdateCreativeRequestEarnings(
  $filter: ModelSubscriptionCreativeRequestEarningsFilterInput
) {
  onUpdateCreativeRequestEarnings(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCreativeRequestEarningsSubscriptionVariables,
  APITypes.OnUpdateCreativeRequestEarningsSubscription
>;
export const onDeleteCreativeRequestEarnings = /* GraphQL */ `subscription OnDeleteCreativeRequestEarnings(
  $filter: ModelSubscriptionCreativeRequestEarningsFilterInput
) {
  onDeleteCreativeRequestEarnings(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCreativeRequestEarningsSubscriptionVariables,
  APITypes.OnDeleteCreativeRequestEarningsSubscription
>;
