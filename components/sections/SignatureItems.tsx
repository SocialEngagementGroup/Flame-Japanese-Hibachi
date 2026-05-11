"use client";

import React, { useState, useEffect } from "react";

const items = [
  {
    name: "CHICKEN BEEF SHRIMP FLAME COMBO",
    price: "$24.99",
    image: "/homepage/menu/FLAME COMBO.png",
  },
  {
    name: "SALMON AND SHRIMP FLAME COMBO",
    price: "$26.99",
    image: "/homepage/menu/HIBACHI.png",
  },
  {
    name: "CHICKEN HIBACHI",
    price: "$18.99",
    image: "/homepage/menu/BUILD YOUR OWN PLATTER.png",
  },
];

const SignatureItems = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-[#FFFFFF] dark:bg-black py-[var(--space-2xl)] px-[var(--space-lg)] overflow-hidden transition-colors duration-300">
      <div className="max-w-[1595px] mx-auto">
        <h3 className="heading-h3 text-center mb-[var(--space-xl)]">
          <span className="text-[#1C1B1B] dark:text-white transition-colors duration-300">MOST LOVED FLAME </span>
          <span className="text-primary">SIGNATURE ITEMS</span>
        </h3>

        <div className="w-full overflow-hidden md:overflow-visible">
          <div
            className="flex md:grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[var(--gap-sm)] transition-transform duration-500 ease-in-out md:!transform-none"
            style={{ transform: `translateX(calc(-${currentIndex * 100}% - (${currentIndex} * var(--gap-sm))))` }}
          >
            {items.map((item, index) => (
              <div key={index} className="w-full shrink-0 md:w-auto group cursor-pointer flex flex-col">
                <div className="aspect-square md:aspect-[4/3] lg:aspect-[1.15/1] overflow-hidden bg-[#EBEBEB] dark:bg-zinc-900 mb-[var(--space-md)] transition-colors duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h4 className="heading-h4 text-[#1C1B1B] dark:text-white mb-2 transition-colors duration-300">
                  {item.name}
                </h4>
                <p className="item-price">
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Slider Dots */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-primary w-6' : 'bg-white/20 w-2'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureItems;
