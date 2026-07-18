"use client";

import { usePathname } from "next/navigation";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function PublicIntegrations() {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return null;
  return (
    <>
      <GoogleAnalytics />
      <WhatsAppWidget />
    </>
  );
}
