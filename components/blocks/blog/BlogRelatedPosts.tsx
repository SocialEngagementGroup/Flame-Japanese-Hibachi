import Link from "next/link";
import BlogSlider from "./BlogSlider";
import { type BlogCardData } from "./BlogCard";

type BlogRelatedPostsProps = {
  posts: BlogCardData[];
  locationHub?: {
    href: string;
    label: string;
  };
};

export default function BlogRelatedPosts({ posts, locationHub }: BlogRelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="w-full bg-background px-4 sm:px-5 md:px-8 py-[var(--space-2xl)] transition-colors duration-300">
      <div className="mb-[var(--space-xl)]">
        <p className="text-small font-black uppercase tracking-[3px] text-primary mb-[var(--space-xs)]">
          More to explore
        </p>
        <div className="flex flex-wrap items-center gap-[var(--space-lg)]">
          <h2 className="heading-h3 text-foreground uppercase whitespace-nowrap">
            Keep <span className="text-primary">Reading</span>
          </h2>
          <span
            aria-hidden
            className="hidden sm:block h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent"
          />
          {locationHub && (
            <Link
              href={locationHub.href}
              className="text-small font-black uppercase tracking-[2px] text-primary underline underline-offset-4 hover:text-foreground"
            >
              All {locationHub.label} stories
            </Link>
          )}
        </div>
      </div>

      <BlogSlider posts={posts} />
    </section>
  );
}
