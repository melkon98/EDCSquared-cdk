import { Stack, StackProps } from "aws-cdk-lib";
import {
  AuthorizationType,
  Definition,
  FieldLogLevel,
  GraphqlApi,
} from "aws-cdk-lib/aws-appsync";
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
import { ApprovedAdsStack } from "./approved-ads-stack";
import { BestPracticesStack } from "./best-practices-stack";
import { BrandBriefsStack } from "./brand-briefs-stack";
import { BrandProfilesStack } from "./brand-profiles-stack";
import { CognitoStack } from "./cognito-stack";
import { CreativeRequestEarningsStack } from "./creative-requests-earnings-stack";
import { CreativeRequestStack } from "./creative-requests-stack";
import { MiscStack } from "./misc-stack";
import { GQL_API_NAME } from "./static/constants";
import { UserPaymentDetailsStack } from "./user-payment-details-stack";
import { UserProfileStack } from "./user-profile-stack";
import { UserTransactionsStack } from "./user-transactions-stack";
import { UserWalletsStack } from "./user-wallets-stack";

export class GraphqlApiStack extends Stack {
  public readonly gqlApi: GraphqlApi;

  constructor(construct: Construct, id: string, props?: StackProps) {
    super(construct, id, props);

    const cognitoStack = new CognitoStack(this, "CognitoStack");
    const gqlApi = new GraphqlApi(this, id, {
      name: GQL_API_NAME,
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
          userPoolConfig: {
            userPool: UserPool.fromUserPoolId(
              this,
              "userPool",
              cognitoStack.userPoolId,
            ),
          },
        },
      },
      xrayEnabled: true,
      definition: Definition.fromFile(
        "lib/amplify-export-edcsquared/api/edcsquared/amplify-appsync-files/schema.graphql",
      ),
      logConfig: {
        fieldLogLevel: FieldLogLevel.ALL,
      },
    });

    new ApprovedAdsStack(this, "ApprovedAdsStack", gqlApi);
    new BrandBriefsStack(this, "BrandBriefsStack", gqlApi);
    new BrandProfilesStack(this, "BrandProfilesStack", gqlApi);
    new BestPracticesStack(this, "BestPracticesStack", gqlApi);
    new CreativeRequestStack(this, "CreativeRequestStack", gqlApi);
    new CreativeRequestEarningsStack(
      this,
      "CreativeRequestEarningsStack",
      gqlApi,
    );

    new UserProfileStack(this, "UserProfileStack", gqlApi);
    new UserWalletsStack(this, "UserWalletStack", gqlApi);
    new UserPaymentDetailsStack(this, "UserPaymentDetailsStack", gqlApi);
    new UserTransactionsStack(this, "UserTransactionsStack", gqlApi);
    new MiscStack(this, "MiscStack", gqlApi);
    this.gqlApi = gqlApi;
  }
}
