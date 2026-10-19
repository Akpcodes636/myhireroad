import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import SubmissionsClient, { type Submission } from './SubmissionsClient';

export const instant = false;

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (session?.value !== process.env.ADMIN_SECRET) {
    redirect('/admin/login');
  }

  const { data: rows } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false });

  const submissions: Submission[] = await Promise.all(
    (rows ?? []).map(async (s) => {
      if (!s.resume_path) return { ...s, resumeUrl: null };
      const { data } = await supabase.storage
        .from('resumes')
        .createSignedUrl(s.resume_path, 3600);
      return { ...s, resumeUrl: data?.signedUrl ?? null };
    }),
  );

  return <SubmissionsClient submissions={submissions} />;
}
