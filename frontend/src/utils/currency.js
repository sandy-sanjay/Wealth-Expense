export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return 'Rs 0.00';
  
  // Safely parse the value
  const numericAmount = Number(amount);
  
  // Use Intl.NumberFormat for robust Indian formatting, but replace the default symbol with Rs
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(numericAmount));

  // If negative, put the minus sign before Rs
  const sign = numericAmount < 0 ? '-' : '';
  
  // E.g: "-Rs 1,000.00"
  return `${sign}${formatted.replace('₹', 'Rs ')}`;
};

export const parseAmount = (value) => {
  if (!value) return 0;
  // Handle empty strings and inputs safely, stripping everything except numbers and decimals
  const cleaned = value.toString().replace(/[^0-9.-]+/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};
