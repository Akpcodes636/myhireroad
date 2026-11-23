-- ─────────────────────────────────────────────────────────────
-- Blog posts for the admin blog editor.
--
-- Run this ONCE in Supabase: Dashboard → SQL Editor → New query →
-- paste this whole file → Run. It is safe to run again.
-- ─────────────────────────────────────────────────────────────

create table if not exists public.blog_posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  description     text not null default '',
  content         text not null default '',
  category        text not null default 'Career Advice',
  author          text not null default 'Katherine Fasanella',
  keywords        text[] not null default '{}',
  cover_image_url text,
  cover_image_alt text,
  -- 'draft' = hidden. 'published' = live once publish_at has passed
  -- (a future publish_at means the post is scheduled).
  status          text not null default 'draft'
                  check (status in ('draft', 'published')),
  publish_at      timestamptz not null default now(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists blog_posts_live_idx
  on public.blog_posts (status, publish_at desc);

-- Only the server (service role key) can read or write posts.
-- No public policies are added on purpose.
alter table public.blog_posts enable row level security;

-- Keep updated_at current on every edit.
create or replace function public.blog_posts_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.blog_posts_set_updated_at();

-- Public storage bucket for blog cover images (5 MB max, images only).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-images',
  'blog-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do nothing;

-- Starter post (edit or delete it from the admin).
insert into public.blog_posts
  (slug, title, description, category, keywords, cover_image_url, cover_image_alt, status, publish_at, content)
values (
  'how-to-write-an-ats-friendly-resume',
  'How to Write an ATS-Friendly Resume That Gets Seen',
  'Learn how applicant tracking systems read your resume and the practical formatting and keyword steps that help you get past the filter and in front of a recruiter.',
  'Resume Writing',
  array['ATS resume', 'ATS-friendly resume', 'applicant tracking system', 'resume keywords', 'resume writing Florida'],
  '/images/hero.jpg',
  'Professional reviewing a resume on a laptop',
  'published',
  now(),
  $content$Most mid-size and large employers use an applicant tracking system (ATS) to collect and sort applications. Before a recruiter ever reads your resume, software has usually parsed it, pulled out your experience and skills, and ranked it against the job description. A strong resume that the ATS cannot read is a resume nobody sees.

## Keep the format simple

Applicant tracking systems read text from top to bottom. Complex layouts confuse them and can scramble your information.

- Use a single-column layout with clear section headings such as "Experience", "Education" and "Skills".
- Avoid tables, text boxes, graphics and icons for important information.
- Keep your name and contact details in the body of the document, not in the header or footer.
- Save as .docx or a text-based PDF unless the posting asks for something else.

## Mirror the language of the job description

The ATS compares your resume to the posting. If the job asks for "project management" and your resume only says "led initiatives", you may be filtered out even though you have the experience. Read the posting closely and use its exact terms where they truthfully describe your work.

## Lead with results, not duties

Getting past the software is only the first step. A recruiter then spends seconds deciding whether to keep reading. Bullet points that show measurable outcomes, such as revenue grown, costs cut, time saved or teams led, give them a reason to call you.

> Your resume is not a list of everything you have done. It is a focused case for why you are the right person for this role.

## Tailor every application

Sending the same resume everywhere is one of the most common reasons qualified candidates hear nothing back. Keep a detailed master resume, then adjust your summary, skills and top bullet points for each role you apply to.

If you would like an expert to position your experience for the roles you want, MyHireRoads offers professional ATS-optimized resume writing and career coaching.$content$
)
on conflict (slug) do nothing;
