import { Stack, StackProps } from "aws-cdk-lib";
import { GraphqlApi, MappingTemplate } from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { USER_PROFILES_TABLE_NAME } from "./static/constants";
export class UserProfileStack extends Stack {
  constructor(
    construct: Construct,
    id: string,
    gqlApi: GraphqlApi,
    props?: StackProps,
  ) {
    super(construct, id, props);

    try {
      const userProfileDS = gqlApi.addDynamoDbDataSource(
        "userProfile",
        Table.fromTableName(this, "userProfileTable", USER_PROFILES_TABLE_NAME),
      );

      userProfileDS.createResolver("getUserProfileResolver", {
        typeName: "Query",
        fieldName: "getUserProfile",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getUserProfile.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getUserProfile.res.vtl",
        ),
      });

      userProfileDS.createResolver("userProfilesByUserTypeResolver", {
        typeName: "Query",
        fieldName: "userProfilesByUserType",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.userProfilesByUserType.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.userProfilesByUserType.res.vtl",
        ),
      });
    } catch (err) {
      console.error(err);
    }
  }
}
