import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as cr from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";
import path = require("path");

export class CheckBucketExistenceLambdaStack extends cdk.Stack {
  public readonly exists: boolean;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const checkBucketExistenceFunction = new lambda.Function(
      this,
      "CheckBucketExistenceFunction",
      {
        runtime: lambda.Runtime.NODEJS_LATEST,
        handler: "index.handler",
        code: lambda.Code.fromAsset(path.join(__dirname, "lambda")),
      },
    );

    const checkBucketExistenceProvider = new cr.Provider(
      this,
      "CheckBucketExistenceProvider",
      {
        onEventHandler: checkBucketExistenceFunction,
      },
    );

    const customResource = new cdk.CustomResource(
      this,
      "CheckBucketExistenceResource",
      {
        serviceToken: checkBucketExistenceProvider.serviceToken,
      },
    );

    // Access the output of the Lambda function from the custom resource
    this.exists = !!customResource.getAttString("BucketExists");

    new cdk.CfnOutput(this, "AppUrl", {
      value: this.exists?.toString() || "",
    });
  }
}
