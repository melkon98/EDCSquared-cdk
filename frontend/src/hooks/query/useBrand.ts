import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CreateBrandProfileMutation,
  CreateBrandProfileMutationVariables,
  GetBrandProfileQuery,
  GetBrandProfileQueryVariables,
  UpdateBrandProfileMutation,
  UpdateBrandProfileMutationVariables,
} from 'API';
import { createBrandProfile, updateBrandProfile } from 'graphql/mutations';
import { getBrandProfile } from 'graphql/queries';
import {
  CreateBrandProps,
  GetBrandProfileProps,
  UpdateBrandProps,
} from 'hooks/utils';
import { getQuery } from 'hooks/utils/helpers';

export const createUserBrand = (): CreateBrandProps => {
  const [createBrand, { data, loading, error }] = useMutation<
    CreateBrandProfileMutation,
    CreateBrandProfileMutationVariables
  >(getQuery(createBrandProfile));
  const brand = data?.createBrandProfile || null;
  const errorData =
    error || (brand ? undefined : new Error('No Brand Created'));
  return { loading, createBrand, brand, error: errorData };
};

export const updateUserBrand = (): UpdateBrandProps => {
  const [updateBrand, { data, loading, error }] = useMutation<
    UpdateBrandProfileMutation,
    UpdateBrandProfileMutationVariables
  >(getQuery(updateBrandProfile));
  const brand = data?.updateBrandProfile || null;
  const errorData = error || (brand ? undefined : new Error('No User Found'));
  return { loading, updateBrand, brand, error: errorData };
};

export const useGetBrandProfile = (): GetBrandProfileProps => {
  const [getBrand, { data, loading, error }] = useLazyQuery<
    GetBrandProfileQuery,
    GetBrandProfileQueryVariables
  >(getQuery(getBrandProfile));
  const brandData = data?.getBrandProfile
    ? { ...data?.getBrandProfile, brand: undefined }
    : null;
  const errorData =
    error || (brandData ? undefined : new Error('No User Found'));
  return {
    loading,
    getBrand,
    brandData,
    error: errorData,
  };
};
