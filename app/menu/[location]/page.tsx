import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/blocks/hero/Hero";
import InteractiveMenu from "@/components/blocks/menu/menupage/InteractiveMenu";
import ContactSection from "@/components/blocks/contact/ContactSection";
import LocationBanner from "@/components/blocks/location/LocationBanner";
import LocationContextSync from "@/components/blocks/location/LocationContextSync";
import { getActiveLocations, getLocationBySlug } from "@/lib/api/locations";
import { resolveOrderUrl } from "@/lib/geo/orderUrl";
import { buildRestaurantSchema } from "@/lib/seo/restaurantSchema";
import { getCanonicalUrl } from "@/lib/seo/seo";

type LocationMenuPageParams = { location: string };

export async function generateStaticParams() {
  return getActiveLocations().map((location) => ({ location: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocationMenuPageParams>;
}): Promise<Metadata> {
  const { location: slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  const canonical = getCanonicalUrl(`/menu/${location.slug}`);

  return {
    title: `Menu — ${location.name} Halal Hibachi, Sushi & Bento`,
    description: `Browse the Flame Japanese Hibachi menu at our ${location.name} location: hibachi platters, sushi rolls, bento boxes, loaded fries, wings, smoothies and boba. 100% Halal, freshly prepared.`,
    alternates: {
      canonical,
    },
  };
}

export default async function LocationMenuPage({
  params,
}: {
  params: Promise<LocationMenuPageParams>;
}) {
  const { location: slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const orderUrl = resolveOrderUrl(location);
  const canonical = getCanonicalUrl(`/menu/${location.slug}`);
  const schema = buildRestaurantSchema(location, {
    pageUrl: canonical,
    menuUrl: canonical,
  });

  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LocationContextSync storeId={location.id} />

      <Hero
        tagline="SIZZLING PERFECTION, EVERY TIME."
        title={
          <>
            <span className="block md:inline whitespace-nowrap">SAVOR THE </span>
            <span className="block md:inline whitespace-nowrap">
              FLAVORS IN {location.city.toUpperCase()}.
            </span>
          </>
        }
        ctaLabel="ORDER NOW"
        ctaHref={orderUrl}
        align="center"
        fullHeight={false}
        bgImageDesk="/menupage/hero/flame-japanese-hibachi-menu-hero-spread-mob.png"
        bgImageMob="/menupage/hero/flame-japanese-hibachi-menu-hero-spread-desk.png"
      />

      <LocationBanner location={location} pageLabel="menu" />
      <InteractiveMenu orderUrl={orderUrl} />
      <ContactSection />
    </div>
  );
}
