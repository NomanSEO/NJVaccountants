// src/app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import PublicIntegrations from "@/components/PublicIntegrations";
import { SITE_URL } from "@/config/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "E-commerce Accounting, Tax & Advisory in Pakistan | NJV Accountants",
  description:
    "Accounting, bookkeeping, tax planning, business advisory and internal audit support for e-commerce businesses in Pakistan. Discuss your needs with NJV Accountants.",
  keywords:
    "e-commerce accounting Pakistan, accounting for online sellers, e-commerce tax services Pakistan, business advisory, internal audit, COD reconciliation",
  robots: "index, follow",
  openGraph: {
    title:
      "E-commerce Accounting, Tax & Advisory in Pakistan | NJV Accountants",
    description:
      "Accounting, tax planning, advisory and internal audit for online businesses in Pakistan.",
    images: ["/njv-logo-dark.png"],
    type: "website",
    url: SITE_URL,
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
      className={`${playfair.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        {children}
        <PublicIntegrations />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
