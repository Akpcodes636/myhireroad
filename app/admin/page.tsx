
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabase';
import SubmissionsClient, { type Submission } from './SubmissionsClient';

export const instant = false;

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (
    !session?.value ||
    session.value !== process.env.ADMIN_SECRET
  ) {
    redirect('/admin/login');
  }

  const supabase = getSupabaseClient();

  const { data: rows, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to load submissions:', error.message);
    throw new Error('Failed to load submissions');
  }

  const submissions: Submission[] = await Promise.all(
    (rows ?? []).map(async (s) => {
      if (!s.resume_path) {
        return { ...s, resumeUrl: null };
      }

      const { data, error: signedUrlError } = await supabase.storage
        .from('resumes')
        .createSignedUrl(s.resume_path, 3600);

      if (signedUrlError) {
        console.error(
          'Failed to create resume URL:',
          signedUrlError.message,
        );
      }

      return {
        ...s,
        resumeUrl: data?.signedUrl ?? null,
      };
    }),
  );

  return <SubmissionsClient submissions={submissions} />;
}
