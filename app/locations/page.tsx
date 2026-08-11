import Hero from "@/components/blocks/hero/Hero";
import LocationsSection from "@/components/blocks/locations/LocationsSection";
import ContactSection from "@/components/blocks/contact/ContactSection";
import { buildPageMetadata } from "@/lib/seo/seo";
import { buildRestaurantSchema } from "@/lib/seo/restaurantSchema";
import { activeLocations } from "@/data/locationsData";

export const metadata = buildPageMetadata({
  title: "All Flame Japanese Hibachi Locations (MD, VA, FL, PA)",
  description:
    "Find one of 14 Flame Japanese Hibachi restaurants across Maryland, Virginia, Florida and Pennsylvania, with addresses, hours, directions and local details.",
  path: "/locations",
});

export default function LocationsPage() {
  const restaurantSchemas = activeLocations.map((loc) => buildRestaurantSchema(loc));

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
      <LocationsSection hideViewAll />
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
