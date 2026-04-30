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
    <section className="w-full bg-[#FFFFFF] dark:bg-black py-5 md:py-20 px-4 md:px-12 overflow-hidden transition-colors duration-300">
      <div className="max-w-[1595px] mx-auto">
        <h3 className="heading-h3 text-center mb-7 md:mb-16">
          <span className="text-[#1C1B1B] dark:text-white transition-colors duration-300">MOST LOVED FLAME </span>
          <span className="text-primary">SIGNATURE ITEMS</span>
        </h3>

        <div className="w-full overflow-hidden md:overflow-visible">
          <div
            className="flex md:grid md:grid-cols-3 gap-6 md:gap-10 transition-transform duration-500 ease-in-out md:!transform-none"
            style={{ transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 1.5}rem))` }}
          >
            {items.map((item, index) => (
              <div key={index} className="w-full shrink-0 md:w-auto group cursor-pointer flex flex-col">
                <div className="aspect-square md:aspect-[4/3] lg:aspect-[1.15/1] overflow-hidden bg-[#EBEBEB] dark:bg-zinc-900 mb-4 md:mb-6 transition-colors duration-300">
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
