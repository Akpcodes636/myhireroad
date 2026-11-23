import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import JsonLd from '../components/ui/JsonLd';
import { formatPostDate, getPublishedPosts, getReadingTime, siteUrl } from '@/lib/blog';

const title = 'Career Advice Blog: Resumes, Interviews & Job Search Tips';
const description =
  'Expert career advice from MyHireRoads: resume writing, ATS optimization, LinkedIn, interview coaching, salary negotiation and career transition tips.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'career advice blog',
    'resume tips',
    'ATS resume',
    'interview tips',
    'LinkedIn optimization',
    'salary negotiation',
    'career coaching Florida',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    type: 'website',
    url: '/blog',
    siteName: 'My Hire Roads',
    title: `${title} | My Hire Roads`,
    description,
    images: [
      {
        url: '/images/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'My Hire Roads career advice blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | My Hire Roads`,
    description,
    images: ['/images/logo.jpg'],
  },
};

export default async function BlogPage() {
  // Drafts and scheduled posts are left out until their publish time.
  const posts = await getPublishedPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${siteUrl}/blog#blog`,
        url: `${siteUrl}/blog`,
        name: 'My Hire Roads Career Advice Blog',
        description,
        publisher: { '@id': `${siteUrl}/#organization` },
        blogPost: posts.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          url: `${siteUrl}/blog/${post.slug}`,
          datePublished: post.publishAt,
          dateModified: post.updatedAt,
          author: { '@type': 'Person', name: post.author },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        {/* Hero banner */}
        <div className="relative overflow-hidden bg-[#061B55] py-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#0866E8]/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-[#0866E8]/10 blur-3xl"
          />

          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0866E8]/40 bg-[#0866E8]/15 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#93C5FD]">
                Blog
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              Career Advice &amp; Insights
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#94A3B8] sm:text-lg">
              Practical guidance on resumes, interviews, LinkedIn, salary
              negotiation and career transitions to help you land your next
              role with confidence.
            </p>
          </div>
        </div>

        {/* Posts */}
        <div className="bg-[#F4F8FF] py-14 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <div className="rounded-2xl border border-[#DCEBFF] bg-white p-10 text-center shadow-sm">
                <h2 className="text-lg font-bold text-[#061B55]">
                  New articles are coming soon
                </h2>
                <p className="mt-2 text-sm text-[#475569] sm:text-base">
                  Check back shortly for career advice from MyHireRoads.
                </p>
              </div>
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#DCEBFF] bg-white shadow-sm transition-shadow hover:shadow-md">
                      {post.coverImageUrl && (
                        <Link
                          href={`/blog/${post.slug}`}
                          className="relative block aspect-video overflow-hidden bg-[#DCEBFF]"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <Image
                            src={post.coverImageUrl}
                            alt={post.coverImageAlt ?? post.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </Link>
                      )}

                      <div className="flex flex-1 flex-col p-6">
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0866E8]">
                          {post.category}
                        </span>

                        <h2 className="mt-2 text-lg font-bold leading-snug text-[#061B55] sm:text-xl">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="transition-colors hover:text-[#0866E8]"
                          >
                            {post.title}
                          </Link>
                        </h2>

                        <p className="mt-3 flex-1 text-sm leading-6 text-[#475569]">
                          {post.description}
                        </p>

                        <div className="mt-5 flex items-center justify-between text-xs text-[#64748B]">
                          <time dateTime={post.publishAt}>{formatPostDate(post.publishAt)}</time>
                          <span>{getReadingTime(post)} min read</span>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
