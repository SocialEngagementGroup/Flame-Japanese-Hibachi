import Link from "next/link";
import { Tag } from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";
import BlogBackLink from "./BlogBackLink";

type BlogHeaderProps = {
  post: BlogPost;
};

export default function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <div className="w-full bg-background transition-colors duration-300">
      {/* Back link follows the visitor's selected location, like the footer. */}
      <BlogBackLink />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-[var(--space-lg)] border-b border-border/40">
        <p className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-2 text-[12px] font-semibold uppercase leading-[1.4] tracking-[1.5px] text-muted-foreground sm:text-small sm:tracking-[3px]">
          <Link href="/blog" className="hover:text-primary transition-colors whitespace-nowrap">
            Blog
          </Link>
          <span className="whitespace-nowrap">{" / "}</span>
          <span className="min-w-0 flex-1 basis-full font-black text-foreground line-clamp-2 break-words sm:basis-auto sm:line-clamp-none">
            {post.title}
          </span>
        </p>

        {/* Topic tag - replaces the old post-switcher dropdown. */}
        <span className="inline-flex shrink-0 items-center gap-1.5 self-start whitespace-nowrap border border-primary/30 bg-primary/10 px-3 py-1.5 text-[12px] font-black uppercase tracking-[2px] text-primary sm:self-auto">
          <Tag className="w-3.5 h-3.5 shrink-0" />
          {post.category}
        </span>
      </div>

      <h1 className="heading-h3 text-foreground mb-[var(--space-lg)]">
        {post.title}
      </h1>

      <p className="text-body text-foreground leading-relaxed mb-[var(--space-lg)]">
        {post.excerpt}
      </p>

      <div className="flex flex-wrap items-center gap-x-[var(--gap-lg)] gap-y-2 text-small font-semibold uppercase tracking-[3px] text-muted-foreground mb-[var(--space-lg)]">
        <span className="text-primary font-black">{post.author}</span>
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>
    </div>
  );
}
