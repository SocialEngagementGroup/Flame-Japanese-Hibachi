"use client";

import React from "react";

type FieldProps = {
  label: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
  className?: string;
};

const Field = ({
  label,
  placeholder,
  type = "text",
  textarea,
  className = "",
}: FieldProps) => {
  const inputClass =
    "w-full bg-transparent border border-primary px-[var(--space-md)] py-[var(--space-md)] text-[#1C1B1B] dark:text-white placeholder:text-primary/70 text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all";

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-[#1C1B1B] dark:text-gray-400 text-small font-black uppercase tracking-widest ml-1 transition-colors duration-300">
        {label}
      </label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          rows={4}
          className={inputClass}
          suppressHydrationWarning
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={inputClass}
          suppressHydrationWarning
        />
      )}
    </div>
  );
};

type ContactSectionProps = {
  heading?: string;
  subheading?: string;
  submitLabel?: string;
};

const ContactSection = ({
  heading = "REACH OUT TO US FOR ANY QUERIES",
  subheading = "SEND US A MESSAGE",
  submitLabel = "SUBMIT APPLICATION",
}: ContactSectionProps) => {
  return (
    <section className="w-full bg-[#F0EDED] dark:bg-black py-[var(--space-2xl)] px-[var(--space-lg)] transition-colors duration-300">
      <div className="max-w-[1100px] mx-auto">
        <h3 className="heading-h3 text-center text-[#1C1B1B] dark:text-white mb-[var(--space-md)] transition-colors duration-300">
          {heading}
        </h3>
        <p className="text-center text-gray-700 dark:text-gray-400 text-small font-bold uppercase tracking-[2px] mb-[var(--space-xl)] transition-colors duration-300">
          {subheading}
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-[var(--gap-md)]">
          <Field label="FIRST NAME" placeholder="John" />
          <Field label="LAST NAME" placeholder="Doe" />
          <Field
            label="EMAIL ADDRESS"
            type="email"
            placeholder="john@example.com"
          />
          <Field
            label="NUMBER"
            type="tel"
            placeholder="+1 (555) 000-0000"
          />
          <Field
            label="ENTER YOUR SUBJECT"
            placeholder="Your Subject"
            className="md:col-span-2"
          />
          <Field
            label="ENTER YOUR MESSAGE"
            placeholder="Your Message Here"
            textarea
            className="md:col-span-2"
          />

          <button
            type="submit"
            className="md:col-span-2 bg-primary hover:bg-primary/90 text-white py-5 text-small font-black tracking-[3px] uppercase mt-[var(--space-md)] transition-all"
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
