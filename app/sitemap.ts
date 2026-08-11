import { MetadataRoute } from "next";
import { getActiveLocations } from "@/lib/api/locations";
import { jobPostings } from "@/lib/data/careers";
import {
  getBlogPostSummaries,
  getBlogPostsForLocation,
} from "@/lib/data/blog-data";
import { STORE_PAGES_LAST_MODIFIED } from "@/lib/data/storeLocationContent";
import { getCanonicalUrl } from "@/lib/seo/seo";

function validDate(value: string): Date | undefined {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function latestDate(values: string[]): Date | undefined {
  return values
    .map(validDate)
    .filter((value): value is Date => Boolean(value))
    .sort((a, b) => b.getTime() - a.getTime())[0];
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Shares the canonical helper with every page's metadata rather than
  // hardcoding the host - otherwise a preview deployment emits a sitemap
  // pointing at production, and the two disagree about what the site's URL is.
  const baseUrl = getCanonicalUrl("/");
  const storeLastModified = new Date(STORE_PAGES_LAST_MODIFIED);
  const latestBlogDate = latestDate(
    getBlogPostSummaries().map((post) => post.date),
  );

  const locationScopedUrls = getActiveLocations().flatMap((location) => [
    {
      url: `${baseUrl}/menu/${location.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/catering/${location.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/store/${location.slug}`,
      lastModified: storeLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
  ]);

  // Every location's blog hub (/blog/<slug>). Generated from the location list
  // so a new store's hub appears here automatically.
  const blogHubUrls = getActiveLocations().map((location) => {
    const hubLastModified = latestDate(
      getBlogPostsForLocation(location.slug).map((post) => post.date),
    );

    return {
      url: `${baseUrl}/blog/${location.slug}`,
      ...(hubLastModified ? { lastModified: hubLastModified } : {}),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    };
  });

  // Every blog post (/blog/<slug>). Generated from the post data, so any new
  // post added to lib/data/blog-data.ts is picked up here with no extra step.
  // Each post's own date drives lastModified. If a future post has an invalid
  // date, omit lastmod rather than publishing a misleading deployment time.
  const blogPostUrls = getBlogPostSummaries().map((post) => {
    const parsed = validDate(post.date);
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      ...(parsed ? { lastModified: parsed } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/menu`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/catering`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: storeLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      ...(latestBlogDate ? { lastModified: latestBlogDate } : {}),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...locationScopedUrls,
    ...blogHubUrls,
    ...blogPostUrls,
    {
      url: `${baseUrl}/careers`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    ...jobPostings.map((job) => ({
      url: `${baseUrl}/careers/${job.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
}
