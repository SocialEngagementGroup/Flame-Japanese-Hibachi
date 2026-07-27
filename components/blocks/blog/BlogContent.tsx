import Image from "next/image";
import type { BlogPost } from "@/lib/types/blog";

type BlogContentProps = {
  post: BlogPost;
};

export default function BlogContent({ post }: BlogContentProps) {
  return (
    <article className="w-full bg-background px-4 sm:px-5 md:px-8 py-[var(--space-xl)] flex flex-col gap-[var(--space-lg)] transition-colors duration-300">
      <div className="relative w-full aspect-[16/9] overflow-hidden border-2 border-primary/20 shadow-2xl shadow-black/10">
        <Image
          src={post.featuredImage}
          alt={post.featuredImageAlt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {post.body.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2
              key={index}
              className="heading-h4 text-foreground mt-[var(--space-md)]"
              style={{ fontFamily: "var(--font-serif-next)" }}
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
                <li key={itemIndex}>{item}</li>
              ))}
            </ol>
          );
        }

        return (
          <p key={index} className="text-body text-foreground leading-relaxed">
            {block.content}
          </p>
        );
      })}
    </article>
  );
}
