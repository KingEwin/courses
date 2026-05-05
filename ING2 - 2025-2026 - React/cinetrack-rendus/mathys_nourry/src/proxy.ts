import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Read the NextAuth session token from cookies (edge-compatible, no DB)
function hasSessionToken(request: NextRequest): boolean {
  const secureCookie = request.cookies.get("__Secure-authjs.session-token");
  const plainCookie = request.cookies.get("authjs.session-token");
  return !!(secureCookie?.value || plainCookie?.value);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (isAuthPage) return NextResponse.next();

  if (!hasSessionToken(request)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
