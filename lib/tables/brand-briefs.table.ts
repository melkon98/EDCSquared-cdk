import {
  AttributeType,
  BillingMode,
  ProjectionType,
  Table,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import {
  BRAND_BRIEFS_BY_ADVERTISER_ID_INDEX_NAME,
  BRAND_BRIEFS_BY_BRAND_ID_INDEX_NAME,
  BRAND_BRIEFS_BY_COUNTRY_AND_CREATION_DATE_INDEX_NAME,
  BRAND_BRIEFS_BY_DATE_INDEX_NAME,
  BRAND_BRIEFS_BY_VERTICAL_INDEX_NAME,
  BRAND_BRIEFS_TABLE_NAME,
} from '../static/constants';

export const BrandBriefsTable = (construct: Construct) => {
  const brandBriefsTable = new Table(construct, BRAND_BRIEFS_TABLE_NAME, {
    tableName: BRAND_BRIEFS_TABLE_NAME,
    billingMode: BillingMode.PAY_PER_REQUEST,
    partitionKey: {
      name: 'id',
      type: AttributeType.STRING,
    },
  });

  brandBriefsTable.addGlobalSecondaryIndex({
    indexName: BRAND_BRIEFS_BY_DATE_INDEX_NAME,
    partitionKey: {
      name: 'type',
      type: AttributeType.STRING,
    },
    sortKey: {
      name: 'createdAt',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });

  brandBriefsTable.addGlobalSecondaryIndex({
    indexName: BRAND_BRIEFS_BY_COUNTRY_AND_CREATION_DATE_INDEX_NAME,
    partitionKey: {
      name: 'country',
      type: AttributeType.STRING,
    },
  });

  brandBriefsTable.addGlobalSecondaryIndex({
    indexName: BRAND_BRIEFS_BY_ADVERTISER_ID_INDEX_NAME,
    projectionType: ProjectionType.ALL,
    partitionKey: {
      name: 'tiktokAdvertiserId',
      type: AttributeType.STRING,
    },
  });

  brandBriefsTable.addGlobalSecondaryIndex({
    indexName: BRAND_BRIEFS_BY_BRAND_ID_INDEX_NAME,
    projectionType: ProjectionType.ALL,
    partitionKey: {
      name: 'brandId',
      type: AttributeType.STRING,
    },
  });

  brandBriefsTable.addGlobalSecondaryIndex({
    indexName: BRAND_BRIEFS_BY_VERTICAL_INDEX_NAME,
    projectionType: ProjectionType.ALL,
    partitionKey: {
      name: 'vertical',
      type: AttributeType.STRING,
    },
  });

  return brandBriefsTable;
};
