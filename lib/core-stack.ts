import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { config } from "dotenv";
import "dotenv/config";
import { S3Stack } from "./s3-stack";
import path = require("path");
import fs = require("node:fs");
config({ path: ".env" });

export class CoreStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, {
      ...props,
      env: { region: "us-east-1", account: "995966967167" },
    });

    new S3Stack(this, "S3Stack");
    // new LambdaStack(this, "LambdaSack");
  }
}
