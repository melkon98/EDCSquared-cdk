import { Bounce, ToastOptions } from "react-toastify";

export const apiInitialState = {
  isLoading: false,
  data: null,
  error: null,
  success: false,
};

export const initialAuthContext = {
  isLoggedIn: null,
  email: null,
  isVerified: null,
  userId: null,
  isLoading: false,
};

export const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const SWIFT_CODE_VALIDATION_REGEX =
  /^[A-Za-z]{4}[A-Za-z]{2}[0-9A-Za-z]{2}([0-9A-Za-z]{3})?$/;

//eslint-disable-next-line
export const POSTAL_CODE_VALIDATION_REGEX = new RegExp(`/^[\d]{5}$/`);

export enum HttpStatus {
  SUCCESS = 200,
  INTERNAL_SERVER_ERROR = 500,
}

export const LONG_DATE_FORMAT = 'EEE MMM dd yyyy';

export const MONTH_OPTIONS: { value: string; text: string }[] = [
  { value: 'JAN', text: 'January' },
  { value: 'FEB', text: 'February' },
  { value: 'MAR', text: 'March' },
  { value: 'APR', text: 'April' },
  { value: 'MAY', text: 'May' },
  { value: 'JUN', text: 'June' },
  { value: 'JUL', text: 'July' },
  { value: 'AUG', text: 'August' },
  { value: 'SEP', text: 'September' },
  { value: 'OCT', text: 'October' },
  { value: 'NOV', text: 'November' },
  { value: 'DEC', text: 'December' },
];

export const MONTH_INDICES: Record<string, number>[] = [
  { JAN: 1 },
  { FEB: 2 },
  { MAR: 3 },
  { APR: 4 },
  { MAY: 5 },
  { JUN: 6 },
  { JUL: 7 },
  { AUG: 8 },
  { SEP: 9 },
  { OCT: 10 },
  { NOV: 11 },
  { DEC: 12 },
];

export const NORMAL_DATE_FORMAT = 'EEE MMM dd yyyy';
export const SHORT_DATE_FORMAT = 'yyyy-mm-dd';
export const DATE_FORMAT = 'dd/MM/yy HH:mm';
export const TWO_DAYS_IN_SECONDS = 48 * 3600;


export const verticalOptions = [
  {
    text: 'Healthcare and Pharmaceuticals',
    value: 'healthcare-and-pharmaceuticals',
  },
  { text: 'Consumer goods and Retail', value: 'consumer-goods-and-retail' },
  { text: 'Food and Beverage', value: 'food-and-beverage' },
  { text: 'Technology and Electronics', value: 'technology-and-electronics' },
  { text: 'Financial Services', value: 'financial-services' },
  { text: 'Education and E-Learning', value: 'education-and-e-Learning' },
  { text: 'Hospitality and Tourism', value: 'hospitality-and-tourism' },
  {
    text: 'Automotive and Transportation',
    value: 'automotive-and-transportatio',
  },
  {
    text: 'Real Estate and Construction',
    value: 'real-estate-and-construction',
  },
  { text: 'Media and Entertainment', value: 'media-and-entertainment' },
  { text: 'Energy and Utilities', value: 'energy-and-utilities' },
  {
    text: 'Manufacturing and Industrial',
    value: 'manufacturing-and-industrial',
  },
  { text: 'Agriculture and Farming', value: 'agriculture-and-farming' },
  { text: 'Sports and Fitness', value: 'sports-and-fitness' },
  { text: 'Beauty and Personal Care', value: 'beauty-and-personal-care' },
  { text: 'Nonprofit and Social Impact', value: 'nonprofit-and-social-impact' },
  { text: 'Fashion and Apparel', value: 'fashion-and-apparel' },
  {
    text: 'Government and Public Services',
    value: 'government-and-public-services',
  },
  {
    text: 'Telecommunications and Communication',
    value: 'telecommunications-and-communication',
  },
  { text: 'Logistics and Supply Chain.', value: 'logistics-and-supply-chain' },
];


export const TOAST_CONFIG: ToastOptions = {
  position: 'top-center',
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
};