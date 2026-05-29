/** Cookie name — синхронізується з localStorage JWT для Edge Middleware. */
export const AUTH_JWT_COOKIE = "rok_jwt";

const DEFAULT_MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

export function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const b64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const json =
      typeof globalThis.atob === "function"
        ? globalThis.atob(b64)
        : Buffer.from(b64, "base64").toString("utf8");
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function jwtCookieMaxAgeSec(token: string): number {
  const payload = decodeJwtPayload(token);
  const exp = payload?.exp;
  if (typeof exp === "number" && exp > 0) {
    const remaining = Math.floor(exp - Date.now() / 1000);
    return remaining > 60 ? remaining : 60;
  }
  return DEFAULT_MAX_AGE_SEC;
}

/** Client: записати JWT у cookie для middleware (поряд з localStorage). */
export function syncJwtCookie(jwt: string): void {
  if (typeof document === "undefined") return;
  const maxAge = jwtCookieMaxAgeSec(jwt);
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${AUTH_JWT_COOKIE}=${encodeURIComponent(jwt)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
}

/** Client: видалити JWT cookie. */
export function clearJwtCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_JWT_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}
