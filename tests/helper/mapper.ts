export const currencyMapper = (currency: string): string => {
  const currencySymbol: Record<string, string> = {
    USD: '$',
    EUR: '€',
  };
  return currencySymbol[currency] ?? '';
};
