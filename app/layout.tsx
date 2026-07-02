import { Raleway, Work_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import NavbarBottom from "@/components/layout/NavbarBottom";
import Footer from "@/components/layout/Footer";
import TopLoader from "@/components/layout/TopLoader";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { NearestLocationProvider } from "@/components/providers/NearestLocationProvider";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.flamehibachi.com";
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W85NMRDW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W85NMRDW');`,
          }}
        />
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <ThemeProvider>
          <NearestLocationProvider>
            <TopLoader />
            <header className="fixed top-0 left-0 w-full z-50">
              <Navbar />
              <NavbarBottom />
            </header>
            <main className="flex-1 pt-[100px] md:pt-[115px]">{children}</main>
            <Footer />
          </NearestLocationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
