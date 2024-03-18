import { Stack, StackProps } from "aws-cdk-lib";
import { MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { GraphqlApiStack } from "./gql-api-stack";
import { USER_TRANSACTIONS_TABLE_NAME } from "./static/constants";
export class UserTransactionsStack extends Stack {
  constructor(construct: Construct, id: string, props?: StackProps) {
    super(construct, id, props);

    const gqlApi = new GraphqlApiStack(this, "gqlApi").gqlApi;
    const userTransactionsDS = gqlApi.addDynamoDbDataSource(
      "userTransactions",
      Table.fromTableName(
        this,
        "userTransactionsTable",
        USER_TRANSACTIONS_TABLE_NAME,
      ),
    );

    try {
      userTransactionsDS.createResolver("getUserTransactionsResolver", {
        fieldName: "getUserTransactions",
        typeName: "Query",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getUserTransactions.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getUserTransactions.res.vtl",
        ),
      });

      userTransactionsDS.createResolver("listUserTransactionsResolver", {
        fieldName: "listUserTransactions",
        typeName: "Query",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listUserTransactions.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listUserTransactions.res.vtl",
        ),
      });
    } catch (err) {
      console.error(err);
    }
  }
}
