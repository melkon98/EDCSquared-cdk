import { BrandProfile, CreateBrandProfileInput } from 'API';

export interface BrandProps {
  updateData: (data: CreateBrandProfileInput) => void;
  data?: BrandProfile;
  brandLoading?: boolean;
}

export interface IMeterValue {
  percentage: number;
  degree: number;
}

export interface IBrandFormState {
  tiktok?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
}
