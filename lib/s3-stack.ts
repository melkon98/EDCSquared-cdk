import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import {
  DEPLOYMENT_LOGIC_ID,
  HOSTING_BUCKET_NAME,
  ONE_GIGABYTE_IN_MEGA_BYTES,
} from "./static/constants";
import path = require("path");

export class S3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const staticStorage = Bucket.fromBucketName(
      this,
      "static-storage",
      "user-storage91541-master",
    );

    let hostingBucket = Bucket.fromBucketName(
      this,
      "hostingBucket",
      HOSTING_BUCKET_NAME,
    );

    hostingBucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        resources: ["arn:aws:s3:::edcsquared-website-hosting-bucket-master"],
        actions: ["s3:GetObject", "s3:GetObjectAcl"],
      }),
    );

    hostingBucket.grantPublicAccess();

    try {
      // const bucketExist = new CheckBucketExistenceLambdaStack(
      //   this,
      //   "bucketExistenceCheck",
      // ).exists;
      // hostingBucket = !bucketExist
      //   ? new Bucket(this, "hostingBucket", {
      //       bucketName: HOSTING_BUCKET_NAME,
      //       websiteIndexDocument: "index.html",
      //       removalPolicy: RemovalPolicy.RETAIN,
      //       encryption: BucketEncryption.S3_MANAGED,
      //       publicReadAccess: true,
      //       blockPublicAccess: {
      //         blockPublicAcls: false,
      //         blockPublicPolicy: false,
      //         ignorePublicAcls: false,
      //         restrictPublicBuckets: false,
      //       },
      //     })
      //   : Bucket.fromBucketName(this, "hostingBucket", HOSTING_BUCKET_NAME);
    } catch (err) {
      console.error(err);
    }

    try {
      new s3Deploy.BucketDeployment(this, DEPLOYMENT_LOGIC_ID, {
        sources: [
          s3Deploy.Source.asset(path.resolve(__dirname, "../", "build")),
        ],
        destinationBucket: hostingBucket,
        retainOnDelete: false,
        prune: true,
        memoryLimit: ONE_GIGABYTE_IN_MEGA_BYTES,
      });
    } catch (err) {
      s3Deploy.BucketDeployment;
      console.error(err);
    }

    new CfnOutput(this, "AppUrl", {
      value: hostingBucket?.bucketWebsiteUrl || "",
    });
  }
}
