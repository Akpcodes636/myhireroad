import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-auth';
import { type BlogPostRow, getPostState, rowToPost } from '@/lib/blog';
import { defaultScheduleValue, toEasternInputValue } from '@/lib/eastern-time';
import { getSupabaseClient } from '@/lib/supabase';
import AdminHeader from '../../../AdminHeader';
import PostForm, { type PublishMode } from '../../PostForm';

export const instant = false;

export default async function EditBlogPostPage({
  params,
}: PageProps<'/admin/blog/edit/[id]'>) {
  if (!(await isAdmin())) redirect('/admin/login');

  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();

  const { data } = await getSupabaseClient()
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (!data) notFound();

  const post = rowToPost(data as BlogPostRow);
  const state = getPostState(post);
  const isLive = state === 'live';
  const mode: PublishMode = state === 'draft' ? 'draft' : state === 'scheduled' ? 'schedule' : 'publish';
  const defaultSchedule =
    state === 'scheduled' ? toEasternInputValue(post.publishAt) : defaultScheduleValue();

  return (
    <div
      className="min-h-screen bg-[#F8FAFF]"
      style={{ fontFamily: 'var(--font-manrope, system-ui, sans-serif)' }}
    >
      <AdminHeader active="blog" subtitle="Edit blog post" />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Link href="/admin/blog" className="text-xs font-semibold text-[#64748B] hover:text-[#061B55]">
              ← All posts
            </Link>
            <h1 className="mb-6 mt-2 text-2xl font-extrabold text-[#061B55]">Edit post</h1>
          </div>
          {isLive && (
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noreferrer"
              className="mb-6 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-xs font-semibold text-[#061B55] transition hover:bg-[#F1F5F9]"
            >
              View live post ↗
            </a>
          )}
        </div>
        <PostForm
          initial={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            description: post.description,
            category: post.category,
            author: post.author,
            keywords: post.keywords.join(', '),
            coverImageUrl: post.coverImageUrl ?? '',
            coverImageAlt: post.coverImageAlt ?? '',
            content: post.content,
          }}
          initialMode={mode}
          defaultSchedule={defaultSchedule}
          keepPublishAt={isLive ? post.publishAt : null}
        />
      </main>
    </div>
  );
}
