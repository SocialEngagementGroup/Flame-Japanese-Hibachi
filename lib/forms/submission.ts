/** Shared plumbing for the website's lead forms (contact, catering quote). */

// n8n answers as soon as its workflow completes, so anything slower than this
// is a network fault rather than a slow workflow.
const FORWARD_TIMEOUT_MS = 10_000;

export const FAILURE_MESSAGE =
  "We couldn't send your message. Please try again, or call us directly.";

/** Trims, caps length, and never returns anything but a string. */
export const asText = (value: unknown, maxLength: number): string =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

// Deliberately permissive: we only reject addresses we could never reply to.
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

export const isEmail = (value: string): boolean => EMAIL_PATTERN.test(value);

export type ForwardResult =
  | { ok: true }
  | { ok: false; reason: "upstream" | "network" };

/**
 * Posts a validated payload to an n8n webhook.
 *
 * The webhook uses Header Auth, so `secret` must match the credential on the
 * Webhook node - when it's absent the header is simply omitted and n8n replies
 * 403, which surfaces to the visitor as a retry prompt rather than a silent
 * loss.
 */
export async function forwardToWebhook(
  url: string,
  secret: string | undefined,
  payload: unknown,
): Promise<ForwardResult> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secret ? { "x-flame-signature": secret } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(`[forms] n8n responded ${response.status}`);
      return { ok: false, reason: "upstream" };
    }

    return { ok: true };
  } catch (error) {
    // Timeout, DNS failure, n8n down - the lead is lost either way, so log the
    // full payload to make it recoverable from server logs.
    console.error("[forms] could not reach n8n", { error, payload });
    return { ok: false, reason: "network" };
  }
}
