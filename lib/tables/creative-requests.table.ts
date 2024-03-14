import {
  AttributeType,
  BillingMode,
  ProjectionType,
  Table,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import {
  CREATIVE_REQUESTS_BY_ADMIN_APPROVAL_INDEX_NAME,
  CREATIVE_REQUESTS_BY_BRAND_BRIEF_INDEX_NAME,
  CREATIVE_REQUESTS_BY_CREATOR_ID_AND_UDPATED_AT_INDEX_NAME,
  CREATIVE_REQUESTS_BY_CREATOR_VISIBILITY_INDEX_NAME,
  CREATIVE_REQUESTS_BY_DATE,
  CREATIVE_REQUESTS_BY_STATUS_INDEX_NAME,
  CREATIVE_REQUESTS_TABLE_NAME,
} from '../static/constants';

export const CreativeRequestsTable = (construct: Construct) => {
  const creativeRequestsTable = new Table(
    construct,
    CREATIVE_REQUESTS_TABLE_NAME,
    {
      tableName: CREATIVE_REQUESTS_TABLE_NAME,
      partitionKey: {
        type: AttributeType.STRING,
        name: 'id',
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
    }
  );

  creativeRequestsTable.addGlobalSecondaryIndex({
    indexName: CREATIVE_REQUESTS_BY_ADMIN_APPROVAL_INDEX_NAME,
    partitionKey: {
      name: 'adminApproval',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });

  creativeRequestsTable.addGlobalSecondaryIndex({
    indexName: CREATIVE_REQUESTS_BY_BRAND_BRIEF_INDEX_NAME,
    partitionKey: {
      name: 'brandBriefId',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });

  creativeRequestsTable.addGlobalSecondaryIndex({
    indexName: CREATIVE_REQUESTS_BY_CREATOR_VISIBILITY_INDEX_NAME,
    partitionKey: {
      name: 'creatorVisibility',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });

  creativeRequestsTable.addGlobalSecondaryIndex({
    indexName: CREATIVE_REQUESTS_BY_STATUS_INDEX_NAME,
    partitionKey: {
      name: 'status',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });

  creativeRequestsTable.addGlobalSecondaryIndex({
    indexName: CREATIVE_REQUESTS_BY_CREATOR_ID_AND_UDPATED_AT_INDEX_NAME,
    partitionKey: {
      name: 'creatorId',
      type: AttributeType.STRING,
    },
    sortKey: {
      type: AttributeType.STRING,
      name: 'updatedAt',
    },
    projectionType: ProjectionType.ALL,
  });

  creativeRequestsTable.addGlobalSecondaryIndex({
    indexName: CREATIVE_REQUESTS_BY_DATE,
    partitionKey: {
      name: 'type',
      type: AttributeType.STRING,
    },
    sortKey: {
      type: AttributeType.STRING,
      name: 'updatedAt',
    },
    projectionType: ProjectionType.ALL,
  });

  return creativeRequestsTable;
};
