'use server';

import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-auth';
import { BLOG_CACHE_TAG, DEFAULT_AUTHOR } from '@/lib/blog';
import { fromEasternInputValue } from '@/lib/eastern-time';
import { slugify } from '@/lib/slugify';
import { getSupabaseClient } from '@/lib/supabase';

export type SavePostState = { error?: string };

const IMAGE_BUCKET = 'blog-images';
const PUBLIC_BUCKET_PATH = `/storage/v1/object/public/${IMAGE_BUCKET}/`;

function text(formData: FormData, name: string, max: number): string {
  return String(formData.get(name) ?? '').trim().slice(0, max);
}

function storagePathFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const i = url.indexOf(PUBLIC_BUCKET_PATH);
  return i === -1 ? null : decodeURIComponent(url.slice(i + PUBLIC_BUCKET_PATH.length));
}

export async function savePost(
  _prev: SavePostState,
  formData: FormData,
): Promise<SavePostState> {
  if (!(await isAdmin())) return { error: 'Your session has expired. Please log in again.' };

  const id = text(formData, 'id', 64) || null;
  const title = text(formData, 'title', 200);
  const slug = slugify(text(formData, 'slug', 120) || title);
  const description = text(formData, 'description', 320);
  const category = text(formData, 'category', 60) || 'Career Advice';
  const author = text(formData, 'author', 100) || DEFAULT_AUTHOR;
  const content = String(formData.get('content') ?? '').trim().slice(0, 100_000);
  const coverImageUrl = text(formData, 'cover_image_url', 1000) || null;
  const coverImageAlt = text(formData, 'cover_image_alt', 200) || null;
  // mode: 'draft' (hidden), 'publish' (live now), 'schedule' (live later)
  const mode = text(formData, 'mode', 20);
  const status = mode === 'publish' || mode === 'schedule' ? 'published' : 'draft';
  // When editing an already-live post, keep its original publish date.
  const keepPublishAt = text(formData, 'keep_publish_at', 40);
  const keywords = text(formData, 'keywords', 1000)
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)
    .slice(0, 20);

  if (!title) return { error: 'Please add a title.' };
  if (!slug) return { error: 'Please add a URL (slug) using letters or numbers.' };
  if (status === 'published' && !description) {
    return { error: 'Please add a short description before publishing. It is shown on Google.' };
  }
  if (status === 'published' && !content) {
    return { error: 'Please write the post content before publishing.' };
  }
  if (coverImageUrl && !/^(https:\/\/|\/)/.test(coverImageUrl)) {
    return { error: 'The cover image link is not valid. Please upload the image again.' };
  }

  let publishAt = new Date();
  if (mode === 'schedule') {
    const scheduled = fromEasternInputValue(text(formData, 'publish_at_local', 20));
    if (!scheduled) return { error: 'Please choose a date and time to schedule the post.' };
    if (scheduled.getTime() <= Date.now()) {
      return { error: 'The scheduled time is in the past. Pick a future time, or choose "Publish now".' };
    }
    publishAt = scheduled;
  } else if (keepPublishAt && !Number.isNaN(new Date(keepPublishAt).getTime())) {
    publishAt = new Date(keepPublishAt);
  }

  const record = {
    slug,
    title,
    description,
    content,
    category,
    author,
    keywords,
    cover_image_url: coverImageUrl,
    cover_image_alt: coverImageAlt,
    status,
    publish_at: publishAt.toISOString(),
  };

  const supabase = getSupabaseClient();
  const { error } = id
    ? await supabase.from('blog_posts').update(record).eq('id', id)
    : await supabase.from('blog_posts').insert(record);

  if (error) {
    if (error.code === '23505') {
      return { error: `Another post already uses the URL "/blog/${slug}". Please choose a different one.` };
    }
    console.error('Save blog post error:', error.message);
    return { error: 'Could not save the post. Please try again.' };
  }

  // Refresh the public blog pages and sitemap right away.
  updateTag(BLOG_CACHE_TAG);
  redirect(`/admin/blog?saved=${encodeURIComponent(slug)}`);
}

export async function deletePost(id: string): Promise<SavePostState> {
  if (!(await isAdmin())) return { error: 'Your session has expired. Please log in again.' };

  const supabase = getSupabaseClient();
  const { data: row } = await supabase
    .from('blog_posts')
    .select('cover_image_url')
    .eq('id', id)
    .single();

  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) {
    console.error('Delete blog post error:', error.message);
    return { error: 'Could not delete the post. Please try again.' };
  }

  const imagePath = storagePathFromUrl(row?.cover_image_url);
  if (imagePath) await supabase.storage.from(IMAGE_BUCKET).remove([imagePath]);

  updateTag(BLOG_CACHE_TAG);
  return {};
}
