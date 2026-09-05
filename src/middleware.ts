import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/register"];

const ROLE_HOME: Record<string, string> = {
  Admin: "/dashboard",
  Employee: "/dashboard",
  Customer: "/courts",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lấy auth state từ localStorage không khả thi trong middleware (server-side)
  // Dùng cookie thay thế — auth store cần persist accessToken vào cookie
  const accessToken = request.cookies.get("accessToken")?.value;
  const userRole = request.cookies.get("userRole")?.value;

  const isPublicPath = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  const ADMIN_ROOT_PATHS = [
    "/dashboard",
    "/schedule",
    "/payments",
    "/customers",
    "/manage-courts",
  ];
  const isAdminPath = ADMIN_ROOT_PATHS.some((p) => pathname.startsWith(p));

  // Chưa login
  if (!accessToken) {
    if (isPublicPath) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Đã login mà vào /login, /register → redirect về trang chủ của role
  if (isPublicPath) {
    const home = ROLE_HOME[userRole ?? ""] ?? "/login";
    return NextResponse.redirect(new URL(home, request.url));
  }

  // Vào /admin/* mà không phải Admin hoặc Employee
  if (isAdminPath && userRole === "Customer") {
    return NextResponse.redirect(new URL("/courts", request.url));
  }

  // Customer vào /courts → ok
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
