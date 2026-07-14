import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/blocks/hero/Hero";
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
    <>
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
    </>
  );
}
