/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const creativeRequestUniqueId = /* GraphQL */ `mutation CreativeRequestUniqueId(
  $brandBriefId: String
  $creativeRequestId: String
) {
  creativeRequestUniqueId(
    brandBriefId: $brandBriefId
    creativeRequestId: $creativeRequestId
  )
}
` as GeneratedMutation<
  APITypes.CreativeRequestUniqueIdMutationVariables,
  APITypes.CreativeRequestUniqueIdMutation
>;
export const videoPreviewUrl = /* GraphQL */ `mutation VideoPreviewUrl($videoPath: String) {
  videoPreviewUrl(videoPath: $videoPath)
}
` as GeneratedMutation<
  APITypes.VideoPreviewUrlMutationVariables,
  APITypes.VideoPreviewUrlMutation
>;
export const creativeRequestAuthorization = /* GraphQL */ `mutation CreativeRequestAuthorization(
  $creativeRequestId: String
  $brandBriefId: String
  $advertiser_id: String
  $tiktokVideoCode: String
) {
  creativeRequestAuthorization(
    creativeRequestId: $creativeRequestId
    brandBriefId: $brandBriefId
    advertiser_id: $advertiser_id
    tiktokVideoCode: $tiktokVideoCode
  )
}
` as GeneratedMutation<
  APITypes.CreativeRequestAuthorizationMutationVariables,
  APITypes.CreativeRequestAuthorizationMutation
>;
export const linkTiktokAccount = /* GraphQL */ `mutation LinkTiktokAccount($authCode: String, $userProfileId: String) {
  linkTiktokAccount(authCode: $authCode, userProfileId: $userProfileId)
}
` as GeneratedMutation<
  APITypes.LinkTiktokAccountMutationVariables,
  APITypes.LinkTiktokAccountMutation
>;
export const linkCreatorTikTokAccount = /* GraphQL */ `mutation LinkCreatorTikTokAccount($authCode: String, $userProfileId: String) {
  linkCreatorTikTokAccount(authCode: $authCode, userProfileId: $userProfileId)
}
` as GeneratedMutation<
  APITypes.LinkCreatorTikTokAccountMutationVariables,
  APITypes.LinkCreatorTikTokAccountMutation
>;
export const linkCreatorInstagramAccount = /* GraphQL */ `mutation LinkCreatorInstagramAccount(
  $authCode: String
  $userProfileId: String
) {
  linkCreatorInstagramAccount(
    authCode: $authCode
    userProfileId: $userProfileId
  )
}
` as GeneratedMutation<
  APITypes.LinkCreatorInstagramAccountMutationVariables,
  APITypes.LinkCreatorInstagramAccountMutation
>;
export const linkFacebookAccount = /* GraphQL */ `mutation LinkFacebookAccount($authCode: String, $userProfileId: String) {
  linkFacebookAccount(authCode: $authCode, userProfileId: $userProfileId)
}
` as GeneratedMutation<
  APITypes.LinkFacebookAccountMutationVariables,
  APITypes.LinkFacebookAccountMutation
>;
export const linkYoutubeAccount = /* GraphQL */ `mutation LinkYoutubeAccount($authCode: String, $userProfileId: String) {
  linkYoutubeAccount(authCode: $authCode, userProfileId: $userProfileId)
}
` as GeneratedMutation<
  APITypes.LinkYoutubeAccountMutationVariables,
  APITypes.LinkYoutubeAccountMutation
>;
export const linkCreatorYoutubeAccount = /* GraphQL */ `mutation LinkCreatorYoutubeAccount($authCode: String, $userProfileId: String) {
  linkCreatorYoutubeAccount(authCode: $authCode, userProfileId: $userProfileId)
}
` as GeneratedMutation<
  APITypes.LinkCreatorYoutubeAccountMutationVariables,
  APITypes.LinkCreatorYoutubeAccountMutation
>;
export const validateTiktokAccess = /* GraphQL */ `mutation ValidateTiktokAccess($accessToken: String) {
  validateTiktokAccess(accessToken: $accessToken)
}
` as GeneratedMutation<
  APITypes.ValidateTiktokAccessMutationVariables,
  APITypes.ValidateTiktokAccessMutation
>;
export const linkUserType = /* GraphQL */ `mutation LinkUserType($userType: String, $profileId: String) {
  linkUserType(userType: $userType, profileId: $profileId)
}
` as GeneratedMutation<
  APITypes.LinkUserTypeMutationVariables,
  APITypes.LinkUserTypeMutation
>;
export const createAds = /* GraphQL */ `mutation CreateAds(
  $token: String
  $authCode: String
  $advId: String
  $adgroupId: String
  $landingPageUrl: String
  $identityId: String
  $displayName: String
  $videoUrl: String
  $callToAction: String
  $creativeRequestId: String
  $adName: String
  $creatorId: String
  $adCaption: String
) {
  createAds(
    token: $token
    authCode: $authCode
    advId: $advId
    adgroupId: $adgroupId
    landingPageUrl: $landingPageUrl
    identityId: $identityId
    displayName: $displayName
    videoUrl: $videoUrl
    callToAction: $callToAction
    creativeRequestId: $creativeRequestId
    adName: $adName
    creatorId: $creatorId
    adCaption: $adCaption
  )
}
` as GeneratedMutation<
  APITypes.CreateAdsMutationVariables,
  APITypes.CreateAdsMutation
>;
export const createMetaAd = /* GraphQL */ `mutation CreateMetaAd(
  $accessToken: String!
  $accountId: String!
  $adName: String!
  $adSetId: String!
  $campaignId: String!
  $videoUrl: String!
  $pageId: String
  $creativeRequestId: String!
) {
  createMetaAd(
    accessToken: $accessToken
    accountId: $accountId
    adName: $adName
    adSetId: $adSetId
    campaignId: $campaignId
    videoUrl: $videoUrl
    pageId: $pageId
    creativeRequestId: $creativeRequestId
  )
}
` as GeneratedMutation<
  APITypes.CreateMetaAdMutationVariables,
  APITypes.CreateMetaAdMutation
>;
export const createManualAd = /* GraphQL */ `mutation CreateManualAd($creativeRequestId: String!) {
  createManualAd(creativeRequestId: $creativeRequestId)
}
` as GeneratedMutation<
  APITypes.CreateManualAdMutationVariables,
  APITypes.CreateManualAdMutation
>;
export const listAdGroups = /* GraphQL */ `mutation ListAdGroups(
  $token: String
  $advertiser_id: String
  $campaignId: String
) {
  listAdGroups(
    token: $token
    advertiser_id: $advertiser_id
    campaignId: $campaignId
  )
}
` as GeneratedMutation<
  APITypes.ListAdGroupsMutationVariables,
  APITypes.ListAdGroupsMutation
>;
export const listCampaigns = /* GraphQL */ `mutation ListCampaigns($token: String, $advertiser_id: String) {
  listCampaigns(token: $token, advertiser_id: $advertiser_id)
}
` as GeneratedMutation<
  APITypes.ListCampaignsMutationVariables,
  APITypes.ListCampaignsMutation
>;
export const getFacebookCampaign = /* GraphQL */ `mutation GetFacebookCampaign($access_token: String, $advertiser_id: String) {
  getFacebookCampaign(
    access_token: $access_token
    advertiser_id: $advertiser_id
  )
}
` as GeneratedMutation<
  APITypes.GetFacebookCampaignMutationVariables,
  APITypes.GetFacebookCampaignMutation
>;
export const getFacebookAdSets = /* GraphQL */ `mutation GetFacebookAdSets($access_token: String, $campaign_id: String) {
  getFacebookAdSets(access_token: $access_token, campaign_id: $campaign_id)
}
` as GeneratedMutation<
  APITypes.GetFacebookAdSetsMutationVariables,
  APITypes.GetFacebookAdSetsMutation
>;
export const getVideoFromAuthCode = /* GraphQL */ `mutation GetVideoFromAuthCode(
  $token: String
  $advertiser_id: String
  $authCode: String
) {
  getVideoFromAuthCode(
    token: $token
    advertiser_id: $advertiser_id
    authCode: $authCode
  )
}
` as GeneratedMutation<
  APITypes.GetVideoFromAuthCodeMutationVariables,
  APITypes.GetVideoFromAuthCodeMutation
>;
export const addCreativeEarning = /* GraphQL */ `mutation AddCreativeEarning(
  $userProfileId: String!
  $creativeRequestId: String!
  $amount: Float!
  $month: Months!
  $toDate: AWSDateTime!
  $fromDate: AWSDateTime!
) {
  addCreativeEarning(
    userProfileId: $userProfileId
    creativeRequestId: $creativeRequestId
    amount: $amount
    month: $month
    toDate: $toDate
    fromDate: $fromDate
  )
}
` as GeneratedMutation<
  APITypes.AddCreativeEarningMutationVariables,
  APITypes.AddCreativeEarningMutation
>;
export const createUserWallet = /* GraphQL */ `mutation CreateUserWallet(
  $input: CreateUserWalletInput!
  $condition: ModelUserWalletConditionInput
) {
  createUserWallet(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserWalletMutationVariables,
  APITypes.CreateUserWalletMutation
>;
export const deleteUserWallet = /* GraphQL */ `mutation DeleteUserWallet(
  $input: DeleteUserWalletInput!
  $condition: ModelUserWalletConditionInput
) {
  deleteUserWallet(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserWalletMutationVariables,
  APITypes.DeleteUserWalletMutation
>;
export const deleteBestPractices = /* GraphQL */ `mutation DeleteBestPractices(
  $input: DeleteBestPracticesInput!
  $condition: ModelBestPracticesConditionInput
) {
  deleteBestPractices(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteBestPracticesMutationVariables,
  APITypes.DeleteBestPracticesMutation
>;
export const createUserProfile = /* GraphQL */ `mutation CreateUserProfile(
  $input: CreateUserProfileInput!
  $condition: ModelUserProfileConditionInput
) {
  createUserProfile(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserProfileMutationVariables,
  APITypes.CreateUserProfileMutation
>;
export const updateUserProfile = /* GraphQL */ `mutation UpdateUserProfile(
  $input: UpdateUserProfileInput!
  $condition: ModelUserProfileConditionInput
) {
  updateUserProfile(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserProfileMutationVariables,
  APITypes.UpdateUserProfileMutation
>;
export const deleteUserProfile = /* GraphQL */ `mutation DeleteUserProfile(
  $input: DeleteUserProfileInput!
  $condition: ModelUserProfileConditionInput
) {
  deleteUserProfile(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserProfileMutationVariables,
  APITypes.DeleteUserProfileMutation
>;
export const createUserPaymentDetails = /* GraphQL */ `mutation CreateUserPaymentDetails(
  $input: CreateUserPaymentDetailsInput!
  $condition: ModelUserPaymentDetailsConditionInput
) {
  createUserPaymentDetails(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserPaymentDetailsMutationVariables,
  APITypes.CreateUserPaymentDetailsMutation
>;
export const updateUserPaymentDetails = /* GraphQL */ `mutation UpdateUserPaymentDetails(
  $input: UpdateUserPaymentDetailsInput!
  $condition: ModelUserPaymentDetailsConditionInput
) {
  updateUserPaymentDetails(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserPaymentDetailsMutationVariables,
  APITypes.UpdateUserPaymentDetailsMutation
>;
export const deleteUserPaymentDetails = /* GraphQL */ `mutation DeleteUserPaymentDetails(
  $input: DeleteUserPaymentDetailsInput!
  $condition: ModelUserPaymentDetailsConditionInput
) {
  deleteUserPaymentDetails(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserPaymentDetailsMutationVariables,
  APITypes.DeleteUserPaymentDetailsMutation
>;
export const updateUserWallet = /* GraphQL */ `mutation UpdateUserWallet(
  $input: UpdateUserWalletInput!
  $condition: ModelUserWalletConditionInput
) {
  updateUserWallet(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserWalletMutationVariables,
  APITypes.UpdateUserWalletMutation
>;
export const createUserTransactions = /* GraphQL */ `mutation CreateUserTransactions(
  $input: CreateUserTransactionsInput!
  $condition: ModelUserTransactionsConditionInput
) {
  createUserTransactions(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserTransactionsMutationVariables,
  APITypes.CreateUserTransactionsMutation
>;
export const updateUserTransactions = /* GraphQL */ `mutation UpdateUserTransactions(
  $input: UpdateUserTransactionsInput!
  $condition: ModelUserTransactionsConditionInput
) {
  updateUserTransactions(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserTransactionsMutationVariables,
  APITypes.UpdateUserTransactionsMutation
>;
export const deleteUserTransactions = /* GraphQL */ `mutation DeleteUserTransactions(
  $input: DeleteUserTransactionsInput!
  $condition: ModelUserTransactionsConditionInput
) {
  deleteUserTransactions(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserTransactionsMutationVariables,
  APITypes.DeleteUserTransactionsMutation
>;
export const createApprovedAds = /* GraphQL */ `mutation CreateApprovedAds(
  $input: CreateApprovedAdsInput!
  $condition: ModelApprovedAdsConditionInput
) {
  createApprovedAds(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateApprovedAdsMutationVariables,
  APITypes.CreateApprovedAdsMutation
>;
export const updateApprovedAds = /* GraphQL */ `mutation UpdateApprovedAds(
  $input: UpdateApprovedAdsInput!
  $condition: ModelApprovedAdsConditionInput
) {
  updateApprovedAds(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateApprovedAdsMutationVariables,
  APITypes.UpdateApprovedAdsMutation
>;
export const deleteApprovedAds = /* GraphQL */ `mutation DeleteApprovedAds(
  $input: DeleteApprovedAdsInput!
  $condition: ModelApprovedAdsConditionInput
) {
  deleteApprovedAds(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteApprovedAdsMutationVariables,
  APITypes.DeleteApprovedAdsMutation
>;
export const createBestPractices = /* GraphQL */ `mutation CreateBestPractices(
  $input: CreateBestPracticesInput!
  $condition: ModelBestPracticesConditionInput
) {
  createBestPractices(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateBestPracticesMutationVariables,
  APITypes.CreateBestPracticesMutation
>;
export const updateBestPractices = /* GraphQL */ `mutation UpdateBestPractices(
  $input: UpdateBestPracticesInput!
  $condition: ModelBestPracticesConditionInput
) {
  updateBestPractices(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateBestPracticesMutationVariables,
  APITypes.UpdateBestPracticesMutation
>;
export const createBrandProfile = /* GraphQL */ `mutation CreateBrandProfile(
  $input: CreateBrandProfileInput!
  $condition: ModelBrandProfileConditionInput
) {
  createBrandProfile(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateBrandProfileMutationVariables,
  APITypes.CreateBrandProfileMutation
>;
export const updateBrandProfile = /* GraphQL */ `mutation UpdateBrandProfile(
  $input: UpdateBrandProfileInput!
  $condition: ModelBrandProfileConditionInput
) {
  updateBrandProfile(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateBrandProfileMutationVariables,
  APITypes.UpdateBrandProfileMutation
>;
export const deleteBrandProfile = /* GraphQL */ `mutation DeleteBrandProfile(
  $input: DeleteBrandProfileInput!
  $condition: ModelBrandProfileConditionInput
) {
  deleteBrandProfile(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteBrandProfileMutationVariables,
  APITypes.DeleteBrandProfileMutation
>;
export const createBrandBrief = /* GraphQL */ `mutation CreateBrandBrief(
  $input: CreateBrandBriefInput!
  $condition: ModelBrandBriefConditionInput
) {
  createBrandBrief(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateBrandBriefMutationVariables,
  APITypes.CreateBrandBriefMutation
>;
export const updateBrandBrief = /* GraphQL */ `mutation UpdateBrandBrief(
  $input: UpdateBrandBriefInput!
  $condition: ModelBrandBriefConditionInput
) {
  updateBrandBrief(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateBrandBriefMutationVariables,
  APITypes.UpdateBrandBriefMutation
>;
export const deleteBrandBrief = /* GraphQL */ `mutation DeleteBrandBrief(
  $input: DeleteBrandBriefInput!
  $condition: ModelBrandBriefConditionInput
) {
  deleteBrandBrief(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteBrandBriefMutationVariables,
  APITypes.DeleteBrandBriefMutation
>;
export const createCreativeRequest = /* GraphQL */ `mutation CreateCreativeRequest(
  $input: CreateCreativeRequestInput!
  $condition: ModelCreativeRequestConditionInput
) {
  createCreativeRequest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCreativeRequestMutationVariables,
  APITypes.CreateCreativeRequestMutation
>;
export const updateCreativeRequest = /* GraphQL */ `mutation UpdateCreativeRequest(
  $input: UpdateCreativeRequestInput!
  $condition: ModelCreativeRequestConditionInput
) {
  updateCreativeRequest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCreativeRequestMutationVariables,
  APITypes.UpdateCreativeRequestMutation
>;
export const deleteCreativeRequest = /* GraphQL */ `mutation DeleteCreativeRequest(
  $input: DeleteCreativeRequestInput!
  $condition: ModelCreativeRequestConditionInput
) {
  deleteCreativeRequest(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCreativeRequestMutationVariables,
  APITypes.DeleteCreativeRequestMutation
>;
export const createCreativeRequestEarnings = /* GraphQL */ `mutation CreateCreativeRequestEarnings(
  $input: CreateCreativeRequestEarningsInput!
  $condition: ModelCreativeRequestEarningsConditionInput
) {
  createCreativeRequestEarnings(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCreativeRequestEarningsMutationVariables,
  APITypes.CreateCreativeRequestEarningsMutation
>;
export const updateCreativeRequestEarnings = /* GraphQL */ `mutation UpdateCreativeRequestEarnings(
  $input: UpdateCreativeRequestEarningsInput!
  $condition: ModelCreativeRequestEarningsConditionInput
) {
  updateCreativeRequestEarnings(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCreativeRequestEarningsMutationVariables,
  APITypes.UpdateCreativeRequestEarningsMutation
>;
export const deleteCreativeRequestEarnings = /* GraphQL */ `mutation DeleteCreativeRequestEarnings(
  $input: DeleteCreativeRequestEarningsInput!
  $condition: ModelCreativeRequestEarningsConditionInput
) {
  deleteCreativeRequestEarnings(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCreativeRequestEarningsMutationVariables,
  APITypes.DeleteCreativeRequestEarningsMutation
>;
