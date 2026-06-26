"use client";

import React, { useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface MenuItem {
  id: string;
  name: string;
  price: string;
  tag: string;
  image: string;
  subCategory?: string;
}

interface MenuMainContentProps {
  categories: Category[];
  menuData: Record<string, MenuItem[]>;
}

const MenuMainContent: React.FC<MenuMainContentProps> = ({
  categories,
  menuData,
}) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // Toggle active card
  const handleCardClick = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  // Resting-state readability shadow; removed on hover where the orange overlay
  // already provides contrast. Omitted entirely when the card is active.
  const RESTING_SHADOW =
    "[text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_6px_rgba(0,0,0,0.6)] group-hover:[text-shadow:none]";

  const renderListCard = (item: MenuItem) => (
    <a
      key={item.id}
      href="https://order.online/business/~13770567"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center w-full bg-zinc-950 hover:bg-[#FF7808] border border-zinc-800 hover:border-[#FF7808] rounded-sm py-[10px] pl-2 pr-2 gap-3 mb-2 transition-colors duration-300"
    >
      {/* Left: tag + name */}
      <div className="flex-1 min-w-0">
        <span className="block text-[#FF7808] group-hover:text-white text-[12px] font-black uppercase tracking-[2px] leading-none mb-[6px] transition-colors duration-300">
          {item.tag}
        </span>
        <h3
          className="text-white group-hover:text-white uppercase leading-snug transition-colors duration-300"
          style={{
            fontFamily: "var(--font-serif-next), sans-serif",
            fontSize: "16px",
            fontWeight: 900,
          }}
        >
          {item.name}
        </h3>
      </div>

      {/* Middle: 2-col grid — icons left-aligned, price/-1+ right-aligned */}
      <div
        className="flex-shrink-0"
        style={{ display: "grid", gridTemplateColumns: "22px auto", rowGap: "8px", columnGap: "10px", alignItems: "center" }}
      >
        {/* Row 1 col 1: heart icon */}
        <button
          onClick={(e) => e.preventDefault()}
          className="text-zinc-400 group-hover:text-white transition-colors duration-300 flex items-center justify-center"
          aria-label="Save"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        {/* Row 1 col 2: price */}
        <span className="text-white group-hover:text-white font-bold text-[20px] leading-none transition-colors duration-300">${item.price}</span>

        {/* Row 2 col 1: cart icon */}
        <button
          onClick={(e) => e.preventDefault()}
          className="text-white group-hover:text-white transition-colors duration-300 flex items-center justify-center"
          aria-label="Order"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </button>
        {/* Row 2 col 2: quantity control */}
        <div className="flex items-center border border-zinc-600 group-hover:border-white overflow-hidden transition-colors duration-300">
          <button
            onClick={(e) => e.preventDefault()}
            className="text-white group-hover:text-white text-[16px] font-bold px-[5px] py-[2px] leading-none transition-colors duration-300"
          >
            −
          </button>
          <span className="text-white group-hover:text-white text-[16px] font-bold px-[4px] leading-none border-x border-zinc-600 group-hover:border-white transition-colors duration-300">1</span>
          <button
            onClick={(e) => e.preventDefault()}
            className="text-white group-hover:text-white text-[16px] font-bold px-[5px] py-[2px] leading-none transition-colors duration-300"
          >
            +
          </button>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="w-[82px] h-[66px] flex-shrink-0 overflow-hidden rounded-sm">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/homepage/menu/HIBACHI.png";
          }}
        />
      </div>
    </a>
  );

  const renderWingCard = (item: MenuItem, isCardActive: boolean) => (
    <a
      key={item.id}
      href="https://order.online/business/~13770567"
      target="_blank"
      rel="noopener noreferrer"
      className="w-full min-h-[300px] md:min-h-[355px] aspect-[1] sm:aspect-[6/5] mx-auto flex flex-col bg-zinc-950 overflow-hidden border border-zinc-900/60 group rounded-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(255,120,8,0.15)] relative cursor-pointer block"
    >
      {/* Full Box Picture Background */}
      <img
        src={item.image}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110 z-0"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "/homepage/menu/HIBACHI.png";
        }}
      />

      {/* Default Linear Gradient Shadow Overlay */}
      <div
        className="absolute bottom-0 left-0 w-full h-[165px] transition-opacity duration-500 z-10 opacity-100 group-hover:opacity-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.45) 45%, #000 100%)",
        }}
      />

      {/* Active / Hover Block Color Overlay */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[165px] bg-[#FF7808] transition-opacity duration-500 z-20 ${isCardActive
          ? "opacity-100"
          : "opacity-0 group-hover:opacity-100"
          }`}
      />

      {/* Orange Bottom Border on Hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#FF7808] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-50" />

      {/* Card Text & Price Details Overlay Container */}
      <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end z-30 pointer-events-none h-[165px]">
        {/* Tag */}
        <span
          style={{
            fontFamily: "Raleway",
            fontSize: "10px",
            fontStyle: "normal",
            fontWeight: 900,
            lineHeight: "40px",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
          className={`transition-colors duration-300 block truncate mb-1 ${isCardActive ? "text-white" : `text-[#FF7808] group-hover:text-white ${RESTING_SHADOW}`}`}
        >
          {item.tag}
        </span>

        {/* Title (e.g. 5 PIECES) */}
        <h3
          style={{
            color: "#FFF",
            fontFamily: '"Work Sans", sans-serif',
            fontSize: "36px",
            fontStyle: "normal",
            fontWeight: 900,
            lineHeight: "20px",
            textTransform: "uppercase",
          }}
          className={`mb-1 ${isCardActive ? "" : RESTING_SHADOW}`}
        >
          {item.name}
        </h3>

        {/* Price Container */}
        <div className="flex items-center mt-1 pointer-events-auto h-[59px]">
          <span
            style={{
              color: "#FFF",
              fontFamily: '"Work Sans", sans-serif',
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "59px",
              textTransform: "uppercase",
            }}
            className={isCardActive ? "" : RESTING_SHADOW}
          >
            ${item.price}
          </span>
        </div>
      </div>
    </a>
  );

  const renderRegularCard = (item: MenuItem, category: Category, isCardActive: boolean) => {
    const CardContent = (
      <>
        {/* Full Box Picture Background */}
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110 z-0"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/homepage/menu/HIBACHI.png";
          }}
        />

        {/* Default Linear Gradient Shadow Overlay (Height 145px) */}
        <div
          className="absolute bottom-0 left-0 w-full h-[145px] transition-opacity duration-500 z-10 opacity-100 group-hover:opacity-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.45) 45%, #000 100%)",
          }}
        />

        {/* Active / Hover Block Color Overlay (Height 145px) */}
        <div
          className={`absolute bottom-0 left-0 w-full h-[145px] bg-[#FF7808] transition-opacity duration-500 z-20 ${isCardActive
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
            }`}
        />

        {/* Orange Bottom Border on Hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#FF7808] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-50" />

        {/* Card Text & Price Details Overlay Container */}
        <div className="absolute bottom-0 left-0 w-full h-[145px] p-4 flex flex-col justify-end z-30 pointer-events-none">
          <div className="mb-2">
            {/* Tag (BEST SELLER) */}
            <span
              className={`text-[10px] font-[family-name:var(--font-serif-next)] font-black tracking-[2px] uppercase transition-colors duration-300 block mb-1 leading-none ${isCardActive
                ? "text-white"
                : `text-[#FF7808] group-hover:text-white ${RESTING_SHADOW}`
                }`}
            >
              {item.tag}
            </span>

            {/* Title */}
            <h3
              className={`text-base font-[family-name:var(--font-serif-next)] font-black uppercase text-white tracking-wide truncate leading-tight ${isCardActive ? "" : RESTING_SHADOW}`}
            >
              {item.name}
            </h3>
          </div>

          {/* Price Text (Work Sans) */}
          <span
            className={`text-[36px] font-bold text-white font-sans leading-none mt-5 ${isCardActive ? "" : RESTING_SHADOW}`}
          >
            ${item.price}
          </span>
        </div>
      </>
    );

    return (
      <a
        key={item.id}
        href="https://order.online/business/~13770567"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full min-h-[300px] md:min-h-[355px] aspect-[1] sm:aspect-[6/5] mx-auto flex flex-col bg-zinc-950 overflow-hidden border border-zinc-900/60 group rounded-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(255,120,8,0.15)] relative cursor-pointer block"
      >
        {CardContent}
      </a>
    );
  };

  return (
    <div className="flex-1 space-y-6 isolate">
      {categories.map((category) => {
        const items = menuData[category.id] || [];
        if (items.length === 0) return null;

        return (
          <div
            key={category.id}
            id={`section-${category.id}`}
            className="scroll-mt-[175px] md:scroll-mt-[164px] lg:scroll-mt-[168px] xl:scroll-mt-[123px]"
          >
            {/* Category Title Container: Sticky with Solid Opaque Background and z-index 40 to overlap cards perfectly */}
            <div className="sticky top-[175px] md:top-[164px] lg:top-[168px] xl:top-[123px] z-40 bg-background p-2 md:p-0 md:py-4 transition-all duration-300 isolate">
              <h2 className="ml-[13px] md:ml-0 font-['Raleway'] md:font-[family-name:var(--font-serif-next)] font-black text-[34px] md:text-[40px] text-[#FF7808] uppercase tracking-wide leading-none md:leading-tight">
                {category.name}
              </h2>

              {category.id === "hibachi" && (
                <p className="ml-[13px] md:ml-0 font-sans text-[14px] md:font-serif md:text-[16px] text-black dark:text-white md:text-[#71717b] md:dark:text-white font-normal md:font-light not-italic uppercase">
                  Comes with your choice of any two sides
                </p>
              )}

              {category.id === "boba" && (
                <p className="ml-[13px] md:ml-0 font-sans text-[14px] md:text-[24px] text-black dark:text-white md:text-[#71717b] md:dark:text-white font-normal not-italic leading-[23px] md:leading-[45px] uppercase mt-2 w-full max-[400px]:w-[95%]">
                  <span className="font-normal md:font-black tracking-[1px] md:tracking-[7px] inline-block mr-2 md:leading-[31px]">
                    Toppings:
                  </span>{" "}
                  <span className="font-normal md:font-medium tracking-[0.5px] md:tracking-[4px]">
                    Strawberry Jelly, Tapioca Boba, Strawberry Popping, Crystal Boba, Lychee Coconut Jelly, Aloe Vera Jelly, Mango Popping, Rainbow Jelly, Mango Jelly, Coffee Jelly.
                  </span>
                </p>
              )}

              {category.id === "wings" && (
                <p className="ml-[13px] md:ml-0 font-sans text-[14px] md:text-[24px] text-black dark:text-white md:text-[#71717b] md:dark:text-white font-normal not-italic leading-[23px] md:leading-[45px] uppercase mt-2 w-full max-[400px]:w-[95%]">
                  <span className="font-normal md:font-black tracking-[1px] md:tracking-[7px] inline-block mr-2 md:leading-[31px]">
                    Flavors:
                  </span>{" "}
                  <span className="font-normal md:font-medium tracking-[0.5px] md:tracking-[4px]">
                    Rim Fire, Mango Habanero, Hot, Mild, Thai Chilli, Lemon Pepper, Garlic Parmesan, Buffalo Gold, Teriyaki, Sweet & Tangy, Honey Garlic, Honey BBQ, Chipotle BBQ, Old Bay.
                  </span>
                </p>
              )}
            </div>

            {/* Grid of Food Cards with optimized gaps and tight responsive sizing */}
            {category.id === "wings" ? (
              <div className="space-y-12 mt-6">
                {Object.entries(
                  items.reduce((acc, item) => {
                    const sub = item.subCategory || "OTHER";
                    if (!acc[sub]) acc[sub] = [];
                    acc[sub].push(item);
                    return acc;
                  }, {} as Record<string, typeof items>)
                ).map(([subTitle, subItems]) => (
                  <div key={subTitle}>
                    <h3
                      className="ml-[20px] md:ml-0 text-black dark:text-white"
                      style={{
                        fontFamily: "var(--font-serif-next), sans-serif",
                        fontSize: "24px",
                        fontStyle: "normal",
                        fontWeight: 900,
                        lineHeight: "normal",
                        textTransform: "uppercase",
                        paddingBottom: "15px",
                      }}
                    >
                      {subTitle}
                    </h3>
                    <div className="w-full overflow-hidden px-5 md:px-0">
                      {/* DESKTOP GRID (xl+) */}
                      <div className="hidden xl:grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 justify-items-start p-4 -m-4 overflow-hidden isolate">
                        {subItems.map((item) => {
                          const isCardActive = activeCardId === item.id;
                          return renderWingCard(item, isCardActive);
                        })}
                      </div>

                      {/* MOBILE/TABLET LIST (<xl) */}
                      <div className="xl:hidden w-[calc(100%+40px)] -ml-5 md:w-full md:ml-0" style={{ padding: "10px 20px" }}>
                        {subItems.map((item) => renderListCard(item))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full overflow-hidden px-5 md:px-0">
                {/* DESKTOP GRID (xl+) */}
                <div className="hidden xl:grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 justify-items-start p-4 -m-4 overflow-hidden isolate">
                  {items.map((item) => {
                    const isCardActive = activeCardId === item.id;
                    return renderRegularCard(item, category, isCardActive);
                  })}
                </div>

                {/* MOBILE/TABLET LIST (<xl) */}
                <div className="xl:hidden w-[calc(100%+40px)] -ml-5 md:w-full md:ml-0" style={{ padding: "10px 20px" }}>
                  {items.map((item) => renderListCard(item))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MenuMainContent;
