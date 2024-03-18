import { useMemo } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { getQuery } from 'hooks/utils/helpers';
import {
  CreatePaymentProps,
  DeleteUserPaymentDetailProps,
  GetUserPaymentDetailProps,
  UpdateUserPaymentDetailProps,
} from 'hooks/utils';
import {
  CreateUserPaymentDetailsMutation,
  CreateUserPaymentDetailsMutationVariables,
  DeleteUserPaymentDetailsMutation,
  DeleteUserPaymentDetailsMutationVariables,
  GetUserPaymentDetailsQuery,
  GetUserProfileQueryVariables,
  UpdateUserPaymentDetailsMutation,
  UpdateUserPaymentDetailsMutationVariables,
} from 'API';
import {
  createUserPaymentDetails,
  deleteUserPaymentDetails,
  updateUserPaymentDetails,
} from 'graphql/mutations';
import { getUserPaymentDetails } from 'graphql/queries';

export const createUserPayment = () => {
  const [createPayment, { data, loading, error }] = useMutation<
    CreateUserPaymentDetailsMutation,
    CreateUserPaymentDetailsMutationVariables
  >(getQuery(createUserPaymentDetails));
  const paymentStatus = data || null;

  return { loading, createPayment, paymentStatus, error };
};

export const GetUserPaymentDetails = (): GetUserPaymentDetailProps => {
  const [getPayment, { data, loading, error }] = useLazyQuery<
    GetUserPaymentDetailsQuery,
    GetUserProfileQueryVariables
  >(getQuery(getUserPaymentDetails));
  const paymentData = data?.getUserPaymentDetails || null;
  return {
    loading,
    getPayment,
    paymentData,
    error,
  };
};

export const UpdateUserPayment = () => {
  const [updatePayment, { data, loading, error }] = useMutation<
    UpdateUserPaymentDetailsMutation,
    UpdateUserPaymentDetailsMutationVariables
  >(getQuery(updateUserPaymentDetails));

  const updatePaymentData = useMemo(
    () => data?.updateUserPaymentDetails || null,
    [data]
  );

  return { loading, updatePayment, updatePaymentData, error };
};

export const deleteUserPayment = (): DeleteUserPaymentDetailProps => {
  const [deletePayment, { data, loading, error }] = useMutation<
    DeleteUserPaymentDetailsMutation,
    DeleteUserPaymentDetailsMutationVariables
  >(getQuery(deleteUserPaymentDetails));
  const paymentStatus = data?.deleteUserPaymentDetails || null;
  return { loading, deletePayment, paymentStatus, error };
};
