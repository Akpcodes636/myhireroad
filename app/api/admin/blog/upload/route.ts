import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { getSupabaseClient } from '@/lib/supabase';

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
};

// Uploads a blog cover image to the public `blog-images` bucket.
export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No image was selected.' }, { status: 400 });
  }
  const ext = EXTENSIONS[file.type];
  if (!ext) {
    return NextResponse.json({ error: 'Please use a JPG, PNG, WebP or AVIF image.' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Image must be 5 MB or smaller.' }, { status: 400 });
  }

  const path = `covers/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  const supabase = getSupabaseClient();
  const { error } = await supabase.storage
    .from('blog-images')
    .upload(path, file, { contentType: file.type, cacheControl: '31536000' });

  if (error) {
    console.error('Blog image upload error:', error.message);
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }

  const { data } = supabase.storage.from('blog-images').getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
