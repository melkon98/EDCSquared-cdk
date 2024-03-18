import { GPT_RESPONSE } from 'API';

export type GetSuggestionsProps = {
  getSuggestions: (unknown) => void;
  suggestions?: GPT_RESPONSE | null;
  loading: boolean;
  error?: Error;
};
