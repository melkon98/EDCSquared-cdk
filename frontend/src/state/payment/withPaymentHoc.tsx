import {
  USER_TYPES,
  UpdateUserPaymentDetailsInput,
  UserTransactions,
} from 'API';
import {
  createUserPayment,
  useValidateTiktokAccessToken,
  GetUserPaymentDetails,
  getUserProfile,
  UpdateUserPayment,
  UseUpdateUserProfile,
} from 'hooks';
import withApolloProvider from 'hooks/apollo/withApollo';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from 'state/auth';
import { AuthContextType } from 'state/types/authTypes';
import { initialProfileState, ProfileProps } from 'utils';
import { isArray } from 'lodash';
import { IPayment } from 'state/payment';
import { ProfileContext } from 'state/profileSteps';

interface HocProps {
  shouldCallApi?: boolean;
}

export function withPayment<T>(
  Component: React.FC<T & HocProps>
): React.FC<T & HocProps> {
  return withApolloProvider((props: T & HocProps) => {
    // const { shouldCallApi } = props;

    return <Component {...props} />;
  });
}
