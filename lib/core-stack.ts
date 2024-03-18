import * as cdk from "aws-cdk-lib";
import {
  AuthorizationType,
  FieldLogLevel,
  GraphqlApi,
  SchemaFile,
} from "aws-cdk-lib/aws-appsync";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Code, LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { Bucket, BucketEncryption } from "aws-cdk-lib/aws-s3";
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { config } from "dotenv";
import "dotenv/config";
import {
  APPROVED_ADS_TABLE_NAME,
  BEST_PRACTICES_TABLE_NAME,
  BRAND_BRIEFS_TABLE_NAME,
  CREATIVE_REQUESTS_EARNINGS_TABLE_NAME,
  CREATIVE_REQUESTS_TABLE_NAME,
  DEPLOYMENT_LOGIC_ID,
  GQL_API_NAME,
  HOSTING_BUCKET_NAME,
  USER_PAYMENT_DETAILS_TABLE_NAME,
  USER_PROFILES_TABLE_NAME,
  USER_TRANSACTIONS_TABLE_NAME,
  USER_WALLETS_TABLE_NAME,
} from "./static/constants";
import path = require("path");
import fs = require("node:fs");
config({ path: ".env" });

const ENVS = {
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

export class CoreStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, {
      ...props,
      env: { region: "us-east-1", account: "995966967167" },
    });

    const addCreativeEarning = new lambda.Function(this, "addCreativeEarning", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          `amplify-export-edcsquared/function/addCreativeEarning/amplify-builds/addCreativeEarning-30376b39774967445249-build.zip`,
        ),
      ),
      runtime: Runtime.NODEJS_LATEST,
      handler: "index.handler",
      functionName: "addCreativeEarning",
      environment: {
        CREATIVE_REQUEST_EARNINGS_TABLE_NAME: "",
        CREATIVE_REQUESTS_TABLE_NAME: "",
        ENV: ENVS.ENV,
        EXCHANGE_API_URL: "",
        REGION: ENVS.REGION,
        USER_PROFILE_TABLE_NAME: "",
        USER_WALLETS_BY_OWNER_INDEX: "",
        USER_WALLET_TABLE_NAME: "",
      },
    });

    const sendEmailPolicy = new PolicyStatement({
      actions: ["ses:*"],
      resources: ["*"],
    });

    // //FIXME: add lambda layer
    const addWatermark = new lambda.Function(this, "addWatermark", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          `amplify-export-edcsquared/function/addWatermark/amplify-builds/addWatermark-3678382f5241484d3541-build.zip`,
        ),
      ),
      runtime: Runtime.PYTHON_3_11,
      handler: "index.handler",
      functionName: "addWatermark",
      environment: {
        ENV: ENVS.ENV,
        REGION: ENVS.REGION,
      },
    });

    addWatermark.addLayers(
      LayerVersion.fromLayerVersionArn(this, "ffmpeg", ENVS.FFMPEG_LAYER_ARN),
    );
    //
    const adminQueries81bcd8e9 = new lambda.Function(
      this,
      "AdminQueries81bcd8e9",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            `amplify-export-edcsquared/function/AdminQueries81bcd8e9/amplify-builds/AdminQueries81bcd8e9-725778447a4f5770436e-build.zip`,
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "adminQueries81bcd8e9",
        environment: {
          // FIXME: Bucket name
          CREATIVES_BUCKET: "",
          CREATIVE_REQUESTS_BY_BRAND_BRIEF_ID_INDEX: "byBrandBrief",
          CREATIVE_REQUEST_EARNINGS_TABLE_NAME: "",
          CREATIVE_REQUEST_TALBE_NAME: "",
          BRAND_BRIEF_TABLE_NAME: "",
          BRAND_BRIEFS_TABLE_NAME: "",
          BRAND_BRIEFS_BY_BRAND_ID_INDEX: "",
          EXCHANGE_RATES_API_BASE_URL: "",
        },
      },
    );

    const createAd = new lambda.Function(this, "createAd", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "amplify-export-edcsquared/function/createAd/amplify-builds/createAd-357171396f4779625261-build.zip",
        ),
      ),
      runtime: Runtime.NODEJS_LATEST,
      handler: "index.handler",
      functionName: "createAd",
      environment: {},
    });

    const createManualAd = new lambda.Function(this, "createManualAd", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "amplify-export-edcsquared/function/createManualAd/amplify-builds/createManualAd-65706b64513158773257-build.zip",
        ),
      ),
      runtime: Runtime.NODEJS_LATEST,
      handler: "index.handler",
      functionName: "createManualAd",
      environment: {
        ENV: ENVS.ENV,
        REGION: ENVS.REGION,
        APPROVED_ADS_TABLE_NAME: "",
        BRAND_BRIEF_TABLE_NAME: "",
        BRAND_TABLE_NAME: "",
        CREATIVE_REQUESTS_TABLE_NAME: "",
        CREATIVE_REQUEST_EARNINGS_TABLE_NAME: "",
        SANDBOX_ADGROUP_ID: "",
        SANDBOX_ADVERTISER_ID: "",
        TIKTOK_API_ACCESS_TOKEN: "",
        TIKTOK_BUSINESS_V2_API:
          "https://business-api.tiktok.com/open_api/v1.2/",
      },
    });

    const createMetaAd = new lambda.Function(this, "createMetaAd", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "amplify-export-edcsquared/function/createManualAd/amplify-builds/createManualAd-65706b64513158773257-build.zip",
        ),
      ),
      runtime: Runtime.NODEJS_LATEST,
      handler: "index.handler",
      functionName: "createMetaAd",
      environment: {
        APPROVED_ADS_TABLE_NAME: "",
        BRAND_BRIEF_TABLE_NAME: "",
        BRAND_TABLE_NAME: "",
        CREATIVE_REQUESTS_TABLE_NAME: "",
        ENV: ENVS.ENV,
        REGION: ENVS.REGION,
        FACEBOOK_API_BASE_URL: "https://graph.facebook.com/v19.0/",
      },
    });

    const creativeRequestAuthorization = new lambda.Function(
      this,
      "creativeRequestAuthorization",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/createMetaAd/amplify-builds/createMetaAd-46476c7230465a516651-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "creativeRequestAuthorization",
        environment: {
          ENV: ENVS.ENV,
          REGION: ENVS.REGION,
          TKTOK_BUSNS_API_BASE_URL: ENVS.TIKTOK_BUSINESS_API_BASE_URL,
          USER_PROFILE_TABLE_NAME: "",
          CREATIVE_REQUEST_TABLE_NAME: "",
          CREATIVES_BUCKET: "",
          BRAND_PROFILE_TABLE_NAME: "",
          BRAND_BRIEF_TABLE_NAME: "",
        },
      },
    );

    const creativeRequestsByCreator = new lambda.Function(
      this,
      "creativeRequestsByCreator",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/creativeRequestAuthorization/amplify-builds/creativeRequestAuthorization-7858454e38796d657939-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "creativeRequestsByCreator",
        environment: {
          ENV: ENVS.ENV,
          REGION: ENVS.REGION,
          CREATIVE_REQUEST_TABLE_NAME: "",
        },
      },
    );

    const creativeRequestStatusEmail = new lambda.Function(
      this,
      "creativeRequestStatusEmail",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/creativeRequestsByCreator/amplify-builds/creativeRequestsByCreator-6d7932627361787a4644-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: `creativeRequestStatusEmail`,
        environment: {
          BCC_EMAIL: ENVS.BCC_EMAIL,
          ENV: ENVS.ENV,
          REGION: ENVS.REGION,
          INSTAGRAM_URL: ENVS.INSTAGRAM_URL,
          LOGIN_PAGE_URL: ENVS.LOGIN_PAGE_URL,
          MAILER_EMAIL: ENVS.MAILER_EMAIL,
          TIKTOK_URL: ENVS.TIKTOK_URL,
          USER_POOL_ID: ENVS.USER_POOL_ID,
          WEBSITE_URL: ENVS.WEBSITE_URL,
        },
      },
    );

    creativeRequestStatusEmail.addToRolePolicy(sendEmailPolicy);

    const creativeRequestUniqueId = new lambda.Function(
      this,
      "creativeRequestUniqueId",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/creativeRequestUniqueId/amplify-builds/creativeRequestUniqueId-61737574376365392b32-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "creativeRequestUniqueId",
        environment: {
          BRAND_BRIEFS_BY_BRAND_ID_INDEX: "byBrand",
          BRAND_BRIEF_TABLE_NAME: "",
          CREATIVE_REQUEST_TABLE_NAME: "",
          ENV: ENVS.ENV,
          REGION: ENVS.REGION,
        },
      },
    );

    //TODO: Attach to cognito
    const edcsquared66ad360ePreSignup = new lambda.Function(
      this,
      "edcsquared66ad360ePreSignup",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/edcsquared66ad360ePreSignup/amplify-builds/edcsquared66ad360ePreSignup-4b2b3863743254516b53-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "edcsquared66ad360ePreSignup",
        environment: {
          BCC_EMAIL: ENVS.BCC_EMAIL,
          ENV: ENVS.ENV,
          REGION: ENVS.REGION,
          INSTAGRAM_URL: ENVS.INSTAGRAM_URL,
          LOGIN_PAGE_URL: ENVS.LOGIN_PAGE_URL,
          MAILER_EMAIL: ENVS.MAILER_EMAIL,
          TIKTOK_URL: ENVS.TIKTOK_URL,
          USER_POOL_ID: ENVS.USER_POOL_ID,
          WEBSITE_URL: ENVS.WEBSITE_URL,
          NOTIFICATION_EMAIL: ENVS.NOTIFICATION_EMAIL,
          MODULES: "custom",
        },
      },
    );

    edcsquared66ad360ePreSignup.addToRolePolicy(sendEmailPolicy);

    const getApprovedAdsCountWithinRange = new lambda.Function(
      this,
      "getApprovedAdsCountWithinRange",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/getApprovedAdsCountWithinRange/amplify-builds/getApprovedAdsCountWithinRange-746f374f583350534974-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "getApprovedAdsCountWithinRange",
        environment: {
          APPROVED_ADS_TABLE_NAME: "",
          BRAND_USER_TABLE_NAME: "",
          BUCKET_NAME: "",
          ENV: ENVS.ENV,
          REGION: ENVS.REGION,
        },
      },
    );

    const getBrandAvatar = new lambda.Function(this, "getBrandAvatar", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "amplify-export-edcsquared/function/getBrandAvatar/amplify-builds/getBrandAvatar-4f36492f58633246464b-build.zip",
        ),
      ),
      runtime: Runtime.NODEJS_LATEST,
      handler: "index.handler",
      functionName: "getBrandAvatar",
      environment: {
        USER_PROFILE_TABLE_NAME: "",
        BUCKET_NAME: "",
        BRAND_USER_TABLE_NAME: "",
        ENV: ENVS.ENV,
        REGION: ENVS.REGION,
      },
    });

    const getBrandBriefs = new lambda.Function(this, "getBrandBriefs", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "amplify-export-edcsquared/function/getBrandBriefs/amplify-builds/getBrandBriefs-586e7133426b507a7053-build.zip",
        ),
      ),
      runtime: Runtime.NODEJS_LATEST,
      handler: "index.handler",
      functionName: "getBrandBriefs",
      environment: {
        BRAND_BRIEF_TABLE_NAME: "",
      },
    });

    const getCampaignSpent = new lambda.Function(this, "getCampaignSpent", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "amplify-export-edcsquared/function/getCampaignSpent/amplify-builds/getCampaignSpent-793359682f306a4d5278-build.zip",
        ),
      ),
      runtime: Runtime.NODEJS_LATEST,
      handler: "index.handler",
      functionName: "getCampaignSpent",
      environment: {
        APPROVED_ADS_TABLE_NAME: "",
        EXCHANGE_API_URL: "",
        TIKTOK_BUSNS_API_BASE_URL: ENVS.TIKTOK_BUSINESS_API_BASE_URL,
        USER_PROFILE_TABLE_NAME: "",
      },
    });

    const getCreativeEarnings = new lambda.Function(
      this,
      "getCreativeEarnings",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/getCreativeEarnings/amplify-builds/getCreativeEarnings-55445470734e73755954-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "getCreativeEarnings",
        environment: {
          CREATIVE_REQUEST_EARNINGS_TABLE_NAME: "",
          CREATIVE_REQUEST_EARNING_TABLE_NAME: "",
          USER_PROFILE_TABLE_NAME: "",
          USER_WALLET_TABLE_NAME: "",
        },
      },
    );

    const getCreativeEarningsByCreative = new lambda.Function(
      this,
      "getCreativeEarningsByCreative",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,

            "amplify-export-edcsquared/function/getCreativeEarningsByCreative/amplify-builds/getCreativeEarningsByCreative-385133362f462f646c75-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "getCreativeEarningsByCreative",
        environment: {
          CREATIVE_REQUESTS_EARNINGS_TABLE_NAME: "",
          CREATIVE_EARNINGS_BY_CREATIVE_REQUEST_ID:
            "creativeRequestEarningsByCreativeRequestId",
        },
      },
    );

    const getCreativeRequests = new lambda.Function(
      this,
      "getCreativeRequests",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/getCreativeRequests/amplify-builds/getCreativeRequests-6d4a6f3667656a6d6f45-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "getCreativeRequests",
        environment: {
          CREATIVE_REQUEST_TABLE_NAME: "",
          BRAND_BRIEF_TABLE_NAME: "",
          BRAND_BREIFS_BY_BRAND_ID_INDEX: "",
        },
      },
    );

    const getCreativeRequestsCountByBrandId = new lambda.Function(
      this,
      "getCreativeRequestsCountByBrandId",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,

            "amplify-export-edcsquared/function/getCreativeRequestsCountByBrandId/amplify-builds/getCreativeRequestsCountByBrandId-5032326476556c506d30-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "getCreativeRequestsCountByBrandId",
      },
    );

    const getCreatorBrandBriefs = new lambda.Function(
      this,
      "getCreatorBrandBriefs",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/getCreatorBrandBriefs/amplify-builds/getCreatorBrandBriefs-6a394a7478486b645871-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "getCreatorBrandBriefs",
      },
    );

    const getDailyCreativeRequestCount = new lambda.Function(
      this,
      "getDailyCreativeRequestCount",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/getDailyCreativeRequestsCount/amplify-builds/getDailyCreativeRequestsCount-71335165345971645065-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "getDailyCreativeRequestCount",
      },
    );

    const getFacebookAdSets = new lambda.Function(this, "getFacebookAdSets", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "amplify-export-edcsquared/function/getFacebookAdSets/amplify-builds/getFacebookAdSets-4338753748444466616c-build.zip",
        ),
      ),
      runtime: Runtime.NODEJS_LATEST,
      handler: "index.handler",
      functionName: "getFacebookAdSets",
    });

    const getFacebookCampaign = new lambda.Function(
      this,
      "getFacebookCampaign",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,

            "amplify-export-edcsquared/function/getFacebookCampaign/amplify-builds/getFacebookCampaign-533341754f7866453433-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "getFacebookCampaign",
      },
    );

    const getVideoFromAuthCode = new lambda.Function(
      this,
      "getVideoFromAuthCode",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/getVideoFromAuthCode/amplify-builds/getVideoFromAuthCode-63446c6c667930793661-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "getVideoFromAuthCode",
      },
    );

    const GPTLambda = new lambda.Function(this, "GPTLambda", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "amplify-export-edcsquared/function/GPTLambda/amplify-builds/GPTLambda-584f4e4b565534443565-build.zip",
        ),
      ),
      runtime: Runtime.PYTHON_3_11,
      handler: "index.handler",
      functionName: "GPTLambda",
    });

    const linkCreatorInstagramAccount = new lambda.Function(
      this,
      "linkCreatorInstagramAccount",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/linkCreatorInstagramAccount/amplify-builds/linkCreatorInstagramAccount-6745684f5263304a4a32-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "linkCreatorInstagramAccount",
      },
    );

    const linkCreatorTiktokAccount = new lambda.Function(
      this,
      "linkCreatorTiktokAccount",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/linkCreatorTikTokAccount/amplify-builds/linkCreatorTikTokAccount-5a565334564b53476267-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "linkCreatorTiktokAccount",
      },
    );

    const linkCreatorYoutubeAccount = new lambda.Function(
      this,
      "linkCreatorYoutubeAccount",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/linkCreatorYoutubeAccount/amplify-builds/linkCreatorYoutubeAccount-66424b5a7a7a596c4175-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "linkCreatorYoutubeAccount",
      },
    );

    const linkTiktokAccount = new lambda.Function(this, "linkTiktokAccount", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "amplify-export-edcsquared/function/linkFacebookAccount/amplify-builds/linkFacebookAccount-463172546d5a62706c64-build.zip",
        ),
      ),
      runtime: Runtime.NODEJS_LATEST,
      handler: "index.handler",
      functionName: "linkTiktokAccount",
    });

    const linkYoutubeAccount = new lambda.Function(this, "linkYoutubeAccount", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "amplify-export-edcsquared/function/linkYoutubeAccount/amplify-builds/linkYoutubeAccount-57783549754476703272-build.zip",
        ),
      ),
      runtime: Runtime.NODEJS_LATEST,
      handler: "index.handler",
      functionName: "linkYoutubeAccount",
    });

    const listAdGroups = new lambda.Function(this, "listAdGroups", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "amplify-export-edcsquared/function/listAdGroups/amplify-builds/listAdGroups-4a7174754f326a4b5270-build.zip",
        ),
      ),
      runtime: Runtime.NODEJS_LATEST,
      handler: "index.handler",
      functionName: "listAdGroups",
    });

    const listCampaigns = new lambda.Function(this, "listCampaigns", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "amplify-export-edcsquared/function/listCompaigns/amplify-builds/listCompaigns-587957677734524b4f48-build.zip",
        ),
      ),
      runtime: Runtime.NODEJS_LATEST,
      handler: "index.handler",
      functionName: "listCampaigns",
    });

    const paymentDetailsEmail = new lambda.Function(
      this,
      "paymentDetailsEmail",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/paymentDetailsEmail/amplify-builds/paymentDetailsEmail-654f4a3162495879526c-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "paymentDetailsEmail",
      },
    );

    paymentDetailsEmail.addToRolePolicy(sendEmailPolicy);

    const sendContentSubmissionEmail = new lambda.Function(
      this,
      "sendContentSubmissionEmail",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/sendContentSubmissionEmail/amplify-builds/sendContentSubmissionEmail-4f5743433534476b586d-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "sendContentSubmissionEmail",
      },
    );
    sendContentSubmissionEmail.addToRolePolicy(sendEmailPolicy);

    const updateUserType = new lambda.Function(this, "updateUserType", {
      code: Code.fromAsset(
        path.join(
          __dirname,

          "amplify-export-edcsquared/function/updateUserType/amplify-builds/updateUserType-674b43683751446c4a79-build.zip",
        ),
      ),
      runtime: Runtime.NODEJS_LATEST,
      handler: "index.handler",
      functionName: "updateUserType",
    });

    const userWalletCronInvocationSchedule = new Rule(
      this,
      "UserWalletCronSchedule",
      {
        schedule: Schedule.expression("cron(0 0 * * ? *)"),
      },
    );

    const userWallet = new lambda.Function(this, "UserWalletCron", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "amplify-export-edcsquared/function/userWallet/amplify-builds/userWallet-4a575152615833393949-build.zip",
        ),
      ),
      runtime: Runtime.NODEJS_LATEST,
      handler: "index.handler",
      functionName: "userWallet",
    });

    userWalletCronInvocationSchedule.addTarget(new LambdaFunction(userWallet));

    const validatePreviewUrl = new lambda.Function(this, "videoPreviewUrl", {
      code: Code.fromAsset(
        path.join(
          __dirname,
          "amplify-export-edcsquared/function/videoPreviewUrl/amplify-builds/videoPreviewUrl-48554b6f56517249714e-build.zip",
        ),
      ),
      runtime: Runtime.NODEJS_LATEST,
      handler: "index.handler",
      functionName: "validatePreviewUrl",
    });

    const validateTiktokAccess = new lambda.Function(
      this,
      "validateTiktokAccess",
      {
        code: Code.fromAsset(
          path.join(
            __dirname,
            "amplify-export-edcsquared/function/validateTiktokAccess/amplify-builds/validateTiktokAccess-4d6f44506e567161754b-build.zip",
          ),
        ),
        runtime: Runtime.NODEJS_LATEST,
        handler: "index.handler",
        functionName: "validateTiktokAccess",
      },
    );

    const userPool = UserPool.fromUserPoolArn(
      this,
      "existing-user-pool",
      "arn:aws:cognito-idp:us-east-1:995966967167:userpool/us-east-1_auCDskee6",
    );

    const staticStorage = Bucket.fromBucketName(
      this,
      "static-storage",
      "user-storage91541-master",
    );

    const userPoolClient = new UserPoolClient(this, "UserPoolClient", {
      userPool,
    });

    const gqlApi = new GraphqlApi(this, "edcsquared", {
      name: GQL_API_NAME,
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
          userPoolConfig: {
            userPool,
          },
        },
      },
      xrayEnabled: true,
      schema: SchemaFile.fromAsset(
        path.join(
          __dirname,
          "amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/schema.graphql",
        ),
      ),
      logConfig: {
        fieldLogLevel: FieldLogLevel.ALL,
      },
    });

    gqlApi.addDynamoDbDataSource(
      "approvedAds",
      Table.fromTableName(this, "approvedAdsTable", APPROVED_ADS_TABLE_NAME),
    );
    gqlApi.addDynamoDbDataSource(
      "bestPractices",
      Table.fromTableName(
        this,
        "bestPracticesTable",
        BEST_PRACTICES_TABLE_NAME,
      ),
    );
    gqlApi.addDynamoDbDataSource(
      "brandBriefsTable",
      Table.fromTableName(this, "brandBriefsTable", BRAND_BRIEFS_TABLE_NAME),
    );
    gqlApi.addDynamoDbDataSource(
      "brandProfilesTableName",
      Table.fromTableName(
        this,
        "brandProfilesTableName",
        BRAND_BRIEFS_TABLE_NAME,
      ),
    );
    gqlApi.addDynamoDbDataSource(
      "creativeRequestEarnings",
      Table.fromTableName(
        this,
        "creativeRequestEarnings",
        CREATIVE_REQUESTS_EARNINGS_TABLE_NAME,
      ),
    );
    gqlApi.addDynamoDbDataSource(
      "creativeRequests",
      Table.fromTableName(
        this,
        "creativeRequestsTable",
        CREATIVE_REQUESTS_TABLE_NAME,
      ),
    );

    gqlApi.addDynamoDbDataSource(
      "userTransactions",
      Table.fromTableName(
        this,
        "userTransactionsTable",
        USER_TRANSACTIONS_TABLE_NAME,
      ),
    );

    gqlApi.addDynamoDbDataSource(
      "userWalletsTable",
      Table.fromTableName(this, "userWalletsTable", USER_WALLETS_TABLE_NAME),
    );

    gqlApi.addDynamoDbDataSource(
      "userProfile",
      Table.fromTableName(this, "userProfileTable", USER_PROFILES_TABLE_NAME),
    );
    gqlApi.addDynamoDbDataSource(
      "userPaymentDetails",
      Table.fromTableName(
        this,
        "userPaymentDetailsTable",
        USER_PAYMENT_DETAILS_TABLE_NAME,
      ),
    );

    const hostingBucket = new Bucket(this, "hostingBucket", {
      bucketName: HOSTING_BUCKET_NAME,
      websiteIndexDocument: "index.html",
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      encryption: BucketEncryption.S3_MANAGED,
      publicReadAccess: false,
    });

    new s3Deploy.BucketDeployment(this, DEPLOYMENT_LOGIC_ID, {
      sources: [s3Deploy.Source.asset(path.resolve(__dirname, "../", "build"))],
      destinationBucket: hostingBucket,
      retainOnDelete: false,
      prune: true,
      memoryLimit: 1024,
    });

    new cdk.CfnOutput(this, "AppUrl", {
      value: hostingBucket.bucketWebsiteUrl,
    });

    // const cname = new CnameRecord(this, "test.baseZone", {
    //   zone: hostedZone,
    //   recordName: "test",
    //   domainName: hostingBucket.bucketWebsiteDomainName,
    // });

    // const aliasRecord = new ARecord(this, "AliasRecord", {
    //   zone: hostedZone,
    //   region: "us-east-1",
    //   recordName: process.env.SUBDOMAIN || TEST_APP_SUBDOMAIN,

    //   target: RecordTarget.fromAlias(new BucketWebsiteTarget(hostingBucket)),
    // });
  }
}
