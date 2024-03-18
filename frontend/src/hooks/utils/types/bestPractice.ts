import { BestPractices } from 'API';

export type ICreatePracticeResponse = {
  createBrief: (unknown) => void;
  data?: BestPractices | null;
  loading: boolean;
  error?: Error;
};

export type IEditPracticeResponse = {
  editBrief: (unknown) => void;
  data?: BestPractices | null;
  loading: boolean;
  error?: Error;
};
