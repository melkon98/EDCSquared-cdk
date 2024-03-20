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

    // Subscriptions:
  }
}
