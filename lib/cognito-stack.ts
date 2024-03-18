import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export class CognitoStack extends Stack {
  public readonly userPoolId: string;

  constructor(construct: Construct, id: string, props: StackProps) {
    super(construct, id, props);

    const userPool = UserPool.fromUserPoolArn(
      this,
      "existing-user-pool",
      "arn:aws:cognito-idp:us-east-1:995966967167:userpool/us-east-1_auCDskee6",
    );

    this.userPoolId = userPool.userPoolId;

    new CfnOutput(this, "UserPoolId", { value: this.userPoolId });
  }
}
