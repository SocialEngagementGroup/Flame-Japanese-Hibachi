import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationContextSync from "@/components/blocks/location/LocationContextSync";
import LocationBlogCallout from "@/components/blocks/blog/LocationBlogCallout";
import {
  getActiveLocations,
  getLocationBySlug,
  locationPath,
} from "@/lib/api/locations";
import { getStoreLocationContent } from "@/lib/data/storeLocationContent";
import { buildRestaurantSchema } from "@/lib/seo/restaurantSchema";
import { buildPageMetadata, getCanonicalUrl } from "@/lib/seo/seo";

type LocationStorePageParams = { location: string };

function storeDescription(
  location: NonNullable<ReturnType<typeof getLocationBySlug>>,
  content: ReturnType<typeof getStoreLocationContent>,
) {
  return (
    content?.metaDescription ??
    `Visit Flame Japanese Hibachi in ${location.name} at ${location.address}. Order online, or call ${location.phone} for pickup, delivery or catering.`
  );
}

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
    title: `Halal Hibachi Restaurant in ${location.name}`,
    description: storeDescription(location, content),
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
  const { ["@context"]: _context, ...restaurantNode } = buildRestaurantSchema(location, {
    restaurantUrl: canonical,
    menuUrl: getCanonicalUrl(`/menu/${location.slug}`),
  });
  const webPageId = `${canonical}#webpage`;
  const breadcrumbId = `${canonical}#breadcrumb`;

  const faqNode = content
    ? {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        isPartOf: { "@id": webPageId },
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

  const breadcrumbNode = {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getCanonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: getCanonicalUrl("/locations"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: location.name,
        item: canonical,
      },
    ],
  };

  const webPageNode = {
    "@type": "WebPage",
    "@id": webPageId,
    url: canonical,
    name: `${location.name} Halal Hibachi Restaurant`,
    description: storeDescription(location, content),
    inLanguage: "en-US",
    mainEntity: { "@id": restaurantNode["@id"] },
    breadcrumb: { "@id": breadcrumbId },
  };

  const storePageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...restaurantNode,
        mainEntityOfPage: { "@id": webPageId },
      },
      webPageNode,
      breadcrumbNode,
      ...(faqNode ? [faqNode] : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(storePageSchema).replace(/</g, "\\u003c"),
        }}
      />
      <LocationContextSync storeId={location.id} />
      <LocationBlogCallout location={location} />
    </>
  );
}
