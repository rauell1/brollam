import { NextResponse } from 'next/server';
import { requireFullAdmin } from '@/lib/auth/guard';

export async function POST(req: Request) {
  try {
    // Check auth
    await requireFullAdmin();

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    // In a real headless implementation, we would use puppeteer.
    // Here we perform a lightweight fetch and regex scan of the HTML to find tracker scripts.
    const response = await fetch(baseUrl);
    const html = await response.text();

    const trackers = [];
    let uncategorizedCount = 0;

    // Look for known signatures
    if (html.includes('google-analytics') || html.includes('googletagmanager')) {
      trackers.push({ name: 'Google Analytics', category: 'Analytics' });
    }
    if (html.includes('connect.facebook.net')) {
      trackers.push({ name: 'Facebook Pixel', category: 'Marketing' });
    }
    
    // Generic script counter as mock for uncategorized
    const scriptMatches = html.match(/<script/g) || [];
    if (scriptMatches.length > 5) {
      uncategorizedCount = scriptMatches.length - 5; // just a simulation logic
    }

    return NextResponse.json({
      success: true,
      trackers,
      uncategorizedCount,
      totalDetected: trackers.length + uncategorizedCount
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
