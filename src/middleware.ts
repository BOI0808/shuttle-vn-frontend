import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/register"];

const ROLE_HOME: Record<string, string> = {
  Admin: "/admin/dashboard",
  Employee: "/admin/dashboard",
  Customer: "/courts",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const userRole = request.cookies.get("userRole")?.value;

  const isPublicPath = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  const isAdminPath = pathname.startsWith("/admin");

  if (!accessToken) {
    if (isPublicPath) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicPath) {
    const home = ROLE_HOME[userRole ?? ""] ?? "/login";
    return NextResponse.redirect(new URL(home, request.url));
  }

  if (isAdminPath && userRole === "Customer") {
    return NextResponse.redirect(new URL("/courts", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
