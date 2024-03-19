import { Stack, StackProps } from "aws-cdk-lib";
import { GraphqlApi, MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { CREATIVE_REQUESTS_TABLE_NAME } from "./static/constants";

export class CreativeRequestStack extends Stack {
  constructor(
    construct: Construct,
    id: string,
    gqlApi: GraphqlApi,
    props?: StackProps,
  ) {
    super(construct, id, props);

    const creativeRequestDS = gqlApi.addDynamoDbDataSource(
      "creativeRequests",
      Table.fromTableName(
        this,
        "creativeRequestsTable",
        CREATIVE_REQUESTS_TABLE_NAME,
      ),
    );

    try {
      creativeRequestDS.createResolver("getCreativeRequestResolver", {
        typeName: "Query",
        fieldName: "getCreativeRequest",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getCreativeRequest.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getCreativeRequest.res.vtl",
        ),
      });

      creativeRequestDS.createResolver("listCreativeRequestsResolver", {
        typeName: "Query",
        fieldName: "listCreativeRequests",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listCreativeRequests.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listCreativeRequests.res.vtl",
        ),
      });

      creativeRequestDS.createResolver(
        "creativeRequestsByBrandBriefIdResolver",
        {
          typeName: "Query",
          fieldName: "creativeRequestsByBrandBriefId",
          requestMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByBrandBriefId.req.vtl",
          ),
          responseMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByBrandBriefId.res.vtl",
          ),
        },
      );

      creativeRequestDS.createResolver("creativeRequestsByCreatorIdResolver", {
        typeName: "Query",
        fieldName: "creativeRequestsByCreatorId",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByCreatorId.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByCreatorId.res.vtl",
        ),
      });

      creativeRequestDS.createResolver("creativeRequestsByStatusResolver", {
        typeName: "Query",
        fieldName: "creativeRequestsByStatus",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByStatus.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByStatus.res.vtl",
        ),
      });

      creativeRequestDS.createResolver(
        "creativeRequestsByAdminApprovalResolver",
        {
          typeName: "Query",
          fieldName: "creativeRequestsByAdminApproval",
          requestMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByAdminApproval.req.vtl",
          ),
          responseMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByAdminApproval.res.vtl",
          ),
        },
      );

      creativeRequestDS.createResolver(
        "creativeRequestsByCreatorVisibilityResolver",
        {
          typeName: "Query",
          fieldName: "creativeRequestsByCreatorVisibility",
          requestMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByCreatorVisibility.req.vtl",
          ),
          responseMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByCreatorVisibility.res.vtl",
          ),
        },
      );

      creativeRequestDS.createResolver("creativeRequestsByDateResolver", {
        typeName: "Query",
        fieldName: "creativeRequestsByDate",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByDate.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.creativeRequestsByDate.res.vtl",
        ),
      });

      creativeRequestDS.createResolver("creativeRequestIdResolver", {
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
