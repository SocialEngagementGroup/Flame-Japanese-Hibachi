"use client";

import React, { useState } from "react";

type FieldErrors = Partial<Record<string, string>>;

type Status = "idle" | "submitting" | "success" | "error";

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
};

const Field = ({
  label,
  name,
  placeholder,
  type = "text",
  textarea,
  required,
  error,
  className = "",
}: FieldProps) => {
  const inputClass = `w-full bg-transparent border px-[var(--space-md)] py-[var(--space-md)] text-[#1C1B1B] dark:text-white placeholder:text-primary/70 text-body outline-none focus:ring-2 transition-all ${
    error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
      : "border-primary focus:border-primary focus:ring-primary/30"
  }`;

  const sharedProps = {
    id: name,
    name,
    placeholder,
    required,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${name}-error` : undefined,
    className: inputClass,
    suppressHydrationWarning: true,
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={name}
        className="block text-[#1C1B1B] dark:text-gray-400 text-small font-black uppercase tracking-widest ml-1 transition-colors duration-300"
      >
        {label}
      </label>
      {textarea ? (
        <textarea rows={4} {...sharedProps} />
      ) : (
        <input type={type} {...sharedProps} />
      )}
      {error && (
        <p id={`${name}-error`} className="text-red-500 text-small ml-1">
          {error}
        </p>
      )}
    </div>
  );
};

type ContactSectionProps = {
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  submitLabel?: string;
};

const ContactSection = ({
  heading = (
    <>
      REACH OUT TO US FOR  <span className="text-primary">ANY QUERIES</span>
    </>
  ),
  subheading = "JOIN THE FASTEST GROWING HIBACHI BRAND IN THE NATION",
  submitLabel = "SUBMIT APPLICATION",
}: ContactSectionProps) => {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Captured before the first await — React nulls currentTarget afterwards.
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;

    setStatus("submitting");
    setFieldErrors({});
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // pageUrl tells the team which of the five pages this form sits on
        // actually converted.
        body: JSON.stringify({ ...data, pageUrl: window.location.href }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setErrorMessage(
          result.error ?? "Please check the highlighted fields and try again.",
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setErrorMessage(
        "Something went wrong. Please try again, or call us directly.",
      );
      setStatus("error");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <section className="w-full bg-[#F0EDED] dark:bg-black py-[var(--space-2xl)] px-[var(--space-lg)] transition-colors duration-300">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="heading-h3 text-center text-[#1C1B1B] dark:text-white mb-[var(--space-md)] transition-colors duration-300">
          {heading}
        </h2>
        <p className="text-center text-gray-700 dark:text-gray-400 text-small font-bold uppercase tracking-[2px] mb-[var(--space-xl)] transition-colors duration-300">
          {subheading}
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid grid-cols-1 md:grid-cols-2 gap-[var(--gap-md)]"
        >
          <Field
            label="FIRST NAME"
            name="firstName"
            placeholder="John"
            required
            error={fieldErrors.firstName}
          />
          <Field
            label="LAST NAME"
            name="lastName"
            placeholder="Doe"
            required
            error={fieldErrors.lastName}
          />
          <Field
            label="EMAIL ADDRESS"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            error={fieldErrors.email}
          />
          <Field
            label="NUMBER"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            error={fieldErrors.phone}
          />
          <Field
            label="ENTER YOUR SUBJECT"
            name="subject"
            placeholder="Your Subject"
            className="md:col-span-2"
            error={fieldErrors.subject}
          />
          <Field
            label="ENTER YOUR MESSAGE"
            name="message"
            placeholder="Your Message Here"
            textarea
            required
            className="md:col-span-2"
            error={fieldErrors.message}
          />

          {/* Honeypot: hidden from sight and from screen readers, but bots fill
              every field they find. A value here means the submission is junk. */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="company_website">Company Website</label>
            <input
              id="company_website"
              name="company_website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="md:col-span-2" aria-live="polite">
            {status === "success" && (
              <p className="text-primary text-small font-bold uppercase tracking-widest text-center">
                Thanks — we&apos;ve got your message and will reply within one
                business day.
              </p>
            )}
            {status === "error" && errorMessage && (
              <p className="text-red-500 text-small font-bold uppercase tracking-widest text-center">
                {errorMessage}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="md:col-span-2 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white py-5 text-small font-black tracking-[3px] uppercase mt-[var(--space-md)] transition-all"
          >
            {isSubmitting ? "SENDING…" : submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
