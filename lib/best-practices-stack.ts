import { Stack, StackProps } from "aws-cdk-lib";
import { MappingTemplate, Resolver } from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { GraphqlApiStack } from "./gql-api-stack";
import { BEST_PRACTICES_TABLE_NAME } from "./static/constants";

export class BestPracticesStack extends Stack {
  constructor(construct: Construct, id: string, props: StackProps) {
    super(construct, id, props);

    const gqlApi = new GraphqlApiStack(this, id).gqlApi;
    const bestPracticesDS = gqlApi.addDynamoDbDataSource(
      "bestPractices",
      Table.fromTableName(
        this,
        "bestPracticesTable",
        BEST_PRACTICES_TABLE_NAME,
      ),
    );

    try {
      bestPracticesDS.createResolver("listBestPracticesResolver", {
        typeName: "Query",
        fieldName: "listBestPractices",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listBestPractices.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listBestPractices.res.vtl",
        ),
      });

      new Resolver(this, "getBestPracticesResolver", {
        api: gqlApi,
        dataSource: bestPracticesDS,
        typeName: "Query",
        fieldName: "getBestPractices",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getBestPractices.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getBestPractices.res.vtl",
        ),
      });

      new Resolver(this, "bestPracticesByActiveResolver", {
        api: gqlApi,
        dataSource: bestPracticesDS,
        typeName: "Query",
        fieldName: "getBestPractices",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getBestPractices.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getBestPractices.res.vtl",
        ),
      });
    } catch (err) {}
  }
}
