import { whatsappUrl } from "@/config/site";

export default function CTABanner() {
  return (
    <section className="bg-gold py-16" aria-labelledby="cta-heading">
      <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-8 px-6">
        <div className="max-w-180">
          <h2
            id="cta-heading"
            className="font-display text-navy text-[clamp(1.75rem,3vw,2.25rem)] font-bold"
          >
            Let&apos;s Discuss Your E-commerce Business
          </h2>
          <p className="text-navy/80 mt-3 leading-7">
            Whether you need reliable accounting, clearer financial reporting,
            tax planning or a review of your internal controls, NJV Accountants
            can help you identify the right scope of support.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="#contact"
            className="bg-navy hover:bg-navy-light rounded-sm px-6 py-3 text-sm font-semibold text-white no-underline"
          >
            Request a Consultation
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="border-navy text-navy rounded-sm border px-6 py-3 text-sm font-semibold no-underline"
          >
            Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
