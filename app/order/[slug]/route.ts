import { NextResponse } from "next/server";
import { getLocationBySlug } from "@/lib/api/locations";
import { resolveOrderUrl } from "@/lib/geo/orderUrl";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const store = getLocationBySlug(slug);
  return NextResponse.redirect(resolveOrderUrl(store));
}
