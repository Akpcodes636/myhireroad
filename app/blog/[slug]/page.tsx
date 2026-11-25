
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import JsonLd from '../../components/ui/JsonLd';

import {
  type BlogBlock,
  formatPostDate,
  getPublishedPostBySlug,
  getPublishedPosts,
  getReadingTime,
  parseContent,
  siteUrl,
} from '@/lib/blog';

// Live posts are prerendered at build time.
// Posts published or scheduled later are rendered on their first visit.
export async function generateStaticParams() {
  const posts = await getPublishedPosts();

  if (posts.length === 0) {
    return [{ slug: 'coming-soon' }];
  }

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// SEO metadata
export async function generateMetadata({
  params,
}: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found',
      robots: { index: false },
    };
  }

  const url = `/blog/${post.slug}`;
  const image = post.coverImageUrl ?? '/images/logo.jpg';
  const author = post.author;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: author }],

    alternates: {
      canonical: url,
    },

    openGraph: {
      type: 'article',
      url,
      siteName: 'My Hire Roads',
      title: post.title,
      description: post.description,
      publishedTime: post.publishAt,
      modifiedTime: post.updatedAt,
      authors: [author],
      section: post.category,
      tags: post.keywords,
      images: [
        {
          url: image,
          alt: post.coverImageAlt ?? post.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

// Render individual blog content blocks
function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="mt-10 text-xl font-bold text-[#061B55] sm:text-2xl">
          {block.text}
        </h2>
      );

    case 'list':
      return (
        <ul className="mt-4 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0866E8]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'quote':
      return (
        <blockquote className="mt-6 rounded-r-xl border-l-4 border-[#0866E8] bg-[#F4F8FF] px-5 py-4 font-medium italic text-[#061B55]">
          {block.text}
        </blockquote>
      );

    default:
      return (
        <p className="mt-4">
          {block.text}
        </p>
      );
  }
}

// Loading fallback while the blog post is being resolved
function BlogPostFallback() {
  return (
    <main>
      <div className="bg-[#061B55] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-3xl animate-pulse px-4 sm:px-6 lg:px-8">
          <div className="mb-6 h-4 w-32 rounded bg-white/20" />

          <div className="h-10 w-3/4 rounded bg-white/20" />

          <div className="mt-5 h-5 w-full rounded bg-white/10" />
          <div className="mt-3 h-5 w-2/3 rounded bg-white/10" />

          <div className="mt-6 h-4 w-48 rounded bg-white/10" />
        </div>
      </div>

      <div className="bg-[#F4F8FF] py-14 sm:py-20">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="h-96 animate-pulse rounded-2xl bg-white" />
        </div>
      </div>
    </main>
  );
}

// Page shell: does not access URL parameters
export default function BlogPostPage({
  params,
}: PageProps<'/blog/[slug]'>) {
  return (
    <>
      <Navbar />

      <Suspense fallback={<BlogPostFallback />}>
        <BlogPostContent params={params} />
      </Suspense>

      <Footer />
    </>
  );
}

// Async content: URL parameters are accessed inside Suspense
async function BlogPostContent({
  params,
}: {
  params: PageProps<'/blog/[slug]'>['params'];
}) {
  const { slug } = await params;

  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const author = post.author;
  const blocks = parseContent(post.content);
  const cover = post.coverImageUrl;

  const imageUrl = cover
    ? cover.startsWith('http')
      ? cover
      : `${siteUrl}${cover}`
    : `${siteUrl}/images/logo.jpg`;

  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const related = (await getPublishedPosts())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  // Structured data for search engines
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${postUrl}#article`,
        mainEntityOfPage: postUrl,
        url: postUrl,
        headline: post.title,
        description: post.description,
        image: imageUrl,
        datePublished: post.publishAt,
        dateModified: post.updatedAt,
        articleSection: post.category,
        keywords: post.keywords.join(', '),
        author: {
          '@type': 'Person',
          '@id': `${siteUrl}/#founder`,
          name: author,
        },
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        isPartOf: {
          '@id': `${siteUrl}/blog#blog`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${siteUrl}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: postUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <main>
        {/* Hero banner */}
        <div className="relative overflow-hidden bg-[#061B55] py-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#0866E8]/15 blur-3xl"
          />

          <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-sm text-[#94A3B8]"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>

                <li aria-hidden="true">/</li>

                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ol>
            </nav>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0866E8]/40 bg-[#0866E8]/15 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />

              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#93C5FD]">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 text-base leading-7 text-[#94A3B8] sm:text-lg">
              {post.description}
            </p>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#94A3B8]">
              <span>By {author}</span>

              <span aria-hidden="true">·</span>

              <time dateTime={post.publishAt}>
                {formatPostDate(post.publishAt)}
              </time>

              <span aria-hidden="true">·</span>

              <span>{getReadingTime(post)} min read</span>
            </p>
          </div>
        </div>

        {/* Article */}
        <div className="bg-[#F4F8FF] py-14 sm:py-20">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
            <article className="overflow-hidden rounded-2xl border border-[#DCEBFF] bg-white shadow-sm">
              {cover && (
                <div className="relative aspect-video bg-[#DCEBFF]">
                  <Image
                    src={cover}
                    alt={post.coverImageAlt ?? post.title}
                    fill
                    priority
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              )}

              <div className="px-6 py-8 text-base leading-8 text-[#475569] sm:px-10 sm:py-10 sm:text-lg">
                {blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </article>

            {/* Call to action */}
            <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-[#DCEBFF] bg-white p-6 text-center shadow-sm sm:p-8">
              <h2 className="text-lg font-bold text-[#061B55] sm:text-xl">
                Ready to take the next step in your career?
              </h2>

              <p className="text-sm text-[#475569] sm:text-base">
                Get expert help with your resume, LinkedIn, interviews and more.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/#start"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0866E8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B3D91]"
                >
                  Get started
                </Link>

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#DCEBFF] px-5 py-2.5 text-sm font-semibold text-[#061B55] transition-colors hover:bg-[#F4F8FF]"
                >
                  ← All articles
                </Link>
              </div>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="mb-4 text-lg font-bold text-[#061B55]">
                  More articles
                </h2>

                <ul className="grid gap-4 sm:grid-cols-2">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="block h-full rounded-2xl border border-[#DCEBFF] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                      >
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0866E8]">
                          {p.category}
                        </span>

                        <span className="mt-1 block font-bold text-[#061B55]">
                          {p.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
