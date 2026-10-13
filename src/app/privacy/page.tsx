import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | NJV Accountants",
  description:
    "How NJV Accountants handles information submitted through this website.",
  alternates: { canonical: absoluteUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream min-h-screen pt-17.5">
        <div className="mx-auto max-w-200 px-6 py-16">
          <h1 className="font-display text-navy text-4xl font-bold">
            Privacy Policy
          </h1>
          <p className="text-slate mt-5 leading-7">
            NJV Accountants uses information you provide through this website to
            respond to your enquiry and discuss requested services. Please avoid
            submitting sensitive financial records through the initial contact
            form.
          </p>
          <h2 className="font-display text-navy mt-10 text-2xl font-bold">
            Information you provide
          </h2>
          <p className="text-slate mt-3 leading-7">
            The contact form requests your name, email address, business name,
            phone number, selected service and message. A spam-prevention check
            may also be used. If online enquiries are unavailable, you can
            contact us by phone or WhatsApp instead.
          </p>
          <h2 className="font-display text-navy mt-10 text-2xl font-bold">
            Website services
          </h2>
          <p className="text-slate mt-3 leading-7">
            The website uses analytics and performance tools to understand site
            usage. When the contact form is enabled, a third-party email service
            processes submissions and a reCAPTCHA check helps prevent spam.
            WhatsApp is operated by its own provider and applies its own privacy
            terms.
          </p>
          <h2 className="font-display text-navy mt-10 text-2xl font-bold">
            Questions or requests
          </h2>
          <p className="text-slate mt-3 leading-7">
            To ask about information you have provided through the website,
            please{" "}
            <Link href="/contact" className="text-navy underline">
              contact NJV Accountants
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
