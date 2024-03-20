import { Stack, StackProps } from "aws-cdk-lib";
import { GraphqlApi, MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Function } from "aws-cdk-lib/aws-lambda";
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
      const getCreativeRequestsLDS = gqlApi.addLambdaDataSource(
        "getCreativeRequestsLDS",
        Function.fromFunctionName(
          this,
          "getCreativeRequestsLID",
          "getCreativeRequests",
        ),
      );
      getCreativeRequestsLDS.createResolver("getCreativeRequestsResolver", {
        typeName: "Query",
        fieldName: "getCreativeRequests",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/InvokeGetCreativeRequestsLambdaDataSource.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/InvokeGetCreativeRequestsLambdaDataSource.res.vtl",
        ),
      });

      const getCreativeRequestsCountByBrandId = gqlApi.addLambdaDataSource(
        "getCreativeRequestsCountByBrandIdLDS",
        Function.fromFunctionName(
          this,
          "getCreativeRequestsCountByBrandIdLID",
          "getCreativeRequestsCountByBrandId",
        ),
      );

      getCreativeRequestsCountByBrandId.createResolver(
        "getCreativeRequestsCountByBrandIdResolver",
        {
          typeName: "Query",
          fieldName: "getCreativeRequestsCount",
          requestMappingTemplate: MappingTemplate.fromString(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/InvokeGetCreativeRequestsCountByBrandIdLambdaDataSource.req.vtl",
          ),
          responseMappingTemplate: MappingTemplate.fromString(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getCreativeRequestsCount.res.vtl",
          ),
        },
      );

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

      const getCreativeRequestCountBetweenDatesDS = gqlApi.addLambdaDataSource(
        "getCreativeRequestCountBetweenDatesLambdaDataSource",
        Function.fromFunctionName(
          this,
          "getCreativeRequestCountBetweenDatesLogicalId",
          "getDailyCreativeRequestsCount",
        ),
      );

      getCreativeRequestCountBetweenDatesDS.createResolver(
        "getCreativeRequestCountBetweenDatesResolver",
        {
          typeName: "Query",
          fieldName: "getCreativeRequestCountBetweenDates",
          requestMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/InvokeGetCreativeRequestsCountByBrandIdLambdaDataSource.req.vtl",
          ),
          responseMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getCreativeRequestCountBetweenDates.res.vtl",
          ),
        },
      );

      const creativeRequestsByCreatorDS = gqlApi.addLambdaDataSource(
        "creativeRequestsByCreatorLambdaDataSource",
        Function.fromFunctionName(
          this,
          "creativeRequestsByCreatorLogicalId",
          "creativeRequestsByCreator",
        ),
      );

      creativeRequestsByCreatorDS.createResolver(
        "creativeRequestsByCreatorResolver",
        {
          typeName: "Query",
          fieldName: "creativeRequestsByCreator",
        },
      );

      // Mutations:
      creativeRequestDS.createResolver("createCreativeRequestResolver", {
        typeName: "Mutation",
        fieldName: "createCreativeRequest",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createCreativeRequest.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createCreativeRequest.res.vtl",
        ),
      });

      creativeRequestDS.createResolver("updateCreativeRequestResolver", {
        typeName: "Mutation",
        fieldName: "updateCreativeRequest",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.updateCreativeRequest.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.updateCreativeRequest.res.vtl",
        ),
      });

      creativeRequestDS.createResolver("deleteCreativeRequestResolver", {
        typeName: "Mutation",
        fieldName: "deleteCreativeRequest",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteCreativeRequest.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteCreativeRequest.res.vtl",
        ),
      });

      // Subscriptions:
      creativeRequestDS.createResolver("onCreateCreativeRequestResolver", {
        typeName: "Subscription",
        fieldName: "onCreateCreativeRequest",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onCreateCreativeRequest.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onCreateCreativeRequest.res.vtl",
        ),
      });

      creativeRequestDS.createResolver("onUpdateCreativeRequestResolver", {
        typeName: "Subscription",
        fieldName: "onUpdateCreativeRequest",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onUpdateCreativeRequest.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onUpdateCreativeRequest.res.vtl",
        ),
      });

      creativeRequestDS.createResolver("onDeleteCreativeRequestResolver", {
        typeName: "Subscription",
        fieldName: "onDeleteCreativeRequest",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onDeleteCreativeRequest.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onDeleteCreativeRequest.res.vtl",
        ),
      });
    } catch (err) {
      console.error(err);
    }
  }
}
