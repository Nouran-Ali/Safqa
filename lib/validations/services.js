export const formatNumber = (NUM) => {
  const num = NUM || 0;
  // Convert number to string and split into integer and decimal parts
  const parts = num.toFixed(2).toString().split('.');

  // Insert commas every three digits in the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join integer and decimal parts with a period
  return parts.join('.');
};

export const USDConvertCurrency = ({ amount, rate, toUsd }) => {
  if (toUsd) {
    return amount / rate;
  } else {
    return amount * rate;
  }
};

export const MinusSafqaPercent = (amount) => {
  return amount - amount * 0.05;
};
