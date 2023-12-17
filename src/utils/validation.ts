import { isValidPhoneNumber } from 'react-phone-number-input';

export const isValidMobile = (phonenumber: unknown) => {
  if (!phonenumber) return false;
  return isValidPhoneNumber(phonenumber.toString());
};

export const isValidMobileMsg = (phonenumber: unknown) => {
  if (!phonenumber) return { message: 'Please enter phone numberI' };
  if (!isValidPhoneNumber(phonenumber.toString())) return { message: 'Phone number is not valid!' };
  return { message: '' };
};
