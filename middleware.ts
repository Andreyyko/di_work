import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_JWT_COOKIE } from "@/lib/auth-cookie";
import { buildSignInRedirectUrl, isProtectedPath } from "@/lib/protected-routes";
import { verifyJwtForEdge } from "@/lib/verify-jwt-edge";

const canonicalHost = "www.rok-mentalhealth.com";
const canonicalProtocol = "https";
const localHosts = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isDevelopment = process.env.NODE_ENV === "development";
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  const forwardedHost =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    request.nextUrl.host;
  const normalizedHost = forwardedHost.split(",")[0]?.trim() ?? request.nextUrl.host;
  const forwardedHostname = normalizedHost.split(":")[0] ?? request.nextUrl.hostname;
  const requestHostname = request.nextUrl.hostname;
  const isLocalRequest =
    localHosts.has(requestHostname) || localHosts.has(forwardedHostname);
  const isPaymentReturnPath =
    pathname === "/payment-return" || pathname === "/payment/result";

  if (!isDevelopment && !isLocalRequest && isPaymentReturnPath && request.method === "POST") {
    return NextResponse.redirect(
      new URL(`/payment-return${search}`, `${canonicalProtocol}://${canonicalHost}`),
      303,
    );
  }

  const isNonCanonicalRequest =
    forwardedProto !== canonicalProtocol || normalizedHost !== canonicalHost;

  if (!isDevelopment && !isLocalRequest && isNonCanonicalRequest) {
    const canonicalUrl = new URL(
      `${pathname}${search}`,
      `${canonicalProtocol}://${canonicalHost}`,
    );
    return NextResponse.redirect(canonicalUrl, 308);
  }

  if (isProtectedPath(pathname)) {
    const token = request.cookies.get(AUTH_JWT_COOKIE)?.value;
    if (!token) {
      const signIn = buildSignInRedirectUrl(pathname, search);
      return NextResponse.redirect(new URL(signIn, request.url));
    }

    const verification = await verifyJwtForEdge(token);
    if (!verification.valid) {
      const signIn = buildSignInRedirectUrl(pathname, search);
      const res = NextResponse.redirect(new URL(signIn, request.url));
      res.cookies.delete(AUTH_JWT_COOKIE);
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|icon.svg|.*\\..*).*)"],
};
