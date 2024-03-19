import { Stack, StackProps } from "aws-cdk-lib";
import { GraphqlApi, MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { USER_WALLETS_TABLE_NAME } from "./static/constants";

export class UserWalletsStack extends Stack {
  constructor(
    construct: Construct,
    id: string,
    gqlApi: GraphqlApi,
    props?: StackProps,
  ) {
    super(construct, id, props);
    const userWalletsDS = gqlApi.addDynamoDbDataSource(
      "userWalletsTable",
      Table.fromTableName(this, "userWalletsTable", USER_WALLETS_TABLE_NAME),
    );

    try {
      userWalletsDS.createResolver("getUserWalletResolver", {
        fieldName: "getUserWallet",
        typeName: "Query",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getUserWallet.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getUserWallet.res.vtl",
        ),
      });

      userWalletsDS.createResolver("listUserWalletsResolver", {
        fieldName: "listUserWallets",
        typeName: "Query",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listUserWallets.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listUserWallets.res.vtl",
        ),
      });

      userWalletsDS.createResolver("userWalletsByOwnerResolver", {
        fieldName: "userWalletsByOwner",
        typeName: "Query",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.userWalletsByOwner.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.userWalletsByOwner.res.vtl",
        ),
      });

      // Mutations:
      userWalletsDS.createResolver("createUserWalletResolver", {
        typeName: "Mutation",
        fieldName: "createUserWallet",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createUserWallet.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createUserWallet.res.vtl",
        ),
      });

      userWalletsDS.createResolver("deleteUserWalletResolver", {
        typeName: "Mutation",
        fieldName: "deleteUserWallet",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteUserWallet.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteUserWallet.res.vtl",
        ),
      });
    } catch (err) {
      console.error(err);
    }
  }
}
