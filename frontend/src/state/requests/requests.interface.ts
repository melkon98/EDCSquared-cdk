import { CreateManualAdMutationVariables, CreativeRequest } from 'API';
import { UnknownType } from 'utils';

export interface ITiktokVideo {
  videoUrl?: string;
  previewUrl?: string;
}

export interface ViewRequestProps {
  approveRequest: (
    createAdPayload: UnknownType,
    adName: string,
    request: CreativeRequest | null
  ) => void;
  approveMetaAd: (createAdPayload) => void;
  approveManualAd: (payload: CreateManualAdMutationVariables) => void;
  rejectRequest: (
    comments: string,
    creativeRequest: CreativeRequest,
    sendEmail: boolean
  ) => void;
  getVideoLink: (id?: string) => void;
  loading: boolean;
  tiktokVideo?: ITiktokVideo;
  errorMsg?: string;
  isSuccess: boolean;
  metaLoading: boolean;
  createMetaAdResponse: unknown;
  createAdResponse: string | boolean | null | undefined;
}
