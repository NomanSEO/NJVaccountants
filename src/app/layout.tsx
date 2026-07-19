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
  title: "NJV Accountants | Accounting, Tax & Audit Services",
  description:
    "NJV Accountants — trusted accounting, taxation, advisory, and audit services for businesses and individuals. Decades of expertise, measurable results.",
  keywords:
    "accounting firm, taxation services, business advisory, audit services, financial consulting, CPA firm, tax planning, forensic accounting",
  robots: "index, follow",
  openGraph: {
    title: "NJV Accountants | Accounting, Tax & Audit",
    description: "Trusted accounting, taxation, advisory, and audit services.",
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
