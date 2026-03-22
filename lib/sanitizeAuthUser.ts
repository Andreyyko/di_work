/**
 * З відповіді GET /api/auth/me (та login/register) Strapi може повертати багато службових полів
 * (documentId, role, methodSections, provider, timestamps…). У localStorage і в типі AuthUser
 * тримаємо лише те, що потрібно UI та перевіркам доступу — без зайвих внутрішніх даних.
 */

/** Тільки поля, які потрібні інтерфейсу та логіці доступу (решта з API не зберігаємо). */
export type AuthUserPublic = {
  id: number;
  username: string;
  email: string;
  confirmed?: boolean;
  blocked?: boolean;
  makCardsAccess?: boolean;
  isMedium?: boolean;
  isPremium?: boolean;
  makFavoriteCardIds?: string[];
};

function num(v: unknown): number {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isNaN(n) ? 0 : n;
  }
  return 0;
}

export function sanitizeAuthUser(raw: unknown): AuthUserPublic {
  if (!raw || typeof raw !== "object") {
    return { id: 0, username: "", email: "" };
  }
  const o = raw as Record<string, unknown>;

  const favRaw = o.makFavoriteCardIds;
  const makFavoriteCardIds = Array.isArray(favRaw)
    ? favRaw.filter((x): x is string => typeof x === "string")
    : undefined;

  const out: AuthUserPublic = {
    id: num(o.id),
    username: typeof o.username === "string" ? o.username : "",
    email: typeof o.email === "string" ? o.email : "",
  };

  if (typeof o.confirmed === "boolean") out.confirmed = o.confirmed;
  if (typeof o.blocked === "boolean") out.blocked = o.blocked;
  if (o.makCardsAccess === true) out.makCardsAccess = true;
  if (o.isMedium === true) out.isMedium = true;
  if (o.isPremium === true) out.isPremium = true;
  if (makFavoriteCardIds && makFavoriteCardIds.length > 0) {
    out.makFavoriteCardIds = makFavoriteCardIds;
  }

  return out;
}
