import Hero from "@/components/blocks/hero/Hero";
import LocationsSection from "@/components/blocks/locations/LocationsSection";
import ContactSection from "@/components/blocks/contact/ContactSection";

import { getCanonicalUrl } from "@/lib/seo/seo";

export const metadata = {
  title: "All Flame Japanese Hibachi Locations (MD, VA, FL, PA)",
   description: "Find a Flame Japanese Hibachi location near you. Twelve-plus open restaurants across Maryland, Virginia, Florida and Pennsylvania, with more coming soon.",
  alternates: {
    canonical: getCanonicalUrl("/locations"),
  },
};

export default function LocationsPage() {
  return (
    <div className="flex flex-col w-full">
      <Hero
        title={
          <>
            <span className="block whitespace-nowrap">PICK A FLAME.</span>
            <span className="block whitespace-nowrap text-white">PICK A LOCATION.</span>
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
            REACH OUT TO US FOR <span className="text-primary">ANY QUERIES</span>
          </>
        }
        subheading="SEND US A MESSAGE"
        submitLabel="SUBMIT APPLICATION"
      />
    </div>
  );
}
