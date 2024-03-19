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
    } catch (err) {
      console.error(err);
    }
  }
}
