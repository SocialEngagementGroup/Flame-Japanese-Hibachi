import type { Metadata } from "next";

export function getCanonicalUrl(pathname: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.flamehibachi.com";
  const cleanPath = pathname === "/" ? "" : pathname.replace(/\/$/, "");
  return `${base}${cleanPath}`;
}

/**
 * Builds a page's full metadata block: title, description, canonical, and the
 * Open Graph / Twitter equivalents.
 *
 * Use this on every page instead of hand-writing `{ title, description,
 * alternates }`. The root layout defines a static `openGraph` (title + url),
 * and Next *merges* metadata rather than replacing it — so a page that sets
 * only `title` and `canonical` silently keeps the **homepage's** og:title and
 * og:url. That is what every page here used to do, which meant all 36 URLs
 * previewed as the homepage when shared to WhatsApp, iMessage, Facebook,
 * LinkedIn or Slack. For a 14-location restaurant that is the difference
 * between sharing "Menu — Laurel, MD" and sharing a generic brand card.
 *
 * `path` is the page's own path ("/menu/laurel-md"); it drives both the
 * canonical and og:url so the two can't drift apart.
 */
/** Shared share-card image. Must be repeated on every page: Next replaces the
 * `openGraph` object wholesale rather than merging its fields, so a page that
 * sets openGraph.title without images loses the root layout's image and its
 * share cards render with no picture at all. */
const OG_IMAGE = {
  url: "/homepage/hero/hero-bg-desk.png",
  width: 1280,
  height: 575,
  alt: "Flame Japanese Hibachi food and brand image",
};

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  /** Page title WITHOUT the brand suffix — the root layout's title template
   * appends "| Flame Japanese Hibachi" already. */
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = getCanonicalUrl(path);
  // No title template is applied to og:title, so it needs the brand spelled
  // out to read correctly as a standalone share card.
  const socialTitle = `${title} | Flame Japanese Hibachi`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Flame Japanese Hibachi",
      title: socialTitle,
      description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
