import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationContextSync from "@/components/blocks/location/LocationContextSync";
import LocationBlogCallout from "@/components/blocks/blog/LocationBlogCallout";
import {
  getActiveLocations,
  getLocationBySlug,
  locationPath,
} from "@/lib/api/locations";
import { buildRestaurantSchema } from "@/lib/seo/restaurantSchema";
import { buildPageMetadata, getCanonicalUrl } from "@/lib/seo/seo";

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

  return buildPageMetadata({
    title: `Menu - ${location.name} Halal Hibachi, Sushi & Bento`,
    description: `Browse the Flame Japanese Hibachi menu at our ${location.name} location: hibachi platters, sushi rolls, bento boxes, loaded fries, wings, smoothies and boba. 100% Halal, freshly prepared.`,
    path: locationPath("menu", location),
  });
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
    menuUrl: canonical,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LocationContextSync storeId={location.id} />
      <LocationBlogCallout location={location} />
    </>
  );
}
