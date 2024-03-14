import {
  AttributeType,
  BillingMode,
  ProjectionType,
  Table,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import {USER_PROFILES_BY_USER_TYPE_INDEX_NAME, USER_PROFILES_TABLE_NAME} from '../static/constants';

export const UserProfilesTable = (construct: Construct) => {
  const userProfilesTable = new Table(construct, USER_PROFILES_TABLE_NAME, {
    tableName: USER_PROFILES_TABLE_NAME,
    partitionKey: {
      name: 'id',
      type: AttributeType.STRING,
    },
    billingMode: BillingMode.PAY_PER_REQUEST,
  });

  userProfilesTable.addGlobalSecondaryIndex({
    partitionKey: {
      name: 'id',
      type: AttributeType.STRING,
    },
    indexName: USER_PROFILES_BY_USER_TYPE_INDEX_NAME,
    projectionType: ProjectionType.ALL,
  });

  return userProfilesTable;
};
