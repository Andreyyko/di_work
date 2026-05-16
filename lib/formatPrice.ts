export function formatPrice(amount: number, currency = "UAH"): string {
  if (currency === "UAH") {
    return `${amount} ₴`;
  }
  return `${amount} ${currency}`;
}
