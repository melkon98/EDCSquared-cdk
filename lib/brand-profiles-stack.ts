import { Stack, StackProps } from "aws-cdk-lib";
import {
  Assign,
  AttributeValues,
  GraphqlApi,
  MappingTemplate,
  PrimaryKey,
  Resolver,
} from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Function } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { BRAND_PROFILE_TABLE_NAME } from "./static/constants";

export class BrandProfilesStack extends Stack {
  constructor(
    construct: Construct,
    id: string,
    gqlApi: GraphqlApi,
    props?: StackProps,
  ) {
    super(construct, id, props);
    const brandProfilesDS = gqlApi.addDynamoDbDataSource(
      "brandProfiles",
      Table.fromTableName(this, "brandProfilesTable", BRAND_PROFILE_TABLE_NAME),
    );

    try {
      brandProfilesDS.createResolver("getBrandProfileResolver", {
        typeName: "Query",
        fieldName: "getBrandProfile",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getBrandProfile.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getBrandProfile.res.vtl",
        ),
      });

      new Resolver(this, "listBrandProfilesResolver", {
        api: gqlApi,
        dataSource: brandProfilesDS,
        typeName: "Query",
        fieldName: "listBrandProfiles",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listBrandProfiles.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listBrandProfiles.res.vtl",
        ),
      });

      new Resolver(this, "brandProfilesByUserEmailResolver", {
        api: gqlApi,
        dataSource: brandProfilesDS,
        typeName: "Query",
        fieldName: "brandProfilesByUserEmail",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.brandProfilesByUserEmail.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.brandProfilesByUserEmail.res.vtl",
        ),
      });

      const getBrandProfileByUserIdLambdaDataSource =
        gqlApi.addLambdaDataSource(
          "getBrandProfileByUserIdLambdaDataSource",
          Function.fromFunctionName(
            this,
            "getBrandProfileByUserId",
            "getBrandProfileByUserId",
          ),
        );

      getBrandProfileByUserIdLambdaDataSource.createResolver(
        "GetBrandProfileByUserId",
        {
          typeName: "Query",
          fieldName: "getBrandProfileByUserId",
          requestMappingTemplate: MappingTemplate.lambdaRequest(),
          responseMappingTemplate: MappingTemplate.lambdaResult(),
        },
      );

      // Mutations:
      const emptyDS = gqlApi.addNoneDataSource("createBrandProfileEmptyDS");
      const data = [
        "id",
        "name",
        "toneVoice",
        "pillars",
        "description",
        "internalMission",
        "strapLine",
        "userEmail",
        "tiktokHandle",
        "vertical",
        "metaData",
        "hashtags",
        "personalDescription",
        "userProfileBrandId",
      ];

      brandProfilesDS.createResolver("createBrandProfileResolver", {
        typeName: "Mutation",
        fieldName: "createBrandProfile",
        requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
          PrimaryKey.partition("id").auto(),
          new AttributeValues("$ctx.args", [
            new Assign("createdAt", "$util.time.nowISO8601()"),
            new Assign("updatedAt", "$util.time.nowISO8601()"),
            ...data.map((i) => new Assign(i, `$ctx.args.input.${i}`)),
          ]),
        ),
        responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
      });

      brandProfilesDS.createResolver("updateBrandProfileResolver", {
        typeName: "Mutation",
        fieldName: "updateBrandProfile",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.updateBrandProfile.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.updateBrandProfile.res.vtl",
        ),
      });

      brandProfilesDS.createResolver("deleteBrandProfileResolver", {
        typeName: "Mutation",
        fieldName: "deleteBrandProfile",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteBrandProfile.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteBrandProfile.res.vtl",
        ),
      });

      const getBrandAvatarDS = gqlApi.addLambdaDataSource(
        "getBrandAvatarLambdaDataSource",
        Function.fromFunctionName(
          this,
          "getBrandAvatarLogicalId",
          "getBrandAvatar",
        ),
      );

      getBrandAvatarDS.createResolver("getBrandAvatarResolver", {
        typeName: "Query",
        fieldName: "getBrandAvatar",
      });

      // Subscriptions:
      brandProfilesDS.createResolver("onCreateBrandProfileResolver", {
        typeName: "Subscription",
        fieldName: "onCreateBrandProfile",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onCreateBrandProfile.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onCreateBrandProfile.res.vtl",
        ),
      });

      brandProfilesDS.createResolver("onUpdateBrandProfileResolver", {
        typeName: "Subscription",
        fieldName: "onUpdateBrandProfile",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onUpdateBrandProfile.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onUpdateBrandProfile.res.vtl",
        ),
      });

      brandProfilesDS.createResolver("onDeleteBrandProfileResolver", {
        typeName: "Subscription",
        fieldName: "onDeleteBrandProfile",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onDeleteBrandProfile.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onDeleteBrandProfile.res.vtl",
        ),
      });
    } catch (err) {
      console.error(err);
    }
  }
}
