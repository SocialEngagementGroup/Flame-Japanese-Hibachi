import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import Hero from "@/components/blocks/hero/Hero";
import CateringMenuSection from "@/components/blocks/catering/CateringMenuSection";
import CateringAddOns from "@/components/blocks/catering/CateringAddOns";
import { cateringMenuSections } from "@/lib/data/catering";
import MenuCTA from "@/components/blocks/menu/menupage/MenuCTA";
import ContactSection from "@/components/blocks/contact/ContactSection";
import LocationBanner from "@/components/blocks/location/LocationBanner";
import LocationContextSync from "@/components/blocks/location/LocationContextSync";
import { getActiveLocations, getLocationBySlug } from "@/lib/api/locations";
import { resolveOrderUrl } from "@/lib/geo/orderUrl";
import { buildRestaurantSchema } from "@/lib/seo/restaurantSchema";
import { getCanonicalUrl } from "@/lib/seo/seo";

type LocationCateringPageParams = { location: string };

export async function generateStaticParams() {
  return getActiveLocations().map((location) => ({ location: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocationCateringPageParams>;
}): Promise<Metadata> {
  const { location: slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  const canonical = getCanonicalUrl(`/catering/${location.slug}`);

  return {
    title: `Hibachi Catering in ${location.name} | Flame Japanese Hibachi`,
    description: `Hibachi catering for weddings, corporate events and parties near ${location.name}. Custom packages, 100% Halal, fresh prep. Request a quote from Flame Japanese Hibachi today.`,
    alternates: {
      canonical,
    },
  };
}

export default async function LocationCateringPage({
  params,
}: {
  params: Promise<LocationCateringPageParams>;
}) {
  const { location: slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const orderUrl = resolveOrderUrl(location);
  const canonical = getCanonicalUrl(`/catering/${location.slug}`);
  const schema = buildRestaurantSchema(location, {
    pageUrl: canonical,
    menuUrl: getCanonicalUrl(`/menu/${location.slug}`),
  });

  return (
    <div className="flex w-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LocationContextSync storeId={location.id} />

      <Hero
        tagline="SIZZLING PERFECTION, EVERY TIME."
        title={
          <>
            <span className="block md:inline">Cater with us</span>
            <br className="hidden md:block" />
            <span className="block md:inline">in {location.city}.</span>
          </>
        }
        ctaLabel="ORDER NOW"
        ctaHref={orderUrl}
        align="center"
        fullHeight={false}
        heightClass="min-h-[480px] md:min-h-[600px] py-[var(--space-2xl)]"
        bgImageDesk="/catering/hero/flame-japanese-hibachi-catering-hero-desk.jpg"
        bgImageMob="/catering/hero/flame-japanese-hibachi-catering-hero-mob.jpg"
        bgVideo="/catering/hero/flame-japanese-hibachi-catering-hero.mp4"
      />

      <LocationBanner location={location} pageLabel="catering" />

      {cateringMenuSections.map((section) => (
        <React.Fragment key={section.id}>
          <CateringMenuSection
            title={section.title}
            subtitle={section.subtitle}
            items={section.items}
            orderUrl={orderUrl}
            cardVariant={section.id === "menu-5-wings" ? "shop" : "catering"}
          />

          {section.id === "menu-4-cbs" && (
            <CateringAddOns
              orderUrl={orderUrl}
              addons={[
                { name: "SPRING ROLLS", price: "$0.50/PER PERSON" },
                { name: "DUMPLINGS", price: "$0.75/PER PERSON" },
              ]}
            />
          )}

          {section.id === "menu-5-wings" && (
            <CateringAddOns
              orderUrl={orderUrl}
              addons={[
                { name: "FRIES HALF TRAY", price: "$40" },
                { name: "FRIES FULL TRAY", price: "$75" },
              ]}
            />
          )}
        </React.Fragment>
      ))}
      <MenuCTA orderUrl={orderUrl} />
      <ContactSection />
    </div>
  );
}
