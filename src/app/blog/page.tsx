import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/sanity";

export const revalidate = 600;

export const metadata = {
  title: "Insights & Analysis | NJV Accountants",
  description:
    "Timely, practical perspectives on accounting, tax, regulation, and business strategy from our senior professionals.",
};

const SYMBOLS = ["§", "₤", "↗", "∑", "¥", "€", "∆", "∞"];

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-[70px] bg-navy">
          <div className="max-w-site mx-auto px-6 py-20">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-gold/70 text-sm font-semibold mb-8 hover:text-gold transition-colors no-underline"
            >
              ← Back to Home
            </a>
            <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
              <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
              Insights & Analysis
            </div>
            <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-white leading-tight mb-5">
              From Our <em className="not-italic text-gold">Expert</em> Team
            </h1>
            <p className="text-[1.0625rem] text-white/65 leading-[1.75] max-w-[560px]">
              Timely, practical perspectives on accounting, tax, regulation, and
              business strategy — written by our senior professionals.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="py-20 bg-cream">
          <div className="max-w-site mx-auto px-6">
            {posts.length === 0 ? (
              <div className="text-center py-24 text-slate">
                No posts published yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {posts.map((post, i) => (
                  <a
                    key={post._id}
                    href={`/blog/${post.slug?.current ?? "#"}`}
                    className="group border border-border rounded-sm overflow-hidden hover:shadow-[0_12px_40px_rgba(11,31,58,0.08)] hover:-translate-y-0.5 transition-all duration-300 bg-white no-underline flex flex-col"
                  >
                    {/* Card image */}
                    <div
                      className="relative overflow-hidden shrink-0"
                      style={{ height: "200px" }}
                    >
                      {post.headerImage?.asset ? (
                        <>
                          <Image
                            src={urlFor(post.headerImage).width(600).url()}
                            alt={post.headerImage.alt ?? post.title}
                            fill
                            className="object-contain bg-cream"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-navy/40" />
                          <div className="absolute bottom-4 left-4">
                            <span className="inline-block bg-gold text-navy px-2.5 py-1 rounded-sm text-[0.7rem] font-bold tracking-[0.08em] uppercase">
                              {post.category}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="bg-navy w-full h-full flex items-center justify-center relative">
                          <span className="font-display text-5xl text-white opacity-15 absolute">
                            {SYMBOLS[i % SYMBOLS.length]}
                          </span>
                          <span className="relative z-10 inline-block bg-gold text-navy px-2.5 py-1 rounded-sm text-[0.7rem] font-bold tracking-[0.08em] uppercase">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="text-[0.75rem] text-slate-light mb-2.5 flex gap-3 flex-wrap">
                        <span>{post.author?.name}</span>
                        <span>·</span>
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                        {post.readTime && (
                          <>
                            <span>·</span>
                            <span>{post.readTime} min read</span>
                          </>
                        )}
                      </div>
                      <h2 className="font-display text-[1.125rem] font-bold text-navy leading-[1.3] mb-2.5 group-hover:text-gold transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-[0.875rem] text-slate leading-[1.6] mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <span className="text-[0.8125rem] font-semibold text-navy tracking-[0.04em] flex items-center gap-1.5 group-hover:text-gold transition-colors mt-auto">
                        Read Article &rsaquo;
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gold py-16">
          <div className="max-w-site mx-auto px-6 flex items-center justify-between gap-8 flex-wrap">
            <div>
              <div className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-navy leading-[1.3]">
                Ready to put these insights into action?
              </div>
              <div className="text-[0.9375rem] text-navy/70 mt-2">
                Book a free consultation with one of our senior partners.
              </div>
            </div>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3.5 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase no-underline hover:bg-navy-light transition-colors shrink-0"
            >
              Speak to a Partner &rsaquo;
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
