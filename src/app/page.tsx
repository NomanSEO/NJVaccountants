import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Services from "@/components/Services";
import FinancialChallenges from "@/components/FinancialChallenges";
import Process from "@/components/Process";
import WhyChoose from "@/components/WhyChoose";
import IllustrativeCaseStudy from "@/components/IllustrativeCaseStudy";
import Blog from "@/components/Blog";
import CTABanner from "@/components/CTABanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/config/site";
import type { Metadata } from "next";

export const revalidate = 600;
export const metadata: Metadata = { alternates: { canonical: SITE_URL } };

export default function Page() {
  return (
    <>
      <JsonLd
        value={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "NJV Accountants",
          url: SITE_URL,
          telephone: "+92 305 9385003",
          areaServed: { "@type": "Country", name: "Pakistan" },
          serviceType: [
            "Accounting and bookkeeping",
            "Business advisory",
            "Tax planning and compliance",
            "Internal audit and financial controls",
          ],
        }}
      />
      <Navbar />
      <Hero />
      <PainPoints />
      <Services />
      <FinancialChallenges />
      <Process />
      <WhyChoose />
      <IllustrativeCaseStudy />
      <Blog />
      <CTABanner />
      <Contact />
      <Footer />
    </>
  );
}
