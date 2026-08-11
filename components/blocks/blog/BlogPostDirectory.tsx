import Link from "next/link";
import { getActiveLocations, getLocationLabel } from "@/lib/api/locations";
import { getBlogPostSummaries } from "@/lib/data/blog-data";

/**
 * A plain, server-rendered index of every article on the site.
 *
 * The card grid above is paginated for usability, but pagination should not be
 * the only crawl path to older posts. Keeping this directory independent from
 * filters and client-side state ensures /blog always contains a real anchor to
 * every post as soon as it is added to blog-data.ts.
 */
export default function BlogPostDirectory() {
  const posts = getBlogPostSummaries();
  const locations = getActiveLocations();
  const locationSlugs = new Set(locations.map((location) => location.slug));
  const commonPosts = posts.filter(
    (post) =>
      !post.locationSlugs?.length ||
      post.locationSlugs.every((slug) => !locationSlugs.has(slug)),
  );

  return (
    <section
      aria-labelledby="all-blog-articles"
      className="w-full border-t border-primary/15 bg-background px-4 py-[var(--space-2xl)] sm:px-5 md:px-8"
    >
      <div className="mx-auto w-full md:w-[80%]">
        <p className="mb-[var(--space-xs)] text-small font-black uppercase tracking-[3px] text-primary">
          Complete blog index
        </p>
        <h2
          id="all-blog-articles"
          className="heading-h3 mb-[var(--space-xl)] text-foreground uppercase"
        >
          All <span className="text-primary">Articles</span>
        </h2>

        <div className="grid grid-cols-1 gap-x-[var(--gap-lg)] gap-y-[var(--space-xl)] md:grid-cols-2 xl:grid-cols-3">
          {locations.map((location) => {
            const locationPosts = posts.filter((post) =>
              post.locationSlugs?.includes(location.slug),
            );

            if (locationPosts.length === 0) return null;

            const label = getLocationLabel(location);

            return (
              <section key={location.slug} aria-labelledby={`articles-${location.slug}`}>
                <h3
                  id={`articles-${location.slug}`}
                  className="mb-3 border-b border-border/60 pb-2 text-body font-black text-foreground"
                >
                  <Link
                    href={`/blog/${location.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {locationPosts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-small leading-relaxed text-muted-foreground underline decoration-primary/35 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          {commonPosts.length > 0 && (
            <section aria-labelledby="articles-general">
              <h3
                id="articles-general"
                className="mb-3 border-b border-border/60 pb-2 text-body font-black text-foreground"
              >
                More from Flame
              </h3>
              <ul className="flex flex-col gap-2.5">
                {commonPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-small leading-relaxed text-muted-foreground underline decoration-primary/35 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
