import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ContentPageBody from "@/components/ContentPageBody";
import type { MarketingPageDescriptor } from "@/content/defaultPages";
import type { ContentPage } from "@/types";

export default function MarketingPageShell({
  descriptor,
  override,
  schemaMarkup,
  children,
}: {
  descriptor: MarketingPageDescriptor;
  override?: ContentPage | null;
  schemaMarkup?: string;
  children?: ReactNode;
}) {
  const hasOverride = Boolean(override?.body?.length);
  const title = hasOverride ? override!.title : descriptor.title;
  const eyebrow = hasOverride
    ? override!.eyebrow ?? descriptor.eyebrow
    : descriptor.eyebrow;
  const intro = hasOverride ? override!.intro : descriptor.intro;
  const ctaTitle =
    hasOverride && override!.ctaTitle
      ? override!.ctaTitle
      : descriptor.ctaTitle;
  const ctaText =
    hasOverride && override!.ctaText ? override!.ctaText : descriptor.ctaText;

  return (
    <>
      <JsonLd value={schemaMarkup} />
      <Navbar />
      <main>
        <section className="bg-navy pt-17.5">
          <div className="max-w-site mx-auto px-6 py-18">
            <Link
              href="/"
              className="text-gold/70 hover:text-gold mb-8 inline-flex items-center gap-2 text-sm font-semibold"
            >
              ← Back to Home
            </Link>
            <div className="text-gold mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
              <span className="bg-gold block h-5.5 w-0.75" />
              {eyebrow}
            </div>
            <h1 className="font-display max-w-220 text-[clamp(2.25rem,5vw,3.75rem)] leading-tight font-bold text-white">
              {title}
            </h1>
            <p className="mt-7 max-w-190 text-lg leading-8 text-white/65">
              {intro}
            </p>
          </div>
        </section>
        <div className="from-gold via-gold-light to-gold h-1 bg-linear-to-r" />

        {hasOverride ? (
          <section className="bg-white py-20">
            <div className="max-w-site mx-auto px-6">
              <ContentPageBody body={override!.body} />
            </div>
          </section>
        ) : (
          <section className="bg-white py-20">
            <div className="max-w-site mx-auto space-y-16 px-6">
              {descriptor.sections.map((section, index) => (
                <section
                  key={section.heading}
                  className={`grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] ${
                    index > 0 ? "border-border border-t pt-16" : ""
                  }`}
                >
                  <div>
                    <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-navy mt-3 text-3xl leading-tight font-bold">
                      {section.heading}
                    </h2>
                  </div>
                  <div>
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-slate mb-5 text-[1.0625rem] leading-8 last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets?.length ? (
                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="border-border text-slate flex gap-3 rounded-sm border bg-cream p-4 leading-6"
                          >
                            <span className="text-gold font-bold">›</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>
          </section>
        )}

        {children}

        {!hasOverride && descriptor.faqs?.length ? (
          <section className="bg-cream py-20">
            <div className="max-w-site mx-auto px-6">
              <div className="max-w-200">
                <div className="text-gold mb-4 text-xs font-semibold tracking-widest uppercase">
                  Frequently asked questions
                </div>
                <h2 className="font-display text-navy mb-8 text-3xl font-bold">
                  Questions clients often ask
                </h2>
                <div className="space-y-4">
                  {descriptor.faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="border-border group rounded-sm border bg-white p-5"
                    >
                      <summary className="text-navy cursor-pointer list-none pr-8 font-semibold">
                        {faq.question}
                      </summary>
                      <p className="text-slate mt-4 leading-7">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {descriptor.disclaimer ? (
          <aside className="bg-white py-8">
            <p className="text-slate-light max-w-site mx-auto px-6 text-sm leading-6">
              <strong className="text-navy">Important:</strong>{" "}
              {descriptor.disclaimer}
            </p>
          </aside>
        ) : null}

        <section className="bg-gold py-16">
          <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-8 px-6">
            <div className="max-w-170">
              <h2 className="font-display text-navy text-3xl font-bold">
                {ctaTitle}
              </h2>
              <p className="text-navy/70 mt-3 text-lg leading-7">{ctaText}</p>
            </div>
            <Link
              href="/#contact"
              className="bg-navy hover:bg-navy-light rounded-sm px-8 py-3.5 text-sm font-semibold tracking-wider text-white uppercase"
            >
              Request a consultation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
