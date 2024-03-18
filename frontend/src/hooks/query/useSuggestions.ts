import { useLazyQuery } from '@apollo/client';
import { GetGPTresponseQuery, GetGPTresponseQueryVariables } from 'API';
import { getGPTresponse } from 'graphql/queries';
import { GetSuggestionsProps } from 'hooks/utils';
import { getQuery } from 'hooks/utils/helpers';

export const useGetSuggestions = (): GetSuggestionsProps => {
  const [getSuggestions, { data, loading, error }] = useLazyQuery<
    GetGPTresponseQuery,
    GetGPTresponseQueryVariables
  >(getQuery(getGPTresponse), { fetchPolicy: 'no-cache' });
  const suggestions = data?.getGPTresponse || null;
  const errorData =
    error || (suggestions ? undefined : new Error('No Suggestions'));
  return {
    loading,
    getSuggestions,
    suggestions,
    error: errorData,
  };
};
