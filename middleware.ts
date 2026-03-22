import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isPaymentReturnPath =
    pathname === "/payment-return" || pathname === "/payment/result";

  if (isPaymentReturnPath && request.method === "POST") {
    const redirectTo = `/payment-return${search}`;
    return NextResponse.redirect(new URL(redirectTo, request.url), 303);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/payment-return", "/payment/result"],
};
