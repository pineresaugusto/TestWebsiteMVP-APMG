import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt — allow the marketing surface, block the demo funnel,
 * dashboard, and the demo toolbar query string. The funnel stores
 * fake state in localStorage and would dilute the index with
 * thin/duplicate pages if crawled.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/app/", "/app/*"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
