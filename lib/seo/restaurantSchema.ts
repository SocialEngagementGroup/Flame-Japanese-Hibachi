import type { Location } from "@/lib/types";
import { getCanonicalUrl } from "@/lib/seo/seo";

function buildOpeningHours() {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "11:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "11:00",
      closes: "21:00",
    },
  ];
}

type BuildRestaurantSchemaOptions = {
  /** Canonical URL of the page this schema is embedded on. Defaults to /locations#slug. */
  pageUrl?: string;
  /** URL of the menu this restaurant serves. Defaults to the generic /menu page. */
  menuUrl?: string;
};

/** Builds the schema.org Restaurant JSON-LD for a single location. Shared by /locations, /menu/[location] and /catering/[location]. */
export function buildRestaurantSchema(
  location: Location,
  options: BuildRestaurantSchemaOptions = {}
) {
  const pageUrl =
    options.pageUrl ?? getCanonicalUrl(`/locations#${location.slug}`);
  const menuUrl = options.menuUrl ?? getCanonicalUrl("/menu");

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": pageUrl,
    name: location.schemaName,
    url: pageUrl,
    servesCuisine: ["Japanese", "Hibachi", "Sushi", "Halal"],
    priceRange: "$$",
    hasMenu: menuUrl,
    acceptsReservations: false,
    telephone: location.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.streetAddress,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.postalCode,
      addressCountry: "US",
    },
    openingHoursSpecification: buildOpeningHours(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.lat,
      longitude: location.lng,
    },
    ...(location.image ? { image: location.image } : {}),
  };
}
