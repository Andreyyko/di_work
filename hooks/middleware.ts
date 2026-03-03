import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const hasSubscription = req.cookies.get('subscription')?.value === 'active'

  if (!hasSubscription && req.nextUrl.pathname.startsWith('/cards')) {
    return NextResponse.redirect(new URL('/mak-gallery', req.url))
  }

  return NextResponse.next()
}
