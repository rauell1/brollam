import type { Metadata } from "next";
import { site } from "@/lib/config";
import { absoluteUrl } from "@/lib/utils";

export function pageMetadata({
  title,
  description,
  path,
  ogImage,
  type = "website",
  publishedTime,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string | null;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}): Metadata {
  const image = ogImage ?? "/media/dev/og-image.jpg";
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: absoluteUrl(path),
      siteName: site.name,
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: absoluteUrl(image), alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    ...(site.email ? { email: site.email } : {}),
    ...(site.socials.length
      ? { sameAs: site.socials.map((s) => s.href) }
      : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };
}

export function articleJsonLd(article: {
  title: string;
  excerpt: string;
  slug: string;
  image: string | null;
  publishedAt: Date | null;
  authorName: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: absoluteUrl(`/insights/${article.slug}`),
    ...(article.image ? { image: [absoluteUrl(article.image)] } : {}),
    ...(article.publishedAt ? { datePublished: article.publishedAt.toISOString() } : {}),
    author: {
      "@type": article.authorName ? "Person" : "Organization",
      name: article.authorName ?? site.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") },
    },
    mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: {
  title: string;
  slug: string;
  shortDescription: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    areaServed: { "@type": "Country", name: "Kenya" },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
