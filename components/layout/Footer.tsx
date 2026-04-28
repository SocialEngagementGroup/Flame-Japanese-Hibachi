"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-black pt-20 pb-10 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo and About */}
          <div className="col-span-1 lg:col-span-1">
            <img
              src="/site-logo/FJH-logo-white.png"
              alt="Flame Japanese Hibachi"
              className="h-16 object-contain mb-8"
            />
            <p className="text-gray-400 text-[13px] leading-relaxed max-w-xs uppercase tracking-wider">
              Experience the ultimate premium taste of Japanese hibachi right where you are. Flavor by design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black text-[14px] tracking-widest uppercase mb-8">COMPANY</h4>
            <ul className="space-y-4">
              {["OUR STORY", "LOCATIONS", "FRANCHISE", "CAREERS"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-500 hover:text-primary text-[12px] font-bold uppercase tracking-widest transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Links */}
          <div>
            <h4 className="text-white font-black text-[14px] tracking-widest uppercase mb-8">MENU</h4>
            <ul className="space-y-4">
              {["MAIN MENU", "CATERING", "PROMOTIONS", "ORDER ONLINE"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-500 hover:text-primary text-[12px] font-bold uppercase tracking-widest transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Apps */}
          <div>
            <h4 className="text-white font-black text-[14px] tracking-widest uppercase mb-8">CONNECT</h4>
            <div className="flex flex-col gap-4">
              <button className="border border-white/20 text-white hover:bg-white hover:text-black px-6 py-3 text-[11px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2">
                APP STORE
              </button>
              <button className="border border-white/20 text-white hover:bg-white hover:text-black px-6 py-3 text-[11px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2">
                GOOGLE PLAY
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-[10px] font-bold tracking-[2px] uppercase">
            © {new Date().getFullYear()} FLAME JAPANESE HIBACHI. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex gap-8">
            {["PRIVACY POLICY", "TERMS OF SERVICE", "ACCESSIBILITY"].map((link) => (
              <Link key={link} href="#" className="text-gray-600 hover:text-white text-[10px] font-bold tracking-[2px] uppercase transition-colors">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
