import { ApolloError } from '@apollo/client';
import { BestPractices } from 'API';
import {
  ICreateBestPractice,
  ICreateBestPracticeError,
} from 'state/bestPractice';

export const initialCreatePracticeState: ICreateBestPractice = {
  headLine: '',
  description: '',
  urlPath: '',
  active: 'true',
  id: '',
};

export const initialCreatePracticeError: ICreateBestPracticeError = {
  headLine: null,
  description: null,
  urlPath: null,
};

export type ListAllBestPracticeProps = {
  loading: boolean;
  getAllPractice: (unknown) => void;
  data?: Array<BestPractices | null> | null;
  nextToken?: string | null;
  error?: ApolloError | null;
};
