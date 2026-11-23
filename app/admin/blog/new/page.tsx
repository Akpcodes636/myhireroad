import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-auth';
import { DEFAULT_AUTHOR } from '@/lib/blog';
import { defaultScheduleValue } from '@/lib/eastern-time';
import AdminHeader from '../../AdminHeader';
import PostForm from '../PostForm';

export const instant = false;

export default async function NewBlogPostPage() {
  if (!(await isAdmin())) redirect('/admin/login');

  return (
    <div
      className="min-h-screen bg-[#F8FAFF]"
      style={{ fontFamily: 'var(--font-manrope, system-ui, sans-serif)' }}
    >
      <AdminHeader active="blog" subtitle="New blog post" />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <Link href="/admin/blog" className="text-xs font-semibold text-[#64748B] hover:text-[#061B55]">
          ← All posts
        </Link>
        <h1 className="mb-6 mt-2 text-2xl font-extrabold text-[#061B55]">New blog post</h1>
        <PostForm
          initial={{
            title: '',
            slug: '',
            description: '',
            category: 'Career Advice',
            author: DEFAULT_AUTHOR,
            keywords: '',
            coverImageUrl: '',
            coverImageAlt: '',
            content: '',
          }}
          initialMode="draft"
          defaultSchedule={defaultScheduleValue()}
          keepPublishAt={null}
        />
      </main>
    </div>
  );
}
