import {
  POSTAL_CODE_VALIDATION_REGEX,
  SWIFT_CODE_VALIDATION_REGEX,
} from '../../hooks/utils';

export const validateEmail = (email: string): string | null => {
  const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (email.length < 1) {
    return 'Please enter your email address';
  }
  if (!emailRegExp.test(email)) {
    return 'Please enter the correct email address';
  }
  return null;
};

export const validatePassword = ({ password, name }): string | null => {
  if (password.length < 1) {
    return `Please enter your ${name}`;
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  return null;
};

export const validateConfirmPassword = ({
  password,
  confirmPassword,
}): string | null => {
  if (confirmPassword.length < 1) {
    return 'Please enter your confirm password';
  }
  if (password !== confirmPassword) {
    return 'New password does not match.';
  }
  return null;
};

export const validateFullName = (text: string, name: string): string | null => {
  if (text.length < 1) return `Please enter your ${name}`;
  return null;
};

export const validatePhoneNumber = (text: string): string | null => {
  if (text.length < 1) return `Please enter your Mobile number`;
  return null;
};

export const validateUserEmail = (text: string): string | null => {
  if (text.length < 1) return 'Please enter your email';
  return null;
};

export const validateDescription = (text: string): string | null => {
  if (text.length < 1) return 'Please enter your description';
  return null;
};

export const validateTiktokHandle = (text: string): string | null => {
  if (text.length < 1) return 'Please enter your tiktok handle';
  return null;
};

export const validatePaymentForm = (
  text: string,
  name: string
): string | null => {
  if (text.length < 1) return `Please enter your ${name}`;
  if (text.length > 35) return `${name} must be less than 35 characters`;
  return null;
};
export const validatePaymentFormFullName = (
  text: string,
  name: string
): string | null => {
  const specialChars = /[^a-zA-Z ]/g;
  if (text.length < 1) return `Please enter your ${name}`;
  if (text.match(specialChars)) return `Can be only letters`;
  if (text.length > 35) return `${name} must be less than 35 characters`;
  return null;
};

export const validatePaymentFormAddress = (
  text: string,
  name: string
): string | null => {
  const specialChars = /[^a-zA-Z0-9 ,-./]/g;
  if (text.length < 1) return `Please enter your ${name}`;
  if (text.length > 35) return `${name} must be less than 35 characters`;
  if (text.match(specialChars)) return `Can not be special characters`;
  return null;
};

export const validatePostCode = (code: string) => {
  console.log('Post code :: ', code);
  return !code
    ? 'Post code is required'
    : POSTAL_CODE_VALIDATION_REGEX.test(code)
    ? code
    : 'Invalid post code';
};

export const validatePaymentFormSwiftCode = (text: string): string | null => {
  if (!text.length || (text.length < 8 && text.length > 11)) {
    return 'Swift code must be 8 to 11 characters';
  }

  if (!SWIFT_CODE_VALIDATION_REGEX.test(text)) {
    return 'Invalid swift code';
  }

  return null;
};

export const validatePaymentFormAccountNumber = (
  text: string
): string | null => {
  const specialChars = /[^A-Z0-9]/g;
  if (text.length < 1) return `Please enter your Account number`;
  if (text.length > 22) return 'Account number code must be 20 characters';
  if (text.match(specialChars))
    return `Can not be special characters or lower case`;
  return null;
};

export const validatePaymentFormDocumentId = (
  text: string,
  name: string
): string | null => {
  const specialChars = /[^a-zA-Z0-9 -]/g;
  if (text.length < 1) return `Please enter your ${name}`;
  if (text.length > 35) return `${name} must be less than 35 characters`;
  if (text.match(specialChars)) return `Can not be special characters`;
  return null;
};

export const validateVerificationCode = (code: string): string | null => {
  const digitMatcher = /^[0-9]{1,}$/;
  const lengthMatcher = /^.{6}$/;
  if (!digitMatcher.test(code)) return 'Invalid character. Input only digits';
  if (!lengthMatcher.test(code)) return 'Invalid character length';
  return null;
};
