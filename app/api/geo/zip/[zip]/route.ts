import { NextResponse } from "next/server";
import { lookupZipCoordinates } from "@/lib/geo/zipLookup";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ zip: string }> }
) {
  const { zip } = await params;
  const coordinates = lookupZipCoordinates(zip);

  if (!coordinates) {
    return NextResponse.json({ error: "ZIP code not found" }, { status: 404 });
  }

  return NextResponse.json(coordinates);
}
