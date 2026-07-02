import { NextResponse } from "next/server";
import { getActiveLocations } from "@/lib/api/locations";
import { resolveOrderUrl } from "@/lib/geo/orderUrl";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const store = getActiveLocations().find((l) => l.slug === slug);
  return NextResponse.redirect(resolveOrderUrl(store));
}
