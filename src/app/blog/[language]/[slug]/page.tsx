import type { ComponentProps, ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarkdownArticleBody from "@/components/MarkdownArticleBody";
import ArticleTableOfContents from "@/components/ArticleTableOfContents";
import JsonLd from "@/components/JsonLd";
import AuthorPopover from "@/components/AuthorPopover";
import { getBlogContentSource } from "@/lib/blogContent";
import {
  extractMarkdownHeadings,
  extractPortableTextHeadings,
  type ArticleHeading,
} from "@/lib/articleHeadings";
import {
  getAllPublishedPosts,
  getLocalizedPost,
  getPostTranslations,
  getRelatedPosts,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/sanity";
import {
  authorPath,
  blogPath,
  buildBlogAlternates,
  normalizeLanguageCode,
} from "@/lib/seo";
import type { SanityImage } from "@/types";

export const revalidate = 600;

export async function generateStaticParams() {
  const posts = await getAllPublishedPosts();
  return posts
    .filter((post) => post.slug?.current && post.languageCode)
    .map((post) => ({
      language: post.languageCode,
      slug: post.slug.current,
    }));
}

async function loadArticle(language: string, slug: string) {
  const normalizedLanguage = normalizeLanguageCode(language);
  if (!normalizedLanguage) return null;
  const post = await getLocalizedPost(normalizedLanguage, slug);
  if (!post || post.languageCode !== normalizedLanguage) return null;
  const translations = await getPostTranslations(
    post.translationRootId ?? post._id,
  );
  return { post, translations, normalizedLanguage };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ language: string; slug: string }>;
}): Promise<Metadata> {
  const { language, slug } = await params;
  const result = await loadArticle(language, slug);
  if (!result) return { title: "Post Not Found | NJV Accountants" };

  const { post, translations } = result;
  const links = translations
    .filter((translation) => translation.slug?.current)
    .map((translation) => ({
      language: translation.languageCode,
      slug: translation.slug.current,
    }));
  const alternates = buildBlogAlternates(links, {
    language: post.languageCode,
    slug: post.slug.current,
  });

  return {
    title: `${post.title} | NJV Accountants`,
    description: post.excerpt,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: alternates.canonical,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: post.headerImage?.asset
        ? [{ url: urlFor(post.headerImage).width(1200).height(630).url() }]
        : undefined,
    },
  };
}

interface PortableTableValue {
  rows?: Array<{ _key?: string; cells?: string[] }>;
}

function portableTextComponents(headings: ArticleHeading[]) {
  let h2Index = 0;
  let h3Index = 0;
  const components: ComponentProps<typeof PortableText>["components"] = {
    block: {
      h2: ({ children }: { children?: ReactNode }) => (
        <h2 id={headings.filter((item) => item.depth === 2)[h2Index++]?.id}>
          {children}
        </h2>
      ),
      h3: ({ children }: { children?: ReactNode }) => (
        <h3 id={headings.filter((item) => item.depth === 3)[h3Index++]?.id}>
          {children}
        </h3>
      ),
    },
    types: {
      table: ({ value }: { value: PortableTableValue }) => {
        const [headerRow, ...bodyRows] = value.rows ?? [];
        if (!headerRow?.cells?.length) return null;
        return (
          <div className="my-10 overflow-x-auto">
            <table className="w-full border-collapse text-[0.9375rem]">
              <thead>
                <tr>
                  {headerRow.cells.map((cell, index) => (
                    <th
                      key={`${cell}-${index}`}
                      className="bg-navy border-border border px-4 py-3 text-left font-semibold text-white"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rowIndex) => (
                  <tr key={row._key ?? rowIndex} className="even:bg-cream">
                    {(row.cells ?? []).map((cell, cellIndex) => (
                      <td
                        key={`${cell}-${cellIndex}`}
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
      image: ({ value }: { value: SanityImage }) => {
        if (!value.asset) return null;
        return (
          <figure className="my-10">
            <div className="relative aspect-video w-full overflow-hidden rounded-sm">
              <Image
                src={urlFor(value).width(1000).url()}
                alt={value.alt ?? ""}
                fill
                className="bg-cream object-contain"
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </div>
            {value.caption ? (
              <figcaption className="text-slate-light mt-3 text-center text-sm italic">
                {value.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      },
    },
  };
  return components;
}

function formattedDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function LocalizedBlogPostPage({
  params,
}: {
  params: Promise<{ language: string; slug: string }>;
}) {
  const { language, slug } = await params;
  const result = await loadArticle(language, slug);
  if (!result) notFound();
  const { post, translations, normalizedLanguage } = result;
  const relatedPosts = await getRelatedPosts(
    post.category,
    post._id,
    normalizedLanguage,
  );
  const contentSource = getBlogContentSource(post.markdown, post.body);
  const headings =
    contentSource === "markdown"
      ? extractMarkdownHeadings(post.markdown ?? "")
      : extractPortableTextHeadings(post.body);
  const authorSlug = post.author?.slug?.current;
  const headerImageUrl = post.headerImage?.asset
    ? urlFor(post.headerImage).width(1400).url()
    : null;

  return (
    <>
      <JsonLd value={post.schemaMarkup} />
      <Navbar />
      <main id="article-top">
        <section className="bg-navy pt-17.5">
          <div className="mx-auto max-w-200 px-6 py-14">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm">
              <Link href="/" className="text-gold/70 hover:text-gold">
                Home
              </Link>
              <span className="mx-2 text-white/30">/</span>
              <Link href="/blog" className="text-gold/70 hover:text-gold">
                Blogs
              </Link>
              <span className="mx-2 text-white/30">/</span>
              <span className="text-white/50">{post.category}</span>
            </nav>
            <div className="bg-gold text-navy mb-6 inline-block rounded-sm px-3 py-1 text-xs font-bold tracking-wider uppercase">
              {post.category}
            </div>
            <h1 className="font-display mb-6 text-[clamp(1.9rem,4vw,3.1rem)] leading-tight font-bold text-white">
              {post.title}
            </h1>
            <p className="mb-8 max-w-170 text-lg leading-8 text-white/65">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {post.author?.image?.asset ? (
                <Image
                  src={urlFor(post.author.image).width(96).height(96).url()}
                  alt={post.author.image.alt ?? post.author.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <span className="bg-gold text-navy font-display flex h-12 w-12 items-center justify-center rounded-full font-bold">
                  {post.author?.name
                    ?.split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2) ?? "NJV"}
                </span>
              )}
              <div>
                {authorSlug ? (
                  <AuthorPopover
                    author={post.author}
                    imageUrl={
                      post.author.image?.asset
                        ? urlFor(post.author.image).width(160).height(160).url()
                        : null
                    }
                    variant="dark"
                  />
                ) : (
                  <span className="font-semibold text-white">
                    {post.author?.name}
                  </span>
                )}
                <div className="mt-1 flex flex-wrap gap-2 text-sm text-white/50">
                  <span>Published {formattedDate(post.publishedAt)}</span>
                  {post.updatedAt ? (
                    <span>· Updated {formattedDate(post.updatedAt)}</span>
                  ) : null}
                  {post.readTime ? <span>· {post.readTime} min read</span> : null}
                </div>
              </div>
            </div>
            {translations.length > 1 ? (
              <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-white/45">Read in:</span>
                {translations.map((translation) => (
                  <Link
                    key={translation._id}
                    href={blogPath(
                      translation.languageCode,
                      translation.slug.current,
                    )}
                    hrefLang={translation.languageCode}
                    className={`rounded-sm px-3 py-1 no-underline ${
                      translation.languageCode === post.languageCode
                        ? "bg-gold text-navy"
                        : "border border-white/15 text-white/70 hover:border-gold hover:text-gold"
                    }`}
                  >
                    {translation.languageName ?? translation.languageCode}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {headerImageUrl ? (
          <div className="bg-navy relative h-105 w-full">
            <Image
              src={headerImageUrl}
              alt={post.headerImage?.alt ?? post.title}
              fill
              priority
              className="object-contain"
              sizes="100vw"
            />
          </div>
        ) : (
          <div className="from-gold via-gold-light to-gold h-1 bg-linear-to-r" />
        )}

        <section className="bg-white">
          <div className="mx-auto max-w-200 px-6 py-16">
            <ArticleTableOfContents headings={headings} />
            {contentSource === "markdown" ? (
              <MarkdownArticleBody
                markdown={post.markdown ?? ""}
                headings={headings}
              />
            ) : contentSource === "portableText" ? (
              <div className="prose">
                <PortableText
                  value={post.body}
                  components={portableTextComponents(headings)}
                />
              </div>
            ) : (
              <p className="text-slate italic">Full article content coming soon.</p>
            )}

            <div className="border-border mt-14 border-t pt-8 text-right">
              <a
                href="#article-top"
                className="text-navy hover:text-gold text-sm font-semibold"
              >
                Back to top ↑
              </a>
            </div>

            {post.author ? (
              <section className="bg-cream border-border mt-12 rounded-sm border p-7">
                <h2 className="font-display text-navy mb-3 text-2xl font-bold">
                  About {post.author.name}
                </h2>
                {post.author.role ? (
                  <p className="text-gold mb-3 font-semibold">{post.author.role}</p>
                ) : null}
                <p className="text-slate leading-7">
                  {post.author.shortBio ?? post.author.bio}
                </p>
                {authorSlug ? (
                  <Link
                    href={authorPath(authorSlug)}
                    className="text-navy hover:text-gold mt-4 inline-block font-semibold"
                  >
                    View full profile →
                  </Link>
                ) : null}
              </section>
            ) : null}

            {relatedPosts.length ? (
              <section className="mt-14">
                <h2 className="font-display text-navy mb-6 text-2xl font-bold">
                  Related blogs
                </h2>
                <div className="grid gap-5 md:grid-cols-3">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related._id}
                      href={blogPath(related.languageCode, related.slug.current)}
                      className="border-border hover:border-gold rounded-sm border p-5 no-underline transition-colors"
                    >
                      <span className="text-gold text-xs font-semibold uppercase">
                        {related.category}
                      </span>
                      <h3 className="font-display text-navy mt-2 font-bold">
                        {related.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </section>

        <section className="bg-navy border-gold/20 border-t py-16">
          <div className="max-w-site mx-auto flex flex-wrap items-center justify-between gap-8 px-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                Put these ideas into action
              </h2>
              <p className="mt-2 text-white/60">
                Discuss your priorities with an NJV Accountants professional.
              </p>
            </div>
            <Link
              href="/#contact"
              className="bg-gold text-navy hover:bg-gold-light rounded-sm px-8 py-3.5 font-semibold uppercase"
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
