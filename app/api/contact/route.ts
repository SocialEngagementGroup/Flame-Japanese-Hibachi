import { NextResponse } from "next/server";

// The browser posts here rather than straight to n8n. Proxying keeps the webhook
// URL and its shared secret out of the client bundle, sidesteps CORS, and gives
// us one place to reject junk before it reaches the lead sheet.
const WEBHOOK_URL = process.env.N8N_CONTACT_WEBHOOK_URL;
const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET;

// n8n answers the moment it accepts the request, so anything slower than this is
// a network fault rather than a slow workflow.
const FORWARD_TIMEOUT_MS = 10_000;

const LIMITS = {
  firstName: 60,
  lastName: 60,
  email: 200,
  phone: 40,
  subject: 200,
  message: 5000,
} as const;

type FieldName = keyof typeof LIMITS;

const asText = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

// Deliberately permissive: we only reject addresses we could never reply to.
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

const FAILURE_MESSAGE =
  "We couldn't send your message. Please try again, or call us directly.";

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
  if (!EMAIL_PATTERN.test(fields.email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }
  if (!fields.message) fieldErrors.message = "Please tell us how we can help.";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 400 });
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(WEBHOOK_SECRET ? { "x-flame-signature": WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({
        ...fields,
        pageUrl: asText(payload.pageUrl, 500),
      }),
      signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(`[contact] n8n responded ${response.status}`);
      return NextResponse.json(
        { ok: false, error: FAILURE_MESSAGE },
        { status: 502 },
      );
    }
  } catch (error) {
    // Timeout, DNS failure, n8n down — the lead is lost either way, so log the
    // full payload to make it recoverable from server logs.
    console.error("[contact] could not reach n8n", { error, fields });
    return NextResponse.json(
      { ok: false, error: FAILURE_MESSAGE },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
