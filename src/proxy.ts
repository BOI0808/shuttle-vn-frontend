import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/register", "/courts", "/lookup"];
const AUTH_COOKIE_NAME = "shuttlevn.auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated = Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);
  const isPublicPath = PUBLIC_PATHS.some(
      (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (!isAuthenticated) {
    if (isPublicPath) return NextResponse.next();
    return NextResponse.redirect(new URL("/courts", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
