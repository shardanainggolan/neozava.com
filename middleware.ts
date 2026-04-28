import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const NOINDEX = "noindex, nofollow";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;

  if (!token && pathname !== "/admin/login") {
    const res = NextResponse.redirect(new URL("/admin/login", request.url));
    res.headers.set("X-Robots-Tag", NOINDEX);
    return res;
  }

  if (token && pathname === "/admin/login") {
    const res = NextResponse.redirect(new URL("/admin/adira", request.url));
    res.headers.set("X-Robots-Tag", NOINDEX);
    return res;
  }

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", NOINDEX);
  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
