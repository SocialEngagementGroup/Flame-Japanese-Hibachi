import { MetadataRoute } from "next";
import { getActiveLocations } from "@/lib/api/locations";
import { jobPostings } from "@/lib/data/careers";
import { getBlogPostSummaries } from "@/lib/data/blog-data";
import { getCanonicalUrl } from "@/lib/seo/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Shares the canonical helper with every page's metadata rather than
  // hardcoding the host - otherwise a preview deployment emits a sitemap
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

  // Every location's blog hub (/blog/<slug>). Generated from the location list
  // so a new store's hub appears here automatically.
  const blogHubUrls = getActiveLocations().map((location) => ({
    url: `${baseUrl}/blog/${location.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Every blog post (/blog/<slug>). Generated from the post data, so any new
  // post added to lib/data/blog-data.ts is picked up here with no extra step.
  // Each post's own date drives lastModified; an unparseable date falls back to
  // the build time rather than emitting an invalid <lastmod>.
  const blogPostUrls = getBlogPostSummaries().map((post) => {
    const parsed = new Date(post.date);
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: Number.isNaN(parsed.getTime()) ? lastModified : parsed,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

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
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...locationMenuAndCateringUrls,
    ...blogHubUrls,
    ...blogPostUrls,
    {
      url: `${baseUrl}/careers`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    ...jobPostings.map((job) => ({
      url: `${baseUrl}/careers/${job.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
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