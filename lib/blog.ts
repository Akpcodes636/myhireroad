import { cacheLife, cacheTag } from 'next/cache';
import { getSupabaseClient } from '@/lib/supabase';

// Blog posts are stored in the Supabase `blog_posts` table and managed
// from the admin at /admin/blog (see supabase/blog_posts.sql).

export const siteUrl = 'https://www.myhireroads.com';
export const BLOG_CACHE_TAG = 'blog-posts';
export const DEFAULT_AUTHOR = 'Katherine Fasanella';

export type PostStatus = 'draft' | 'published';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Body text. Blank lines separate blocks; see parseContent(). */
  content: string;
  category: string;
  author: string;
  keywords: string[];
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  status: PostStatus;
  /** ISO timestamp. A published post goes live at this moment. */
  publishAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
  keywords: string[] | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  status: PostStatus;
  publish_at: string;
  created_at: string;
  updated_at: string;
}

export function rowToPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    content: row.content,
    category: row.category,
    author: row.author || DEFAULT_AUTHOR,
    keywords: row.keywords ?? [],
    coverImageUrl: row.cover_image_url,
    coverImageAlt: row.cover_image_alt,
    status: row.status,
    publishAt: row.publish_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type PostState = 'draft' | 'scheduled' | 'live';

/** Whether a post is a draft, scheduled for later, or live right now. */
export function getPostState(post: Pick<BlogPost, 'status' | 'publishAt'>): PostState {
  if (post.status === 'draft') return 'draft';
  return new Date(post.publishAt).getTime() > Date.now() ? 'scheduled' : 'live';
}

// ── Public (cached) reads ────────────────────────────────────
// Live posts are cached and re-checked about every 15 minutes, so a
// scheduled post appears within ~15 minutes of its publish time. Saving or
// deleting a post in the admin refreshes the cache immediately.

const SCHEDULE_CHECK = {
  stale: 300, // 5 minutes
  revalidate: 900, // 15 minutes
  expire: 86400, // 1 day
};

/** Published posts whose publish time has passed, newest first. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  'use cache';
  cacheTag(BLOG_CACHE_TAG);
  cacheLife(SCHEDULE_CHECK);

  try {
    const { data, error } = await getSupabaseClient()
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .lte('publish_at', new Date().toISOString())
      .order('publish_at', { ascending: false });

    if (error) throw new Error(error.message);
    return (data as BlogPostRow[]).map(rowToPost);
  } catch (err) {
    // Keep the site up if the database is unreachable; the blog shows empty.
    console.error('Failed to load blog posts:', err);
    return [];
  }
}

/** A live post by slug, or undefined if missing, a draft, or scheduled. */
export async function getPublishedPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug);
}

// ── Content formatting ───────────────────────────────────────

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string };

/**
 * Turns the admin's plain-text body into blocks:
 *   - a blank line starts a new block
 *   - "## Heading"   → section heading
 *   - "- item" lines → bullet list
 *   - "> text"       → highlighted quote
 *   - anything else  → paragraph
 */
export function parseContent(content: string): BlogBlock[] {
  return content
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): BlogBlock => {
      const lines = chunk.split('\n').map((l) => l.trim());
      if (/^#{1,6}\s/.test(lines[0]) && lines.length === 1) {
        return { type: 'heading', text: lines[0].replace(/^#{1,6}\s+/, '') };
      }
      if (lines.every((l) => /^[-*•]\s/.test(l))) {
        return { type: 'list', items: lines.map((l) => l.replace(/^[-*•]\s+/, '')) };
      }
      if (lines.every((l) => l.startsWith('>'))) {
        return { type: 'quote', text: lines.map((l) => l.replace(/^>\s?/, '')).join(' ') };
      }
      return { type: 'paragraph', text: lines.join(' ') };
    });
}

/** Rough reading time based on ~220 words per minute. */
export function getReadingTime(post: Pick<BlogPost, 'content'>): number {
  const words = post.content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** "November 21, 2026", shown in US Eastern time. */
export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/New_York',
  });
}
