export const formatPrice = (
  price: number,
  locale = 'fa-IR',
) => {
  if (typeof price !== 'number') {
    return price;
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatNumber = (number: number, locale = 'fa-IR') => {
  if (typeof number !== 'number') {
    return number;
  }

  return new Intl.NumberFormat(locale).format(number);
};