import Hero from "@/components/blocks/hero/Hero";
import ContactDetails from "@/components/blocks/contact/ContactDetails";
import LocationsSection from "@/components/blocks/locations/LocationsSection";
import ContactSection from "@/components/blocks/contact/ContactSection";

export const metadata = {
  title: "Contact Us | Flame Japanese Hibachi",
  description:
    "Get in touch with Flame Japanese Hibachi for general inquiries, partnerships, and feedback.",
};

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
