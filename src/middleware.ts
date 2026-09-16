import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/register"];
const AUTH_COOKIE_NAME = "shuttlevn.auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated = Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);
  const isPublicPath = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  if (!isAuthenticated) {
    if (isPublicPath) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
