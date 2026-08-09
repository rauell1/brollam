/**
 * Global site configuration.
 *
 * Public contact and social details intentionally come from environment
 * variables so nothing unverified is ever rendered. Anything left unset
 * is simply not shown.
 */
export const site = {
  name: "Brollam Partners",
  shortName: "Brollam",
  tagline: "Building Brands. Creating Visibility. Driving Growth.",
  location: "Nairobi, Kenya",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Brollam Partners is an integrated strategy, communications, marketing, sales, technology, and clean energy consultancy in Nairobi, Kenya. We help growing businesses build brands, tell better stories, and turn visibility into measurable growth.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || null,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || null,
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || null,
  mapsUrl: process.env.NEXT_PUBLIC_MAPS_URL || null,
  socials: [
    { label: "LinkedIn", href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || null },
    { label: "Instagram", href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || null },
    { label: "Facebook", href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || null },
    { label: "TikTok", href: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK || null },
    { label: "YouTube", href: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || null },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href)),
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = [
  ...mainNav,
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
] as const;

/** Editable response options for the contact form. */
export const budgetRanges = [
  "Exploring options",
  "Under KES 250,000",
  "KES 250,000 to 500,000",
  "KES 500,000 to 1,000,000",
  "KES 1,000,000 to 5,000,000",
  "Above KES 5,000,000",
] as const;

export const projectTimelines = [
  "As soon as possible",
  "Within 1 month",
  "1 to 3 months",
  "3 to 6 months",
  "Flexible",
] as const;
