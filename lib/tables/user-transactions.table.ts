import {
  AttributeType,
  BillingMode,
  ProjectionType,
  Table,
} from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import {
  USER_TRANSACTIONS_BY_USER_TRANSACTION_ID_INDEX_NAME,
  USER_TRANSACTIONS_TABLE_NAME,
} from '../static/constants';

export const UserTransactionsTable = (construct: Construct) => {
  const userTransactionsTable = new Table(
    construct,
    USER_TRANSACTIONS_TABLE_NAME,
    {
      billingMode: BillingMode.PAY_PER_REQUEST,
      tableName: USER_TRANSACTIONS_TABLE_NAME,
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
    }
  );

  userTransactionsTable.addGlobalSecondaryIndex({
    indexName: USER_TRANSACTIONS_BY_USER_TRANSACTION_ID_INDEX_NAME,
    partitionKey: {
      name: 'userPaymentDetailsUserTransactionsId',
      type: AttributeType.STRING,
    },
    projectionType: ProjectionType.ALL,
  });

  return userTransactionsTable;
};
