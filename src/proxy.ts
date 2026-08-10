import { NextResponse, type NextRequest } from "next/server";
import { peekSession, SESSION_COOKIE } from "@/lib/auth/session";

const EU_COUNTRY_CODES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 
  'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 
  'SI', 'ES', 'SE', 'GB'
];

/**
 * Optimistic admin gate and Consent Geolocation logic.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Admin Gate Logic
  if (pathname.startsWith("/admin")) {
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
  }

  // 2. Geolocation & Consent Defaults Logic
  const country = request.headers.get('x-vercel-ip-country') || 'US';
  const region = request.headers.get('x-vercel-ip-city-region') || '';

  let consentStrictness = 'GLOBAL'; // Default: Opt-out (loose)

  if (EU_COUNTRY_CODES.includes(country)) {
    consentStrictness = 'GDPR'; // Strict Opt-In
  } else if (country === 'US' && region === 'CA') {
    consentStrictness = 'CCPA'; // Opt-Out + "Do Not Sell"
  }

  const response = NextResponse.next();
  // Pass the strictness to the frontend via headers (can be read in server components)
  response.headers.set('x-consent-strictness', consentStrictness);

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|media|favicon.ico).*)',
  ],
};
