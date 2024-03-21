import { formatServiceName } from "../utils/misc-utils";

export const APPROVED_ADS_TABLE_NAME = formatServiceName("approved-ads");
export const APPROVED_ADS_BY_ADGROUP_ID_INDEX_NAME = "approvedAdsByAd_group_id";
export const APPROVED_ADS_BY_AD_ID_INDEX_NAME = "approvedAdsByAd_id";
export const APPROVED_ADS_BY_ADVERTISER_ID_INDEX_NAME =
  "approvedAdsByAdvertiser_id";
export const APPROVED_ADS_BY_CAMPAING_ID_INDEX_NAME =
  "approvedAdsByCampaing_id";
export const APPROVED_ADS_BY_ID_INDEX_NAME = "approvedAdsById";
export const APPROVED_ADS_BY_STATUS_INDEX_NAME = "approvedAdsByStatus";
export const APPROVED_ADS_BY_USER_PROFILE_ID = "approvedAdsByUser_profile_id";
export const APPROVED_ADS_BY_CREATIVE_REQUEST_ID = "byCreativeRequestId";

export const BEST_PRACTICES_TABLE_NAME = formatServiceName("best-practices");
export const BEST_PRACTICES_BY_STATUS_INDEX_NAME = "byStatus";
export const BEST_PRACTICES_TABLE_BY_USER_PROFILE_BEST_PRACTICE_ID =
  "gsi-UserProfile.bestPractices";

export const BRAND_BRIEFS_TABLE_NAME = formatServiceName("brand-briefs");
export const BRAND_BRIEFS_BY_DATE_INDEX_NAME = "brandBriefByDate";
export const BRAND_BRIEFS_BY_COUNTRY_AND_CREATION_DATE_INDEX_NAME =
  "brandBriefsByCountryAndCreationDate";
export const BRAND_BRIEFS_BY_ADVERTISER_ID_INDEX_NAME = "byAdvertiserId";
export const BRAND_BRIEFS_BY_BRAND_ID_INDEX_NAME = "byBrand";
export const BRAND_BRIEFS_BY_VERTICAL_INDEX_NAME = "byVertical";
export const BRAND_PROFILE_TABLE_NAME = formatServiceName("brand-profile");
export const BRAND_PROFILES_BY_USER_EMAIL_INDEX_NAME =
  "brandProfilesByUserEmail";
export const BRAND_PROFILES_BY_BRAND_PROFILE_USER_ID = "gsi-UserProfile.brand";

export const CREATIVE_REQUESTS_EARNINGS_TABLE_NAME = formatServiceName(
  "creative-request-earnings",
);
export const CREATIVE_REQUESTS_EARNINGS_BY_CREATIVE_REQUEST_ID =
  "creativeRequestEarningsByCreativeRequestId";

export const CREATIVE_REQUESTS_TABLE_NAME =
  formatServiceName("creative-requests");
export const CREATIVE_REQUESTS_BY_ADMIN_APPROVAL_INDEX_NAME = "byAdminApproval";
export const CREATIVE_REQUESTS_BY_BRAND_BRIEF_INDEX_NAME = "byBrandBrief";
export const CREATIVE_REQUESTS_BY_CREATOR_VISIBILITY_INDEX_NAME =
  "byCreatorVisibility";
export const CREATIVE_REQUESTS_BY_STATUS_INDEX_NAME = "byStatus";
export const CREATIVE_REQUESTS_BY_CREATOR_ID_AND_UDPATED_AT_INDEX_NAME =
  "creativeRequestsByCreatorId";
export const CREATIVE_REQUESTS_BY_DATE = "creativeRequestsByDate";

export const USER_PAYMENT_DETAILS_TABLE_NAME = formatServiceName(
  "user-payment-details",
);

export const USER_PROFILES_TABLE_NAME = formatServiceName("user-profiles");
export const USER_PROFILES_BY_USER_TYPE_INDEX_NAME = "byUserType";

export const USER_TRANSACTIONS_TABLE_NAME =
  formatServiceName("user-transactions");
export const USER_TRANSACTIONS_BY_USER_TRANSACTION_ID_INDEX_NAME =
  "userPaymentDetailsUserTransactionsId";

export const USER_WALLETS_TABLE_NAME = formatServiceName("user-wallets");
export const USER_WALLETS_BY_OWNER_INDEX_NAME = "byOwner";

export const HOSTING_BUCKET_NAME = formatServiceName("website-hosting-bucket");
export const DEPLOYMENT_LOGIC_ID = "DeployApp";

export const APP_DOMAIN = "edcsquared.io";
export const TEST_APP_SUBDOMAIN = "test";

export const GQL_API_NAME = "edcsquared-gql-api";

export const ENVS = {
  ENV: "master",
  REGION: "us-east-1",
  FFMPEG_LAYER_ARN: "arn:aws:lambda:us-east-1:995966967167:layer:ffmpeg:1",
  TIKTOK_BUSINESS_API_BASE_URL:
    "https://business-api.tiktok.com/open_api/v1.3/",
  BUILD_PREFIX: "amplify-export-edcsquared/function/",
  SCHEMA_PREFIX: "amplify-export-edcsquared/api/",
  BCC_EMAIL: "creatoralerts@edcsquared.io",
  INSTAGRAM_URL: "https://www.instagram.com/edcsq/",
  LINKEDIN_URL: "https://www.linkedin.com/company/edcsquared/",
  LOGIN_PAGE_URL: "https://app.edcsquared.io/login",
  MAILER_EMAIL: "creatoralerts@edcsquared.io",
  TIKTOK_URL: "https://www.tiktok.com/@edcsquared",
  USER_POOL_ID: "us-east-1_auCDskee6",
  WEBSITE_URL: "https://www.edcsquared.io/",
  NOTIFICATION_EMAIL: "creatoralerts@edcsquared.io",
};

export const ONE_GIGABYTE_IN_MEGA_BYTES = 1024;

export const STATIC_STORAGE_BUCKET = "user-storage91541-master";
export const EXCHANGE_API_BASE_URL =
  "https://api.apilayer.com/exchangerates_data/latest";

export const APP_REDIRECT_URI = "https://app.edcsquared.io/account";
export const TKTOK_APP_ID = "7204707364971481094";
export const TKTOK_BUSNS_API_BASE_URL =
  "https://business-api.tiktok.com/open_api/v1.3/";
export const TKTOK_SECRET = "f00309a914025be7d09ce298ed49de44c0da1100";

export const USER_POOL_ID = "us-east-1_auCDskee6";

export const BCC_EMAIL = "creatoralerts@edcsquared.io";
export const INSTAGRAM_URL = "https://www.instagram.com/edcsq/";
export const LINKEDIN_URL = "https://www.linkedin.com/company/edcsquared/";
export const LOGIN_PAGE_URL = "https://app.edcsquared.io/login";
export const MAILER_EMAIL = "creatoralerts@edcsquared.io";
export const TIKTOK_URL = "https://www.tiktok.com/@edcsquared";
export const WEBSITE_URL = "https://www.edcsquared.io/";

export const FIFTEEN_MINUTES_IN_SECONDS = 900;

export const CREATE_BRAND_BRIEF_MUTATION_RESOLVER_FN_REQUEST_MAPPING_TEMPLATE = `## [Start] Create Request template. **
#set( $args = $util.defaultIfNull($ctx.stash.transformedArgs, $ctx.args) )
## Set the default values to put request **
#set( $mergedValues = $util.defaultIfNull($ctx.stash.defaultValues, {}) )
## copy the values from input **
$util.qr($mergedValues.putAll($util.defaultIfNull($args.input, {})))
## set the typename **
$util.qr($mergedValues.put("__typename", "BrandBrief"))
#set( $nullIndexFields = [] )
#set( $indexFields = ["vertical", "tiktokAdvertiserId", "brandId", "type"] )
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
## [End] Create Request template. **`;

export const CREATE_BRAND_BRIEF_MUTATION_RESOLVER_FN_RESPONSE_MAPPING_TEMPLATE = `## [Start] ResponseTemplate. **
$util.qr($ctx.result.put("__operation", "Mutation"))
#if( $ctx.error )
  $util.error($ctx.error.message, $ctx.error.type)
#else
  $util.toJson($ctx.result)
#end
## [End] ResponseTemplate. **`;

export const CREATE_BRAND_BRIEF_MUTATION_BEFORE_MAPPING_TEMPLATE = `$util.qr($ctx.stash.put("typeName", "Mutation"))
$util.qr($ctx.stash.put("fieldName", "createBrandBrief"))
$util.qr($ctx.stash.put("conditions", []))
$util.qr($ctx.stash.put("metadata", {}))
$util.qr($ctx.stash.metadata.put("dataSourceType", "AMAZON_DYNAMODB"))
$util.qr($ctx.stash.metadata.put("apiId", "x4tpzbduz5c5ro2mzuyfv2navq"))
$util.qr($ctx.stash.put("connectionAttributes", {}))
$util.qr($ctx.stash.put("tableName", "BrandBrief-x4tpzbduz5c5ro2mzuyfv2navq-master"))
$util.qr($ctx.stash.put("identityPoolId", "us-east-1:98a7c71c-e468-410d-96fd-d85e8e31df7e"))
$util.qr($ctx.stash.put("adminRoles", ["us-east-1_LIgAsaOV1_Full-access/CognitoIdentityCredentials","us-east-1_LIgAsaOV1_Manage-only/CognitoIdentityCredentials","addCreativeEarning-master","getCreativeEarningByCreative-master","getApprovedAdsCountWithinRange-master"]))
$util.toJson({})`;

export const CREATE_BRAND_BRIEF_MUTATION_AFTER_MAPPING_TEMPLATE =
  "$util.toJson($ctx.prev.result)";

export const CREATE_BRAND_BRIEF_INIT_RESOLVER_REQUEST_MAPPING_TEMPLATE = `## [Start] Initialization default values. **
$util.qr($ctx.stash.put("defaultValues", $util.defaultIfNull($ctx.stash.defaultValues, {})))
#set( $createdAt = $util.time.nowISO8601() )
$util.qr($ctx.stash.defaultValues.put("id", $util.autoId()))
$util.qr($ctx.stash.defaultValues.put("createdAt", $createdAt))
$util.qr($ctx.stash.defaultValues.put("updatedAt", $createdAt))
$util.toJson({
  "version": "2018-05-29",
  "payload": {}
})
## [End] Initialization default values. **`;

export const CREATE_BRAND_BRIEF_INIT_RESOLVER_RESPONSE_MAPPING_TEMPLATE =
  "$util.toJson({})";

export const CREATE_BRAND_BRIEF_APPROVED_ADS_AUTH_0_FUNCTION_MAPPING_TEMPLATE = `## [Start] Authorization Steps. **
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
  ## [End] Authorization Steps. **`;

export const CREATE_BRAND_BRIEF_PROFILE_POST_AUTH_0_FUNCTION_REQUEST_MAPPING_TEMPLATE = `## [Start] Initialization default values. **
  $util.qr($ctx.stash.put("defaultValues", $util.defaultIfNull($ctx.stash.defaultValues, {})))
  #set( $createdAt = $util.time.nowISO8601() )
  $util.qr($ctx.stash.defaultValues.put("id", $util.autoId()))
  $util.qr($ctx.stash.defaultValues.put("createdAt", $createdAt))
  $util.qr($ctx.stash.defaultValues.put("updatedAt", $createdAt))
  $util.toJson({
    "version": "2018-05-29",
    "payload": {}
  })
  ## [End] Initialization default values. **`;

export const PARSE_JSON_VTL_TEMPLATE = "$util.toJson({})";
