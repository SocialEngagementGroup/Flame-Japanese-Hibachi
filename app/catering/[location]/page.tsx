import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationContextSync from "@/components/blocks/location/LocationContextSync";
import {
  getActiveLocations,
  getLocationBySlug,
  locationPath,
} from "@/lib/api/locations";
import { buildRestaurantSchema } from "@/lib/seo/restaurantSchema";
import { buildPageMetadata, getCanonicalUrl } from "@/lib/seo/seo";

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

  return buildPageMetadata({
    // No brand suffix here - the root layout's title template appends
    // "| Flame Japanese Hibachi" already, and repeating it doubled it.
    title: `Hibachi Catering in ${location.name}`,
    description: `Hibachi catering for weddings, corporate events and parties near ${location.name}. Custom packages, 100% Halal, fresh prep. Request a quote from Flame Japanese Hibachi today.`,
    path: locationPath("catering", location),
  });
}

export default async function LocationCateringPage({
  params,
}: {
  params: Promise<LocationCateringPageParams>;
}) {
  const { location: slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const schema = buildRestaurantSchema(location, {
    menuUrl: getCanonicalUrl(`/menu/${location.slug}`),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LocationContextSync storeId={location.id} />
    </>
  );
}
