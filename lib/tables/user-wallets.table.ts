import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import {
  USER_WALLETS_BY_OWNER_INDEX_NAME,
  USER_WALLETS_TABLE_NAME,
} from '../static/constants';

export const UserWalletsTable = (construct: Construct) => {
  const userWalletTable = new Table(construct, USER_WALLETS_TABLE_NAME, {
    tableName: USER_WALLETS_TABLE_NAME,
    partitionKey: {
      name: 'id',
      type: AttributeType.STRING,
    },
    billingMode: BillingMode.PAY_PER_REQUEST,
  });

  userWalletTable.addGlobalSecondaryIndex({
    indexName: USER_WALLETS_BY_OWNER_INDEX_NAME,
    partitionKey: {
      name: 'owner',
      type: AttributeType.STRING,
    },
  });

  return userWalletTable;
};
