import type { AuthUser } from "@/api/auth-api";
import { generateCertificate } from "@/hooks/generateCertificate";

const STORAGE_PREFIX = "rok_premium_cert_done:";

/**
 * Після успішної оплати Premium — один раз за сесію/замовленням завантажити PDF-сертифікат.
 */
export async function downloadPremiumCertificateIfNeeded(
  me: AuthUser,
  orderReference: string | null
): Promise<void> {
  if (me.isPremium !== true) return;
  if (typeof window === "undefined") return;

  const key = orderReference
    ? `${STORAGE_PREFIX}${orderReference}`
    : `${STORAGE_PREFIX}_no_ref`;

  if (sessionStorage.getItem(key)) return;

  try {
    await generateCertificate(me.username || me.email || "Користувач");
    sessionStorage.setItem(key, "1");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[premium certificate] failed:", err);
  }
}
