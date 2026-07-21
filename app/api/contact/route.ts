import { NextResponse } from "next/server";
import {
  FAILURE_MESSAGE,
  asText,
  forwardToWebhook,
  isEmail,
} from "@/lib/forms/submission";

// The browser posts here rather than straight to n8n. Proxying keeps the webhook
// URL and its shared secret out of the client bundle, sidesteps CORS, and gives
// us one place to reject junk before it reaches the lead sheet.
const WEBHOOK_URL = process.env.N8N_CONTACT_WEBHOOK_URL;
const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET;

const LIMITS = {
  firstName: 60,
  lastName: 60,
  email: 200,
  phone: 40,
  subject: 200,
  message: 5000,
} as const;

type FieldName = keyof typeof LIMITS;

export async function POST(request: Request) {
  if (!WEBHOOK_URL) {
    console.error("[contact] N8N_CONTACT_WEBHOOK_URL is not set");
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

  // Honeypot: a hidden input real visitors never see, but bots fill in anyway.
  // Report success so the bot gets no signal to retry with a different shape.
  if (asText(payload.company_website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const fields = Object.fromEntries(
    (Object.keys(LIMITS) as FieldName[]).map((name) => [
      name,
      asText(payload[name], LIMITS[name]),
    ]),
  ) as Record<FieldName, string>;

  const fieldErrors: Partial<Record<FieldName, string>> = {};
  if (!fields.firstName) fieldErrors.firstName = "Please enter your first name.";
  if (!fields.lastName) fieldErrors.lastName = "Please enter your last name.";
  if (!isEmail(fields.email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }
  if (!fields.message) fieldErrors.message = "Please tell us how we can help.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 400 });
  }

  const result = await forwardToWebhook(WEBHOOK_URL, WEBHOOK_SECRET, {
    ...fields,
    email: fields.email.toLowerCase(),
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
