import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { Distribution } from "aws-cdk-lib/aws-cloudfront";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { S3EventSourceV2 } from "aws-cdk-lib/aws-lambda-event-sources";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { Bucket, EventType } from "aws-cdk-lib/aws-s3";
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import {
  APP_DOMAIN,
  CLOUDFRONT_DISTRIBUTION_ID,
  DEFAULT_LAMBDA_TIMEOUT_IN_SECONDS,
  DEPLOYMENT_LOGIC_ID,
  ENVS,
  HOSTING_BUCKET_NAME,
  ONE_GIGABYTE_IN_MEGA_BYTES,
  STATIC_STORAGE_BUCKET,
} from "./static/constants";
import path = require("path");

export class S3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const staticStorage = Bucket.fromBucketName(
      this,
      "static-storage",
      STATIC_STORAGE_BUCKET,
    );

    const hostingBucket = Bucket.fromBucketName(
      this,
      "hostingBucket",
      HOSTING_BUCKET_NAME,
    );

    hostingBucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["s3:GetObject", "s3:GetObjectAcl"],
        resources: [`${hostingBucket.bucketName}/*`],
      }),
    );

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

    const hostedZone = HostedZone.fromLookup(this, "HostingBucketZoneLID", {
      domainName: APP_DOMAIN,
    });

    const certificate = new Certificate(this, "HostingBucketCertificateLID", {
      domainName: APP_DOMAIN,
    });

    const distribution = Distribution.fromDistributionAttributes(
      this,
      "HostingBucketCloudfrontDistribution",
      {
        distributionId: CLOUDFRONT_DISTRIBUTION_ID,
        domainName: APP_DOMAIN,
      },
    );

    const record = new ARecord(this, "AliasRecord", {
      zone: hostedZone,
      region: ENVS.ENV,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });

    const invalidationLambda = new Function(this, "InvalidationLambda", {
      runtime: Runtime.NODEJS_18_X,
      timeout: Duration.seconds(DEFAULT_LAMBDA_TIMEOUT_IN_SECONDS),
      handler: "index.handler",
      code: Code.fromAsset("lib/functions/invalidation-lambda"),
      environment: {
        DISTRIBUTION_ID: CLOUDFRONT_DISTRIBUTION_ID,
      },
    });

    invalidationLambda.addEventSource(
      new S3EventSourceV2(hostingBucket, {
        events: [EventType.OBJECT_CREATED, EventType.OBJECT_ACL_PUT],
      }),
    );

    distribution.grantCreateInvalidation(invalidationLambda);
  }
}
