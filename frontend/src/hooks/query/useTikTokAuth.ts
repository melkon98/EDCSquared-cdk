import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CreateCreativeRequestInput,
  CreateCreativeRequestMutation,
  CreativeRequestAuthorizationMutation,
  CreativeRequestAuthorizationMutationVariables,
  CreativeRequestUniqueIdMutation,
  CreativeRequestUniqueIdMutationVariables,
  SendContentSubmissionEmailQuery,
  SendContentSubmissionEmailQueryVariables,
} from 'API';
import {
  createCreativeRequest,
  creativeRequestAuthorization,
  creativeRequestUniqueId
} from 'graphql/mutations';
import { sendContentSubmissionEmail } from 'graphql/queries';
// import {
//   CreativeRequestAuthorizationReturn,
//   HandleCreativeRequestReturn,
//   HandleSendSubmissionEmail,
//   TCreativeUniqueId,
//   UpdateCreativeRequestReturn,
// } from 'hooks/utils';
import { getQuery } from 'hooks/utils/helpers';

export const handleCreativeRequest = () => {
  const [createTiktokRequest, { data, loading, error }] = useMutation<
    CreateCreativeRequestMutation,
    CreateCreativeRequestInput
  >(getQuery(createCreativeRequest));
  const errorData = error || (data ? undefined : new Error('No Data created'));
  return {
    loading,
    createTiktokRequest,
    data: data?.createCreativeRequest?.brandBriefId,
    error: errorData,
  };
};


export const SendSubmissionEmail = () => {
  const [sendEmail, { loading, error }] = useLazyQuery<
    SendContentSubmissionEmailQuery,
    SendContentSubmissionEmailQueryVariables
  >(getQuery(sendContentSubmissionEmail));
  return {
    loading,
    sendEmail,
    error,
  };
};

export const CreativeRequestAuthorization = () => {
  const [requestAuthorization, { data, loading, error }] = useMutation<
    CreativeRequestAuthorizationMutation,
    CreativeRequestAuthorizationMutationVariables
  >(getQuery(creativeRequestAuthorization));
  const errorData = error || (data ? undefined : new Error('No Data created'));
  return {
    loading,
    requestAuthorization,
    error: errorData,
  };
};

export const UseCreativeRequestUniqueId = () => {
  const [createCreativeUniqueId, { data, loading, error }] = useMutation<
    CreativeRequestUniqueIdMutation,
    CreativeRequestUniqueIdMutationVariables
  >(getQuery(creativeRequestUniqueId));
  return {
    loading,
    createCreativeUniqueId,
  };
};