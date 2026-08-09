import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/config";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";

/*
 * Fonts are self-hosted (SIL OFL licensed: Manrope and Instrument Serif)
 * so the build never depends on external font CDNs.
 */
const manrope = localFont({
  src: "./fonts/manrope-var.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

const instrument = localFont({
  src: [
    { path: "./fonts/instrument-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [
      {
        url: "/media/dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} | ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/media/dev/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F4EC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0A" },
  ],
};

const themeScript = `
  (function () {
    var isDark = false;
    try {
      var storedTheme = localStorage.getItem("brollam-theme");
      isDark = storedTheme === "dark" ||
        (storedTheme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    } catch (error) {
      isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    document.documentElement.classList.toggle("dark", Boolean(isDark));
  })();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": site.name,
    "url": site.url,
    "logo": `${site.url}/media/dev/og-image.jpg`,
    "description": site.description
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${instrument.variable} h-full antialiased`}
    >
      <head>
        <Script
          src="https://app.secureprivacy.ai/script/6a709ff331556dc398e08e34.js"
          strategy="beforeInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-PV5JV9248L" />
    </html>
  );
}
