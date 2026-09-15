import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

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
    "TBeST Law LLP is a full service law firm in Addis Ababa, Ethiopia, providing corporate and commercial legal services across various practice areas and industry sectors.",
  icons: { icon: "/icons/mark.svg" },
  // The fallback share card. Every public page overrides this with one of its
  // own through `pageMetadata`, but anything that does not — and the site root
  // itself — still shares with a picture rather than a grey rectangle.
  openGraph: {
    title: "TBeST Law LLP",
    description:
      "Corporate and commercial legal services in Addis Ababa, Ethiopia, built on over 50 years of collective partner experience.",
    type: "website",
    siteName: "TBeST Law LLP",
    locale: "en_US",
    url: "/",
    images: [
      {
        url: "/og/default.jpg",
        width: 1200,
        height: 630,
        alt: "TBeST Law LLP",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TBeST Law LLP",
    description:
      "Corporate and commercial legal services in Addis Ababa, Ethiopia.",
    images: ["/og/default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
      {/* Only the shell: the fonts, the stylesheet and the document. The
          public site's header and footer live in (site)/layout.tsx, so the
          dashboard under /admin can render without them. */}
      <body className="flex min-h-full flex-col bg-white">{children}</body>
    </html>
  );
}
