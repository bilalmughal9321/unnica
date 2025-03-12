import {Dimensions, Platform} from 'react-native';

export const formatCardNumber = (cardNumber: string): string => {
  // Remove any spaces from the input string
  const sanitizedCardNumber = cardNumber.replace(/\s+/g, '');

  // Ensure that the input is a string and has 16 characters
  if (sanitizedCardNumber.length !== 16) {
    throw new Error('Card number must be exactly 16 digits');
  }

  // Regular expression to add a space after every 4 digits
  return sanitizedCardNumber.replace(/(.{4})/g, '$1 ').trim();
};

export const Constant = {
  backgroundColor: '#1A1A1A',
  themeYellowColor: '#D6A53D',
  whiteColor: 'white',
};

export const hasNotch = () => {
  const {height, width} = Dimensions.get('window');
  const aspectRatio = height / width;

  return (
    Platform.OS === 'ios' &&
    (aspectRatio > 2.1 || (width >= 375 && height >= 812))
  );
};

export const normalize = (size: number) => {
  const {width} = Dimensions.get('window');
  const scale = width / 375;
  return size * scale;
};

import Toast from 'react-native-simple-toast';
export const toaster = (props: string) => {
  Toast.show(props, Toast.SHORT);
};

export const formatDate = (dateString: string) => {
  // 28th feb, 2025 -> 28/02/2025
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); // "en-GB" format return DD/MM/YYYY
};

//  Clear Local Data
export const clearData: boolean = true;

// Check validity of US number
export const isValidUSPhoneNumber = (phone: string) => {
  const regex = /^\+1\d{10}$/;
  return regex.test(phone);
};

export const formatUSPhoneNumber = (phone: string) => {
  console.log('phone: ', phone);
  const regex = /^\+1\s?(\d{3})(\d{3})(\d{4})$/;

  if (!regex.test(phone)) return 'Invalid number format';

  return phone.replace(regex, '+1 ($1) $2-$3');
};

export const dateFormateUS = (date: Date) => {
  const today = date;
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Ensure two digits for month
  const day = String(today.getDate()).padStart(2, '0'); // Ensure two digits for day
  const year = today.getFullYear();

  const formattedDate = `${month}/${day}/${year}`;
  console.log(formattedDate); // Output: 03/12/2025
  return formattedDate;
};
