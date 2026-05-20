"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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

  const swiperBreakpoints = {
    320: { slidesPerView: 1.15, spaceBetween: 16 },
    500: { slidesPerView: 1.8, spaceBetween: 16 },
    640: { slidesPerView: 2.4, spaceBetween: 16 },
    767: { slidesPerView: 3.1, spaceBetween: 16 },
    1024: { slidesPerView: 3.2, spaceBetween: 20 },
  };

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
            "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 6.92%, #000 100%)",
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
          className={`transition-colors duration-300 block truncate mb-1 ${isCardActive ? "text-white" : "text-[#FF7808] group-hover:text-white"}`}
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
          className="mb-1"
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
              "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 6.92%, #000 100%)",
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
                : "text-[#FF7808] group-hover:text-white"
                }`}
            >
              {item.tag}
            </span>

            {/* Title */}
            <h3 className="text-base font-[family-name:var(--font-serif-next)] font-black uppercase text-white tracking-wide truncate leading-tight">
              {item.name}
            </h3>
          </div>

          {/* Price Text (Work Sans) */}
          <span className="text-[36px] font-bold text-white font-sans leading-none mt-5">
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
    <div className="flex-1 space-y-16 isolate">
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
              <h2 className="ml-[13px] md:ml-0 font-['Raleway'] md:font-[family-name:var(--font-serif-next)] font-black text-[32px] md:text-[38px] text-[#FF7808] uppercase tracking-wide leading-none md:leading-tight">
                {category.name}
              </h2>

              {category.id === "hibachi" && (
                <p className="ml-[13px] md:ml-0 font-sans text-[14px] md:font-serif md:text-[16px] text-black dark:text-white md:text-[#71717b] md:dark:text-white font-normal md:font-light not-italic uppercase">
                  Comes with your choice of any two sides
                </p>
              )}
              {category.id === "wings" && (
                <p className="ml-[13px] md:ml-0 font-sans text-[14px] md:text-[24px] text-black dark:text-white md:text-[#71717b] md:dark:text-white font-normal not-italic leading-[23px] md:leading-[45px] uppercase mt-2 w-full">
                  <span className="font-normal md:font-black tracking-[1px] md:tracking-[7px] inline-block mr-2 md:leading-[31px]">
                    Flavors:
                  </span>{" "}
                  <span className="font-normal md:font-medium tracking-[0.5px] md:tracking-[4px]">
                    Rim Fire, Mango Habanero, Hot, Mild, Thai Chilli, Lemon Pepper, Garlic Parmesan, Buffalo Gold, Teriyaki, Sweet & Tangy, Honey Garlic, Honey BBQ, Chipotle BBQ, Old Bay.
                  </span>
                </p>
              )}
              {category.id === "boba" && (
                <p className="ml-[13px] md:ml-0 font-sans text-[14px] md:text-[24px] text-black dark:text-white md:text-[#71717b] md:dark:text-white font-normal not-italic leading-[23px] md:leading-[45px] uppercase mt-2 w-full">
                  <span className="font-normal md:font-black tracking-[1px] md:tracking-[7px] inline-block mr-2 md:leading-[31px]">
                    Toppings:
                  </span>{" "}
                  <span className="font-normal md:font-medium tracking-[0.5px] md:tracking-[4px]">
                    Strawberry Jelly, Tapioca Boba, Strawberry Popping, Crystal Boba, Lychee Coconut Jelly, Aloe Vera Jelly, Mango Popping, Rainbow Jelly, Mango Jelly, Coffee Jelly.
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
                      {/* DESKTOP GRID */}
                      <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 justify-items-center sm:justify-items-start p-4 -m-4 overflow-hidden isolate">
                        {subItems.map((item) => {
                          const isCardActive = activeCardId === item.id;
                          return renderWingCard(item, isCardActive);
                        })}
                      </div>

                      {/* MOBILE/TABLET SWIPER */}
                      <div className="lg:hidden w-full -ml-4 pl-4 py-4">
                        <Swiper
                          grabCursor={true}
                          breakpoints={swiperBreakpoints}
                          className="!overflow-visible"
                        >
                          {subItems.map((item) => {
                            const isCardActive = activeCardId === item.id;
                            return (
                              <SwiperSlide key={item.id}>
                                {renderWingCard(item, isCardActive)}
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full overflow-hidden px-5 md:px-0">
                {/* DESKTOP GRID */}
                <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 justify-items-center sm:justify-items-start p-4 -m-4 overflow-hidden isolate">
                  {items.map((item) => {
                    const isCardActive = activeCardId === item.id;
                    return renderRegularCard(item, category, isCardActive);
                  })}
                </div>

                {/* MOBILE/TABLET SWIPER */}
                <div className="lg:hidden w-full -ml-4 pl-4 py-4">
                  <Swiper
                    grabCursor={true}
                    breakpoints={swiperBreakpoints}
                    className="!overflow-visible"
                  >
                    {items.map((item) => {
                      const isCardActive = activeCardId === item.id;
                      return (
                        <SwiperSlide key={item.id}>
                          {renderRegularCard(item, category, isCardActive)}
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
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
