import { UnknownType } from 'utils';

export type UseSendEmailProps = {
  sendEmailData: (unknown) => void;
  data?: UnknownType;
  loading: boolean;
  error?: Error;
};
