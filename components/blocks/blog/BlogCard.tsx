import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type BlogCardData = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
};

type BlogCardProps = {
  post: BlogCardData;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col cursor-pointer border-b border-border/60 pb-8 md:border-b-0 md:pb-0"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#EBEBEB] dark:bg-zinc-900 mb-6 transition-colors duration-300">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1100px) 33vw, (min-width: 768px) 50vw, 90vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      <div className="flex flex-col flex-grow">
        <h3 className="heading-h4 text-foreground mb-3 leading-[1.2] line-clamp-2 min-h-[2.4em]">
          {post.title}
        </h3>

        <p className="text-small text-muted-foreground leading-[1.5] line-clamp-2 min-h-[3em] mb-6">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2 md:pt-4 md:border-t md:border-border/40">
          <span className="text-small font-semibold uppercase tracking-[3px] text-muted-foreground">
            {post.date}
          </span>
          <span className="inline-flex items-center gap-1 text-small font-black uppercase tracking-[3px] text-primary transition-transform duration-300 group-hover:translate-x-1">
            Read Article
            <ArrowUpRight
              size={14}
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
