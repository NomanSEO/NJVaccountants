import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarkdownArticleBody from "@/components/MarkdownArticleBody";
import { getBlogContentSource } from "@/lib/blogContent";
import { getPost, getAllPosts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/sanity";

export const revalidate = 600;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts
    .filter((p) => p.slug?.current)
    .map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found | NJV Accountants" };
  return {
    title: `${post.title} | NJV Accountants`,
    description: post.excerpt,
    openGraph: post.headerImage?.asset
      ? {
          images: [
            { url: urlFor(post.headerImage).width(1200).height(630).url() },
          ],
        }
      : undefined,
  };
}

const portableTextComponents = {
  types: {
    table: ({ value }: { value: any }) => {
      const rows = value?.rows ?? [];
      if (rows.length === 0) return null;
      const [headerRow, ...bodyRows] = rows;
      return (
        <div className="my-10 overflow-x-auto">
          <table className="w-full border-collapse text-[0.9375rem]">
            <thead>
              <tr>
                {headerRow.cells.map((cell: string, i: number) => (
                  <th
                    key={i}
                    className="bg-navy border-border border px-4 py-3 text-left font-semibold text-white"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row: any, i: number) => (
                <tr key={i} className="even:bg-cream">
                  {row.cells.map((cell: string, j: number) => (
                    <td
                      key={j}
                      className="border-border text-slate border px-4 py-3 align-top"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10">
          <div
            className="relative w-full overflow-hidden rounded-sm"
            style={{ aspectRatio: "16/9" }}
          >
            <Image
              src={urlFor(value).width(800).url()}
              alt={value.alt ?? ""}
              fill
              className="bg-cream object-contain"
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-slate-light mt-3 text-center text-[0.8125rem] italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const contentSource = getBlogContentSource(post.markdown, post.body);

  const authorInitials = post.author?.name
    ? post.author.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";

  const headerImageUrl = post.headerImage?.asset
    ? urlFor(post.headerImage).width(1200).url()
    : null;

  return (
    <>
      <Navbar />
      <main>
        {/* Article header — navy */}
        <section className="bg-navy pt-17.5">
          <div className="mx-auto max-w-200 px-6 py-14">
            <a
              href="/blog"
              className="text-gold/70 hover:text-gold mb-8 inline-flex items-center gap-2 text-sm font-semibold no-underline transition-colors"
            >
              ← Back to Insights
            </a>

            <div className="bg-gold text-navy mb-6 inline-block rounded-sm px-3 py-1 text-[0.7rem] font-bold tracking-[0.08em] uppercase">
              {post.category}
            </div>

            <h1 className="font-display mb-6 text-[clamp(1.75rem,4vw,3rem)] leading-tight font-bold text-white">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mb-8 max-w-160 text-[1.0625rem] leading-[1.75] text-white/60">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <div className="from-gold to-gold-dark font-display text-navy flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br text-sm font-bold">
                {authorInitials}
              </div>
              <div>
                <div className="text-[0.9rem] font-semibold text-white">
                  {post.author?.name}
                </div>
                <div className="flex flex-wrap gap-2 text-[0.8rem] text-white/50">
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
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
              </div>
            </div>
          </div>
        </section>

        {/* Header image — full width, bleeds below the navy section */}
        {headerImageUrl && (
          <div className="bg-navy relative w-full" style={{ height: "420px" }}>
            <Image
              src={headerImageUrl}
              alt={post.headerImage?.alt ?? post.title}
              fill
              priority
              className="object-contain"
              sizes="100vw"
            />
            <div className="from-navy/30 absolute inset-0 bg-linear-to-b to-transparent" />
          </div>
        )}

        {/* Divider */}
        {!headerImageUrl && (
          <div className="from-gold via-gold-light to-gold h-1 bg-linear-to-r" />
        )}

        {/* Article body */}
        <section className="bg-white">
          <div className="mx-auto max-w-200 px-6 py-16">
            {contentSource === "markdown" ? (
              <MarkdownArticleBody markdown={post.markdown!} />
            ) : contentSource === "portableText" ? (
              <div className="prose">
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </div>
            ) : (
              <p className="text-slate text-[1.0625rem] italic">
                Full article content coming soon.
              </p>
            )}

            <div className="border-border mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
              <a
                href="/blog"
                className="text-navy hover:text-gold inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.04em] no-underline transition-colors"
              >
                ← Back to All Insights
              </a>
              <a
                href="/#contact"
                className="bg-gold text-navy hover:bg-gold-light inline-flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold tracking-wider uppercase no-underline transition-colors"
              >
                Book a Consultation &rsaquo;
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-navy border-gold/20 border-t py-16">
          <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-8 px-6">
            <div>
              <div className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.3] font-bold text-white">
                Ready to put these insights into action?
              </div>
              <div className="mt-2 text-[0.9375rem] text-white/60">
                Our senior partners are available for a complimentary
                consultation.
              </div>
            </div>
            <a
              href="/#contact"
              className="bg-gold text-navy hover:bg-gold-light inline-flex shrink-0 items-center gap-2 rounded-sm px-8 py-3.5 text-sm font-semibold tracking-wider uppercase no-underline transition-colors"
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
