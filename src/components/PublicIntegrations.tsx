"use client";

import { usePathname } from "next/navigation";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MetaPixel from "@/components/MetaPixel";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function PublicIntegrations() {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return null;
  return (
    <>
      <GoogleAnalytics />
      <MetaPixel pathname={pathname} />
      <WhatsAppWidget />
    </>
  );
}
