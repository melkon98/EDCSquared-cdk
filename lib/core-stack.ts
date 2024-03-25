import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { config } from "dotenv";
import "dotenv/config";
import { GraphqlApiStack } from "./GraphqlApiStack";
import { CognitoStack } from "./cognito-stack";
import { LambdaStack } from "./lambda-stack";
import { S3Stack } from "./s3-stack";

config({ path: ".env" });

export class CoreStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, {
      ...props,
      env: { region: process.env.REGION, account: process.env.ACCOUNT_ID },
    });

    const cognito = new CognitoStack(this, "CognitoStack");
    new S3Stack(this, "S3Stack");
    new LambdaStack(this, "LambdaStack");
    new GraphqlApiStack(this, "GraphqlApiStack");
  }
}
