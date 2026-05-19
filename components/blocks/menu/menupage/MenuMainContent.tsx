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

  return (
    <div className="flex-1 space-y-16">
      {categories.map((category) => {
        const items = menuData[category.id] || [];
        if (items.length === 0) return null;

        return (
          <div
            key={category.id}
            id={`section-${category.id}`}
            className="scroll-mt-[175px] md:scroll-mt-[123px]"
          >
            {/* Category Title Container: Sticky with Solid Opaque Background and z-index 40 to overlap cards perfectly */}
            <div className="sticky top-[175px] md:top-[123px] z-40 bg-background p-2 md:p-0 md:py-4 mb-6 border-b border-[#FF7808]/10 transition-all duration-300">
              <h2 className="font-['Raleway'] md:font-[family-name:var(--font-serif-next)] font-black text-[32px] md:text-[38px] text-[#FF7808] uppercase tracking-wide leading-none md:leading-tight">
                {category.name}
              </h2>

              {category.id === "hibachi" && (
                <p
                  style={{
                    color: "#FFF",
                    fontFamily: "Raleway, sans-serif",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: 300,
                    lineHeight: "59px",
                    textTransform: "uppercase",
                  }}
                >
                  Comes with your choice of any two sides
                </p>
              )}

              {category.id === "wings" && (
                <p
                  style={{
                    color: "#FFF",
                    fontFamily: '"Work Sans", sans-serif',
                    fontSize: "24px",
                    fontStyle: "normal",
                    lineHeight: "45px",
                    textTransform: "uppercase",
                    marginTop: "8px",
                    maxWidth: "878px",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 900,
                      lineHeight: "31px",
                      letterSpacing: "7px",
                      display: "inline-block",
                      marginRight: "8px",
                    }}
                  >
                    Flavors:
                  </span>
                  <span
                    style={{
                      fontWeight: 500,
                      letterSpacing: "4px",
                    }}
                  >
                    Rim Fire, Mango Habanero, Hot, Mild, Thai Chilli, Lemon Pepper, Garlic Parmesan, Buffalo Gold, Teriyaki, Sweet & Tangy, Honey Garlic, Honey BBQ, Chipotle BBQ, Old Bay.
                  </span>
                </p>
              )}

              {category.id === "boba" && (
                <p
                  style={{
                    color: "#FFF",
                    fontFamily: '"Work Sans", sans-serif',
                    fontSize: "24px",
                    fontStyle: "normal",
                    lineHeight: "45px",
                    textTransform: "uppercase",
                    marginTop: "8px",
                    maxWidth: "878px",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 900,
                      lineHeight: "31px",
                      letterSpacing: "7px",
                      display: "inline-block",
                      marginRight: "8px",
                    }}
                  >
                    Toppings:
                  </span>
                  <span
                    style={{
                      fontWeight: 500,
                      letterSpacing: "4px",
                    }}
                  >
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
                      className="mb-4"
                      style={{
                        color: "#FFF",
                        fontFamily: "var(--font-serif-next), sans-serif",
                        fontSize: "24px",
                        fontStyle: "normal",
                        fontWeight: 900,
                        lineHeight: "normal",
                        textTransform: "uppercase",
                      }}
                    >
                      {subTitle}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 justify-items-center sm:justify-items-start">
                      {subItems.map((item) => {
                        const isCardActive = activeCardId === item.id;
                        return (
                          <a
                            key={item.id}
                            href="https://order.online/business/~13770567"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[272px] h-[355px] flex flex-col bg-zinc-950 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-zinc-900/60 group rounded-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(255,120,8,0.15)] relative cursor-pointer block"
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
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 justify-items-center sm:justify-items-start">
                {items.map((item) => {
                  const isCardActive = activeCardId === item.id;
                  const isLinkCard = category.id === "favorites" || category.id === "hibachi" || category.id === "combo" || category.id === "bento" || category.id === "sushi" || category.id === "fries" || category.id === "boba" || category.id === "drinks" || category.id === "addons";

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

                  if (isLinkCard) {
                    return (
                      <a
                        key={item.id}
                        href="https://order.online/business/~13770567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[272px] h-[355px] flex flex-col bg-zinc-950 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-zinc-900/60 group rounded-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(255,120,8,0.15)] relative cursor-pointer block"
                      >
                        {CardContent}
                      </a>
                    );
                  }

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleCardClick(item.id)}
                      className="w-[272px] h-[355px] flex flex-col bg-zinc-950 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-zinc-900/60 group rounded-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(255,120,8,0.15)] relative cursor-pointer"
                    >
                      {CardContent}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MenuMainContent;
