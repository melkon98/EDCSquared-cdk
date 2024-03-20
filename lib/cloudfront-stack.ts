import { Stack, StackProps } from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { Distribution } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { APP_DOMAIN, HOSTING_BUCKET_NAME } from "./static/constants";

export class CloudfrontStack extends Stack {
  constructor(construct: Construct, id: string, props?: StackProps) {
    super(construct, id, props);

    const hostingBucket = Bucket.fromBucketName(
      this,
      "hostingBucketLID",
      HOSTING_BUCKET_NAME,
    );

    const hostedZone = HostedZone.fromLookup(this, "HostingBucketZoneLID", {
      domainName: APP_DOMAIN,
    });

    const certificate = new Certificate(this, "HostingBucketCertificateLID", {
      domainName: APP_DOMAIN,
    });

    const distribution = new Distribution(
      this,
      "HostingBucketDistributionLID",
      {
        defaultBehavior: { origin: new S3Origin(hostingBucket) },
        defaultRootObject: "index.html",
        domainNames: [APP_DOMAIN],
        certificate,
      },
    );
  }
}
