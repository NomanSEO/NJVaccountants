import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/sanity";
import { blogPath } from "@/lib/seo";

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
        <section className="bg-navy pt-17.5">
          <div className="max-w-site mx-auto px-6 py-20">
            <Link
              href="/"
              className="text-gold/70 hover:text-gold mb-8 inline-flex items-center gap-2 text-sm font-semibold no-underline transition-colors"
            >
              ← Back to Home
            </Link>
            <div className="text-gold mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
              <span className="bg-gold block h-5.5 w-0.75 shrink-0" />
              Insights & Analysis
            </div>
            <h1 className="font-display mb-5 text-[clamp(2.5rem,5vw,3.5rem)] leading-tight font-bold text-white">
              From Our <em className="text-gold not-italic">Expert</em> Team
            </h1>
            <p className="max-w-140 text-[1.0625rem] leading-[1.75] text-white/65">
              Timely, practical perspectives on accounting, tax, regulation, and
              business strategy — written by our senior professionals.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="bg-cream py-20">
          <div className="max-w-site mx-auto px-6">
            {posts.length === 0 ? (
              <div className="text-slate py-24 text-center">
                No posts published yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                  <Link
                    key={post._id}
                    href={blogPath(post.languageCode, post.slug.current)}
                    className="group border-border flex flex-col overflow-hidden rounded-sm border bg-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(11,31,58,0.08)]"
                  >
                    {/* Card image */}
                    <div
                      className="relative shrink-0 overflow-hidden"
                      style={{ height: "200px" }}
                    >
                      {post.headerImage?.asset ? (
                        <>
                          <Image
                            src={urlFor(post.headerImage).width(600).url()}
                            alt={post.headerImage.alt ?? post.title}
                            fill
                            className="bg-cream object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="bg-navy/40 absolute inset-0" />
                          <div className="absolute bottom-4 left-4">
                            <span className="bg-gold text-navy inline-block rounded-sm px-2.5 py-1 text-[0.7rem] font-bold tracking-[0.08em] uppercase">
                              {post.category}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="bg-navy relative flex h-full w-full items-center justify-center">
                          <span className="font-display absolute text-5xl text-white opacity-15">
                            {SYMBOLS[i % SYMBOLS.length]}
                          </span>
                          <span className="bg-gold text-navy relative z-10 inline-block rounded-sm px-2.5 py-1 text-[0.7rem] font-bold tracking-[0.08em] uppercase">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="text-slate-light mb-2.5 flex flex-wrap gap-3 text-[0.75rem]">
                        <span>{post.author?.name}</span>
                        <span className="text-gold uppercase">
                          {post.languageCode}
                        </span>
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
                      <h2 className="font-display text-navy group-hover:text-gold mb-2.5 text-[1.125rem] leading-[1.3] font-bold transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-slate mb-4 flex-1 text-[0.875rem] leading-[1.6]">
                        {post.excerpt}
                      </p>
                      <span className="text-navy group-hover:text-gold mt-auto flex items-center gap-1.5 text-[0.8125rem] font-semibold tracking-[0.04em] transition-colors">
                        Read Article &rsaquo;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gold py-16">
          <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-8 px-6">
            <div>
              <div className="font-display text-navy text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.3] font-bold">
                Ready to put these insights into action?
              </div>
              <div className="text-navy/70 mt-2 text-[0.9375rem]">
                Book a free consultation with one of our senior partners.
              </div>
            </div>
            <Link
              href="/#contact"
              className="bg-navy hover:bg-navy-light inline-flex shrink-0 items-center gap-2 rounded-sm px-8 py-3.5 text-sm font-semibold tracking-wider text-white uppercase no-underline transition-colors"
            >
              Speak to a Partner &rsaquo;
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
