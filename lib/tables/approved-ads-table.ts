import {
  AttributeType,
  BillingMode,
  ProjectionType,
  Table,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import {
  APPROVED_ADS_BY_ADGROUP_ID_INDEX_NAME,
  APPROVED_ADS_BY_ADVERTISER_ID_INDEX_NAME,
  APPROVED_ADS_BY_AD_ID_INDEX_NAME,
  APPROVED_ADS_BY_CAMPAING_ID_INDEX_NAME,
  APPROVED_ADS_BY_CREATIVE_REQUEST_ID,
  APPROVED_ADS_BY_ID_INDEX_NAME,
  APPROVED_ADS_BY_STATUS_INDEX_NAME,
  APPROVED_ADS_BY_USER_PROFILE_ID,
  APPROVED_ADS_TABLE_NAME,
} from '../static/constants';

export const ApprovedAdsTable = (scope: Construct) => {
  const approvedAdsTable = new Table(scope, APPROVED_ADS_TABLE_NAME, {
    billingMode: BillingMode.PAY_PER_REQUEST,
    tableName: APPROVED_ADS_TABLE_NAME,
    partitionKey: {
      name: 'id',
      type: AttributeType.STRING,
    },
  });

  approvedAdsTable.addGlobalSecondaryIndex({
    indexName: APPROVED_ADS_BY_ADGROUP_ID_INDEX_NAME,
    partitionKey: {
      name: 'ad_group_id',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });

  approvedAdsTable.addGlobalSecondaryIndex({
    indexName: APPROVED_ADS_BY_AD_ID_INDEX_NAME,
    partitionKey: {
      name: 'ad_id',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });

  approvedAdsTable.addGlobalSecondaryIndex({
    indexName: APPROVED_ADS_BY_ADVERTISER_ID_INDEX_NAME,
    partitionKey: {
      name: 'advertiser_id',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });

  approvedAdsTable.addGlobalSecondaryIndex({
    indexName: APPROVED_ADS_BY_CAMPAING_ID_INDEX_NAME,
    partitionKey: {
      name: 'campaing_id',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });
  approvedAdsTable.addGlobalSecondaryIndex({
    indexName: APPROVED_ADS_BY_ID_INDEX_NAME,
    partitionKey: {
      name: 'id',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });
  approvedAdsTable.addGlobalSecondaryIndex({
    indexName: APPROVED_ADS_BY_STATUS_INDEX_NAME,
    partitionKey: {
      name: 'status',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });

  approvedAdsTable.addGlobalSecondaryIndex({
    indexName: APPROVED_ADS_BY_USER_PROFILE_ID,
    partitionKey: {
      name: 'user_profile_id',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });

  approvedAdsTable.addGlobalSecondaryIndex({
    indexName: APPROVED_ADS_BY_CREATIVE_REQUEST_ID,
    partitionKey: {
      name: 'creativeRequestId',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });

  return approvedAdsTable;
};
