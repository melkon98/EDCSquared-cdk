// import { BrandProfile } from "API";

export type UpdateBrandProps = {
  updateBrand: (unknown) => void;
  brand?: any;
  loading: boolean;
  error?: Error;
};

export type CreateBrandProps = {
  createBrand: (unknown) => void;
  brand?: any;
  loading: boolean;
  error?: Error;
};

export type GetBrandProfileProps = {
  loading: boolean;
  getBrand: (unknown) => void;
  brandData?: any;
  error?: Error;
};
