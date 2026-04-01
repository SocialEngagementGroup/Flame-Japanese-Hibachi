import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata = {
  title: "Flame Japanese Hibachi | Coming Soon",
  description:
    "Experience the ultimate taste of Japanese hibachi right where you are.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="h-full bg-[#050605] text-white flex flex-col font-sans selection:bg-[#EAB308] selection:text-[#050605]">
        {children}
      </body>
    </html>
  );
}
