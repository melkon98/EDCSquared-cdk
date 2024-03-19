import { Stack, StackProps } from "aws-cdk-lib";
import { GraphqlApi, MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { USER_TRANSACTIONS_TABLE_NAME } from "./static/constants";
export class UserTransactionsStack extends Stack {
  constructor(
    construct: Construct,
    id: string,
    gqlApi: GraphqlApi,
    props?: StackProps,
  ) {
    super(construct, id, props);
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

      // Mutations:
      userTransactionsDS.createResolver("createUserTransactionsResolver", {
        typeName: "Mutation",
        fieldName: "createUserTransactions",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createUserTransactions.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createUserTransactions.res.vtl",
        ),
      });

      userTransactionsDS.createResolver("updateUserTransactionsResolver", {
        typeName: "Mutation",
        fieldName: "updateUserTransactions",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.updateUserTransactions.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.updateUserTransactions.res.vtl",
        ),
      });

      userTransactionsDS.createResolver("deleteUserTransactionsResolver", {
        typeName: "Mutation",
        fieldName: "deleteUserTransactions",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteUserTransactions.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteUserTransactions.res.vtl",
        ),
      });

      // Subscription
      userTransactionsDS.createResolver("onCreateUserTransactionsResolver", {
        typeName: "Subscription",
        fieldName: "onCreateUserTransactions",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onCreateUserTransactions.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onCreateUserTransactions.res.vtl",
        ),
      });

      userTransactionsDS.createResolver("onUpdateUserTransactionsResolver", {
        typeName: "Subscription",
        fieldName: "onUpdateUserTransactions",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onUpdateUserTransactions.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onUpdateUserTransactions.res.vtl",
        ),
      });

      userTransactionsDS.createResolver("onDeleteUserTransactionsResolver", {
        typeName: "Subscription",
        fieldName: "onDeleteUserTransactions",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onDeleteUserTransactions.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onDeleteUserTransactions.res.vtl",
        ),
      });
    } catch (err) {
      console.error(err);
    }
  }
}
