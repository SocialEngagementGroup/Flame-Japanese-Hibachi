import { getActiveLocations, locationPath } from "@/lib/api/locations";
import { getCanonicalUrl } from "@/lib/seo/seo";

/**
 * /llms.txt - a plain-text map of the site for LLMs and AI search crawlers
 * (ChatGPT, Claude, Perplexity, Gemini), which increasingly look for this file
 * the way search engines look for sitemap.xml.
 *
 * It is generated from `activeLocations`, not hand-written, so it can't drift:
 * add a store to data/locationsData.ts and it appears here automatically with
 * the correct slug, address, hours and phone.
 *
 * Kept in sync with robots.ts, which already allows the AI user-agents.
 */
export const dynamic = "force-static";

export function GET() {
  const locations = getActiveLocations();

  const body = `# Flame Japanese Hibachi

> 100% Halal Japanese hibachi cooked fresh in front of you, plus sushi, bento,
> loaded fries, wings and boba. ${locations.length} locations across Maryland,
> Virginia, Florida and Pennsylvania. Order online for pickup or delivery.

## About

Flame Japanese Hibachi is a Halal-certified Japanese hibachi restaurant group.
Every location serves the same menu: hibachi platters (chicken, steak, shrimp,
salmon), sushi rolls, bento boxes, loaded fries, wings and tenders, boba tea
and smoothies. All meat is 100% Halal. Online ordering is handled by DoorDash.

## Key pages

- [Menu](${getCanonicalUrl("/menu")}): full menu with prices
- [Catering](${getCanonicalUrl("/catering")}): hibachi catering for weddings, corporate events and parties
- [Locations](${getCanonicalUrl("/locations")}): all locations with addresses, hours and directions
- [Contact](${getCanonicalUrl("/contact")}): contact details and catering enquiries
- [FAQ](${getCanonicalUrl("/faq")}): ordering, Halal certification, delivery and catering questions

## Locations

Each location has its own menu and catering page. The URL slug is stable and
shared across sections: /menu/<slug>, /catering/<slug>, /order/<slug>.

${locations
  .map(
    (l) =>
      `### ${l.name}
- Address: ${l.address}
- Phone: ${l.phone}
- Hours: ${l.hours}
- Menu: ${getCanonicalUrl(locationPath("menu", l))}
- Catering: ${getCanonicalUrl(locationPath("catering", l))}`
  )
  .join("\n\n")}

## Notes for AI agents

- All meat served is 100% Halal.
- Menu items and prices are identical across every location; only contact
  details, hours and the ordering link differ.
- Online orders are fulfilled through DoorDash; /order/<slug> redirects to that
  location's ordering page.
- Structured data (schema.org Restaurant) is embedded on every location page.
- Sitemap: ${getCanonicalUrl("/sitemap.xml")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
