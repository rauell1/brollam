import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import {
  listCaseStudies,
  listInsights,
  listServices,
} from "@/lib/data/public";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.9 },
    { path: "/case-studies", priority: 0.9 },
    { path: "/insights", priority: 0.8 },
    { path: "/careers", priority: 0.5 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ].map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority,
  }));

  const [services, caseStudies, insights] = await Promise.all([
    listServices(),
    listCaseStudies(),
    listInsights(),
  ]);

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${site.url}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((caseStudy) => ({
    url: `${site.url}/case-studies/${caseStudy.slug}`,
    lastModified: caseStudy.publishedAt ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: `${site.url}/insights/${insight.slug}`,
    lastModified: insight.publishedAt ?? new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...insightRoutes];
}
