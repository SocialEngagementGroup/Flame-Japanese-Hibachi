"use client";

import React, { useState, useEffect, useRef } from "react";
import MenuSidebar from "./MenuSidebar";
import MenuMainContent from "./MenuMainContent";

// Menu categories definition
const categories = [
  { id: "favorites", name: "CUSTOMER'S FAVORITE" },
  { id: "promotions", name: "PROMOTIONS" },
  { id: "hibachi", name: "HIBACHI" },
  { id: "combo", name: "FLAME COMBO" },
  { id: "bento", name: "BENTO" },
  { id: "sushi", name: "SUSHI" },
  { id: "wings", name: "WINGS/TENDERS" },
  { id: "fries", name: "FLAME LOADED FRIES" },
  { id: "boba", name: "BOBA TEA/SMOOTHIES" },
  { id: "drinks", name: "DRINKS" },
  { id: "addons", name: "ADD ONS/APPETIZER" },
];

// High fidelity menu mock data
const menuData: Record<
  string,
  Array<{
    id: string;
    name: string;
    price: string;
    tag: string;
    image: string;
  }>
> = {
  favorites: [
    {
      id: "fav-1",
      name: "SALMON HIBACHI",
      price: "11.85",
      tag: "BEST SELLER",
      image: "/homepage/menu/HIBACHI.png",
    },
    {
      id: "fav-2",
      name: "CALIFORNIA ROLL",
      price: "7.85",
      tag: "SUSHI",
      image: "/homepage/menu/SUSHI.png",
    },
    {
      id: "fav-3",
      name: "CHICKEN & BEEF BENTO",
      price: "13.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
    {
      id: "fav-4",
      name: "STEAK HIBACHI",
      price: "12.85",
      tag: "HIBACHI",
      image: "/homepage/menu/HIBACHI.png",
    },
  ],
  promotions: [
    {
      id: "prom-1",
      name: "SALMON HIBACHI",
      price: "11.85",
      tag: "BEST SELLER",
      image: "/homepage/menu/HIBACHI.png",
    },
    {
      id: "prom-2",
      name: "SALMON HIBACHI",
      price: "11.85",
      tag: "HEAT SELLER",
      image: "/homepage/menu/HIBACHI.png",
    },
    {
      id: "prom-3",
      name: "SALMON HIBACHI",
      price: "11.85",
      tag: "BEST SELLER",
      image: "/homepage/menu/HIBACHI.png",
    },
  ],
  hibachi: [
    {
      id: "hib-1",
      name: "CHICKEN HIBACHI",
      price: "10.85",
      tag: "HIBACHI",
      image: "/homepage/menu/HIBACHI.png",
    },
    {
      id: "hib-2",
      name: "STEAK HIBACHI",
      price: "12.85",
      tag: "HIBACHI",
      image: "/homepage/menu/HIBACHI.png",
    },
    {
      id: "hib-3",
      name: "SHRIMP HIBACHI",
      price: "13.85",
      tag: "HIBACHI",
      image: "/homepage/menu/BUILD YOUR OWN PLATTER.png",
    },
  ],
  combo: [
    {
      id: "comb-1",
      name: "CHICKEN & STEAK COMBO",
      price: "14.85",
      tag: "FLAME COMBO",
      image: "/homepage/menu/FLAME COMBO.png",
    },
    {
      id: "comb-2",
      name: "SHRIMP & SALMON COMBO",
      price: "16.85",
      tag: "FLAME COMBO",
      image: "/homepage/menu/FLAME COMBO.png",
    },
  ],
  bento: [
    {
      id: "bent-1",
      name: "CHICKEN BENTO BOX",
      price: "11.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
    {
      id: "bent-2",
      name: "BEEF BENTO BOX",
      price: "12.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
    {
      id: "bent-3",
      name: "SALMON BENTO BOX",
      price: "13.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
  ],
  sushi: [
    {
      id: "sush-1",
      name: "SPICY TUNA ROLL",
      price: "8.85",
      tag: "SUSHI",
      image: "/homepage/menu/SUSHI.png",
    },
    {
      id: "sush-2",
      name: "DRAGON ROLL",
      price: "11.85",
      tag: "SUSHI",
      image: "/homepage/menu/SUSHI.png",
    },
    {
      id: "sush-3",
      name: "CALIFORNIA ROLL",
      price: "7.85",
      tag: "SUSHI",
      image: "/homepage/menu/SUSHI.png",
    },
  ],
  wings: [
    {
      id: "wing-1",
      name: "6PC HONEY WINGS",
      price: "8.85",
      tag: "WINGS",
      image: "/homepage/menu/WINGS  TENDERS.png",
    },
    {
      id: "wing-2",
      name: "10PC CRISPY WINGS",
      price: "12.85",
      tag: "WINGS",
      image: "/homepage/menu/WINGS  TENDERS.png",
    },
    {
      id: "wing-3",
      name: "SPICY TENDERS",
      price: "9.85",
      tag: "TENDERS",
      image: "/homepage/menu/WINGS  TENDERS.png",
    },
  ],
  fries: [
    {
      id: "fry-1",
      name: "FLAME LOADED FRIES",
      price: "7.85",
      tag: "FRIES",
      image: "/homepage/menu/FLAME LOADED FRIES.png",
    },
    {
      id: "fry-2",
      name: "DOUBLE CHEESE FRIES",
      price: "9.85",
      tag: "FRIES",
      image: "/homepage/menu/FLAME LOADED FRIES.png",
    },
  ],
  boba: [
    {
      id: "bob-1",
      name: "BROWN SUGAR BOBA",
      price: "5.85",
      tag: "BOBA TEA",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "bob-2",
      name: "MANGO SMOOTHIE",
      price: "6.85",
      tag: "SMOOTHIE",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
  ],
  drinks: [
    {
      id: "drk-1",
      name: "FOUNTAIN DRINK",
      price: "2.85",
      tag: "DRINK",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "drk-2",
      name: "RAMUNE SODA",
      price: "3.85",
      tag: "DRINK",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
  ],
  addons: [
    {
      id: "add-1",
      name: "CRISPY GYOZA",
      price: "5.85",
      tag: "APPETIZER",
      image: "/homepage/menu/ADD ONS.png",
    },
    {
      id: "add-2",
      name: "SALTED EDAMAME",
      price: "4.85",
      tag: "APPETIZER",
      image: "/homepage/menu/ADD ONS.png",
    },
  ],
};

const InteractiveMenu = () => {
  const [activeCategory, setActiveCategory] = useState("favorites");
  const isScrollingRef = useRef(false);

  // Scrollspy logic: update sidebar active item based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      // Highly precise scroll spy offsets mapped to exact sticky top positions
      let offset = 133; // Desktop sticky header offset (123px + 10px buffer)
      if (window.innerWidth < 768) {
        offset = 185; // Mobile sticky header offset (175px + 10px buffer)
      } else if (window.innerWidth < 1024) {
        offset = 133; // Tablet sticky header offset (123px + 10px buffer)
      }

      const scrollPosition = window.scrollY + offset;

      for (const category of categories) {
        const el = document.getElementById(`section-${category.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
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
      let offset = 123; // Desktop sticky title top offset
      if (window.innerWidth < 768) {
        offset = 175; // Mobile sticky title top offset
      } else if (window.innerWidth < 1024) {
        offset = 123; // Tablet sticky title top offset
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

  return (
    <section className="w-full bg-background text-foreground pt-0 pb-12 md:py-20 transition-colors duration-300">
      <div className="w-full md:px-8 xl:px-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 relative">
          <MenuSidebar
            categories={categories}
            activeCategory={activeCategory}
            scrollToSection={scrollToSection}
          />
          <MenuMainContent
            categories={categories}
            menuData={menuData}
          />
        </div>
      </div>
    </section>
  );
};

export default InteractiveMenu;
