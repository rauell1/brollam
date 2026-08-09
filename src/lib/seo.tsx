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

export function caseStudyJsonLd(caseStudy: {
  title: string;
  summary: string;
  slug: string;
  image: string | null;
  publishedAt: Date | null;
  clientName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.summary,
    url: absoluteUrl(`/case-studies/${caseStudy.slug}`),
    ...(caseStudy.image ? { image: [absoluteUrl(caseStudy.image)] } : {}),
    ...(caseStudy.publishedAt ? { datePublished: caseStudy.publishedAt.toISOString() } : {}),
    author: {
      "@type": "Organization",
      name: site.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") },
    },
    mainEntityOfPage: absoluteUrl(`/case-studies/${caseStudy.slug}`),
    about: {
      "@type": "Organization",
      name: caseStudy.clientName,
    },
  };
}

export function jobPostingJsonLd(job: {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  url: string;
  datePosted: Date;
  validThrough?: Date | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.datePosted.toISOString(),
    ...(job.validThrough ? { validThrough: job.validThrough.toISOString() } : {}),
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: site.name,
      sameAs: site.url,
      logo: absoluteUrl("/icon.svg"),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
      },
    },
    url: job.url,
  };
}

export function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About | ${site.name}`,
    url: absoluteUrl("/about"),
    description: site.description,
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact | ${site.name}`,
    url: absoluteUrl("/contact"),
    description: "Get in touch with us.",
  };
}

export function faqPageJsonLd(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}
