import React from "react";

/**
 * Auto-detects emails, US phone numbers (+1 XXX-XXX-XXXX), and URLs in a
 * plain-text string and wraps each match in an <a> tag. Used by the
 * Accordion renderers so prose content blocks become clickable contact info
 * without re-typing every mention as JSX.
 */

// Detect-only patterns (no global flag) — combined into one global regex below.
const EMAIL = /[a-zA-Z0-9][\w+.-]*@[\w.-]+\.[a-z]{2,}/;
const HTTP_URL = /https?:\/\/[^\s<>"']+?(?=[.,;:!?)\s]|$)/;
const WWW_URL = /www\.[\w.-]+\.[a-z]{2,}(?:\/[^\s<>"']*?(?=[.,;:!?)\s]|$))?/;
const US_PHONE = /\+1[\s-]\d{3}[\s-]\d{3}[\s-]\d{4}/;

const COMBINED = new RegExp(
  `(${EMAIL.source}|${HTTP_URL.source}|${WWW_URL.source}|${US_PHONE.source})`,
  "gi",
);

const LINK_CLASS = "text-primary underline-offset-4 hover:underline break-words";

export function linkify(text: string): React.ReactNode {
  if (!text) return text;

  const parts: React.ReactNode[] = [];
  const regex = new RegExp(COMBINED.source, "gi");
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    const str = match[0];
    const idx = match.index;
    if (idx > lastIndex) parts.push(text.slice(lastIndex, idx));

    let href: string;
    let external = false;

    if (str.startsWith("+1")) {
      href = `tel:${str.replace(/[\s-]/g, "")}`;
    } else if (str.startsWith("http")) {
      href = str;
      external = true;
    } else if (str.startsWith("www.")) {
      href = `https://${str}`;
      external = true;
    } else {
      // email
      href = `mailto:${str}`;
    }

    parts.push(
      <a
        key={`lk-${key++}`}
        href={href}
        className={LINK_CLASS}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {str}
      </a>,
    );

    lastIndex = idx + str.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length > 0 ? <>{parts}</> : text;
}
