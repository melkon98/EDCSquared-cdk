import React, { useContext, useEffect, useState } from 'react';
import withApolloProvider from 'hooks/apollo/withApollo';
import { createUserBrand, updateUserBrand } from 'hooks';
import { BrandProps } from './brand.interface';
import { BrandProfile, CreateBrandProfileInput } from 'API';
import { AuthContext } from 'state/auth';
import { ProfileContext } from 'state/profileSteps';

export function withBrand<T>(Component: React.FC<T & BrandProps>): React.FC<T> {
  return withApolloProvider((props: T) => {
    const {
      createBrand,
      loading: createBrandLoading,
      brand: createBrandRes,
    } = createUserBrand();
    const {
      updateBrand,
      loading: updateBrandLoading,
      brand: updateBrandRes,
    } = updateUserBrand();
    const {
      authState: { email },
    } = useContext(AuthContext);
    const { profileState, setProfileState } = useContext(ProfileContext);
    const {
      profileState: { data: profileData },
    } = useContext(ProfileContext);
    const [brandState, setBrandState] = useState<BrandProfile>();

    const updateData = (data: CreateBrandProfileInput): void => {
      if (email && profileData?.id) {
        const input = {
          ...data,
          userProfileBrandId: profileData.id,
          userEmail: email,
          __typename: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          owner: undefined,
          briefs: undefined,
          vertical: undefined,
          tiktokHandle: undefined,
        };
        if (data.id) updateBrand({ variables: { input } });
        else createBrand({ variables: { input } });
      }
    };

    useEffect(() => {
      if (!createBrandLoading && createBrandRes) setBrandState(createBrandRes);
    }, [createBrandRes, createBrandLoading]);
    useEffect(() => {
      if (!updateBrandLoading && updateBrandRes) setBrandState(updateBrandRes);
    }, [updateBrandRes, updateBrandLoading]);
    useEffect(() => {
      if (brandState && profileState.data?.brand)
        setProfileState({
          ...profileState,
          data: {
            ...profileState?.data,
            brand: { ...profileState.data?.brand, items: [brandState] },
          },
        });
    }, [brandState]);

    const hocProps = {
      brandLoading: updateBrandLoading || createBrandLoading,
      updateData,
      data: brandState,
    };
    return <Component {...props} {...hocProps} />;
  });
}
export default withBrand;
