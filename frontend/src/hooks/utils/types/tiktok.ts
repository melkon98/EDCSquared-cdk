export type HandleCreativeRequestReturn = {
  createTiktokRequest: (unknown) => void;
  data?: string | null;
  loading: boolean;
  error?: Error;
};

export type UpdateCreativeRequestReturn = {
  updateTiktokRequest: (unknown) => void;
  data?: string | null;
  loading: boolean;
  error?: Error;
};

export type HandleCreativeIspirationReturn = {
  createCreativeIspiration: (unknown) => Promise<object>;
  data?: string | null;
  loading: boolean;
  error?: Error;
};

export type HandleSendSubmissionEmail = {
  sendEmail: (unknown) => Promise<object>;
  loading: boolean;
  error?: Error;
};

export type CreativeRequestAuthorizationReturn = {
  requestAuthorization: (unknown) => Promise<object>;
  loading: boolean;
  error?: Error;
};

export type TCreativeUniqueId = {
  createCreativeUniqueId: (unknown) => Promise<object>;
  loading: boolean;
  error?: Error;
};