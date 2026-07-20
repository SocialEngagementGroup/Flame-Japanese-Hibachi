import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationBanner from "@/components/blocks/location/LocationBanner";
import LocationContextSync from "@/components/blocks/location/LocationContextSync";
import { getActiveLocations, getLocationBySlug } from "@/lib/api/locations";
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
    // The root layout's title template already appends
    // "| Flame Japanese Hibachi" — repeating it here doubled the brand suffix.
    title: `Hibachi Catering in ${location.name}`,
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

      {/* The hero lives in app/catering/layout.tsx so its video survives a
          store switch — it reads the city from the route param itself. */}
      <LocationBanner location={location} pageLabel="catering" />
    </>
  );
}
