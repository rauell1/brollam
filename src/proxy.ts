import { NextResponse, type NextRequest } from "next/server";
import { peekSession, SESSION_COOKIE } from "@/lib/auth/session";

/**
 * Optimistic admin gate. Full verification happens again inside the
 * admin layout and every server action; this proxy only keeps anonymous
 * traffic away from protected segments with a fast signed-cookie check.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    const session = peekSession(request.cookies.get(SESSION_COOKIE)?.value);
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  const session = peekSession(request.cookies.get(SESSION_COOKIE)?.value);
  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
