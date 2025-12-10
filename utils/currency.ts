export function formatCurrency(
  amount: string | number,
  currency: string,
  locale: string = "en-IN"
) {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Number(amount));
  } catch {
    // fallback for unknown currencies
    return `${currency} ${amount}`;
  }
}
