import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const canonicalHost = "www.rok-mentalhealth.com";
const canonicalProtocol = "https";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  const forwardedHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? request.nextUrl.host;
  const isPaymentReturnPath =
    pathname === "/payment-return" || pathname === "/payment/result";

  if (isPaymentReturnPath && request.method === "POST") {
    return NextResponse.redirect(
      new URL(`/payment-return${search}`, `${canonicalProtocol}://${canonicalHost}`),
      303,
    );
  }

  const isNonCanonicalRequest =
    forwardedProto !== canonicalProtocol || forwardedHost !== canonicalHost;

  if (isNonCanonicalRequest) {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.protocol = canonicalProtocol;
    canonicalUrl.host = canonicalHost;
    return NextResponse.redirect(canonicalUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|icon.svg|.*\\..*).*)"],
};
