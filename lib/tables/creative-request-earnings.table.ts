import {
  AttributeType,
  BillingMode,
  ProjectionType,
  Table,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import {
  CREATIVE_REQUESTS_EARNINGS_BY_CREATIVE_REQUEST_ID,
  CREATIVE_REQUESTS_EARNINGS_TABLE_NAME,
} from '../static/constants';

export const CreativeRequestEarningsTable = (construct: Construct) => {
  const creativeRequestsEarningsTable = new Table(
    construct,
    CREATIVE_REQUESTS_EARNINGS_TABLE_NAME,
    {
      tableName: CREATIVE_REQUESTS_EARNINGS_TABLE_NAME,
      partitionKey: {
        name: 'creatorId',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'creativeRequestEarningId',
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
    }
  );

  creativeRequestsEarningsTable.addGlobalSecondaryIndex({
    indexName: CREATIVE_REQUESTS_EARNINGS_BY_CREATIVE_REQUEST_ID,
    partitionKey: {
      name: 'creativeRequestId',
      type: AttributeType.STRING,
    },
    sortKey: {
      name: 'updatedAt',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });

  return creativeRequestsEarningsTable;
};
