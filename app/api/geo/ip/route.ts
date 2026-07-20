import { NextResponse } from "next/server";
import { getIpCoordinates } from "@/lib/geo/ipGeolocation";

// Edge Runtime runs this at whichever Vercel edge location is closest to the
// visitor, instead of one fixed serverless region — cuts round-trip latency
// for visitors far from that region. Safe here: this route only reads
// request headers and does simple math, no Node-only APIs or large deps.
export const runtime = "edge";

export async function GET(request: Request) {
  const coordinates = getIpCoordinates(request);

  if (!coordinates) {
    return NextResponse.json({ error: "Location unavailable" }, { status: 404 });
  }

  return NextResponse.json(coordinates);
}
