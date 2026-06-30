import { Raleway, Work_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import NavbarBottom from "@/components/layout/NavbarBottom";
import Footer from "@/components/layout/Footer";
import TopLoader from "@/components/layout/TopLoader";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { getCanonicalUrl } from "@/lib/seo/seo";
import type { Metadata } from "next";


const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-serif-next",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flamehibachi.com";
const defaultTitle = "Flame Japanese Hibachi | Halal Hibachi, Sushi & Bento";
const defaultDescription =
  "100% Halal Japanese hibachi cooked fresh in front of you, plus sushi, bento, loaded fries and boba. Find a Flame Japanese Hibachi location or order online today.";
const ogImage = "/homepage/hero/hero-bg-desk.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Flame Japanese Hibachi",
    default: defaultTitle,
  },
  description: defaultDescription,
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Flame Japanese Hibachi",
    url: getCanonicalUrl("/"),
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: ogImage,
        width: 1280,
        height: 575,
        alt: "Flame Japanese Hibachi food and brand image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage],
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
      className={`${workSans.variable} ${raleway.variable} h-full overflow-x-clip antialiased`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="h-full bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground overflow-x-clip"
      >
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <ThemeProvider>
          <TopLoader />
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