import { CreateUserPaymentDetailsMutation, UpdateUserPaymentDetailsMutation } from 'API';
import { UnknownType } from 'utils';

export type CreatePaymentProps = {
  createPayment: (unknown) => Promise<CreateUserPaymentDetailsMutation>;
  paymentData?: UnknownType;
  paymentStatus?: UnknownType;
  loading: boolean;
  error?: Error;
};

export type GetUserPaymentDetailProps = {
  getPayment: (unknown) => void;
  loading: boolean;
  paymentData?: UnknownType;
  error?: Error;
};

export type UpdateUserPaymentDetailProps = {
  updatePayment: (unknown) => Promise<UpdateUserPaymentDetailsMutation>;
  loading: boolean;
  updatePaymentData?: UpdateUserPaymentDetailsMutation;
  error?: Error;
};

export type DeleteUserPaymentDetailProps = {
  deletePayment: (unknown) => void;
  loading: boolean;
  paymentStatus?: UnknownType;
  error?: Error;
};
