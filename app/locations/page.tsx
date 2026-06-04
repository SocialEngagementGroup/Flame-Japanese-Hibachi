import Hero from "@/components/blocks/hero/Hero";
import LocationsSection from "@/components/blocks/locations/LocationsSection";
import ContactSection from "@/components/blocks/contact/ContactSection";
import { getCanonicalUrl } from "@/lib/seo/seo";
import { activeLocations } from "@/data/locationsData";

export const metadata = {
  title: "All Flame Japanese Hibachi Locations (MD, VA, FL, PA)",
  description:
    "Find a Flame Japanese Hibachi location near you. Twelve-plus open restaurants across Maryland, Virginia, Florida and Pennsylvania, with more coming soon.",
  alternates: {
    canonical: getCanonicalUrl("/locations"),
  },
};

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

function buildRestaurantSchema(loc: (typeof activeLocations)[0]) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `https://www.flamehibachi.com/locations#${loc.slug}`,
    name: loc.schemaName,
    url: `https://www.flamehibachi.com/locations#${loc.slug}`,
    servesCuisine: ["Japanese", "Hibachi", "Sushi", "Halal"],
    priceRange: "$$",
    hasMenu: "https://www.flamehibachi.com/menu",
    acceptsReservations: false,
    telephone: loc.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.streetAddress,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.postalCode,
      addressCountry: "US",
    },
    openingHoursSpecification: buildOpeningHours(),
  };

  // TODO: Add geo block when lat/lng coordinates are available
  // schema.geo = {
  //   "@type": "GeoCoordinates",
  //   latitude: loc.lat,
  //   longitude: loc.lng,
  // };

  return schema;
}

export default function LocationsPage() {
  const restaurantSchemas = activeLocations.map(buildRestaurantSchema);

  return (
    <div className="flex flex-col w-full">
      {restaurantSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Hero
        title={
          <>
            <span className="block whitespace-nowrap">PICK A FLAME.</span>
            <span className="block whitespace-nowrap text-white">
              PICK A LOCATION.
            </span>
          </>
        }
        ctaLabel={null}
        align="center"
        fullHeight={false}
      />
      <LocationsSection />
      <ContactSection
        heading={
          <>
            REACH OUT TO US FOR{" "}
            <span className="text-primary">ANY QUERIES</span>
          </>
        }
        subheading="SEND US A MESSAGE"
        submitLabel="SUBMIT APPLICATION"
      />
    </div>
  );
}