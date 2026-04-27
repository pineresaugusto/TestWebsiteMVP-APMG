/**
 * Site-wide SEO constants + small JSON-LD helpers.
 *
 * Single source of truth for:
 *   - canonical site URL (env-overridable on Vercel via NEXT_PUBLIC_SITE_URL)
 *   - brand name + tagline used across <title> templates and OG tags
 *   - BreadcrumbList helper used on interior pages
 *
 * Why env-overridable: on prod we want the real domain; on
 * preview deploys Vercel sets NEXT_PUBLIC_VERCEL_URL automatically and
 * the team can wire NEXT_PUBLIC_SITE_URL=https://nuvela.health in
 * Project → Environment Variables. Falling back to a static placeholder
 * keeps `next build` from blowing up locally.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://nuvela.health";

export const SITE_NAME = "Nuvela";

export const SITE_TAGLINE = "GLP-1 Weight Loss Treatment Online";

/** Build an absolute URL from a path like "/pricing". */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Build a BreadcrumbList JSON-LD object for an interior page.
 * `crumbs` should be ordered root → current page.
 */
export function breadcrumbJsonLd(
  crumbs: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** Small helper to render a JSON-LD `<script>` from a Server Component. */
export function jsonLdScript(data: Record<string, unknown>) {
  return {
    type: "application/ld+json" as const,
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}
