import { Stack, StackProps } from "aws-cdk-lib";
import { GraphqlApi } from "aws-cdk-lib/aws-appsync";
import { Function } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class MiscStack extends Stack {
  constructor(
    construct: Construct,
    id: string,
    gqlApi: GraphqlApi,
    props?: StackProps,
  ) {
    super(construct, id, props);

    // Queries

    const getCampaignSpentDS = gqlApi.addLambdaDataSource(
      "getCampaignSpentLambdaDataSource",
      Function.fromFunctionName(
        this,
        "getCampaignSpentLogicalId",
        "getCampaignSpent",
      ),
    );

    getCampaignSpentDS.createResolver("getCampaignSpentResolver", {
      typeName: "Query",
      fieldName: "getCampaignSpent",
    });
  }
}
