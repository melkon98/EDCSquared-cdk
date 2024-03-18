import { Stack, StackProps } from "aws-cdk-lib";
import { MappingTemplate, Resolver } from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { GraphqlApiStack } from "./gql-api-stack";
import { CREATIVE_REQUESTS_TABLE_NAME } from "./static/constants";

export class CreativeRequestStack extends Stack {
  constructor(construct: Construct, id: string, props: StackProps) {
    super(construct, id, props);

    const gqlApi = new GraphqlApiStack(this, "gqlApi").gqlApi;
    const creativeRequestDS = gqlApi.addDynamoDbDataSource(
      "creativeRequests",
      Table.fromTableName(
        this,
        "creativeRequestsTable",
        CREATIVE_REQUESTS_TABLE_NAME,
      ),
    );

    try {
      new Resolver(this, "getCreativeRequestResolver", {
        api: gqlApi,
        dataSource: creativeRequestDS,
        typeName: "Query",
        fieldName: "creativeRequestDS",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getCreativeRequest.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getCreativeRequest.res.vtl",
        ),
      });

      new Resolver(this, "listCreativeRequestsResolver", {
        api: gqlApi,
        dataSource: creativeRequestDS,
        typeName: "Query",
        fieldName: "listCreativeRequests",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listCreativeRequests.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listCreativeRequests.res.vtl",
        ),
      });

      new Resolver(this, "creativeRequestsByBrandBriefIdResolver", {
        api: gqlApi,
        dataSource: creativeRequestDS,
        typeName: "Query",
        fieldName: "creativeRequestsByBrandBriefId",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByBrandBriefId.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByBrandBriefId.res.vtl",
        ),
      });

      new Resolver(this, "creativeRequestsByCreatorIdResolver", {
        api: gqlApi,
        dataSource: creativeRequestDS,
        typeName: "Query",
        fieldName: "creativeRequestsByCreatorId",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByCreatorId.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByCreatorId.res.vtl",
        ),
      });

      new Resolver(this, "creativeRequestsByStatusResolver", {
        api: gqlApi,
        dataSource: creativeRequestDS,
        typeName: "Query",
        fieldName: "creativeRequestsByStatus",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByStatus.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByStatus.res.vtl",
        ),
      });

      new Resolver(this, "creativeRequestsByAdminApprovalResolver", {
        api: gqlApi,
        dataSource: creativeRequestDS,
        typeName: "Query",
        fieldName: "creativeRequestsByAdminApproval",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByAdminApproval.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByAdminApproval.res.vtl",
        ),
      });

      new Resolver(this, "creativeRequestsByCreatorVisibilityResolver", {
        api: gqlApi,
        dataSource: creativeRequestDS,
        typeName: "Query",
        fieldName: "creativeRequestsByCreatorVisibility",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByCreatorVisibility.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByCreatorVisibility.res.vtl",
        ),
      });

      new Resolver(this, "creativeRequestsByDateResolver", {
        api: gqlApi,
        dataSource: creativeRequestDS,
        typeName: "Query",
        fieldName: "creativeRequestsByDate",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByDate.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByDate.res.vtl",
        ),
      });

      new Resolver(this, "creativeRequestIdResolver", {
        api: gqlApi,
        dataSource: creativeRequestDS,
        typeName: "Query",
        fieldName: "creativeRequestId",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestId.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestId.res.vtl",
        ),
      });
    } catch (err) {
      console.error(err);
    }
  }
}
