'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { deletePost } from './actions';

export type AdminPostSummary = {
  id: string;
  slug: string;
  title: string;
  category: string;
  state: 'draft' | 'scheduled' | 'live';
  when: string;
};

const BADGES = {
  live: { label: 'Live', className: 'bg-green-50 text-green-700 border-green-200' },
  scheduled: { label: 'Scheduled', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  draft: { label: 'Draft', className: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]' },
};

const WHEN_LABEL = { live: 'Published', scheduled: 'Goes live', draft: 'Last edited' };

export default function BlogListClient({ posts: initial }: { posts: AdminPostSummary[] }) {
  const [posts, setPosts] = useState(initial);
  const [pending, startTransition] = useTransition();

  const handleDelete = (post: AdminPostSummary) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deletePost(post.id);
      if (result.error) {
        alert(result.error);
        return;
      }
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    });
  };

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white p-12 text-center">
        <p className="text-base font-bold text-[#061B55]">No blog posts yet</p>
        <p className="mt-1 text-sm text-[#64748B]">Write your first post and publish it now or schedule it for later.</p>
        <Link
          href="/admin/blog/new"
          className="mt-5 inline-flex rounded-xl bg-[#0866E8] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0B3D91]"
        >
          + New post
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-[#F1F5F9] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
      {posts.map((post) => {
        const badge = BADGES[post.state];
        return (
          <li key={post.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${badge.className}`}>
                  {badge.label}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                  {post.category}
                </span>
              </div>
              <p className="mt-1 truncate text-sm font-bold text-[#0F172A]">{post.title}</p>
              <p className="mt-0.5 text-xs text-[#64748B]">
                {WHEN_LABEL[post.state]}: {post.when} · /blog/{post.slug}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {post.state === 'live' && (
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs font-semibold text-[#475569] transition hover:bg-[#F1F5F9]"
                >
                  View
                </a>
              )}
              <Link
                href={`/admin/blog/edit/${post.id}`}
                className="rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs font-semibold text-[#061B55] transition hover:bg-[#F1F5F9]"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(post)}
                disabled={pending}
                className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
