import { decodeJwtPayload } from "@/lib/auth-cookie";

export type JwtVerifyResult =
  | { valid: true; mode: "signature" | "exp" }
  | { valid: false; reason: string };

/**
 * Edge-safe перевірка JWT для middleware.
 * Якщо задано STRAPI_JWT_SECRET / JWT_SECRET — повна верифікація підпису (jose).
 * Інакше — перевірка наявності та терміну дії (exp).
 */
export async function verifyJwtForEdge(token: string): Promise<JwtVerifyResult> {
  if (!token || token.split(".").length !== 3) {
    return { valid: false, reason: "malformed" };
  }

  const secret = process.env.STRAPI_JWT_SECRET || process.env.JWT_SECRET;
  if (secret) {
    try {
      const { jwtVerify } = await import("jose");
      await jwtVerify(token, new TextEncoder().encode(secret));
      return { valid: true, mode: "signature" };
    } catch {
      return { valid: false, reason: "invalid_signature" };
    }
  }

  const payload = decodeJwtPayload(token);
  const exp = payload?.exp;
  if (typeof exp !== "number") {
    return { valid: false, reason: "no_exp" };
  }
  if (exp * 1000 <= Date.now()) {
    return { valid: false, reason: "expired" };
  }
  return { valid: true, mode: "exp" };
}
