import { Stack, StackProps } from "aws-cdk-lib";
import { Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class AppsyncDynamoDbRole extends Stack {
  public readonly roleArn: string;
  constructor(construct: Construct, id: string, props?: StackProps) {
    super(construct, id, props);

    const appsyncDynamoDbRole = new Role(this, "AppSyncDynamoDBRole", {
      assumedBy: new ServicePrincipal("appsync.amazonaws.com"),
      description: "Allows AppSync to interact with DynamoDB tables",
    });

    this.roleArn = appsyncDynamoDbRole.roleArn;
  }
}
