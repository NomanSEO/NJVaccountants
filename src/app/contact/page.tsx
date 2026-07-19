import type { Metadata } from "next";
import Contact from "@/components/Contact";
import DirectoryPageShell from "@/components/DirectoryPageShell";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us | NJV Accountants",
  description:
    "Contact NJV Accountants to discuss your accounting, tax, audit or advisory needs.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <DirectoryPageShell
      eyebrow="Get in Touch"
      title="Let’s start a conversation"
      intro="Tell us what you need and our team will help identify the right next step for your business."
    >
      <Contact />
    </DirectoryPageShell>
  );
}
