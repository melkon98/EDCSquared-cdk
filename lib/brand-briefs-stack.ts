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
      const getCreatorBrandBriefsLDS = gqlApi.addLambdaDataSource(
        "getCreatorBrandBriefsLDS",
        Function.fromFunctionName(
          this,
          "getCreatorBrandBriefsLID",
          "getCreatorBrandBriefs",
        ),
      );

      // FIXME:
      const getBrandBriefsLambdaDataSource = gqlApi.addLambdaDataSource(
        "GetBrandBriefsLambdaDataSource",
        Function.fromFunctionName(this, "getBrandBriefs", "getBrandBriefs"),
      );
      getBrandBriefsLambdaDataSource.createResolver("GetBrandBriefsResolver", {
        typeName: "Query",
        fieldName: "getBrandBriefs",
        requestMappingTemplate: MappingTemplate.lambdaRequest(),
        responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
      });

      getCreatorBrandBriefsLDS.createResolver("getCreatorBrandBriefsResolver", {
        typeName: "Query",
        fieldName: "getCreatorBrandBriefs",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/InvokeGetCreatorBrandBriefsLambdaDataSource.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/InvokeGetCreatorBrandBriefsLambdaDataSource.res.vtl",
        ),
      });

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

      brandBriefsDS.createResolver("brandBriefByDateResolver", {
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
      const fields = [
        "id",
        "BriefName",
        "vertical",
        "objective",
        "brandBriefDetails",
        "brandBriefFilesUrl",
        "creativeInspirations",
        "active",
        "tiktokAdvertiserId",
        "brandId",
        "adText",
        "country",
        "type",
        "createdAt",
        "updatedAt",
        "tikTokData",
        "metaData",
        "youtubeData",
        "manualData",
        "creativeRequestsCount",
      ];
      brandBriefsDS.createResolver("CreateBrandBriefResolver", {
        typeName: "Mutation",
        fieldName: "createBrandBrief",
        requestMappingTemplate: MappingTemplate.dynamoDbPutItem(
          PrimaryKey.partition("id").auto(),
          new AttributeValues("$ctx.args", [
            ...fields.map((f) => new Assign(f, `$ctx.args.input.${f}`)),
            new Assign("createdAt", "$util.time.nowISO8601()"),
            new Assign("updatedAt", "$util.time.nowISO8601()"),
          ]),
        ),
        responseMappingTemplate: MappingTemplate.dynamoDbResultItem(),
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

      // Subscriptions:
      brandBriefsDS.createResolver("onCreateBrandBriefResolver", {
        typeName: "Subscription",
        fieldName: "onCreateBrandBrief",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onCreateBrandBrief.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onCreateBrandBrief.res.vtl",
        ),
      });

      brandBriefsDS.createResolver("onUpdateBrandBriefResolver", {
        typeName: "Subscription",
        fieldName: "onUpdateBrandBrief",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onUpdateBrandBrief.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onUpdateBrandBrief.res.vtl",
        ),
      });

      brandBriefsDS.createResolver("onDeleteBrandBriefResolver", {
        typeName: "Subscription",
        fieldName: "onDeleteBrandBrief",
        requestMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onDeleteBrandBrief.req.vtl",
        ),
        responseMappingTemplate: MappingTemplate.fromFile(
          "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/resolvers/Subscription.onDeleteBrandBrief.res.vtl",
        ),
      });
    } catch (err) {
      console.error(err);
    }
  }
}
