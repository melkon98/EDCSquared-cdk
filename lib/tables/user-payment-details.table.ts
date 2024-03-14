import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { USER_PAYMENT_DETAILS_TABLE_NAME } from '../static/constants';

export const UserPaymentDetailsTable = (construct: Construct) =>
  new Table(construct, USER_PAYMENT_DETAILS_TABLE_NAME, {
    tableName: USER_PAYMENT_DETAILS_TABLE_NAME,
    partitionKey: {
      type: AttributeType.STRING,
      name: 'id',
    },
  });
