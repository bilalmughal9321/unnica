export const formatCardNumber = (cardNumber: string): string => {
  // Ensure that the input is a string and has 16 characters
  if (cardNumber.length !== 16) {
    throw new Error('Card number must be exactly 16 digits');
  }

  // Regular expression to add a space after every 4 digits
  return cardNumber.replace(/(.{4})/g, '$1 ').trim();
};
