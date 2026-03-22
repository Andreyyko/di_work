const KEY_PREFIX = "wfp_order_ref";

export type PaymentKind = "mak" | "medium" | "premium" | "section";

function key(kind: PaymentKind): string {
  return `${KEY_PREFIX}:${kind}`;
}

export function saveOrderReference(kind: PaymentKind, orderReference: string): void {
  if (typeof window === "undefined") return;
  if (!orderReference) return;
  sessionStorage.setItem(key(kind), orderReference);
}

export function getOrderReference(kind: PaymentKind): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(key(kind));
}

export function clearOrderReference(kind: PaymentKind): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(key(kind));
}
