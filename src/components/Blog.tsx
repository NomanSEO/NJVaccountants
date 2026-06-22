import Image from 'next/image'
import { getPosts } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/sanity'

const SYMBOLS = ['§', '₤', '↗']

export default async function Blog() {
  const posts = await getPosts()

  return (
    <section id="blog" className="py-24 bg-white" aria-label="Insights and blog">
      <div className="max-w-site mx-auto px-6">
        <header className="mb-14">
          <div className="flex items-center gap-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-gold mb-5">
            <span className="block w-[3px] h-[22px] bg-gold shrink-0" />
            Insights & Analysis
          </div>
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-bold text-navy leading-tight mb-5">
            From Our <em className="not-italic text-gold">Expert</em> Team
          </h2>
          <p className="text-[1.0625rem] text-slate max-w-[560px] leading-[1.7]">
            Timely, practical perspectives on accounting, tax, regulation, and business strategy.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-7">
          {posts.map((post, i) => {
            const imgHeight = i === 0 ? 260 : 200
            return (
              <article key={post._id} className="border border-border rounded-sm overflow-hidden hover:shadow-[0_12px_40px_rgba(11,31,58,0.08)] hover:-translate-y-0.5 transition-all duration-300 group">
                <a href={`/blog/${post.slug?.current ?? '#'}`} className="block no-underline">
                  {/* Card image */}
                  <div className="relative overflow-hidden" style={{ height: `${imgHeight}px` }}>
                    {post.headerImage ? (
                      <>
                        <Image
                          src={urlFor(post.headerImage).width(i === 0 ? 800 : 400).height(imgHeight).fit('crop').url()}
                          alt={post.headerImage.alt ?? post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes={i === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
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
                        <span className="font-display text-5xl text-white opacity-15 absolute">{SYMBOLS[i] ?? '›'}</span>
                        <span className="relative z-10 inline-block bg-gold text-navy px-2.5 py-1 rounded-sm text-[0.7rem] font-bold tracking-[0.08em] uppercase">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <div className="text-[0.75rem] text-slate-light mb-2.5 flex gap-3 flex-wrap">
                      <span>{post.author.name}</span>
                      <span>·</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      {post.readTime && <><span>·</span><span>{post.readTime} min read</span></>}
                    </div>
                    <h3 className={`font-display font-bold text-navy leading-[1.3] mb-2.5 group-hover:text-gold transition-colors ${i === 0 ? 'text-[1.375rem]' : 'text-[1.125rem]'}`}>
                      {post.title}
                    </h3>
                    <p className="text-[0.875rem] text-slate leading-[1.6] mb-4">{post.excerpt}</p>
                    <span className="text-[0.8125rem] font-semibold text-navy no-underline tracking-[0.04em] flex items-center gap-1.5 group-hover:text-gold transition-colors">
                      Read {i === 0 ? 'Full Article' : 'Article'} &rsaquo;
                    </span>
                  </div>
                </a>
              </article>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <a href="/blog" className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-3.5 rounded-sm font-semibold text-sm tracking-[0.05em] uppercase no-underline hover:bg-gold-light hover:-translate-y-px transition-all">
            View All Insights &rsaquo;
          </a>
        </div>
      </div>
    </section>
  )
}
