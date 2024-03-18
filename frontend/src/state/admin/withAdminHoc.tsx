import { ModelSortDirection, USER_TYPES } from 'API';
import { UpdateCreativeRequest } from 'hooks';
import withApolloProvider from 'hooks/apollo/withApollo';
import {
  GetAdminBrendBriefs,
  GetCreativeUsers,
  GetListCreativeRequests,
  GetUsersPaymentDetails,
  UpdateUserTransactions,
} from 'hooks/query/useAdminActions';
import React, { useContext, useEffect } from 'react';
import { ProfileContext } from 'state/profileSteps';

interface HocProps {
  shouldCallApi?: boolean;
}

export function withAdmin<T>(
  Component: React.FC<T & HocProps>
): React.FC<T & HocProps> {
  return withApolloProvider((props: T & HocProps) => {
    const { profileState } = useContext(ProfileContext);

    const {
      getListCreativeRequests,
      creativeRequestsData,
      loading: reqloading,
    } = GetListCreativeRequests();
    const {
      getUserPaymentDetails,
      paymentDetails,
      loading: paymentLoading,
    } = GetUsersPaymentDetails();
    const { getCreativeUsers, creativeUsers } = GetCreativeUsers();
    const { updateTransactions } = UpdateUserTransactions();
    const { getListBrandBriefs, brandBriefs } = GetAdminBrendBriefs();
    useEffect(() => {
      getListCreativeRequests({
        variables: {
          type: 'CreativeRequest',
          sortDirection: ModelSortDirection.DESC,
          limit: 1000,
        },
      });
    }, []);

    const sortCreativeRequest = (sort: string) => {
      getListCreativeRequests({
        variables: {
          type: 'CreativeRequest',
          sortDirection: ModelSortDirection[sort],
          limit: 1000,
        },
      });
    };
    const sortBrandBriefs = (sort: string) => {
      getListBrandBriefs({
        variables: {
          type: 'BrandBrief',
          sortDirection: ModelSortDirection[sort],
        },
      });
    };
    useEffect(() => {
      if (!paymentDetails.length) {
        getUserPaymentDetails();
      }
    }, [getUserPaymentDetails]);

    useEffect(() => {
      getListBrandBriefs({
        variables: {
          type: 'BrandBrief',
          sortDirection: ModelSortDirection.DESC,
        },
      });
      getCreativeUsers({
        variables: { userType: USER_TYPES.CREATIVE_USER, limit: 1000 },
      });
    }, []);

    const paymentProps = {
      profileState: { ...profileState },
      creativeRequestsData,
      reqloading,
      brandBriefs: brandBriefs?.items,
      creativeUsers: creativeUsers?.items,
      sortCreativeRequest,
      paymentDetails,
      updateTransactions,
      sortBrandBriefs,
      paymentLoading,
    };
    return <Component {...props} {...paymentProps} />;
  });
}
