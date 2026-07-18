import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import AuthorProfileSections from "@/components/AuthorProfileSections";
import { getAuthor, getAuthorPosts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/sanity";
import { absoluteUrl, authorPath, blogPath } from "@/lib/seo";

export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) return { title: "Author Not Found | NJV Accountants" };
  const description =
    author.shortBio ?? author.bio ?? `${author.name} at NJV Accountants.`;
  return {
    title: `${author.name} | NJV Accountants`,
    description,
    alternates: { canonical: absoluteUrl(authorPath(slug)) },
    openGraph: {
      title: `${author.name} | NJV Accountants`,
      description,
      type: "profile",
      url: absoluteUrl(authorPath(slug)),
      images: author.image?.asset
        ? [{ url: urlFor(author.image).width(1200).height(630).url() }]
        : undefined,
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) notFound();
  const posts = await getAuthorPosts(author._id);
  const linkedIn =
    author.linkedIn?.startsWith("https://") &&
    author.linkedIn.includes("linkedin.com/")
      ? author.linkedIn
      : null;

  return (
    <>
      <JsonLd value={author.schemaMarkup} />
      <Navbar />
      <main>
        <section className="bg-navy pt-17.5">
          <div className="max-w-site mx-auto px-6 py-16">
            <Link
              href="/#team"
              className="text-gold/70 hover:text-gold mb-8 inline-block text-sm font-semibold"
            >
              ← Back to our team
            </Link>
            <div className="grid items-center gap-10 md:grid-cols-[260px_1fr]">
              <div className="border-gold/25 relative aspect-square overflow-hidden rounded-sm border bg-white/5">
                {author.image?.asset ? (
                  <Image
                    src={urlFor(author.image).width(600).height(600).url()}
                    alt={author.image.alt ?? author.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="260px"
                  />
                ) : (
                  <div className="font-display text-gold/40 flex h-full items-center justify-center text-6xl font-bold">
                    {author.initials ||
                      author.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                  </div>
                )}
              </div>
              <div>
                <div className="text-gold mb-4 text-xs font-semibold tracking-widest uppercase">
                  NJV Accountants leadership
                </div>
                <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
                  {author.name}
                </h1>
                <p className="text-gold mt-3 text-lg font-semibold">
                  {author.role}
                </p>
                {author.credentials ? (
                  <p className="mt-2 text-sm tracking-wider text-white/55 uppercase">
                    {author.credentials}
                  </p>
                ) : null}
                {author.shortBio ?? author.bio ? (
                  <p className="mt-6 max-w-170 text-lg leading-8 text-white/65">
                    {author.shortBio ?? author.bio}
                  </p>
                ) : null}
                <div className="mt-7 flex flex-wrap gap-3">
                  {author.email ? (
                    <a
                      href={`mailto:${author.email}`}
                      className="bg-gold text-navy hover:bg-gold-light rounded-sm px-5 py-3 text-sm font-semibold"
                    >
                      Email {author.name.split(" ")[0]}
                    </a>
                  ) : null}
                  {linkedIn ? (
                    <a
                      href={linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:border-gold hover:text-gold rounded-sm border border-white/20 px-5 py-3 text-sm font-semibold text-white"
                    >
                      LinkedIn ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-site mx-auto px-6">
            {author.yearsExperience !== undefined ? (
              <div className="border-border mb-12 inline-flex rounded-sm border bg-cream px-6 py-4">
                <span className="font-display text-navy text-3xl font-bold">
                  {author.yearsExperience}+
                </span>
                <span className="text-slate ml-3 self-center text-sm">
                  years of professional experience
                </span>
              </div>
            ) : null}

            {author.fullBio?.length ? (
              <section className="mb-16 max-w-200">
                <h2 className="font-display text-navy mb-5 text-3xl font-bold">
                  Biography
                </h2>
                <div className="prose">
                  <PortableText value={author.fullBio} />
                </div>
              </section>
            ) : author.bio ? (
              <section className="mb-16 max-w-200">
                <h2 className="font-display text-navy mb-5 text-3xl font-bold">
                  Biography
                </h2>
                <p className="text-slate text-lg leading-8">{author.bio}</p>
              </section>
            ) : null}

            <AuthorProfileSections author={author} />

            {posts.length ? (
              <section className="border-border mt-18 border-t pt-14">
                <h2 className="font-display text-navy mb-7 text-3xl font-bold">
                  Latest insights from {author.name.split(" ")[0]}
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {posts.slice(0, 6).map((post) => (
                    <Link
                      key={post._id}
                      href={blogPath(post.languageCode, post.slug.current)}
                      className="border-border hover:border-gold rounded-sm border p-6 no-underline transition-colors"
                    >
                      <span className="text-gold text-xs font-semibold tracking-wider uppercase">
                        {post.category} · {post.languageCode}
                      </span>
                      <h3 className="font-display text-navy mt-3 text-lg font-bold">
                        {post.title}
                      </h3>
                      <p className="text-slate mt-3 text-sm leading-6">
                        {post.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </section>

        <section className="bg-gold py-14">
          <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-6 px-6">
            <div>
              <h2 className="font-display text-navy text-2xl font-bold">
                Talk with our team about your priorities
              </h2>
              <p className="text-navy/70 mt-2">
                Start with a focused, confidential conversation.
              </p>
            </div>
            <Link
              href="/#contact"
              className="bg-navy rounded-sm px-7 py-3.5 font-semibold text-white"
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
