import { Stack, StackProps } from "aws-cdk-lib";
import { GraphqlApi, MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { USER_PAYMENT_DETAILS_TABLE_NAME } from "./static/constants";
export class UserPaymentDetailsStack extends Stack {
  constructor(
    construct: Construct,
    id: string,
    gqlApi: GraphqlApi,
    props?: StackProps,
  ) {
    super(construct, id, props);

    try {
      const userPaymentDetailsDS = gqlApi.addDynamoDbDataSource(
        "userPaymentDetails",
        Table.fromTableName(
          this,
          "userPaymentDetailsTable",
          USER_PAYMENT_DETAILS_TABLE_NAME,
        ),
      );

      userPaymentDetailsDS.createResolver("getUserPaymentDetailsResolver", {
        typeName: "Query",
        fieldName: "getUserPaymentDetails",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getUserPaymentDetails.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getUserPaymentDetails.req.vtl",
        ),
      });

      userPaymentDetailsDS.createResolver("listUserPaymentDetailsResolver", {
        typeName: "Query",
        fieldName: "listUserPaymentDetails",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listUserPaymentDetails.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listUserPaymentDetails.req.vtl",
        ),
      });

      // Mutations:
      userPaymentDetailsDS.createResolver("createUserPaymentDetailsResolver", {
        typeName: "Mutation",
        fieldName: "createUserPaymentDetails",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createUserPaymentDetails.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createUserPaymentDetails.res.vtl",
        ),
      });

      userPaymentDetailsDS.createResolver("updateUserPaymentDetailsResolver", {
        typeName: "Mutation",
        fieldName: "updateUserPaymentDetails",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.updateUserPaymentDetails.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.updateUserPaymentDetails.res.vtl",
        ),
      });

      userPaymentDetailsDS.createResolver("deleteUserPaymentDetailsResolver", {
        typeName: "Mutation",
        fieldName: "deleteUserPaymentDetails",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteUserPaymentDetails.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteUserPaymentDetails.res.vtl",
        ),
      });
    } catch (err) {
      console.error(err);
    }
  }
}
