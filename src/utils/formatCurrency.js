
export const formatCurrency = (amount, currencyCode = 'BDT', minimumFractionDigits = 2) => {
  const locale = currencyCode === 'USD' ? 'en-US' : 'en-BD';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode, minimumFractionDigits }).format(amount);
};

export const getCurrencySymbol = (currencyCode) => {
  return formatCurrency(0, currencyCode).replace(/[\d.,\s]/g, '');
};
