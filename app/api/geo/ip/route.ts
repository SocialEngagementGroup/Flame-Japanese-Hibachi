import { NextResponse } from "next/server";
import { getIpCoordinates } from "@/lib/geo/ipGeolocation";

export async function GET(request: Request) {
  const coordinates = getIpCoordinates(request);

  if (!coordinates) {
    return NextResponse.json({ error: "Location unavailable" }, { status: 404 });
  }

  return NextResponse.json(coordinates);
}
