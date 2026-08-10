import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Determine user location using standard Vercel edge headers
  const country = request.headers.get('x-vercel-ip-country');
  const region = request.headers.get('x-vercel-ip-country-region');

  let strictness = 'GLOBAL';

  // GDPR countries (EU + UK)
  const gdprCountries = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB'
  ];

  if (country && gdprCountries.includes(country)) {
    strictness = 'GDPR';
  } else if (country === 'US' && region === 'CA') {
    strictness = 'CCPA';
  }

  // Clone headers and add strictness
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-privacy-strictness', strictness);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Optionally, don't run middleware on static files and images
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - media (public media files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|media).*)',
  ],
};
