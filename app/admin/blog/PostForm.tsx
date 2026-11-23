'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useActionState, useRef, useState } from 'react';
import { slugify } from '@/lib/slugify';
import { savePost, type SavePostState } from './actions';

export type PostFormValues = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  author: string;
  keywords: string;
  coverImageUrl: string;
  coverImageAlt: string;
  content: string;
};

export type PublishMode = 'draft' | 'publish' | 'schedule';

const CATEGORIES = [
  'Resume Writing',
  'LinkedIn',
  'Interview Coaching',
  'Career Transition',
  'Salary Negotiation',
  'Job Search',
  'Career Advice',
];

const inputClass =
  'w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0866E8] focus:ring-2 focus:ring-[#0866E8]/15';

function Label({ htmlFor, children, hint }: { htmlFor: string; children: React.ReactNode; hint?: React.ReactNode }) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <label htmlFor={htmlFor} className="text-xs font-bold uppercase tracking-wider text-[#475569]">
        {children}
      </label>
      {hint && <span className="text-[11px] text-[#94A3B8]">{hint}</span>}
    </div>
  );
}

export default function PostForm({
  initial,
  initialMode,
  defaultSchedule,
  keepPublishAt,
}: {
  initial: PostFormValues;
  initialMode: PublishMode;
  /** "YYYY-MM-DDTHH:MM" in Eastern time. */
  defaultSchedule: string;
  /** Original publish time of an already-live post, so edits keep its date. */
  keepPublishAt: string | null;
}) {
  const [state, formAction, saving] = useActionState<SavePostState, FormData>(savePost, {});

  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [slugEdited, setSlugEdited] = useState(Boolean(initial.id));
  const [description, setDescription] = useState(initial.description);
  const [coverImageUrl, setCoverImageUrl] = useState(initial.coverImageUrl);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [mode, setMode] = useState<PublishMode>(initialMode);
  const [fields, setFields] = useState({
    content: initial.content,
    coverImageAlt: initial.coverImageAlt,
    category: initial.category,
    author: initial.author,
    keywords: initial.keywords,
    publishAtLocal: defaultSchedule,
  });
  const bind = (name: keyof typeof fields) => ({
    value: fields[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [name]: e.target.value })),
  });
  const fileInput = useRef<HTMLInputElement>(null);

  const isLive = keepPublishAt !== null;
  const shownSlug = slugEdited ? slug : slugify(title);

  async function handleUpload(file: File) {
    setUploading(true);
    setUploadError('');
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/admin/blog/upload', { method: 'POST', body });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Upload failed');
      setCoverImageUrl(json.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  }

  const submitLabel =
    mode === 'draft'
      ? 'Save draft'
      : mode === 'schedule'
        ? 'Schedule post'
        : isLive
          ? 'Update post'
          : 'Publish now';

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <input type="hidden" name="cover_image_url" value={coverImageUrl} />
      <input type="hidden" name="slug" value={shownSlug} />
      {isLive && mode === 'publish' && (
        <input type="hidden" name="keep_publish_at" value={keepPublishAt} />
      )}

      {/* ── Main column ── */}
      <div className="space-y-5 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <div>
          <Label htmlFor="title" hint={`${title.length}/60 recommended`}>Title</Label>
          <input
            id="title"
            name="title"
            required
            maxLength={200}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="How to Prepare for a Job Interview"
            className={`${inputClass} text-base font-semibold`}
          />
        </div>

        <div>
          <Label htmlFor="slug-input" hint="Lowercase words and hyphens">Page URL</Label>
          <div className="flex items-center overflow-hidden rounded-xl border border-[#E2E8F0] focus-within:border-[#0866E8] focus-within:ring-2 focus-within:ring-[#0866E8]/15">
            <span className="shrink-0 bg-[#F8FAFF] px-3 py-2.5 text-sm text-[#94A3B8]">/blog/</span>
            <input
              id="slug-input"
              value={shownSlug}
              onChange={(e) => {
                setSlugEdited(true);
                setSlug(slugify(e.target.value) + (e.target.value.endsWith('-') ? '-' : ''));
              }}
              placeholder="how-to-prepare-for-a-job-interview"
              className="w-full px-2 py-2.5 text-sm text-[#0F172A] outline-none"
            />
          </div>
          {isLive && slugEdited && shownSlug !== initial.slug && (
            <p className="mt-1.5 text-xs text-amber-700">
              Changing the URL of a live post breaks old links to it.
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="description"
            hint={
              <span className={description.length > 160 ? 'text-amber-600' : ''}>
                {description.length}/160 recommended
              </span>
            }
          >
            Short description (shown on Google)
          </Label>
          <textarea
            id="description"
            name="description"
            rows={2}
            maxLength={320}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A one or two sentence summary of the post."
            className={inputClass}
          />
        </div>

        <div>
          <Label htmlFor="content">Post content</Label>
          <textarea
            id="content"
            name="content"
            rows={22}
            {...bind('content')}
            placeholder={'Write your post here.\n\nLeave an empty line between paragraphs.\n\n## A section heading\n\n- A bullet point\n- Another bullet point\n\n> A highlighted quote'}
            className={`${inputClass} font-mono text-[13px] leading-6`}
          />
          <div className="mt-2 rounded-xl bg-[#F8FAFF] px-4 py-3 text-xs leading-6 text-[#64748B]">
            <p className="font-bold text-[#475569]">Formatting</p>
            <p>Leave an <b>empty line</b> between paragraphs.</p>
            <p>
              <code className="rounded bg-white px-1">## Heading</code> for a section heading ·{' '}
              <code className="rounded bg-white px-1">- item</code> for bullet points ·{' '}
              <code className="rounded bg-white px-1">&gt; text</code> for a highlighted quote
            </p>
          </div>
        </div>
      </div>

      {/* ── Sidebar ── */}
      <div className="space-y-5">
        <div className="space-y-3 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-[#475569]">Publishing</p>

          {(
            [
              { value: 'draft', label: 'Draft', help: 'Hidden from the website.' },
              {
                value: 'publish',
                label: isLive ? 'Published' : 'Publish now',
                help: isLive ? 'Live on the website.' : 'Goes live as soon as you save.',
              },
              { value: 'schedule', label: 'Schedule', help: 'Goes live automatically at a set time.' },
            ] as const
          ).map((option) => (
            <label
              key={option.value}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 transition ${
                mode === option.value ? 'border-[#0866E8] bg-[#0866E8]/5' : 'border-[#E2E8F0] hover:bg-[#F8FAFF]'
              }`}
            >
              <input
                type="radio"
                name="mode"
                value={option.value}
                checked={mode === option.value}
                onChange={() => setMode(option.value)}
                className="mt-1 accent-[#0866E8]"
              />
              <span>
                <span className="block text-sm font-bold text-[#0F172A]">{option.label}</span>
                <span className="block text-xs text-[#64748B]">{option.help}</span>
              </span>
            </label>
          ))}

          {mode === 'schedule' && (
            <div>
              <Label htmlFor="publish_at_local">Go live on</Label>
              <input
                id="publish_at_local"
                name="publish_at_local"
                type="datetime-local"
                required
                {...bind('publishAtLocal')}
                className={inputClass}
              />
              <p className="mt-1 text-[11px] text-[#94A3B8]">
                Eastern Time (ET). The post appears within about 15 minutes of this time.
              </p>
            </div>
          )}

          {state.error && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving || uploading}
            className="w-full rounded-xl bg-[#0866E8] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#0B3D91] disabled:opacity-60"
          >
            {saving ? 'Saving…' : submitLabel}
          </button>
          <Link
            href="/admin/blog"
            className="block text-center text-xs font-semibold text-[#64748B] hover:text-[#061B55]"
          >
            Cancel
          </Link>
        </div>

        <div className="space-y-3 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-[#475569]">Cover image</p>
          {coverImageUrl ? (
            <div className="relative aspect-video overflow-hidden rounded-xl bg-[#F1F5F9]">
              <Image src={coverImageUrl} alt="" fill unoptimized className="object-cover" />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-[#CBD5E1] text-xs text-[#94A3B8]">
              No image
            </div>
          )}
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={uploading}
              className="flex-1 rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs font-semibold text-[#061B55] transition hover:bg-[#F1F5F9] disabled:opacity-60"
            >
              {uploading ? 'Uploading…' : coverImageUrl ? 'Replace' : 'Upload image'}
            </button>
            {coverImageUrl && (
              <button
                type="button"
                onClick={() => setCoverImageUrl('')}
                className="rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs font-semibold text-[#475569] transition hover:bg-[#F1F5F9]"
              >
                Remove
              </button>
            )}
          </div>
          {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}
          <p className="text-[11px] text-[#94A3B8]">JPG, PNG or WebP, up to 5 MB. Wide images (16:9) look best.</p>
          <div>
            <Label htmlFor="cover_image_alt">Image description</Label>
            <input
              id="cover_image_alt"
              name="cover_image_alt"
              maxLength={200}
              {...bind('coverImageAlt')}
              placeholder="e.g. Woman shaking hands at an interview"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-[#475569]">Details</p>
          <div>
            <Label htmlFor="category">Category</Label>
            <input
              id="category"
              name="category"
              list="blog-categories"
              maxLength={60}
              {...bind('category')}
              className={inputClass}
            />
            <datalist id="blog-categories">
              {CATEGORIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
          <div>
            <Label htmlFor="author">Author</Label>
            <input id="author" name="author" maxLength={100} {...bind('author')} className={inputClass} />
          </div>
          <div>
            <Label htmlFor="keywords" hint="Separate with commas">SEO keywords</Label>
            <textarea
              id="keywords"
              name="keywords"
              rows={3}
              {...bind('keywords')}
              placeholder="interview tips, job interview preparation"
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
