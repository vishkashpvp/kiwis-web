import { getLocale } from "@/lib/locale";

export function formatCurrency(amount: string | number, currency: string) {
  const locale = getLocale();

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      minimumFractionDigits: 2,
    }).format(Number(amount));
  } catch {
    // fallback for unknown currencies
    return `${currency} ${amount}`;
  }
}
