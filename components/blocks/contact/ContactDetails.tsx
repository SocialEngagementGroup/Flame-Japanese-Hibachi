"use client";

import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

type Row = {
  icon: React.ReactNode;
  text: React.ReactNode;
};

const ContactDetails = () => {
  const rows: Row[] = [
    {
      icon: <MapPin size={22} />,
      text: "547C Blacksill Rd., Springfield, VA 22151, USA",
    },
    {
      icon: <Phone size={22} />,
      text: (
        <>
          Phone:{" "}
          <a href="tel:+18887865411" className="hover:text-primary transition-colors">
            +1 888-786-5411
          </a>
        </>
      ),
    },
    {
      icon: <Phone size={22} />,
      text: (
        <>
          Cell:{" "}
          <a href="tel:+17862003917" className="hover:text-primary transition-colors">
            +1 786-200-3917
          </a>
        </>
      ),
    },
    {
      icon: <Mail size={22} />,
      text: (
        <a
          href="mailto:ask@flamejapanesehibachi.com"
          className="hover:text-primary transition-colors"
        >
          ask@flamejapanesehibachi.com
        </a>
      ),
    },
    {
      icon: <Clock size={22} />,
      text: "Mon–Fri 09:00AM – 05:00PM",
    },
  ];

  return (
    <section className="w-full bg-[#F0EDED] dark:bg-black px-[var(--space-lg)] py-[var(--space-2xl)] transition-colors duration-300">
      <div className="max-w-[820px] mx-auto flex flex-col items-center text-center">
        <h2 className="heading-h3 mb-[var(--space-md)] !text-center">
          <span className="text-primary">CONTACT </span>
          <span className="text-black dark:text-white transition-colors duration-300">US</span>
        </h2>
        <p className="text-primary text-small font-black tracking-[2px] uppercase font-sans mb-2">
          OFFICIAL PURPOSE ONLY
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg font-medium mb-[var(--space-lg)] transition-colors duration-300">
          (Please contact the individual stores for food orders)
        </p>

        <ul className="space-y-[var(--space-md)] inline-block text-left">
          {rows.map((row, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-black dark:text-gray-200 text-lg md:text-xl font-medium transition-colors duration-300"
            >
              <span className="text-primary shrink-0 mt-[3px]">{row.icon}</span>
              <span className="leading-relaxed">{row.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ContactDetails;
