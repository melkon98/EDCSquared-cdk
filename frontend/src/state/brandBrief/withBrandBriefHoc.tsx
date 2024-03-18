import React, { useContext, useEffect, useState } from 'react';
import withApolloProvider from 'hooks/apollo/withApollo';
import {
  GetCampaignSpent,
  GetCreativeRequests,
  GetCreativeRequestsByAdminApproval,
  GetCreativeRequestsStats,
  getBrandBriefList,
} from 'hooks';
import { BrandBriefProps } from './brandBrief.interface';
import { BrandBrief } from 'API';
import { ProfileContext } from 'state/profileSteps';
import { useLocation } from 'react-router-dom';
import { AuthRoutes } from 'utils';

export function withBrandBriefs<T>(
  Component: React.FC<T & BrandBriefProps>
): React.FC<T> {
  return withApolloProvider((props: T) => {
    const {
      getBrandBriefslist,
      loading: brandBriefListLoading,
      data: brandBriefList,
    } = getBrandBriefList();
    const {
      listCreativeRequests,
      data: requests,
      loading: reqLoading,
    } = GetCreativeRequests();
    const { getCampaignSpents, data: spent } = GetCampaignSpent();
    const { getCreativeRequestsStats, data: stats } = GetCreativeRequestsStats()
    const {
      profileState: { data },
    } = useContext(ProfileContext);
    const brandId = data?.brand?.items?.[0]?.id;
    const tiktokAdvertiserId = data?.tiktokAccountAccess?.advertiser_id;
    const location = useLocation();

    const [brandBriefsState, setBrandBriefsState] =
      useState<Array<BrandBrief | null>>();

    useEffect(() => {
      if (brandId) {
        if (location.pathname === AuthRoutes.Dashboard) {
          getBrandBriefslist({
            variables: {
              brandId,
              page: 1,
              pageSize: 5,
            },
          });
        }
        else getBrandBriefslist({
          variables: {
            brandId,
            page: 1,
            pageSize: 10,
          },
        });
      }

    }, []);

    useEffect(() => {
      if (
        !brandBriefListLoading &&
        brandBriefList?.items &&
        !brandBriefsState?.length
      )
        setBrandBriefsState(brandBriefList?.items as Array<BrandBrief | null>);
    }, [brandBriefList, brandBriefListLoading]);

    useEffect(() => {
      if (!requests) {
        listCreativeRequests({ variables: { brandId, page: 1, pageSize: 10 } });
      }
      getCreativeRequestsStats({ variables: { brandId } })
    }, []);

    const changePage = (type: string, page: number, pageSize: number) => {
      listCreativeRequests({ variables: { brandId, page, pageSize } });
    };

    const changeBriefPage = (type: string, page: number, pageSize: number) => {
      getBrandBriefslist({ variables: { brandId, page, pageSize } });
    };
    useEffect(() => {
      if (brandBriefList?.items?.length && spent === null) {

        const campaigns: string[] = []
        // eslint-disable-next-line no-unsafe-optional-chaining
        for (const brief of brandBriefList?.items) {
          if (brief?.tikTokData?.campaignId && !campaigns.includes(brief?.tikTokData?.campaignId)) campaigns.push(brief?.tikTokData?.campaignId)
        }
        getCampaignSpents({
          variables: {
            userId: data?.id,
            campaignId: campaigns[0]
          },
        });
      }
    }, [brandBriefList]);

    const resolvedData =
      brandBriefsState?.map((brief) => {
        if (!brief) {
          return null;
        }
        const items =
          brief?.creativeRequests?.items.filter((req) => {
            return req?.adminApproval === 'Approved';
          }) || [];

        const creativeRequests = {
          ...brief.creativeRequests,
          __typename:
            brief.creativeRequests?.__typename ||
            'ModelCreativeRequestConnection',
          items,
        };

        return { ...brief, creativeRequests };
      }) || [];

    const hocProps: BrandBriefProps = {
      data: brandBriefList?.items || [],
      currentPage: brandBriefList?.currentPage,
      requests: requests?.items || [],
      reqPagination: requests?.totalPages,
      reqCurrentPage: requests?.currentPage,
      briefPagination: brandBriefList?.totalPages,
      loading: brandBriefListLoading,
      reqLoading: reqLoading,
      brand: data?.brand?.items?.[0],
      contentStats: stats,
      isTiktokLinked: !!data?.tiktokAccountAccess,
      profileState: data,
      spent: spent || "",
      changePage: changePage as (
        type: string,
        page: number,
        pageSize: number
      ) => Promise<void>,
      changeBriefPage: changeBriefPage as (
        type: string,
        page: number,
        pageSize: number
      ) => Promise<void>,
    };
    return <Component {...props} {...hocProps} />;
  });
}
export default withBrandBriefs;
