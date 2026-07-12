import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Protect /admin/* (except /admin/login) and /api/admin/*.
 *
 * - For unauthenticated /api/admin/* requests → return 401 JSON.
 * - For unauthenticated /admin/* (non-login) requests → redirect to /admin/login.
 * - /admin/login is public.
 *
 * Public exceptions on /api/admin/*:
 *  - GET /api/admin/cv  (returns whether a CV is uploaded + its path)
 *
 * Uses `getToken` from `next-auth/jwt` so we can decide per-route whether to
 * redirect (HTML pages) or return JSON (API).
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public: the login page itself.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Public: GET /api/admin/cv (lets the public site know if a CV exists).
  if (pathname === "/api/admin/cv" && req.method === "GET") {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token) {
    return NextResponse.next();
  }

  // Unauthenticated.
  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // HTML admin page — redirect to login with callbackUrl.
  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

