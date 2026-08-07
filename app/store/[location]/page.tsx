import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationBanner from "@/components/blocks/location/LocationBanner";
import LocationContextSync from "@/components/blocks/location/LocationContextSync";
import {
  getActiveLocations,
  getLocationBySlug,
  locationPath,
} from "@/lib/api/locations";
import { getStoreLocationContent } from "@/lib/data/storeLocationContent";
import { buildRestaurantSchema } from "@/lib/seo/restaurantSchema";
import { buildPageMetadata, getCanonicalUrl } from "@/lib/seo/seo";

type LocationStorePageParams = { location: string };

export async function generateStaticParams() {
  return getActiveLocations().map((location) => ({ location: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocationStorePageParams>;
}): Promise<Metadata> {
  const { location: slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  const content = getStoreLocationContent(slug);

  return buildPageMetadata({
    title: `Store - ${location.name} Halal Hibachi, Sushi & Boba`,
    description:
      content?.metaDescription ??
      `Visit Flame Japanese Hibachi in ${location.name} at ${location.address}. Order online, or call ${location.phone} for pickup, delivery or catering.`,
    path: locationPath("store", location),
  });
}

export default async function LocationStorePage({
  params,
}: {
  params: Promise<LocationStorePageParams>;
}) {
  const { location: slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const content = getStoreLocationContent(slug);
  const canonical = getCanonicalUrl(`/store/${location.slug}`);
  const schema = buildRestaurantSchema(location, {
    pageUrl: canonical,
    menuUrl: getCanonicalUrl(`/menu/${location.slug}`),
  });

  const faqSchema = content
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <LocationContextSync storeId={location.id} />

      {/* The hero lives in app/store/layout.tsx so its background survives a
          store switch - it reads the city from the route param itself. */}
      <LocationBanner location={location} pageLabel="store" />
    </>
  );
}
