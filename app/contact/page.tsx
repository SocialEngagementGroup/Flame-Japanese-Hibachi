import Hero from "@/components/blocks/hero/Hero";
import ContactDetails from "@/components/blocks/contact/ContactDetails";
import LocationsSection from "@/components/blocks/locations/LocationsSection";
import ContactSection from "@/components/blocks/contact/ContactSection";

import { buildPageMetadata } from "@/lib/seo/seo";

export const metadata = buildPageMetadata({
  title: "Contact Us & Catering Inquiries",
  description:
    "Get in touch with Flame Japanese Hibachi. Send catering inquiries, partnership questions or general feedback - our team responds within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      <Hero
        title={
          <>
            <span className="block whitespace-nowrap">GET IN TOUCH</span>
            <span className="block whitespace-nowrap text-white">WITH US.</span>
          </>
        }
        ctaLabel={null}
        align="center"
        fullHeight={false}
      />
      <ContactDetails />
      <ContactSection
        heading={
          <>
            REACH OUT TO US FOR <span className="text-primary">ANY QUERIES</span>
          </>
        }
        subheading="SEND US A MESSAGE"
        submitLabel="SUBMIT APPLICATION"
      />
      <LocationsSection />
    </div>
  );
}
