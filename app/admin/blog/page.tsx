import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-auth';
import { type BlogPostRow, getPostState, rowToPost } from '@/lib/blog';
import { formatEastern } from '@/lib/eastern-time';
import { getSupabaseClient } from '@/lib/supabase';
import AdminHeader from '../AdminHeader';
import BlogListClient, { type AdminPostSummary } from './BlogListClient';

export const instant = false;

export default async function AdminBlogPage({
  searchParams,
}: PageProps<'/admin/blog'>) {
  if (!(await isAdmin())) redirect('/admin/login');

  const { saved } = await searchParams;
  const { data, error } = await getSupabaseClient()
    .from('blog_posts')
    .select('*')
    .order('publish_at', { ascending: false });

  const posts: AdminPostSummary[] = ((data ?? []) as BlogPostRow[]).map((row) => {
    const post = rowToPost(row);
    const state = getPostState(post);
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      category: post.category,
      state,
      when: formatEastern(state === 'draft' ? post.updatedAt : post.publishAt),
    };
  });

  return (
    <div
      className="min-h-screen bg-[#F8FAFF]"
      style={{ fontFamily: 'var(--font-manrope, system-ui, sans-serif)' }}
    >
      <AdminHeader active="blog" subtitle="Blog Posts">
        <Link
          href="/admin/blog/new"
          className="rounded-xl bg-[#0866E8] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#0B3D91]"
        >
          + New post
        </Link>
      </AdminHeader>

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error.code === '42P01' || error.code === 'PGRST205'
              ? 'The blog table has not been set up yet. Run supabase/blog_posts.sql in the Supabase SQL Editor, then reload this page.'
              : 'Could not load blog posts. Please reload the page.'}
          </div>
        )}

        {typeof saved === 'string' && !error && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            Post saved.
          </div>
        )}

        <BlogListClient posts={posts} />
      </main>
    </div>
  );
}
