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
  /** Canonical URL for this physical restaurant. Defaults to its store page. */
  restaurantUrl?: string;
  /** URL of the menu this restaurant serves. Defaults to the generic /menu page. */
  menuUrl?: string;
};

/**
 * Builds one stable Restaurant entity for a physical location. Every page that
 * mentions the location reuses the store page's canonical URL and @id instead
 * of accidentally creating separate "menu restaurant", "catering restaurant"
 * and "blog restaurant" entities.
 */
export function buildRestaurantSchema(
  location: Location,
  options: BuildRestaurantSchemaOptions = {}
) {
  const restaurantUrl =
    options.restaurantUrl ?? getCanonicalUrl(`/store/${location.slug}`);
  const menuUrl = options.menuUrl ?? getCanonicalUrl("/menu");

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${restaurantUrl}#restaurant`,
    name: location.schemaName,
    url: restaurantUrl,
    image: [
      getCanonicalUrl("/homepage/hero/hero-bg-desk.png"),
      getCanonicalUrl("/store/fresh-hibachi-bowl.png"),
      getCanonicalUrl("/store/avocado-shrimp-sushi-roll.png"),
    ],
    parentOrganization: {
      "@id": getCanonicalUrl("/#organization"),
    },
    servesCuisine: ["Japanese", "Hibachi", "Sushi", "Halal"],
    priceRange: "$$",
    menu: menuUrl,
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
  };
}
