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
