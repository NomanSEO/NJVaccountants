import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/sanity";
import { blogPath } from "@/lib/seo";
import AuthorPopover from "@/components/AuthorPopover";

const SYMBOLS = ["§", "↗", "•", "›"];

export default async function Blog() {
  const posts = await getPosts();

  return (
    <section
      id="blog"
      className="bg-white py-24"
      aria-label="Insights and resources"
    >
      <div className="max-w-site mx-auto px-6">
        <header className="mb-14">
          <div className="text-gold mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase">
            <span className="bg-gold block h-5.5 w-0.75 shrink-0" />
            Resources
          </div>
          <h2 className="font-display text-navy mb-5 text-[clamp(2rem,3.5vw,2.75rem)] leading-tight font-bold">
            Insights for E-commerce Businesses in Pakistan
          </h2>
          <p className="text-slate max-w-140 text-[1.0625rem] leading-[1.7]">
            Practical guidance on tax filing, financial records, courier
            settlements and profitability.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, i) => {
            const imgHeight = 200;
            return (
              <article
                key={post._id}
                className="border-border group overflow-hidden rounded-sm border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(11,31,58,0.08)]"
              >
                <div className="block">
                  {/* Card image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ height: `${imgHeight}px` }}
                  >
                    {post.headerImage?.asset ? (
                      <>
                        <Image
                          src={urlFor(post.headerImage).width(500).url()}
                          alt={post.headerImage.alt ?? post.title}
                          fill
                          className="bg-cream object-contain"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                          {SYMBOLS[i] ?? "›"}
                        </span>
                        <span className="bg-gold text-navy relative z-10 inline-block rounded-sm px-2.5 py-1 text-[0.7rem] font-bold tracking-[0.08em] uppercase">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <div className="text-slate-light mb-2.5 flex flex-wrap gap-3 text-[0.75rem]">
                      {post.author ? (
                        <>
                          <AuthorPopover
                            author={post.author}
                            imageUrl={
                              post.author.image?.asset
                                ? urlFor(post.author.image)
                                    .width(160)
                                    .height(160)
                                    .url()
                                : null
                            }
                          />
                          <span>·</span>
                        </>
                      ) : (
                        <>
                          <span>NJV Accountants</span>
                          <span>·</span>
                        </>
                      )}
                      <span>
                        {post.updatedAt?.slice(0, 10) !==
                          post.publishedAt.slice(0, 10) && post.updatedAt
                          ? "Updated "
                          : "Published "}
                        {new Date(
                          post.updatedAt ?? post.publishedAt,
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {post.readTime && (
                        <>
                          <span>·</span>
                          <span>{post.readTime} min read</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-display text-navy group-hover:text-gold mb-2.5 text-[1.125rem] leading-[1.3] font-bold transition-colors">
                      <Link
                        href={blogPath(post.languageCode, post.slug.current)}
                        className="text-inherit no-underline"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-slate mb-4 text-[0.875rem] leading-[1.6]">
                      {post.excerpt}
                    </p>
                    <Link
                      href={blogPath(post.languageCode, post.slug.current)}
                      className="text-navy group-hover:text-gold flex items-center gap-1.5 text-[0.8125rem] font-semibold tracking-[0.04em] no-underline transition-colors"
                    >
                      Read Article &rsaquo;
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="bg-gold text-navy hover:bg-gold-light inline-flex items-center gap-2 rounded-sm px-8 py-3.5 text-sm font-semibold tracking-wider uppercase no-underline transition-all hover:-translate-y-px"
          >
            View All Blogs &rsaquo;
          </Link>
        </div>
      </div>
    </section>
  );
}
