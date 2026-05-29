/** Маршрути, що потребують JWT (перевірка в Edge Middleware). */
export const PROTECTED_PATH_PREFIXES = ["/profile", "/mak-cards"] as const;

export function isProtectedPath(pathname: string): boolean {
  if (PROTECTED_PATH_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return true;
  }
  // /methodics-sections/:category(/:methodic) — платний контент
  return /^\/methodics-sections\/[^/]+/.test(pathname);
}

export function buildSignInRedirectUrl(pathname: string, search: string): string {
  const returnUrl = `${pathname}${search}`;
  return `/auth/sign-in?returnUrl=${encodeURIComponent(returnUrl)}`;
}
