import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DirectoryPageShell from "@/components/DirectoryPageShell";
import { serviceSlug } from "@/lib/contentSlugs";
import { absoluteUrl, servicePath } from "@/lib/seo";
import { getService, getServices } from "@/sanity/lib/queries";

export const revalidate = 600;

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: serviceSlug(service) }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};

  return {
    title: `${service.title} | NJV Accountants`,
    description: service.description,
    alternates: { canonical: absoluteUrl(servicePath(slug)) },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  return (
    <DirectoryPageShell
      eyebrow="Professional Service"
      title={service.title}
      intro={service.description}
    >
      <section className="bg-white py-20">
        <div className="max-w-site mx-auto grid gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
          <div>
            <h2 className="font-display text-navy text-3xl font-bold">
              How we can help
            </h2>
            <p className="text-slate mt-5 text-lg leading-8">
              Our {service.title.toLowerCase()} support is shaped around your
              business, its reporting requirements and the decisions ahead.
            </p>
          </div>
          <div className="border-border rounded-sm border bg-cream p-7">
            <h2 className="font-display text-navy text-2xl font-bold">
              What&apos;s included
            </h2>
            <ul className="mt-5 space-y-3">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="text-slate flex gap-3 leading-6">
                  <span className="text-gold font-bold">›</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-gold py-16">
        <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-8 px-6">
          <div>
            <h2 className="font-display text-navy text-3xl font-bold">
              Discuss your {service.title} needs
            </h2>
            <p className="text-navy/70 mt-3 text-lg">
              Tell us about your priorities and we&apos;ll help you plan the next step.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-navy hover:bg-navy-light rounded-sm px-8 py-3.5 text-sm font-semibold tracking-wider text-white uppercase"
          >
            Contact us
          </Link>
        </div>
      </section>
    </DirectoryPageShell>
  );
}
