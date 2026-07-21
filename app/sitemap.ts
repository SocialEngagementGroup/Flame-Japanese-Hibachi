import { MetadataRoute } from "next";
import { getActiveLocations } from "@/lib/api/locations";
import { getCanonicalUrl } from "@/lib/seo/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Shares the canonical helper with every page's metadata rather than
  // hardcoding the host — otherwise a preview deployment emits a sitemap
  // pointing at production, and the two disagree about what the site's URL is.
  const baseUrl = getCanonicalUrl("/");
  const lastModified = new Date();

  const locationMenuAndCateringUrls = getActiveLocations().flatMap((location) => [
    {
      url: `${baseUrl}/menu/${location.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/catering/${location.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
  ]);

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/catering`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...locationMenuAndCateringUrls,
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
}