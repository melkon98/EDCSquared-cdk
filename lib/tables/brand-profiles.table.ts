import {
  AttributeType,
  BillingMode,
  ProjectionType,
  Table,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import {
  BRAND_PROFILES_BY_BRAND_PROFILE_USER_ID,
  BRAND_PROFILES_BY_USER_EMAIL_INDEX_NAME,
  BRAND_PROFILE_TABLE_NAME,
} from '../static/constants';

export const BrandProfilesTable = (construct: Construct) => {
  const brandProfileTable = new Table(construct, BRAND_PROFILE_TABLE_NAME, {
    tableName: BRAND_PROFILE_TABLE_NAME,
    billingMode: BillingMode.PAY_PER_REQUEST,
    partitionKey: {
      name: 'id',
      type: AttributeType.STRING,
    },
  });

  brandProfileTable.addGlobalSecondaryIndex({
    indexName: BRAND_PROFILES_BY_USER_EMAIL_INDEX_NAME,
    partitionKey: {
      name: 'userEmail',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });

  brandProfileTable.addGlobalSecondaryIndex({
    indexName: BRAND_PROFILES_BY_BRAND_PROFILE_USER_ID,
    partitionKey: {
      name: 'userProfileBrandId',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });

  return brandProfileTable;
};
