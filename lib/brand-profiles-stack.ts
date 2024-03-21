import { Stack, StackProps } from "aws-cdk-lib";
import { GraphqlApi, MappingTemplate, Resolver } from "aws-cdk-lib/aws-appsync";
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

      // Mutations:
      const emptyDS = gqlApi.addNoneDataSource("createBrandProfileEmptyDS");

      const createBrandProfileUserProfileInitFunction = emptyDS.createFunction(
        "createBrandProfileUserProfileInitFunction",
        {
          name: "createBrandProfileUserProfileInitFunction",
          requestMappingTemplate:
            MappingTemplate.fromString(`## [Start] Initialization default values. **
          $util.qr($ctx.stash.put("defaultValues", $util.defaultIfNull($ctx.stash.defaultValues, {})))
          #set( $createdAt = $util.time.nowISO8601() )
          $util.qr($ctx.stash.defaultValues.put("id", $util.autoId()))
          $util.qr($ctx.stash.defaultValues.put("createdAt", $createdAt))
          $util.qr($ctx.stash.defaultValues.put("updatedAt", $createdAt))
          $util.toJson({
            "version": "2018-05-29",
            "payload": {}
          })
          ## [End] Initialization default values. **`),
          responseMappingTemplate:
            MappingTemplate.fromString("$util.toJson({})"),
        },
      );

      const createBrandProfileApprovedAdsAuth0Function = emptyDS.createFunction(
        "createBrandProfileApprovedAdsAuth0Function",
        {
          name: "createBrandProfileApprovedAdsAuth0Function",
          requestMappingTemplate: MappingTemplate.fromFile(
            `## [Start] Authorization Steps. **
            $util.qr($ctx.stash.put("hasAuth", true))
            #set( $inputFields = $util.parseJson($util.toJson($ctx.args.input.keySet())) )
            #set( $isAuthorized = false )
            #set( $allowedFields = [] )
            #if( $util.authType() == "API Key Authorization" )
            $util.unauthorized()
            #end
            #if( $util.authType() == "User Pool Authorization" )
              #set( $isAuthorized = true )
            #end
            #if( !$isAuthorized && $allowedFields.isEmpty() )
            $util.unauthorized()
            #end
            #if( !$isAuthorized )
              #set( $deniedFields = $util.list.copyAndRemoveAll($inputFields, $allowedFields) )
              #if( $deniedFields.size() > 0 )
                $util.error("Unauthorized on \${deniedFields}", "Unauthorized")
              #end
            #end
            $util.toJson({"version":"2018-05-29","payload":{}})
            ## [End] Authorization Steps. **`,
          ),
          responseMappingTemplate:
            MappingTemplate.fromString("$util.toJson({})"),
        },
      );

      const userProfilePostAuthFn = emptyDS.createFunction(
        "userProfilePostAuthFn",
        {
          name: "userProfilePostAuthFn",
          requestMappingTemplate:
            MappingTemplate.fromString(`#if( !$ctx.stash.get("hasAuth") )
          $util.unauthorized()
        #end
        $util.toJson({})
        ## [End] Sandbox Mode Disabled. **`),
          responseMappingTemplate:
            MappingTemplate.fromString("$util.toJson({})"),
        },
      );

      const createBrandProfileDataResolverFunction = emptyDS.createFunction(
        "createBrandProfileDataResolverFunction",
        {
          name: "createBrandProfileDataResolverFunction",
          requestMappingTemplate:
            MappingTemplate.fromString(`## [Start] Create Request template. **
            #set( $args = $util.defaultIfNull($ctx.stash.transformedArgs, $ctx.args) )
            ## Set the default values to put request **
            #set( $mergedValues = $util.defaultIfNull($ctx.stash.defaultValues, {}) )
            ## copy the values from input **
            $util.qr($mergedValues.putAll($util.defaultIfNull($args.input, {})))
            ## set the typename **
            $util.qr($mergedValues.put("__typename", "BrandProfile"))
            #set( $nullIndexFields = [] )
            #set( $indexFields = ["userEmail"] )
            #foreach( $entry in $util.map.copyAndRetainAllKeys($mergedValues, $indexFields).entrySet() )
              #if( $util.isNull($entry.value) )
                $util.qr($nullIndexFields.add($entry.key))
              #end
            #end
            #set( $mergedValues = $util.map.copyAndRemoveAllKeys($mergedValues, $nullIndexFields) )
            #set( $PutObject = {
              "version": "2018-05-29",
              "operation": "PutItem",
              "attributeValues":   $util.dynamodb.toMapValues($mergedValues),
              "condition": $condition
            } )
            #if( $args.condition )
              $util.qr($ctx.stash.conditions.add($args.condition))
            #end
            ## Begin - key condition **
            #if( $ctx.stash.metadata.modelObjectKey )
              #set( $keyConditionExpr = {} )
              #set( $keyConditionExprNames = {} )
              #foreach( $entry in $ctx.stash.metadata.modelObjectKey.entrySet() )
                $util.qr($keyConditionExpr.put("keyCondition$velocityCount", {
              "attributeExists": false
            }))
                $util.qr($keyConditionExprNames.put("#keyCondition$velocityCount", "$entry.key"))
              #end
              $util.qr($ctx.stash.conditions.add($keyConditionExpr))
            #else
              $util.qr($ctx.stash.conditions.add({
              "id": {
                  "attributeExists": false
              }
            }))
            #end
            ## End - key condition **
            ## Start condition block **
            #if( $ctx.stash.conditions && $ctx.stash.conditions.size() != 0 )
              #set( $mergedConditions = {
              "and": $ctx.stash.conditions
            } )
              #set( $Conditions = $util.parseJson($util.transform.toDynamoDBConditionExpression($mergedConditions)) )
              #if( $Conditions.expressionValues && $Conditions.expressionValues.size() == 0 )
                #set( $Conditions = {
              "expression": $Conditions.expression,
              "expressionNames": $Conditions.expressionNames
            } )
              #end
              ## End condition block **
            #end
            #if( $Conditions )
              #if( $keyConditionExprNames )
                $util.qr($Conditions.expressionNames.putAll($keyConditionExprNames))
              #end
              $util.qr($PutObject.put("condition", $Conditions))
            #end
            #if( $ctx.stash.metadata.modelObjectKey )
              $util.qr($PutObject.put("key", $ctx.stash.metadata.modelObjectKey))
            #else
              #set( $Key = {
              "id":   $util.dynamodb.toDynamoDB($mergedValues.id)
            } )
              $util.qr($PutObject.put("key", $Key))
            #end
            $util.toJson($PutObject)
            ## [End] Create Request template. **`),
          responseMappingTemplate:
            MappingTemplate.fromString(`## [Start] ResponseTemplate. **
          $util.qr($ctx.result.put("__operation", "Mutation"))
          #if( $ctx.error )
            $util.error($ctx.error.message, $ctx.error.type)
          #else
            $util.toJson($ctx.result)
          #end
          ## [End] ResponseTemplate. **`),
        },
      );

      const afterMappingFunction = emptyDS.createFunction(
        "afterMappingFunction",
        {
          name: "afterMappingFunction",
          responseMappingTemplate: MappingTemplate.fromString(
            "$util.toJson($ctx.prev.result)",
          ),
        },
      );

      brandProfilesDS.createResolver("createBrandProfileResolver", {
        typeName: "Mutation",
        fieldName: "createBrandProfile",
        pipelineConfig: [
          createBrandProfileUserProfileInitFunction,
          createBrandProfileApprovedAdsAuth0Function,
          createBrandProfileDataResolverFunction,
          afterMappingFunction,
        ],
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
