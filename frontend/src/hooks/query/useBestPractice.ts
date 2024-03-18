import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CreateBestPracticesMutation,
  CreateBestPracticesMutationVariables,
  ListBestPracticesQuery,
  ListBestPracticesQueryVariables,
  UpdateBestPracticesMutation,
  UpdateBestPracticesMutationVariables,
} from 'API';
import { createBestPractices, updateBestPractices } from 'graphql/mutations';
import { listBestPractices as listAllPractices } from 'graphql/queries';
import { ICreatePracticeResponse, IEditPracticeResponse } from 'hooks/utils';
import { getQuery } from 'hooks/utils/helpers';
import { ListAllBestPracticeProps } from 'utils';

export const createBestPractice = (): ICreatePracticeResponse => {
  const [createBrief, { data, loading, error }] = useMutation<
    CreateBestPracticesMutation,
    CreateBestPracticesMutationVariables
  >(getQuery(createBestPractices));
  return { loading, createBrief, error, data: data?.createBestPractices };
};

export const editBestPractice = (): IEditPracticeResponse => {
  const [editBrief, { data, loading, error }] = useMutation<
    UpdateBestPracticesMutation,
    UpdateBestPracticesMutationVariables
  >(getQuery(updateBestPractices));
  return { loading, editBrief, error, data: data?.updateBestPractices };
};

export const listBestPractices = (): ListAllBestPracticeProps => {
  const [getAllPractice, { data, loading, error }] = useLazyQuery<
    ListBestPracticesQuery,
    ListBestPracticesQueryVariables
  >(getQuery(listAllPractices));

  const { items = [], nextToken } = data?.listBestPractices || {};
  return {
    loading,
    getAllPractice,
    data: items,
    nextToken,
    error,
  };
};
