"use client";

import React, { useState, useEffect, useRef } from "react";
import MenuSidebar from "./MenuSidebar";
import MenuMainContent from "./MenuMainContent";
import MenuCTA from "./MenuCTA";
import CateringCTA from "./CateringCTA";

import {
  menuCategories as categories,
  menuItemsByCategory as menuData,
} from "@/lib/data/menu";

const InteractiveMenu = () => {
  const [activeCategory, setActiveCategory] = useState("favorites");
  const isScrollingRef = useRef(false);

  // Scrollspy logic: update sidebar active item based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      let offset = 125; // Default/Desktop sticky header offset (123px + 2px buffer)
      if (window.innerWidth < 768) {
        offset = 177; // Mobile sticky header offset (175px + 2px buffer)
      } else if (window.innerWidth < 1024) {
        offset = 166; // Tablet sticky header offset (164px + 2px buffer)
      } else if (window.innerWidth < 1280) {
        offset = 170; // lg breakpoint sticky header offset (168px + 2px buffer)
      }
      const scrollPosition = window.scrollY + offset;

      // Check if we've reached the bottom of the page
      const isAtBottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;

      if (isAtBottom) {
        setActiveCategory(categories[categories.length - 1].id);
        return;
      }

      for (const category of categories) {
        const el = document.getElementById(`section-${category.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // rect.top is the distance from the top of the viewport.
          // When rect.top <= offset, the element has reached or passed the sticky position.
          // We check if it's within the viewport bounds taking height into account.
          if (rect.top <= offset && rect.bottom > offset) {
            setActiveCategory(category.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click to scroll to category section with screen size dynamic offsets
  const scrollToSection = (id: string) => {
    isScrollingRef.current = true;
    setActiveCategory(id);

    const element = document.getElementById(`section-${id}`);
    if (element) {
      let offset = 123; // Default/Desktop sticky title top offset
      if (window.innerWidth < 768) {
        offset = 175; // Mobile sticky title top offset
      } else if (window.innerWidth < 1024) {
        offset = 164; // Tablet sticky title top offset
      } else if (window.innerWidth < 1280) {
        offset = 168; // lg breakpoint sticky title top offset
      }
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    // Release scroll tracking lock after animation finishes
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  // pt-0 on every breakpoint: this sits directly under the location banner and
  // used to have md:pt-10, which left a visible gap between the two.
  return (
    <section className="w-full bg-background text-foreground pt-0 pb-0 transition-colors duration-300">
      <div className="w-full md:px-8 xl:px-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 relative">
          <MenuSidebar
            categories={categories}
            activeCategory={activeCategory}
            scrollToSection={scrollToSection}
          />
          <MenuMainContent categories={categories} menuData={menuData} />
        </div>
      </div>
      <MenuCTA />
      <CateringCTA />
    </section>
  );
};

export default InteractiveMenu;
