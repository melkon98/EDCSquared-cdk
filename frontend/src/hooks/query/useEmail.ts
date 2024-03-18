import { useLazyQuery } from '@apollo/client';
import { CreativeRequestStatusEmailQuery, CreativeRequestStatusEmailQueryVariables, SendEmailQuery, SendEmailQueryVariables } from 'API';

import { creativeRequestStatusEmail, sendEmail } from 'graphql/queries';
import { UseSendEmailProps } from 'hooks/utils';
import { getQuery } from 'hooks/utils/helpers';

export const useSendEmail = (): UseSendEmailProps => {
  const [sendEmailData, { data, loading, error }] = useLazyQuery<
    SendEmailQuery,
    SendEmailQueryVariables
  >(getQuery(sendEmail));
  return { loading, sendEmailData, data, error };
};

export const useRequestStatusSendEmail = (): UseSendEmailProps => {
  const [sendEmailData, { data, loading, error }] = useLazyQuery<
    CreativeRequestStatusEmailQuery,
    CreativeRequestStatusEmailQueryVariables
  >(getQuery(creativeRequestStatusEmail));
  return { loading, sendEmailData, data, error };
};
