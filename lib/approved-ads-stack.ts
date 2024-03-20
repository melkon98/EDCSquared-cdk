import { Stack, StackProps } from "aws-cdk-lib";
import { GraphqlApi, MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Function } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { APPROVED_ADS_TABLE_NAME } from "./static/constants";
import path = require("path");

export class ApprovedAdsStack extends Stack {
  constructor(
    construct: Construct,
    id: string,
    gqlApi: GraphqlApi,
    props?: StackProps,
  ) {
    super(construct, id, props);

    const approvedAdsTable = Table.fromTableName(
      this,
      "approvedAdsTable",
      APPROVED_ADS_TABLE_NAME,
    );

    const approvedAdsDS = gqlApi.addDynamoDbDataSource(
      "approvedAds",
      approvedAdsTable,
    );

    try {
      approvedAdsDS.createResolver("listApprovedAdsResolver", {
        typeName: "Query",
        fieldName: "listApprovedAds",
        requestMappingTemplate: MappingTemplate.fromFile(
          path.resolve(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listApprovedAds.req.vtl",
          ),
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          path.resolve(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listApprovedAds.res.vtl",
          ),
        ),
      });

      approvedAdsDS.createResolver("approvedAdsByIdResolver", {
        typeName: "Query",
        fieldName: "approvedAdsById",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.approvedAdsById.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.approvedAdsById.res.vtl",
        ),
      });

      const getApprovedAdsCountWithinRangeDS = gqlApi.addLambdaDataSource(
        "getApprovedAdsCountWithinRangeLambdaDataSource",
        Function.fromFunctionName(
          this,
          "getApprovedAdsCountWithinRangeLogicalId",
          "getApprovedAdsCountWithinRange",
        ),
      );

      getApprovedAdsCountWithinRangeDS.createResolver(
        "getApprovedAdsCountWithinRangeResolver",
        {
          typeName: "Query",
          fieldName: "getApprovedAdsCountWithinRange",
        },
      );

      approvedAdsDS.createResolver("getApprovedAdsCountWithinRangeResolver", {
        typeName: "Query",
        fieldName: "getApprovedAdsCountWithinRange",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/InvokeGetApprovedAdsCountWithinRangeLambdaDataSource.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/InvokeGetApprovedAdsCountWithinRangeLambdaDataSource.res.vtl",
        ),
      });

      approvedAdsDS.createResolver("getApprovedAdsResolver", {
        typeName: "Query",
        fieldName: "getApprovedAds",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getApprovedAds.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getApprovedAds.res.vtl",
        ),
      });
      approvedAdsDS.createResolver("approvedAdsByAd_idResolver", {
        typeName: "Query",
        fieldName: "approvedAdsByAd_id",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.approvedAdsByAd_id.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.approvedAdsByAd_id.res.vtl",
        ),
      });
      approvedAdsDS.createResolver("approvedAdsByAd_group_idResolver", {
        typeName: "Query",
        fieldName: "approvedAdsByAd_group_id",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.approvedAdsByAd_group_id.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.approvedAdsByAd_group_id.res.vtl",
        ),
      });
      approvedAdsDS.createResolver("approvedAdsByCampaing_idResolver", {
        typeName: "Query",
        fieldName: "approvedAdsByCampaing_id",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.approvedAdsByCampaing_id.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.approvedAdsByCampaing_id.res.vtl",
        ),
      });

      approvedAdsDS.createResolver("approvedAdsByAdvertiser_idResolver", {
        typeName: "Query",
        fieldName: "approvedAdsByAdvertiser_id",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.approvedAdsByAdvertiser_id.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.approvedAdsByAdvertiser_id.res.vtl",
        ),
      });

      approvedAdsDS.createResolver("approvedAdsByUser_profile_idResolver", {
        typeName: "Query",
        fieldName: "approvedAdsByUser_profile_id",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.approvedAdsByUser_profile_id.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.approvedAdsByUser_profile_id.res.vtl",
        ),
      });

      approvedAdsDS.createResolver("approvedAdsByStatusResolver", {
        typeName: "Query",
        fieldName: "approvedAdsByStatus",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.approvedAdsByStatus.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.approvedAdsByStatus.res.vtl",
        ),
      });

      // MUTATIONS:
      approvedAdsDS.createResolver("createApprovedAdsResolver", {
        typeName: "Mutation",
        fieldName: "createApprovedAds",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createApprovedAds.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createApprovedAds.res.vtl",
        ),
      });

      approvedAdsDS.createResolver("updateApprovedAdsResolver", {
        typeName: "Mutation",
        fieldName: "updateApprovedAds",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.updateApprovedAds.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.updateApprovedAds.res.vtl",
        ),
      });

      approvedAdsDS.createResolver("deleteApprovedAdsResolver", {
        typeName: "Mutation",
        fieldName: "deleteApprovedAds",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteApprovedAds.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteApprovedAds.res.vtl",
        ),
      });

      // Subscriptions:
      approvedAdsDS.createResolver("onCreateApprovedAdsResolver", {
        typeName: "Subscription",
        fieldName: "onCreateApprovedAds",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onCreateApprovedAds.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onCreateApprovedAds.res.vtl",
        ),
      });

      approvedAdsDS.createResolver("onUpdateApprovedAdsResolver", {
        typeName: "Subscription",
        fieldName: "onUpdateApprovedAds",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onUpdateApprovedAds.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onUpdateApprovedAds.res.vtl",
        ),
      });

      approvedAdsDS.createResolver("onDeleteApprovedAdsResolver", {
        typeName: "Subscription",
        fieldName: "onDeleteApprovedAds",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onDeleteApprovedAds.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onDeleteApprovedAds.res.vtl",
        ),
      });
    } catch (err) {
      console.error(err);
    }
  }
}
