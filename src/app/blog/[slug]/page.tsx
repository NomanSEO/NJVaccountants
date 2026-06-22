import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from 'next-sanity'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getPost, getAllPosts } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/sanity'

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts
    .filter(p => p.slug?.current)
    .map(p => ({ slug: p.slug.current }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post Not Found | Pinnacle Advisory Group' }
  return {
    title: `${post.title} | Pinnacle Advisory Group`,
    description: post.excerpt,
    openGraph: post.headerImage
      ? { images: [{ url: urlFor(post.headerImage).width(1200).height(630).url() }] }
      : undefined,
  }
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-10">
          <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: '16/9' }}>
            <Image
              src={urlFor(value).width(800).url()}
              alt={value.alt ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-[0.8125rem] text-slate-light text-center mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const authorInitials = post.author?.name
    ? post.author.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : '??'

  const headerImageUrl = post.headerImage
    ? urlFor(post.headerImage).width(1200).height(520).fit('crop').url()
    : null

  return (
    <>
      <Navbar />
      <main>
        {/* Article header — navy */}
        <section className="pt-[70px] bg-navy">
          <div className="max-w-[800px] mx-auto px-6 py-14">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-gold/70 text-sm font-semibold mb-8 hover:text-gold transition-colors no-underline"
            >
              ← Back to Insights
            </a>

            <div className="inline-block bg-gold text-navy px-3 py-1 rounded-sm text-[0.7rem] font-bold tracking-[0.08em] uppercase mb-6">
              {post.category}
            </div>

            <h1 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-[1.0625rem] text-white/60 leading-[1.75] mb-8 max-w-[640px]">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center gap-4 flex-wrap">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center font-display font-bold text-navy text-sm shrink-0">
                {authorInitials}
              </div>
              <div>
                <div className="text-white font-semibold text-[0.9rem]">{post.author?.name}</div>
                <div className="text-white/50 text-[0.8rem] flex gap-2 flex-wrap">
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long', day: 'numeric', year: 'numeric',
                    })}
                  </span>
                  {post.readTime && (
                    <><span>·</span><span>{post.readTime} min read</span></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Header image — full width, bleeds below the navy section */}
        {headerImageUrl && (
          <div className="relative w-full bg-navy" style={{ height: '420px' }}>
            <Image
              src={headerImageUrl}
              alt={post.headerImage?.alt ?? post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-transparent" />
          </div>
        )}

        {/* Divider */}
        {!headerImageUrl && <div className="h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />}

        {/* Article body */}
        <section className="bg-white">
          <div className="max-w-[800px] mx-auto px-6 py-16">
            {post.body && post.body.length > 0 ? (
              <div className="prose">
                <PortableText value={post.body} components={portableTextComponents} />
              </div>
            ) : (
              <p className="text-slate italic text-[1.0625rem]">
                Full article content coming soon.
              </p>
            )}

            <div className="mt-16 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 text-navy font-semibold text-[0.8125rem] tracking-[0.04em] hover:text-gold transition-colors no-underline"
              >
                ← Back to All Insights
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase no-underline hover:bg-gold-light transition-colors"
              >
                Book a Consultation &rsaquo;
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-navy py-16 border-t border-gold/20">
          <div className="max-w-site mx-auto px-6 flex items-center justify-between gap-8 flex-wrap">
            <div>
              <div className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-white leading-[1.3]">
                Ready to put these insights into action?
              </div>
              <div className="text-[0.9375rem] text-white/60 mt-2">
                Our senior partners are available for a complimentary consultation.
              </div>
            </div>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-3.5 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase no-underline hover:bg-gold-light transition-colors shrink-0"
            >
              Speak to a Partner &rsaquo;
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
