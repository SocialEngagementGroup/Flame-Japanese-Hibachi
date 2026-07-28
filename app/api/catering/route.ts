import { NextResponse } from "next/server";
import {
  FAILURE_MESSAGE,
  asText,
  forwardToWebhook,
  isEmail,
} from "@/lib/forms/submission";
import {
  calculateEstimate,
  findAddOn,
  findPackage,
  formatMoney,
  summariseEstimate,
  type QuoteLine,
} from "@/lib/catering/quote";
import { getLocationBySlug } from "@/lib/api/locations";

const WEBHOOK_URL = process.env.N8N_CATERING_WEBHOOK_URL;
const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET;

const LIMITS = {
  firstName: 60,
  lastName: 60,
  email: 200,
  phone: 40,
  company: 120,
  notes: 3000,
  occasion: 60,
  eventDate: 10,
  eventTime: 5,
  deliveryAddress: 300,
  venueAddress: 300,
  venueSetting: 30,
  venuePower: 30,
} as const;

type FieldName = keyof typeof LIMITS;

const FULFILMENTS = ["delivery", "pickup", "onsite_chef"] as const;
type Fulfilment = (typeof FULFILMENTS)[number];

/**
 * Rebuilds the submitted line items from our own price data.
 *
 * Only the ids and quantities are taken from the request - every price is
 * looked up server-side. A quote is a commercial document, and prices arriving
 * from a browser are attacker-controlled.
 */
const sanitiseLines = (
  raw: unknown,
  exists: (id: string) => boolean,
): QuoteLine[] => {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((line) => ({
      id: asText((line as QuoteLine)?.id, 60),
      qty: Math.floor(Number((line as QuoteLine)?.qty)) || 0,
    }))
    .filter((line) => line.id && line.qty > 0 && line.qty <= 99)
    .filter((line) => exists(line.id))
    .slice(0, 40);
};

export async function POST(request: Request) {
  if (!WEBHOOK_URL) {
    console.error("[catering] N8N_CATERING_WEBHOOK_URL is not set");
    return NextResponse.json(
      { ok: false, error: FAILURE_MESSAGE },
      { status: 500 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  // Honeypot: report success so the bot gets no signal to retry differently.
  if (asText(payload.company_website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const fields = Object.fromEntries(
    (Object.keys(LIMITS) as FieldName[]).map((name) => [
      name,
      asText(payload[name], LIMITS[name]),
    ]),
  ) as Record<FieldName, string>;

  const fulfilment = FULFILMENTS.includes(payload.fulfilment as Fulfilment)
    ? (payload.fulfilment as Fulfilment)
    : "delivery";

  const headcount = Math.floor(Number(payload.headcount)) || 0;
  const packages = sanitiseLines(payload.packages, (id) =>
    Boolean(findPackage(id)),
  );
  const addons = sanitiseLines(payload.addons, (id) => Boolean(findAddOn(id)));

  const fieldErrors: Partial<Record<string, string>> = {};
  if (!fields.firstName) fieldErrors.firstName = "Please enter your first name.";
  if (!fields.lastName) fieldErrors.lastName = "Please enter your last name.";
  if (!isEmail(fields.email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }
  if (!fields.phone) {
    fieldErrors.phone = "We need a phone number to confirm your booking.";
  }
  if (!fields.eventDate) fieldErrors.eventDate = "When is your event?";
  if (headcount < 1) fieldErrors.headcount = "How many guests are you expecting?";
  if (fulfilment === "delivery" && !fields.deliveryAddress) {
    fieldErrors.deliveryAddress = "Where should we deliver?";
  }
  if (fulfilment === "onsite_chef" && !fields.venueAddress) {
    fieldErrors.venueAddress = "Where should the chef set up?";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 400 });
  }

  if (packages.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Please choose at least one catering package." },
      { status: 400 },
    );
  }

  const estimate = calculateEstimate(packages, addons, headcount);
  const location = getLocationBySlug(asText(payload.locationSlug, 80));

  // Flag near-term events so the team can triage them ahead of a booking that's
  // months out. No date is rejected - the request still reaches the sheet.
  const eventAt = new Date(`${fields.eventDate}T00:00:00`).getTime();
  const isShortNotice =
    Number.isFinite(eventAt) && eventAt - Date.now() < 48 * 60 * 60 * 1000;

  const setup = Array.isArray(payload.setup)
    ? payload.setup.map((s) => asText(s, 60)).filter(Boolean).slice(0, 10)
    : [];

  const result = await forwardToWebhook(WEBHOOK_URL, WEBHOOK_SECRET, {
    fulfilment,
    isShortNotice,
    location: location
      ? { slug: location.slug, name: location.name, phone: location.phone }
      : null,
    contact: {
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email.toLowerCase(),
      phone: fields.phone,
      company: fields.company,
    },
    event: {
      date: fields.eventDate,
      time: fields.eventTime,
      headcount,
      occasion: fields.occasion,
      setup,
      notes: fields.notes,
      deliveryAddress: fulfilment === "delivery" ? fields.deliveryAddress : "",
      venueAddress: fulfilment === "onsite_chef" ? fields.venueAddress : "",
      venueSetting: fulfilment === "onsite_chef" ? fields.venueSetting : "",
      venuePower: fulfilment === "onsite_chef" ? fields.venuePower : "",
    },
    order: {
      lines: estimate.lines,
      summary: summariseEstimate(estimate),
      subtotal: estimate.subtotal,
      subtotalFormatted: formatMoney(estimate.subtotal),
    },
    pageUrl: asText(payload.pageUrl, 500),
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: FAILURE_MESSAGE },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
