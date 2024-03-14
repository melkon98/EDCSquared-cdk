import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import {
  BEST_PRACTICES_BY_STATUS_INDEX_NAME,
  BEST_PRACTICES_TABLE_BY_USER_PROFILE_BEST_PRACTICE_ID,
  BEST_PRACTICES_TABLE_NAME,
} from '../static/constants';

export const BestPracticesTable = (construct: Construct) => {
  const bestPracticesTable = new Table(construct, BEST_PRACTICES_TABLE_NAME, {
    tableName: BEST_PRACTICES_TABLE_NAME,
    partitionKey: {
      name: 'id',
      type: AttributeType.STRING,
    },
  });

  bestPracticesTable.addGlobalSecondaryIndex({
    indexName: BEST_PRACTICES_BY_STATUS_INDEX_NAME,
    partitionKey: {
      name: 'active',
      type: AttributeType.STRING,
    },
  });

  bestPracticesTable.addGlobalSecondaryIndex({
    indexName: BEST_PRACTICES_TABLE_BY_USER_PROFILE_BEST_PRACTICE_ID,
    partitionKey: {
      name: 'userProfileBestPracticesId',
      type: AttributeType.STRING,
    },
  });

  return bestPracticesTable;
};
