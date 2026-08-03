import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

/** Butler — the display serif from the TBeST brand kit. */
const butler = localFont({
  src: [
    { path: "./fonts/butler-light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/butler-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/butler-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/butler-semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/butler-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-butler",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tbestlaw.com"),
  title: {
    default: "TBeST Law LLP — Corporate and Commercial Counsel in Addis Ababa",
    template: "%s",
  },
  description:
    "TBeST Law LLP is a full service law firm in Addis Ababa, Ethiopia, providing corporate and commercial legal services across nine practice areas and nine industry sectors.",
  icons: { icon: "/icons/mark.svg" },
  openGraph: {
    title: "TBeST Law LLP",
    description:
      "Corporate and commercial legal services in Addis Ababa, Ethiopia, built on over 50 years of collective partner experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${butler.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        {/* With JS disabled the reveal animation can't run, so reveal
            everything up front — the effect is decorative, not a gate. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "[data-reveal]{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
        <ScrollReveal />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
