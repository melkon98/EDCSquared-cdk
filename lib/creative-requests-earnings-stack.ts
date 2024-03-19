import { Stack, StackProps } from "aws-cdk-lib";
import { GraphqlApi, MappingTemplate, Resolver } from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { CREATIVE_REQUESTS_EARNINGS_TABLE_NAME } from "./static/constants";

export class CreativeRequestEarningsStack extends Stack {
  constructor(
    construct: Construct,
    id: string,
    gqlApi: GraphqlApi,
    props?: StackProps,
  ) {
    super(construct, id, props);

    const creativeEarningsDS = gqlApi.addDynamoDbDataSource(
      "creativeRequestEarnings",
      Table.fromTableName(
        this,
        "creativeRequestEarnings",
        CREATIVE_REQUESTS_EARNINGS_TABLE_NAME,
      ),
    );

    try {
      new Resolver(this, "getCreativeRequestEarningsResolver", {
        api: gqlApi,
        dataSource: creativeEarningsDS,
        typeName: "Query",
        fieldName: "getCreativeRequestEarnings",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getCreativeRequestEarnings.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getCreativeRequestEarnings.res.vtl",
        ),
      });

      new Resolver(this, "listCreativeRequestEarningsResolver", {
        api: gqlApi,
        dataSource: creativeEarningsDS,
        typeName: "Query",
        fieldName: "listCreativeRequestEarnings",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listCreativeRequestEarnings.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listCreativeRequestEarnings.res.vtl",
        ),
      });

      // Mutations:

      // FIXME: Find request mapping template
      // creativeEarningsDS.createResolver("addCreativeEarningResolver", {
      //   typeName: "Mutation",
      //   fieldName: "addCreativeEarning",
      //   requestMappingTemplate: MappingTemplate.fromFile(
      //     "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.addCreativeEarning.req.vtl",
      //   ),
      //   responseMappingTemplate: MappingTemplate.fromFile(
      //     "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.addCreativeEarning.res.vtl",
      //   ),
      // });

      creativeEarningsDS.createResolver(
        "createCreativeRequestEarningsResolver",
        {
          typeName: "Mutation",
          fieldName: "createCreativeRequestEarnings",
          requestMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createCreativeRequestEarnings.req.vtl",
          ),
          responseMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createCreativeRequestEarnings.res.vtl",
          ),
        },
      );

      creativeEarningsDS.createResolver(
        "updateCreativeRequestEarningsResolver",
        {
          typeName: "Mutation",
          fieldName: "updateCreativeRequestEarnings",
          requestMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.updateCreativeRequestEarnings.req.vtl",
          ),
          responseMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.updateCreativeRequestEarnings.res.vtl",
          ),
        },
      );

      creativeEarningsDS.createResolver(
        "deleteCreativeRequestEarningsResolver",
        {
          typeName: "Mutation",
          fieldName: "deleteCreativeRequestEarnings",
          requestMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteCreativeRequestEarnings.req.vtl",
          ),
          responseMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteCreativeRequestEarnings.res.vtl",
          ),
        },
      );

      // Subscriptions:
      creativeEarningsDS.createResolver(
        "onCreateCreativeRequestEarningsResolver",
        {
          typeName: "Subscription",
          fieldName: "onCreateCreativeRequestEarnings",
          requestMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onCreateCreativeRequestEarnings.req.vtl",
          ),
          responseMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onCreateCreativeRequestEarnings.res.vtl",
          ),
        },
      );

      creativeEarningsDS.createResolver(
        "onUpdateCreativeRequestEarningsResolver",
        {
          typeName: "Subscription",
          fieldName: "onUpdateCreativeRequestEarnings",
          requestMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onUpdateCreativeRequestEarnings.req.vtl",
          ),
          responseMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onUpdateCreativeRequestEarnings.res.vtl",
          ),
        },
      );

      creativeEarningsDS.createResolver(
        "onDeleteCreativeRequestEarningsResolver",
        {
          typeName: "Subscription",
          fieldName: "onDeleteCreativeRequestEarnings",
          requestMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onDeleteCreativeRequestEarnings.req.vtl",
          ),
          responseMappingTemplate: MappingTemplate.fromFile(
            "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onDeleteCreativeRequestEarnings.res.vtl",
          ),
        },
      );
    } catch (err) {
      console.error(err);
    }
  }
}
