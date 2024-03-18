import { AuthStateType } from 'hooks/utils';
import { IProfileState, IUpdateBrendProfile, IUpdateCreatorProfile } from 'state/profileSteps';
import { FlattenSimpleInterpolation } from 'styled-components';

// WTF???
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnknownType = any;

export const initialChatContext = {
  recentMessages: [],
  isActiveConvo: null,
};

export type StyledProps = FlattenSimpleInterpolation | string;
export type AuthProps = {
  authState: AuthStateType;
  getAuth: () => void;
  setAuthState: React.Dispatch<React.SetStateAction<AuthStateType>>;
};
export type ProfileProps = {
  profileState: IProfileState;
  refetchProfile: (force?: boolean) => void;
  editBrandProfile: (input: IUpdateBrendProfile) => Promise<unknown>;
  setProfileState: React.Dispatch<React.SetStateAction<IProfileState>>
  editCreatorProfile: (input: IUpdateCreatorProfile) => void;
  updateProfileData: IProfileState;
  cleanProfileState: () => void;
  updateProfileLoading: boolean;
};
export interface IReturnTypeGetStripeProduct {
  productName: string;
  amount: number;
}

export const toastDelayTime = 6000;
export enum AuthType {
  Login = 'login',
  Register = 'register',
  Reverify = 'reverify',
}

export const shouldUseIntercom = process.env.REACT_APP_USE_INTERCOM === 'true';
export const useAnalytics = process.env.REACT_APP_USE_ANALYTICS === 'true';
export const sentryDSN =
  !process.env.REACT_APP_IS_DEV && process.env.REACT_APP_SENTRY_DSN;

export enum LoaderColors {
  Purple = '#4c40f7',
  White = '#FFF',
}

export const allowedSubDomains = ['localhost', 'sa', 'staging'];

export enum TransactionStatus {
  Approved = 'Approved',
  Rejected = 'Rejected',
  Pending = 'Pending'
}
