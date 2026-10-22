import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSupabaseClient } from '@/lib/supabase';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Auth check
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session?.value || session.value !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const supabase = getSupabaseClient();

  // Fetch resume_path before deleting so we can clean up storage
  const { data: row } = await supabase
    .from('submissions')
    .select('resume_path')
    .eq('id', id)
    .single();

  const { error } = await supabase
    .from('submissions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Delete submission error:', error.message);
    return NextResponse.json({ error: 'Failed to delete submission' }, { status: 500 });
  }

  // Remove resume file from storage if present
  if (row?.resume_path) {
    await supabase.storage.from('resumes').remove([row.resume_path]);
  }

  return NextResponse.json({ success: true });
}
