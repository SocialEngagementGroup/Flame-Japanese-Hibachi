import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationBanner from "@/components/blocks/location/LocationBanner";
import LocationContextSync from "@/components/blocks/location/LocationContextSync";
import { getActiveLocations, getLocationBySlug } from "@/lib/api/locations";
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

  const canonical = getCanonicalUrl(`/menu/${location.slug}`);
  const schema = buildRestaurantSchema(location, {
    pageUrl: canonical,
    menuUrl: canonical,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LocationContextSync storeId={location.id} />

      {/* The hero lives in app/menu/layout.tsx so its video survives a store
          switch — it reads the city from the route param itself. */}
      <LocationBanner location={location} pageLabel="menu" />
    </>
  );
}
