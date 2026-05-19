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
  { id: "bento", name: "Bentos" },
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
    subCategory?: string;
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
      price: "9.85",
      tag: "HIBACHI",
      image: "/homepage/menu/HIBACHI.png",
    },
    {
      id: "hib-2",
      name: "BEEF HIBACHI",
      price: "10.85",
      tag: "HIBACHI",
      image: "/homepage/menu/HIBACHI.png",
    },
    {
      id: "hib-3",
      name: "SALMON HIBACHI",
      price: "11.85",
      tag: "HIBACHI",
      image: "/homepage/menu/HIBACHI.png",
    },
    {
      id: "hib-4",
      name: "SHRIMP HIBACHI",
      price: "10.85",
      tag: "HIBACHI",
      image: "/homepage/menu/BUILD YOUR OWN PLATTER.png",
    },
    {
      id: "hib-5",
      name: "TOFU HIBACHI",
      price: "9.85",
      tag: "HIBACHI",
      image: "/homepage/menu/HIBACHI.png",
    },
  ],
  combo: [
    {
      id: "comb-1",
      name: "CHICKEN & BEEF COMBO",
      price: "11.85",
      tag: "FLAME COMBO",
      image: "/homepage/menu/FLAME COMBO.png",
    },
    {
      id: "comb-2",
      name: "CHICKEN & SHRIMP COMBO",
      price: "11.85",
      tag: "FLAME COMBO",
      image: "/homepage/menu/FLAME COMBO.png",
    },
    {
      id: "comb-3",
      name: "BEEF & SHRIMP COMBO",
      price: "12.85",
      tag: "FLAME COMBO",
      image: "/homepage/menu/FLAME COMBO.png",
    },
    {
      id: "comb-4",
      name: "CHICKEN & SALMON COMBO",
      price: "12.85",
      tag: "FLAME COMBO",
      image: "/homepage/menu/FLAME COMBO.png",
    },
    {
      id: "comb-5",
      name: "SALMON & SHRIMP COMBO",
      price: "12.85",
      tag: "FLAME COMBO",
      image: "/homepage/menu/FLAME COMBO.png",
    },
    {
      id: "comb-6",
      name: "BEEF & SALMON COMBO",
      price: "13.85",
      tag: "FLAME COMBO",
      image: "/homepage/menu/FLAME COMBO.png",
    },
    {
      id: "comb-7",
      name: "CHICKEN, BEEF & SHRIMP COMBO",
      price: "14.85",
      tag: "FLAME COMBO",
      image: "/homepage/menu/FLAME COMBO.png",
    },
  ],
  bento: [
    {
      id: "bent-1",
      name: "CHICKEN BENTO",
      price: "12.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
    {
      id: "bent-2",
      name: "TOFU BENTO",
      price: "12.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
    {
      id: "bent-3",
      name: "BEEF BENTO",
      price: "13.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
    {
      id: "bent-4",
      name: "SHRIMP BENTO",
      price: "13.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
    {
      id: "bent-5",
      name: "SALMON BENTO",
      price: "13.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
    {
      id: "bent-6",
      name: "CHICKEN & SHRIMP BENTO",
      price: "13.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
    {
      id: "bent-7",
      name: "CHICKEN & BEEF BENTO",
      price: "13.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
    {
      id: "bent-8",
      name: "CHICKEN & SALMON BENTO",
      price: "13.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
    {
      id: "bent-9",
      name: "BEEF & SHRIMP BENTO",
      price: "13.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
    {
      id: "bent-10",
      name: "BEEF & SALMON BENTO",
      price: "14.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
    {
      id: "bent-11",
      name: "SALMON & SHRIMP BENTO",
      price: "14.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
    {
      id: "bent-12",
      name: "CHICKEN, BEEF & SHRIMP BENTO",
      price: "15.85",
      tag: "BENTO",
      image: "/homepage/menu/BENTO.png",
    },
  ],
  sushi: [
    {
      id: "sush-1",
      name: "CALIFORNIA ROLL",
      price: "7.85",
      tag: "SUSHI",
      image: "/homepage/menu/SUSHI.png",
    },
    {
      id: "sush-2",
      name: "SHRIMP TEMPURA ROLL",
      price: "7.85",
      tag: "SUSHI",
      image: "/homepage/menu/SUSHI.png",
    },
    {
      id: "sush-3",
      name: "SPICY CRAB & SHRIMP ROLL",
      price: "7.85",
      tag: "SUSHI",
      image: "/homepage/menu/SUSHI.png",
    },
    {
      id: "sush-4",
      name: "AVOCADO ROLL",
      price: "7.85",
      tag: "SUSHI",
      image: "/homepage/menu/SUSHI.png",
    },
    {
      id: "sush-5",
      name: "AVOCADO & CUCUMBER ROLL",
      price: "7.85",
      tag: "SUSHI",
      image: "/homepage/menu/SUSHI.png",
    },
    {
      id: "sush-6",
      name: "HIBACHI CHICKEN ROLL",
      price: "7.85",
      tag: "SUSHI",
      image: "/homepage/menu/SUSHI.png",
    },
    {
      id: "sush-7",
      name: "GREEN DRAGON ROLL",
      price: "9.85",
      tag: "SUSHI",
      image: "/homepage/menu/SUSHI.png",
    },
    {
      id: "sush-8",
      name: "SALMON & AVOCADO ROLL",
      price: "10.85",
      tag: "SUSHI",
      image: "/homepage/menu/SUSHI.png",
    },
    {
      id: "sush-9",
      name: "DANCING SHRIMP ROLL",
      price: "9.85",
      tag: "SUSHI",
      image: "/homepage/menu/SUSHI.png",
    },
  ],
  wings: [
    {
      id: "wing-bb-5",
      name: "5 PIECES",
      price: "7.99",
      tag: "Rim Fire",
      image: "/homepage/menu/wings-bg.png",
      subCategory: "BUFFALO/BONELESS WINGS"
    },
    {
      id: "wing-bb-10",
      name: "10 PIECES",
      price: "14.99",
      tag: "Mango Habanero",
      image: "/homepage/menu/wings-bg.png",
      subCategory: "BUFFALO/BONELESS WINGS"
    },
    {
      id: "wing-bb-20",
      name: "20 PIECES",
      price: "27.99",
      tag: "Hot",
      image: "/homepage/menu/wings-bg.png",
      subCategory: "BUFFALO/BONELESS WINGS"
    },
    {
      id: "wing-bb-30",
      name: "30 PIECES",
      price: "39.99",
      tag: "Mild",
      image: "/homepage/menu/wings-bg.png",
      subCategory: "BUFFALO/BONELESS WINGS"
    },
    {
      id: "wing-bb-50",
      name: "50 PIECES",
      price: "66.99",
      tag: "Thai Chilli",
      image: "/homepage/menu/wings-bg.png",
      subCategory: "BUFFALO/BONELESS WINGS"
    },
    {
      id: "wing-bb-100",
      name: "100 PIECES",
      price: "129.99",
      tag: "Lemon Pepper",
      image: "/homepage/menu/wings-bg.png",
      subCategory: "BUFFALO/BONELESS WINGS"
    },
    {
      id: "wing-combo-5",
      name: "5 PIECES",
      price: "10.99",
      tag: "Garlic Parmesan",
      image: "/homepage/menu/wings-bg.png",
      subCategory: "WINGS combo with fries & drink"
    },
    {
      id: "wing-combo-10",
      name: "10 PIECES",
      price: "16.99",
      tag: "Buffalo Gold",
      image: "/homepage/menu/wings-bg.png",
      subCategory: "WINGS combo with fries & drink"
    },
    {
      id: "tender-3",
      name: "3 PIECES",
      price: "7.99",
      tag: "Teriyaki",
      image: "/homepage/menu/wings-bg.png",
      subCategory: "CHICKEN TENDERS"
    },
    {
      id: "tender-4",
      name: "4 PIECES",
      price: "9.99",
      tag: "Sweet & Tangy",
      image: "/homepage/menu/wings-bg.png",
      subCategory: "CHICKEN TENDERS"
    },
    {
      id: "tender-5",
      name: "5 PIECES",
      price: "11.99",
      tag: "Honey Garlic",
      image: "/homepage/menu/wings-bg.png",
      subCategory: "CHICKEN TENDERS"
    },
    {
      id: "tender-combo-3",
      name: "3 PIECES",
      price: "10.99",
      tag: "Honey BBQ",
      image: "/homepage/menu/wings-bg.png",
      subCategory: "CHICKEN TENDERS COMBO WITH FRIES & DRINK"
    },
    {
      id: "tender-combo-4",
      name: "4 PIECES",
      price: "12.99",
      tag: "Chipotle BBQ",
      image: "/homepage/menu/wings-bg.png",
      subCategory: "CHICKEN TENDERS COMBO WITH FRIES & DRINK"
    },
    {
      id: "tender-combo-5",
      name: "5 PIECES",
      price: "14.99",
      tag: "Old Bay",
      image: "/homepage/menu/wings-bg.png",
      subCategory: "CHICKEN TENDERS COMBO WITH FRIES & DRINK"
    }
  ],
  fries: [
    {
      id: "fry-1",
      name: "LOADED TERIYAKI FRIES",
      price: "9.85",
      tag: "FRIES",
      image: "/homepage/menu/FLAME LOADED FRIES.png",
    },
  ],
  boba: [
    {
      id: "boba-1",
      name: "Da Bang Coffee",
      price: "5.99",
      tag: "BEVERAGE",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "boba-2",
      name: "Peach Lychee Fruit Tea",
      price: "6.25",
      tag: "FRUIT TEA",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "boba-3",
      name: "Peach Mango Fruit Tea",
      price: "6.25",
      tag: "FRUIT TEA",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "boba-4",
      name: "Mango Passion Fruit Tea",
      price: "6.25",
      tag: "FRUIT TEA",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "boba-5",
      name: "Yuzu Sparkling Ade",
      price: "6.40",
      tag: "BEVERAGE",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "boba-6",
      name: "Peach Lychee Slush",
      price: "6.49",
      tag: "SLUSH",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "boba-7",
      name: "Brown Sugar Milk Tea",
      price: "6.49",
      tag: "MILK TEA",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "boba-8",
      name: "Creme Thai Milk Tea",
      price: "6.49",
      tag: "MILK TEA",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "boba-9",
      name: "Lavender Lover Milk Tea",
      price: "6.49",
      tag: "MILK TEA",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "boba-10",
      name: "Mango Smoothie",
      price: "6.49",
      tag: "SMOOTHIE",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "boba-11",
      name: "Taro Coconut Smoothie",
      price: "6.49",
      tag: "SMOOTHIE",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "boba-12",
      name: "Watermelon Slush",
      price: "6.49",
      tag: "SLUSH",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "boba-13",
      name: "Strawberry Yogurt Smoothie",
      price: "6.99",
      tag: "SMOOTHIE",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "boba-14",
      name: "Cheesecake Smoothie",
      price: "6.99",
      tag: "SMOOTHIE",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "boba-15",
      name: "Matcha Milk Tea",
      price: "7.15",
      tag: "MILK TEA",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
  ],
  drinks: [
    {
      id: "drink-1",
      name: "Fountain Drink",
      price: "2.95",
      tag: "DRINK",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "drink-2",
      name: "Bottled Drink",
      price: "3.25",
      tag: "DRINK",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    {
      id: "drink-3",
      name: "Bottled Water",
      price: "2.50",
      tag: "DRINK",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
  ],
  addons: [
    {
      id: "add-1",
      name: "Extra Chicken",
      price: "2.95",
      tag: "ADD ON",
      image: "/homepage/menu/ADD ONS.png",
    },
    {
      id: "add-2",
      name: "Extra Salmon / Beef / Shrimp",
      price: "3.95",
      tag: "ADD ON",
      image: "/homepage/menu/ADD ONS.png",
    },
    {
      id: "add-3",
      name: "4 pcs Spring Roll",
      price: "3.95",
      tag: "APPETIZER",
      image: "/homepage/menu/ADD ONS.png",
    },
    {
      id: "add-4",
      name: "5 pcs Dumplings",
      price: "3.95",
      tag: "APPETIZER",
      image: "/homepage/menu/ADD ONS.png",
    },
    {
      id: "add-5",
      name: "3 pcs Shrimp Tempura",
      price: "4.95",
      tag: "APPETIZER",
      image: "/homepage/menu/ADD ONS.png",
    },
    {
      id: "add-6",
      name: "Yum Yum Sauce",
      price: "0.50",
      tag: "SAUCE",
      image: "/homepage/menu/ADD ONS.png",
    },
    {
      id: "add-7",
      name: "Fried Rice",
      price: "4.95",
      tag: "SIDE",
      image: "/homepage/menu/ADD ONS.png",
    },
    {
      id: "add-8",
      name: "White Rice",
      price: "2.95",
      tag: "SIDE",
      image: "/homepage/menu/ADD ONS.png",
    },
    {
      id: "add-9",
      name: "Vegetables",
      price: "4.95",
      tag: "SIDE",
      image: "/homepage/menu/ADD ONS.png",
    },
    {
      id: "add-10",
      name: "Lo Mein Noodles",
      price: "4.95",
      tag: "SIDE",
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
