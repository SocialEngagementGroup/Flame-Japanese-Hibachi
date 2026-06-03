import { Raleway, Work_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import NavbarBottom from "@/components/layout/NavbarBottom";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { getCanonicalUrl } from "@/lib/seo/seo";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-serif-next",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    template: "%s | Flame Japanese Hibachi",
    default: "Flame Japanese Hibachi | Halal Hibachi, Sushi & Bento",
  },
  description:
    "Experience the ultimate taste of Japanese hibachi right where you are.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${raleway.variable} h-full overflow-x-hidden antialiased`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="h-full bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden"
      >
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <ThemeProvider>
          <header className="fixed top-0 left-0 w-full z-50">
            <Navbar />
            <NavbarBottom />
          </header>
          <main className="flex-1 pt-[100px] md:pt-[115px]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}