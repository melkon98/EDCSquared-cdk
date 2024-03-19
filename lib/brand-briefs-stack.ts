import { Stack, StackProps } from "aws-cdk-lib";
import { GraphqlApi, MappingTemplate, Resolver } from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { BRAND_BRIEFS_TABLE_NAME } from "./static/constants";

export class BrandBriefsStack extends Stack {
  constructor(
    construct: Construct,
    id: string,
    gqlApi: GraphqlApi,
    props?: StackProps,
  ) {
    super(construct, id, props);

    const brandBriefsDS = gqlApi.addDynamoDbDataSource(
      "brandBriefsTable",
      Table.fromTableName(this, "brandBriefsTable", BRAND_BRIEFS_TABLE_NAME),
    );

    try {
      new Resolver(this, "getBrandBriefResolver", {
        api: gqlApi,
        dataSource: brandBriefsDS,
        typeName: "Query",
        fieldName: "getBrandBrief",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getBrandBrief.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.getBrandBrief.res.vtl",
        ),
      });

      new Resolver(this, "listBrandBriefsResolver", {
        api: gqlApi,
        dataSource: brandBriefsDS,
        typeName: "Query",
        fieldName: "listBrandBriefs",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listBrandBriefs.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.listBrandBriefs.res.vtl",
        ),
      });

      new Resolver(this, "brandBriefsByVerticalResolver", {
        api: gqlApi,
        dataSource: brandBriefsDS,
        typeName: "Query",
        fieldName: "brandBriefsByVertical",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.brandBriefsByVertical.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.brandBriefsByVertical.res.vtl",
        ),
      });

      new Resolver(this, "brandBriefsByTiktokAdvertiserIdResolver", {
        api: gqlApi,
        dataSource: brandBriefsDS,
        typeName: "Query",
        fieldName: "brandBriefsByTiktokAdvertiserId",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.brandBriefsByTiktokAdvertiserId.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.brandBriefsByTiktokAdvertiserId.res.vtl",
        ),
      });

      new Resolver(this, "brandBriefsByBrandResolver", {
        api: gqlApi,
        dataSource: brandBriefsDS,
        typeName: "Query",
        fieldName: "byBrand",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.byBrand.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.byBrand.res.vtl",
        ),
      });

      new Resolver(this, "brandBriefByDateResolver", {
        api: gqlApi,
        dataSource: brandBriefsDS,
        typeName: "Query",
        fieldName: "brandBriefByDate",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.brandBriefByDate.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Query.brandBriefByDate.res.vtl",
        ),
      });

      // Mutations:
      brandBriefsDS.createResolver("createBrandBriefResolver", {
        typeName: "Mutation",
        fieldName: "createBrandBrief",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createBrandBrief.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.createBrandBrief.res.vtl",
        ),
      });

      brandBriefsDS.createResolver("updateBrandBriefResolver", {
        typeName: "Mutation",
        fieldName: "updateBrandBrief",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.updateBrandBrief.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.updateBrandBrief.res.vtl",
        ),
      });

      brandBriefsDS.createResolver("deleteBrandBriefResolver", {
        typeName: "Mutation",
        fieldName: "deleteBrandBrief",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteBrandBrief.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Mutation.deleteBrandBrief.res.vtl",
        ),
      });
    } catch (err) {
      console.error(err);
    }
  }
}
