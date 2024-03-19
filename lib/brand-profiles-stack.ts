import { Stack, StackProps } from "aws-cdk-lib";
import { GraphqlApi, MappingTemplate, Resolver } from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
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

      // Mutations:
      brandProfilesDS.createResolver("createBrandProfileResolver", {
        typeName: "Mutation",
        fieldName: "createBrandProfile",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createBrandProfile.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createBrandProfile.res.vtl",
        ),
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
    } catch (err) {}
  }
}
