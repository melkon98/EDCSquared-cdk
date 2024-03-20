import { Stack, StackProps } from "aws-cdk-lib";
import { GraphqlApi } from "aws-cdk-lib/aws-appsync";
import { Function } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class MiscStack extends Stack {
  constructor(
    construct: Construct,
    id: string,
    gqlApi: GraphqlApi,
    props?: StackProps,
  ) {
    super(construct, id, props);

    // Queries

    const getCampaignSpentDS = gqlApi.addLambdaDataSource(
      "getCampaignSpentLambdaDataSource",
      Function.fromFunctionName(
        this,
        "getCampaignSpentLogicalId",
        "getCampaignSpent",
      ),
    );

    getCampaignSpentDS.createResolver("getCampaignSpentResolver", {
      typeName: "Query",
      fieldName: "getCampaignSpent",
    });

    const getGPTresponseDS = gqlApi.addLambdaDataSource(
      "getGPTresponseDataSource",
      Function.fromFunctionName(
        this,
        "getGPTresponseLogicalId",
        "getGPTresponse",
      ),
    );

    const sendContentSubmissionEmailDS = gqlApi.addLambdaDataSource(
      "sendContentSubmissionEmailLambdaDataSource",
      Function.fromFunctionName(
        this,
        "sendContentSubmissionEmailLogicalId",
        "sendContentSubmissionEmail",
      ),
    );

    sendContentSubmissionEmailDS.createResolver(
      "sendContentSubmissionEmailResolver",
      {
        typeName: "Query",
        fieldName: "sendContentSubmissionEmail",
      },
    );

    getGPTresponseDS.createResolver("getGPTresponseResolver", {
      typeName: "Query",
      fieldName: "getGPTresponse",
    });

    // Mutations:

    const videoPreviewUrlDS = gqlApi.addLambdaDataSource(
      "videoPreviewUrlLambdaDataSource",
      Function.fromFunctionName(
        this,
        "LambdaDataSourceLogicalId",
        "videoPreviewUrl",
      ),
    );

    videoPreviewUrlDS.createResolver("videoPreviewUrlResolver", {
      typeName: "Mutation",
      fieldName: "videoPreviewUrl",
    });

    const linkTiktokAccountDS = gqlApi.addLambdaDataSource(
      "linkTiktokAccountLambdaDataSource",
      Function.fromFunctionName(
        this,
        "linkTiktokAccountLogicalId",
        "linkTiktokAccount",
      ),
    );

    linkTiktokAccountDS.createResolver("linkTiktokAccountResolver", {
      typeName: "Mutation",
      fieldName: "linkTiktokAccount",
    });

    const linkCreatorTikTokAccountDS = gqlApi.addLambdaDataSource(
      "linkCreatorTikTokAccountLambdaDataSource",
      Function.fromFunctionName(
        this,
        "linkCreatorTikTokAccountLogicalId",
        "linkCreatorTikTokAccount",
      ),
    );

    linkCreatorTikTokAccountDS.createResolver(
      "linkCreatorTikTokAccountResolver",
      {
        typeName: "Mutation",
        fieldName: "linkCreatorTikTokAccount",
      },
    );

    const linkCreatorInstagramAccountDS = gqlApi.addLambdaDataSource(
      "linkCreatorInstagramAccountLambdaDataSource",
      Function.fromFunctionName(
        this,
        "linkCreatorInstagramAccountLogicalId",
        "linkCreatorInstagramAccount",
      ),
    );

    linkCreatorInstagramAccountDS.createResolver(
      "linkCreatorInstagramAccountResolver",
      {
        typeName: "Mutation",
        fieldName: "linkCreatorInstagramAccount",
      },
    );

    const linkFacebookAccountDS = gqlApi.addLambdaDataSource(
      "linkFacebookAccountLambdaDataSource",
      Function.fromFunctionName(
        this,
        "linkFacebookAccountLogicalId",
        "linkFacebookAccount",
      ),
    );

    linkFacebookAccountDS.createResolver("linkFacebookAccountResolver", {
      typeName: "Mutation",
      fieldName: "linkFacebookAccount",
    });

    const linkYoutubeAccountDS = gqlApi.addLambdaDataSource(
      "linkYoutubeAccountLambdaDataSource",
      Function.fromFunctionName(
        this,
        "linkYoutubeAccountLogicalId",
        "linkYoutubeAccount",
      ),
    );

    linkYoutubeAccountDS.createResolver("linkYoutubeAccountResolver", {
      typeName: "Mutation",
      fieldName: "linkYoutubeAccount",
    });

    const linkCreatorYoutubeAccountDS = gqlApi.addLambdaDataSource(
      "linkCreatorYoutubeAccountLambdaDataSource",
      Function.fromFunctionName(
        this,
        "linkCreatorYoutubeAccountLogicalId",
        "linkCreatorYoutubeAccount",
      ),
    );

    linkCreatorYoutubeAccountDS.createResolver(
      "linkCreatorYoutubeAccountResolver",
      {
        typeName: "Mutation",
        fieldName: "linkCreatorYoutubeAccount",
      },
    );

    const validateTiktokAccessDS = gqlApi.addLambdaDataSource(
      "validateTiktokAccessLambdaDataSource",
      Function.fromFunctionName(
        this,
        "validateTiktokAccessLogicalId",
        "validateTiktokAccess",
      ),
    );

    validateTiktokAccessDS.createResolver("validateTiktokAccessResolver", {
      typeName: "Mutation",
      fieldName: "validateTiktokAccess",
    });

    const linkUserTypeDS = gqlApi.addLambdaDataSource(
      "validateTiktokAccessLDS",
      Function.fromFunctionName(
        this,
        "validateTiktokAccessLID",
        "validateTiktokAccess",
      ),
    );

    linkUserTypeDS.createResolver("linkUserType", {
      typeName: "Mutation",
      fieldName: "linkUserType",
    });

    const createAdsLDS = gqlApi.addLambdaDataSource(
      "createAdsLDS",
      Function.fromFunctionName(this, "createAdsLID", "createAds"),
    );

    createAdsLDS.createResolver("createAdsResolver", {
      typeName: "Mutation",
      fieldName: "createAds",
    });

    const createMetaAdLDS = gqlApi.addLambdaDataSource(
      "createMetaAdLDS",
      Function.fromFunctionName(this, "createMetaAdLID", "createMetaAd"),
    );

    createMetaAdLDS.createResolver("createMetaAdResolver", {
      typeName: "Mutation",
      fieldName: "createMetaAd",
    });

    const createManualAdLDS = gqlApi.addLambdaDataSource(
      "createManualAdLDS",
      Function.fromFunctionName(this, "createManualAdLID", "createManualAd"),
    );

    createManualAdLDS.createResolver("createManualAdResolver", {
      typeName: "Mutation",
      fieldName: "createManualAd",
    });

    const listAdGroupsLDS = gqlApi.addLambdaDataSource(
      "listAdGroupsLDS",
      Function.fromFunctionName(this, "listAdGroupsLID", "listAdGroups"),
    );

    listAdGroupsLDS.createResolver("listAdGroupsResolver", {
      fieldName: "listAdGroups",
      typeName: "Mutation",
    });

    const listCampaignsLDS = gqlApi.addLambdaDataSource(
      "listCampaignsLDS",
      Function.fromFunctionName(this, "listCampaignsLID", "listCampaigns"),
    );

    listCampaignsLDS.createResolver("listCampaignsResolver", {
      typeName: "Mutation",
      fieldName: "listCampaigns",
    });

    const getFacebookCampaignLDS = gqlApi.addLambdaDataSource(
      "getFacebookCampaignLDS",
      Function.fromFunctionName(
        this,
        "getFacebookCampaignLID",
        "getFacebookCampaign",
      ),
    );

    getFacebookCampaignLDS.createResolver("getFacebookCampaignResolver", {
      typeName: "Mutation",
      fieldName: "getFacebookCampaign",
    });

    const getFacebookAdSetsLDS = gqlApi.addLambdaDataSource(
      "getFacebookAdSetsLDS",
      Function.fromFunctionName(
        this,
        "getFacebookAdSetsLID",
        "getFacebookAdSets",
      ),
    );

    getFacebookAdSetsLDS.createResolver("getFacebookAdSetsResolver", {
      typeName: "Mutation",
      fieldName: "getFacebookAdSets",
    });

    const getVideoFromAuthCodeLDS = gqlApi.addLambdaDataSource(
      "getVideoFromAuthCodeLDS",
      Function.fromFunctionName(
        this,
        "getVideoFromAuthCodeLID",
        "getVideoFromAuthCode",
      ),
    );

    getVideoFromAuthCodeLDS.createResolver("getVideoFromAuthCodeResolver", {
      typeName: "Mutation",
      fieldName: "getVideoFromAuthCode",
    });

    // Subscriptions:
  }
}
