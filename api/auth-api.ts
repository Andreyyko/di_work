/**
 * Auth API client for Strapi backend.
 * Base URL: NEXT_PUBLIC_API_URL (обовʼязково заданий у env).
 *
 * Відповіді `/auth/me`, login/register повертають на клієнті лише «публічний» профіль
 * (див. `sanitizeAuthUser`) — без documentId, role, methodSections тощо.
 */

import {
  sanitizeAuthUser,
  type AuthUserPublic,
} from "@/lib/sanitizeAuthUser";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

const JWT_KEY = "rok_jwt";
const USER_KEY = "rok_user";
const RESET_CODE_KEY = "rok_reset_code";

function getErrorMessage(data: unknown, fallback = "Помилка запиту"): string {
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    if (obj.error !== undefined) {
      const err = obj.error;
      if (typeof err === "string") return err;
      if (err && typeof err === "object" && "message" in err) {
        const msg = (err as Record<string, unknown>).message;
        if (typeof msg === "string") return msg;
      }
    }
    if (typeof obj.message === "string") return obj.message;
  }
  return fallback;
  
}

type AuthFetchOptions = Omit<RequestInit, "body"> & { body?: object };

async function authFetch<T>(
  path: string,
  options: AuthFetchOptions
): Promise<T> {
  const { body, ...rest } = options;
  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = getErrorMessage(data);
    if (res.status === 404 && (msg === "Not Found" || msg === "not found")) {
      throw new Error(
          "Сервер не підтримує цей запит (404). Перевірте, що бекенд має ендпоінт GET /api/auth/me та POST /api/auth/profile."
      );
    }
    throw new Error(msg);
  }
  return data as T;
}

// --- JWT (localStorage, client-only) ---

export function getJwt(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(JWT_KEY);
}

export function setJwt(jwt: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(JWT_KEY, jwt);
}

export function clearJwt(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(JWT_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const sanitized = sanitizeAuthUser(JSON.parse(raw) as unknown);
    // Перезаписуємо сховище, якщо там ще лежала «повна» відповідь API (до sanitize).
    const slim = JSON.stringify(sanitized);
    if (slim !== raw) {
      localStorage.setItem(USER_KEY, slim);
    }
    return sanitized;
  } catch {
    return null;
  }
}

/** Зберігає лише безпечний піднабір полів (навіть якщо передати повну відповідь API). */
export function setStoredUser(user: unknown): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(sanitizeAuthUser(user)));
}

export { sanitizeAuthUser };

/** Код скидання пароля (sessionStorage), передається з verify-code на reset-password */
export function setResetCode(code: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(RESET_CODE_KEY, code);
}

export function getResetCode(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(RESET_CODE_KEY);
}

export function clearResetCode(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(RESET_CODE_KEY);
}

// --- Auth responses ---

/** Дані користувача на клієнті (без службових полів Strapi). */
export type AuthUser = AuthUserPublic;

export interface AuthResponse {
  jwt: string;
  user: AuthUser;
}

export interface OkResponse {
  ok: true;
  message?: string;
}

// --- Endpoints ---

/** POST /api/auth/register — одразу повертає JWT (без підтвердження email) */
export async function register(body: {
  email: string;
  username: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await authFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body,
  });
  return { ...res, user: sanitizeAuthUser(res.user) };
}

/** POST /api/auth/email/verify-code → JWT */
export async function verifyCode(body: {
  email: string;
  code: string;
}): Promise<AuthResponse> {
  const res = await authFetch<AuthResponse>("/auth/email/verify-code", {
    method: "POST",
    body,
  });
  return { ...res, user: sanitizeAuthUser(res.user) };
}

/** POST /api/auth/email/request-code */
export async function requestEmailCode(body: {
  email: string;
}): Promise<OkResponse> {
  return authFetch<OkResponse>("/auth/email/request-code", {
    method: "POST",
    body,
  });
}

/** POST /api/auth/local (login) */
export async function login(body: {
  identifier: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await authFetch<AuthResponse>("/auth/local", {
    method: "POST",
    body,
  });
  return { ...res, user: sanitizeAuthUser(res.user) };
}

/** POST /api/auth/password/request-code */
export async function requestPasswordCode(body: {
  email: string;
}): Promise<OkResponse> {
  return authFetch<OkResponse>("/auth/password/request-code", {
    method: "POST",
    body,
  });
}

/** POST /api/auth/password/reset */
export async function resetPassword(body: {
  email: string;
  code: string;
  password: string;
}): Promise<OkResponse> {
  return authFetch<OkResponse>("/auth/password/reset", {
    method: "POST",
    body,
  });
}

// --- Authenticated (JWT) endpoints ---

async function authFetchWithJwt<T>(
  path: string,
  options: AuthFetchOptions & { method: "GET" | "PUT" | "PATCH" | "POST" }
): Promise<T> {
  const jwt = getJwt();
  if (!jwt) {
    throw new Error("Необхідно увійти в систему");
  }
  return authFetch<T>(path, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${jwt}`,
    },
  });
}

/** GET /api/auth/me — профіль поточного користувача */
export async function getMe(): Promise<AuthUser> {
  const data = await authFetchWithJwt<unknown>("/auth/me", { method: "GET" });
  // Деякі реалізації можуть повертати масив (наприклад [user]) замість обʼєкта.
  if (Array.isArray(data)) {
    return sanitizeAuthUser(data[0] ?? {});
  }
  return sanitizeAuthUser(data ?? {});
}

/** POST /api/auth/profile — оновити профіль (username, email, password?) */
export async function updateMe(body: {
  username?: string;
  email?: string;
  password?: string;
}): Promise<AuthUser> {
  const data = await authFetchWithJwt<unknown>("/auth/profile", {
    method: "POST",
    body,
  });
  return sanitizeAuthUser(data);
}
