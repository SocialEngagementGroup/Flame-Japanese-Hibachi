import { Raleway, Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import NavbarBottom from "@/components/layout/NavbarBottom";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Flame Japanese Hibachi | Coming Soon",
  description:
    "Experience the ultimate taste of Japanese hibachi right where you are.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${raleway.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script src="/theme-init.js" />
      </head>
      <body suppressHydrationWarning className="h-full bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider>
          <header className="fixed top-0 left-0 w-full z-50">
            <Navbar />
            <NavbarBottom />
          </header>
          <main className="flex-1 pt-[100px] md:pt-[115px]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
