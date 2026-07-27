import Link from "next/link";
import type { BlogPost } from "@/lib/types/blog";
import BlogPostsDropdown from "./BlogPostsDropdown";

type BlogHeaderProps = {
  post: BlogPost;
  categories: string[];
};

export default function BlogHeader({ post, categories }: BlogHeaderProps) {
  return (
    <div className="w-full bg-background px-4 sm:px-5 md:px-8 pt-[var(--space-xl)] transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-[var(--space-lg)] border-b border-border/40">
        <p 
          className="text-small font-semibold uppercase tracking-[3px] text-muted-foreground flex items-center flex-wrap gap-1"
          style={{ fontFamily: "Work Sans" }}
        >
          <Link href="/blog" className="hover:text-primary transition-colors whitespace-nowrap">
            Blog
          </Link>
          <span className="whitespace-nowrap">{" / "}</span>
          <span className="font-black text-foreground line-clamp-1 sm:line-clamp-none break-words">
            {post.title}
          </span>
        </p>

        <BlogPostsDropdown categories={categories} />
      </div>

      <h1
        className="heading-h3 text-foreground mb-[var(--space-lg)]"
        style={{ fontFamily: "var(--font-serif-next)" }}
      >
        {post.title}
      </h1>

      <p className="text-body text-foreground leading-relaxed mb-[var(--space-lg)]">
        {post.excerpt}
      </p>

      <div 
        className="flex flex-wrap items-center gap-x-[var(--gap-lg)] gap-y-2 text-small font-semibold uppercase tracking-[3px] text-muted-foreground mb-[var(--space-lg)]"
        style={{ fontFamily: "Work Sans" }}
      >
        <span className="text-primary font-black">{post.author}</span>
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>
    </div>
  );
}
