import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/types/blog";

type BlogContentProps = {
  post: BlogPost;
};

/**
 * Renders a paragraph's inline emphasis. Supports `**bold**` markers, and
 * auto-emphasizes a short priced lead-in (menu items like "Chicken Hibachi,
 * $9.85.") so the "what to order" and "three factors" sections stay scannable
 * without every post having to hand-mark them.
 */
function renderRich(text: string): React.ReactNode {
  let content = text;

  if (!content.includes("**")) {
    // A menu item's sentence-ending period never sits inside the price ("$9.85"
    // has no trailing space), so the first ". " is the real boundary.
    const idx = content.indexOf(". ");
    if (idx > -1) {
      const lead = content.slice(0, idx + 1);
      if (lead.length <= 72 && lead.includes("$")) {
        content = `**${lead}**${content.slice(idx + 1)}`;
      }
    }
  }

  return content.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-black text-foreground">
        {part}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

export default function BlogContent({ post }: BlogContentProps) {
  return (
    <article className="w-full bg-background pb-[var(--space-xl)] transition-colors duration-300">
      <div className="flex w-full flex-col gap-[var(--space-lg)]">
        <div className="relative w-full aspect-[16/9] overflow-hidden border-2 border-primary/20 shadow-2xl shadow-black/10">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            sizes="(min-width: 760px) 760px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {post.intro && (
          <p className="text-body text-foreground leading-relaxed font-medium border-l-2 border-primary pl-[var(--space-md)]">
            {post.intro}
          </p>
        )}

        {post.body.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2
                key={index}
                className="heading-h5 text-foreground mt-[var(--space-lg)] pt-[var(--space-sm)] border-t border-border/40"
              >
                {block.content}
              </h2>
            );
          }

          if (block.type === "list") {
            return (
              <ol
                key={index}
                className="list-decimal marker:text-primary marker:font-black pl-6 flex flex-col gap-3 text-body text-foreground leading-relaxed"
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{renderRich(item)}</li>
                ))}
              </ol>
            );
          }

          if (block.type === "links") {
            return (
              <div
                key={index}
                className="flex flex-wrap gap-x-6 gap-y-3 border-t border-border/40 pt-[var(--space-md)]"
              >
                {block.items.map((item, itemIndex) => {
                  const isInternal = item.href.startsWith("/");
                  const className =
                    "inline-flex items-center gap-1 text-small font-black uppercase tracking-[2px] text-primary hover:opacity-80 transition-opacity";
                  const inner = (
                    <>
                      {item.label}
                      <ArrowUpRight size={14} className="shrink-0" />
                    </>
                  );
                  return isInternal ? (
                    <Link key={itemIndex} href={item.href} className={className}>
                      {inner}
                    </Link>
                  ) : (
                    <a
                      key={itemIndex}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {inner}
                    </a>
                  );
                })}
              </div>
            );
          }

          return (
            <p key={index} className="text-body text-foreground leading-relaxed">
              {renderRich(block.content)}
            </p>
          );
        })}
      </div>
    </article>
  );
}
