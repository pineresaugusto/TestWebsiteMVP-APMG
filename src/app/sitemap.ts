import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * sitemap.xml — the marketing surface only. Funnel + dashboard live
 * under /app/* and are excluded both here and in robots.ts.
 *
 * Priorities follow Google's effective behavior: relative weight only
 * matters within this site, so commercial-intent pages (home, pricing,
 * how-it-works, get-started) get the highest priority and legal pages
 * get the lowest.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/how-it-works", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/get-started", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/providers", priority: 0.4, changeFrequency: "monthly" as const },
    { path: "/medical-disclaimer", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((e) => ({
    url: `${SITE_URL}${e.path}`,
    lastModified,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));

  return entries;
}
