import { Stack, StackProps } from "aws-cdk-lib";
import { MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { GraphqlApiStack } from "./gql-api-stack";
import { APPROVED_ADS_TABLE_NAME } from "./static/constants";
import path = require("path");

export class ApprovedAdsStack extends Stack {
  constructor(construct: Construct, id: string, props: StackProps) {
    super(construct, id, props);

    const gqlApi = new GraphqlApiStack(this, "gqlApi").gqlApi;
    const approvedAdsDS = gqlApi.addDynamoDbDataSource(
      "approvedAds",
      Table.fromTableName(this, "approvedAdsTable", APPROVED_ADS_TABLE_NAME),
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
    } catch (err) {
      console.error(err);
    }
  }
}
