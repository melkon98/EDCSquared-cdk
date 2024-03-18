import {
  GetBrandList,
  GetCreativeRequests,
  getCreatorBriefList,
  getCreatorRequests,
} from 'hooks';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { ProfileContext } from 'state/profileSteps';
import { AuthRoutes, UnknownType } from 'utils';
import { ICreatorBriefListProps } from './dashboard.interface';
import { BrandProfile, USER_TYPES } from 'API';

export function withCreatorBriefList<T>(
  Component: React.FC<T & ICreatorBriefListProps>
): React.FC<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const GetCreatorBriefList: React.FC = (props: T) => {
    const {
      profileState: { data: profileData },
    } = useContext(ProfileContext);
    const { getBriefList, loading, data, error } =
      getCreatorBriefList();
    const { getBrandList, data: brands } = GetBrandList();
    const {
      listCreativeRequests,
      loading: requestLoading,
      data: requestData,
      error: requestError,
    } = getCreatorRequests();
    const {
      listCreativeRequests: getRequets,
      data: requests,
      loading: reqLoading,
    } = GetCreativeRequests();

    const [profileCompletionPercentage, setProfileCompletionPercentage] =
      useState(0);
    const callApi = (input: UnknownType): void => {

      if (profileData?.id && profileData.userType === USER_TYPES.CREATIVE_USER)
        listCreativeRequests({
          variables: {
            creatorId: profileData.id,
            page: 1,
            pageSize: 10,
          },
        });
    };
    const changePage = (type: string, page: number, pageSize: number) => {
      listCreativeRequests({
        variables: { creatorId: profileData?.id, page, pageSize },
      });
    };
    const changeBriefPage = (type: string, page: number, pageSize: number) => {

      getBriefList({ variables: { page, pageSize, country: profileData?.country } });
    };

    useEffect(() => {
      callApi({ nextToken: null });
      getBrandList();
    }, []);

    useEffect(() => {
      if (profileData && !profileCompletionPercentage) {
        let counter = 0;
        if (profileData.name) counter += 10;
        if (profileData.description) counter += 10;
        if (profileData.instagramHandler) counter += 10;
        if (profileData.tiktokHandler) counter += 10;
        if (profileData.youtubeHandler) counter += 10;
        if (profileData.hashtags?.length) counter += 10;
        if (profileData.phoneNumber) counter += 10;
        if (profileData.email) counter += 10;
        if (profileData.profileContent?.length) counter += 10;
        if (profileData.avatar) counter += 10;

        setProfileCompletionPercentage(counter);
      }
    }, [profileData]);

    useEffect(() => {
      console.log(requests, 'requests')
      if (!requests && profileData?.brand?.items[0]?.id) {
        getRequets({
          variables: {
            brandId: profileData.brand.items[0]?.id,
            page: 1,
            pageSize: 10,
          },
        });
      }
    }, []);

    useEffect(() => {
      if (profileData && profileData.userType === USER_TYPES.CREATIVE_USER) {
        if (location.pathname === AuthRoutes.Dashboard) {
          getBriefList({ variables: { page: 1, pageSize: 5, country: profileData?.country } });
        }
        else getBriefList({ variables: { page: 1, pageSize: 10, country: profileData?.country } });

      }

    }, [])

    const customProps: ICreatorBriefListProps = {
      briefList: data?.items || [],
      brands: brands,
      requestList: requestData?.items || [],
      requests: requests?.items || [],
      reqLoading,
      reqPagination: requestData?.totalPages,
      requestLoading: requestLoading,
      loading: loading,
      error: error || requestError,
      profileData: profileData,
      profileCompletionPercentage,
      briefPagination: data?.totalPages,
      currentPage: data?.currentPage,
      changeBriefPage: changeBriefPage as (type: string, page: number, limit: number) => Promise<void>,
      changePage,
    };
    return <Component {...props} {...customProps} />;
  };
  return GetCreatorBriefList as FC<T>;
}
export default withCreatorBriefList;
