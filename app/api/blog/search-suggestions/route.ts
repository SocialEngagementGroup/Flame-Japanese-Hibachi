import { NextResponse } from "next/server";
import { searchBlogPosts } from "@/lib/data/blog-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  // Get top 6 results utilizing our scoring logic
  const { posts } = searchBlogPosts({ q, limit: 6 });

  const suggestions = posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    category: post.category,
    image: post.image,
  }));

  return NextResponse.json({ suggestions });
}
