import { Stack, StackProps } from "aws-cdk-lib";
import {
  AuthorizationType,
  Definition,
  FieldLogLevel,
  GraphqlApi,
} from "aws-cdk-lib/aws-appsync";
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
import { CognitoStack } from "./cognito-stack";
import { GQL_API_NAME } from "./static/constants";

export class GraphqlApiStack extends Stack {
  public readonly gqlApi: GraphqlApi;

  constructor(construct: Construct, id: string, props?: StackProps) {
    super(construct, id, props);

    const cognitoStack = new CognitoStack(this, id, {});

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

    this.gqlApi = gqlApi;
  }
}
