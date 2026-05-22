"use client";

import React, { useState, useEffect, useRef } from "react";
import MenuSidebar from "./MenuSidebar";
import MenuMainContent from "./MenuMainContent";
import MenuCTA from "./MenuCTA";
import CateringCTA from "./CateringCTA";

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
    subCategory?: string;
  }>
> = {
  favorites: [
    {
      id: "fav-1",
      name: "SALMON HIBACHI",
      price: "11.85",
      tag: "BEST SELLER",
      image: "/menupage/Hibachi/salmon-hibachi-plate.jpg",
    },
    {
      id: "fav-2",
      name: "CALIFORNIA ROLL",
      price: "7.85",
      tag: "SUSHI",
      image: "/menupage/Sushi/california-roll.jpg",
    },
    {
      id: "fav-3",
      name: "CHICKEN & BEEF BENTO",
      price: "13.85",
      tag: "BENTO",
      image: "/menupage/Bento/Chicken-&-Beef-Bento.jpg",
    },
    {
      id: "fav-4",
      name: "STEAK HIBACHI",
      price: "12.85",
      tag: "HIBACHI",
      image: "/menupage/Hibachi/beef-hibachi-plate.jpg",
    },
  ],
  promotions: [
    {
      id: "prom-1",
      name: "CHICKEN HIBACHI",
      price: "9.85",
      tag: "HIBACHI",
      image: "/menupage/Hibachi/chicken-hibachi-plate.jpg",
    },
    {
      id: "prom-2",
      name: "GREEN DRAGON ROLL",
      price: "9.85",
      tag: "SUSHI",
      image: "/menupage/Sushi/green-dragon.jpg",
    },
    {
      id: "prom-3",
      name: "CHICKEN & BEEF COMBO",
      price: "11.85",
      tag: "FLAME COMBO",
      image: "/menupage/Flame Combo/Chicken-&-Beef.jpg",
    },
  ],
  hibachi: [
    {
      id: "hib-1",
      name: "CHICKEN HIBACHI",
      price: "9.85",
      tag: "HIBACHI",
      image: "/menupage/Hibachi/chicken-hibachi-plate.jpg",
    },
    {
      id: "hib-2",
      name: "BEEF HIBACHI",
      price: "10.85",
      tag: "HIBACHI",
      image: "/menupage/Hibachi/beef-hibachi-plate.jpg",
    },
    {
      id: "hib-3",
      name: "SALMON HIBACHI",
      price: "11.85",
      tag: "HIBACHI",
      image: "/menupage/Hibachi/salmon-hibachi-plate.jpg",
    },
    {
      id: "hib-4",
      name: "SHRIMP HIBACHI",
      price: "10.85",
      tag: "HIBACHI",
      image: "/menupage/Hibachi/shrimp-hibachi-plate.jpg",
    },
    {
      id: "hib-5",
      name: "TOFU HIBACHI",
      price: "9.85",
      tag: "HIBACHI",
      image: "/menupage/Hibachi/chicken-hibachi-plate.jpg",
    },
  ],
  combo: [
    {
      id: "comb-1",
      name: "CHICKEN & BEEF COMBO",
      price: "11.85",
      tag: "FLAME COMBO",
      image: "/menupage/Flame Combo/Chicken-&-Beef.jpg",
    },
    {
      id: "comb-2",
      name: "CHICKEN & SHRIMP COMBO",
      price: "11.85",
      tag: "FLAME COMBO",
      image: "/menupage/Flame Combo/Chicken-&-Shrimp.jpg",
    },
    {
      id: "comb-3",
      name: "BEEF & SHRIMP COMBO",
      price: "12.85",
      tag: "FLAME COMBO",
      image: "/menupage/Flame Combo/Beef-&-Shrimp.jpg",
    },
    /* HIDDEN - Chicken & Salmon Combo (not available)
    {
      id: "comb-4",
      name: "CHICKEN & SALMON COMBO",
      price: "12.85",
      tag: "FLAME COMBO",
      image: "/menupage/Flame Combo/Chicken-&-Salmon.jpg",
    },
    */
    {
      id: "comb-5",
      name: "SALMON & SHRIMP COMBO",
      price: "12.85",
      tag: "FLAME COMBO",
      image: "/menupage/Flame Combo/Salmon-&-Shrimp.jpg",
    },
    {
      id: "comb-6",
      name: "BEEF & SALMON COMBO",
      price: "13.85",
      tag: "FLAME COMBO",
      image: "/menupage/Flame Combo/Beef-&-Salmon.jpg",
    },
    {
      id: "comb-7",
      name: "CHICKEN, BEEF & SHRIMP COMBO",
      price: "14.85",
      tag: "FLAME COMBO",
      image: "/menupage/Flame Combo/Chicken-Beef-&-Shrimp.jpg",
    },
  ],
  bento: [
    {
      id: "bent-1",
      name: "CHICKEN BENTO",
      price: "12.85",
      tag: "BENTO",
      image: "/menupage/Bento/Chicken-Bento.jpg",
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
      image: "/menupage/Bento/Beef-Bento.jpg",
    },
    {
      id: "bent-4",
      name: "SHRIMP BENTO",
      price: "13.85",
      tag: "BENTO",
      image: "/menupage/Bento/Shrimp-Bento.jpg",
    },
    {
      id: "bent-5",
      name: "SALMON BENTO",
      price: "13.85",
      tag: "BENTO",
      image: "/menupage/Bento/Salmon-Bento.jpg",
    },
    {
      id: "bent-6",
      name: "CHICKEN & SHRIMP BENTO",
      price: "13.85",
      tag: "BENTO",
      image: "/menupage/Bento/Chicken-&-Shrimp-Bento.jpg",
    },
    {
      id: "bent-7",
      name: "CHICKEN & BEEF BENTO",
      price: "13.85",
      tag: "BENTO",
      image: "/menupage/Bento/Chicken-&-Beef-Bento.jpg",
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
      image: "/menupage/Bento/Beef-&-Shrimp-Bento.jpg",
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
      image: "/menupage/Bento/Salmon-&-Shrimp-Bento.jpg",
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
      image: "/menupage/Sushi/california-roll.jpg",
    },
    {
      id: "sush-2",
      name: "SHRIMP TEMPURA ROLL",
      price: "7.85",
      tag: "SUSHI",
      image: "/menupage/Sushi/shrimp-tempura.jpg",
    },
    {
      id: "sush-3",
      name: "SPICY CRAB & SHRIMP ROLL",
      price: "7.85",
      tag: "SUSHI",
      image: "/menupage/Sushi/spicy-crab-shrimp-roll.jpg",
    },
    {
      id: "sush-4",
      name: "AVOCADO ROLL",
      price: "7.85",
      tag: "SUSHI",
      image: "/menupage/Sushi/avocado-roll.jpg",
    },
    {
      id: "sush-5",
      name: "AVOCADO & CUCUMBER ROLL",
      price: "7.85",
      tag: "SUSHI",
      image: "/menupage/Sushi/avocado-cucumber.jpg",
    },
    {
      id: "sush-6",
      name: "HIBACHI CHICKEN ROLL",
      price: "7.85",
      tag: "SUSHI",
      image: "/menupage/Sushi/hibachi-chicken-roll.jpg",
    },
    {
      id: "sush-7",
      name: "GREEN DRAGON ROLL",
      price: "9.85",
      tag: "SUSHI",
      image: "/menupage/Sushi/green-dragon.jpg",
    },
    {
      id: "sush-8",
      name: "SALMON & AVOCADO ROLL",
      price: "10.85",
      tag: "SUSHI",
      image: "/menupage/Sushi/avocado-roll.jpg",
    },
    {
      id: "sush-9",
      name: "DANCING SHRIMP ROLL",
      price: "9.85",
      tag: "SUSHI",
      image: "/menupage/Sushi/dancing-shrimp.jpg",
    },
  ],
  wings: [
    {
      id: "wing-buf-5",
      name: "5 PIECES",
      price: "7.99",
      tag: "BUFFALO WINGS",
      image: "/menupage/Wings/10 Pieces.png",
      subCategory: "BUFFALO WINGS"
    },
    {
      id: "wing-buf-10",
      name: "10 PIECES",
      price: "14.99",
      tag: "BUFFALO WINGS",
      image: "/menupage/Wings/10 Pieces.png",
      subCategory: "BUFFALO WINGS"
    },
    {
      id: "wing-buf-20",
      name: "20 PIECES",
      price: "27.99",
      tag: "BUFFALO WINGS",
      image: "/menupage/Wings/20 Pieces.png",
      subCategory: "BUFFALO WINGS"
    },
    {
      id: "wing-buf-30",
      name: "30 PIECES",
      price: "39.99",
      tag: "BUFFALO WINGS",
      image: "/menupage/Wings/30 Pieces.png",
      subCategory: "BUFFALO WINGS"
    },
    {
      id: "wing-buf-50",
      name: "50 PIECES",
      price: "66.99",
      tag: "BUFFALO WINGS",
      image: "/menupage/Wings/50 Pieces.png",
      subCategory: "BUFFALO WINGS"
    },
    {
      id: "wing-buf-100",
      name: "100 PIECES",
      price: "129.99",
      tag: "BUFFALO WINGS",
      image: "/menupage/Wings/100 Pieces.png",
      subCategory: "BUFFALO WINGS"
    },
    {
      id: "wing-bon-5",
      name: "5 PIECES",
      price: "7.99",
      tag: "BONELESS WINGS",
      image: "/menupage/Wings/10 Pieces.png",
      subCategory: "BONELESS WINGS"
    },
    {
      id: "wing-bon-10",
      name: "10 PIECES",
      price: "14.99",
      tag: "BONELESS WINGS",
      image: "/menupage/Wings/10 Pieces.png",
      subCategory: "BONELESS WINGS"
    },
    {
      id: "wing-bon-20",
      name: "20 PIECES",
      price: "27.99",
      tag: "BONELESS WINGS",
      image: "/menupage/Wings/20 Pieces.png",
      subCategory: "BONELESS WINGS"
    },
    {
      id: "wing-bon-30",
      name: "30 PIECES",
      price: "39.99",
      tag: "BONELESS WINGS",
      image: "/menupage/Wings/30 Pieces.png",
      subCategory: "BONELESS WINGS"
    },
    {
      id: "wing-bon-50",
      name: "50 PIECES",
      price: "66.99",
      tag: "BONELESS WINGS",
      image: "/menupage/Wings/50 Pieces.png",
      subCategory: "BONELESS WINGS"
    },
    {
      id: "wing-bon-100",
      name: "100 PIECES",
      price: "129.99",
      tag: "BONELESS WINGS",
      image: "/menupage/Wings/100 Pieces.png",
      subCategory: "BONELESS WINGS"
    },
    {
      id: "wing-combo-5",
      name: "5 PIECES",
      price: "10.99",
      tag: "Garlic Parmesan",
      image: "/menupage/Wings/Combo-5-Pieces.png",
      subCategory: "WINGS combo with fries & drink"
    },
    {
      id: "wing-combo-10",
      name: "10 PIECES",
      price: "16.99",
      tag: "Buffalo Gold",
      image: "/menupage/Wings/Combo-10-Pieces.png",
      subCategory: "WINGS combo with fries & drink"
    },
    {
      id: "tender-3",
      name: "3 PIECES",
      price: "7.99",
      tag: "CHICKEN TENDERS",
      image: "/menupage/Wings/Tenders.png",
      subCategory: "CHICKEN TENDERS"
    },
    {
      id: "tender-4",
      name: "4 PIECES",
      price: "9.99",
      tag: "CHICKEN TENDERS",
      image: "/menupage/Wings/Tenders.png",
      subCategory: "CHICKEN TENDERS"
    },
    {
      id: "tender-5",
      name: "5 PIECES",
      price: "11.99",
      tag: "CHICKEN TENDERS",
      image: "/menupage/Wings/Tenders.png",
      subCategory: "CHICKEN TENDERS"
    },
    {
      id: "tender-combo-3",
      name: "3 PIECES",
      price: "10.99",
      tag: "CHICKEN TENDERS COMBO",
      image: "/menupage/Wings/Tender-Combo-3-Pieces.png",
      subCategory: "CHICKEN TENDERS COMBO WITH FRIES & DRINK"
    },
    {
      id: "tender-combo-4",
      name: "4 PIECES",
      price: "12.99",
      tag: "CHICKEN TENDERS COMBO",
      image: "/menupage/Wings/Tender-Combo-4-Pieces.png",
      subCategory: "CHICKEN TENDERS COMBO WITH FRIES & DRINK"
    },
    {
      id: "tender-combo-5",
      name: "5 PIECES",
      price: "14.99",
      tag: "CHICKEN TENDERS COMBO",
      image: "/menupage/Wings/Tender-Combo-5-Pieces.png",
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
    /* HIDDEN - Peach Mango Fruit Tea (not available)
    {
      id: "boba-3",
      name: "Peach Mango Fruit Tea",
      price: "6.25",
      tag: "FRUIT TEA",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    */
    {
      id: "boba-new-1",
      name: "Oreo Smoothie",
      price: "6.40",
      tag: "SMOOTHIE",
      image: "/menupage/Boba Drinks/Oreo-Smoothie.jpg",
    },
    {
      id: "boba-4",
      name: "Mango Passion Fruit Tea",
      price: "6.25",
      tag: "FRUIT TEA",
      image: "/menupage/Boba Drinks/Mango-Passion-Fruit-Tea.jpg",
    },
    {
      id: "boba-5",
      name: "Yuzu Sparkling Ade",
      price: "6.40",
      tag: "BEVERAGE",
      image: "/menupage/Boba Drinks/Yuzu-Sparkling-Ade.jpg",
    },
    /* HIDDEN - Peach Lychee Slush (not available)
    {
      id: "boba-6",
      name: "Peach Lychee Slush",
      price: "6.49",
      tag: "SLUSH",
      image: "/homepage/menu/BOBA TEA  SMOOTHIES  Drinks.png",
    },
    */
    {
      id: "boba-7",
      name: "Brown Sugar Milk Tea",
      price: "6.49",
      tag: "MILK TEA",
      image: "/menupage/Boba Drinks/Brown-Sugar-Milk-Tea.jpg",
    },
    {
      id: "boba-8",
      name: "Creme Thai Milk Tea",
      price: "6.49",
      tag: "MILK TEA",
      image: "/menupage/Boba Drinks/Creme-Thai-Milk-Tea.jpg",
    },
    {
      id: "boba-10",
      name: "Mango Smoothie",
      price: "6.49",
      tag: "SMOOTHIE",
      image: "/menupage/Boba Drinks/Mango-Smoothie.jpg",
    },
    {
      id: "boba-11",
      name: "Taro Coconut Smoothie",
      price: "6.49",
      tag: "SMOOTHIE",
      image: "/menupage/Boba Drinks/Taro-Coconut-Smoothie.jpg",
    },
    {
      id: "boba-12",
      name: "Watermelon Slush",
      price: "6.49",
      tag: "SLUSH",
      image: "/menupage/Boba Drinks/Water-Melon-Slush.jpg",
    },
    {
      id: "boba-13",
      name: "Strawberry Yogurt Smoothie",
      price: "6.99",
      tag: "SMOOTHIE",
      image: "/menupage/Boba Drinks/Strawberry-Yogurt-Smoothie.jpg",
    },
    {
      id: "boba-14",
      name: "Cheesecake Smoothie",
      price: "6.99",
      tag: "SMOOTHIE",
      image: "/menupage/Boba Drinks/Cheese-Cake-Smoothie.jpg",
    },
    {
      id: "boba-15",
      name: "Matcha Milk Tea",
      price: "7.15",
      tag: "MILK TEA",
      image: "/menupage/Boba Drinks/Salted-Cream-Match-Milk-Tea.jpg",
    },
    {
      id: "boba-1",
      name: "Da Bang Coffee",
      price: "5.99",
      tag: "BEVERAGE",
      image: "/menupage/Boba Drinks/Da-Bang-Coffee.jpg",
    },
    {
      id: "boba-2",
      name: "Peach Lychee Fruit Tea",
      price: "6.25",
      tag: "FRUIT TEA",
      image: "/menupage/Boba Drinks/Peach-Lychee-Fruit-Tea.jpg",
    },
    {
      id: "boba-new-2",
      name: "Hot Milk Tea",
      price: "6.45",
      tag: "MILK TEA",
      image: "/menupage/Boba Drinks/Hot-Milk-Tea.jpg",
    },
    {
      id: "boba-9",
      name: "Lavender Lover Milk Tea",
      price: "6.49",
      tag: "MILK TEA",
      image: "/menupage/Boba Drinks/Lavender-Lover-Milk-Tea.jpg",
    },
  ],
  drinks: [
    {
      id: "drink-1",
      name: "Fountain Drink",
      price: "2.95",
      tag: "DRINK",
      image: "/menupage/Drinks/Fountain-Drink.png",
    },
    {
      id: "drink-2",
      name: "Bottled Drink",
      price: "3.25",
      tag: "DRINK",
      image: "/menupage/Drinks/Bottled-Drink.png",
    },
    {
      id: "drink-3",
      name: "Bottled Water",
      price: "2.50",
      tag: "DRINK",
      image: "/menupage/Drinks/Bottled-Water.png",
    },
  ],
  addons: [
    {
      id: "add-1",
      name: "Extra Chicken",
      price: "2.95",
      tag: "ADD ON",
      image: "/menupage/Add Ons/Extra-Chicken.png",
    },
    {
      id: "add-2",
      name: "Extra Salmon / Beef / Shrimp",
      price: "3.95",
      tag: "ADD ON",
      image: "/menupage/Add Ons/Extra-Salmon-Beef-Shrimp.png",
    },
    {
      id: "add-3",
      name: "4 pcs Spring Roll",
      price: "3.95",
      tag: "APPETIZER",
      image: "/menupage/Add Ons/4-pcs-Spring-Roll.png",
    },
    {
      id: "add-4",
      name: "5 pcs Dumplings",
      price: "3.95",
      tag: "APPETIZER",
      image: "/menupage/Add Ons/5-pcs-Dumplings.png",
    },
    {
      id: "add-5",
      name: "3 pcs Shrimp Tempura",
      price: "4.95",
      tag: "APPETIZER",
      image: "/menupage/Add Ons/3-pcs-Shrimp-Tempura.png",
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
      image: "/menupage/Add Ons/Fried-Rice.png",
    },
    {
      id: "add-8",
      name: "White Rice",
      price: "2.95",
      tag: "SIDE",
      image: "/menupage/Add Ons/White-Rice.png",
    },
    {
      id: "add-9",
      name: "Vegetables",
      price: "4.95",
      tag: "SIDE",
      image: "/menupage/Add Ons/Vegetables.png",
    },
    {
      id: "add-10",
      name: "Lo Mein Noodles",
      price: "4.95",
      tag: "SIDE",
      image: "/menupage/Add Ons/Lo-Mein-Noodles.png",
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
        Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

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

  return (
    <section className="w-full bg-background text-foreground pt-0 md:pt-10 pb-0 transition-colors duration-300">
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
      <MenuCTA />
      <CateringCTA />
    </section>
  );
};

export default InteractiveMenu;
