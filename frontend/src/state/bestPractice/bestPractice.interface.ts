import { BestPractices } from 'API';

export interface BestPracticeProps {
  saveData: (data: ICreateBestPractice) => void;
  bestPracticeState?: ICreateBestPractice;
  loading: boolean;
  response?: BestPractices | null;
}

export interface ICreateBestPractice {
  headLine: string;
  description: string;
  urlPath: string;
  active: string;
  id?: string;
}
export interface ICreateBestPracticeError {
  headLine: string | null;
  description: string | null;
  urlPath: string | null;
}
