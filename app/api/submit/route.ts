import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';


export async function POST(request: NextRequest) {
  try {
    const fd = await request.formData();

    const name             = String(fd.get('name')            ?? '');
    const email            = String(fd.get('email')           ?? '');
    const phone            = String(fd.get('phone')           ?? '');
    const services         = String(fd.get('services')        ?? '');
    const targetRole       = String(fd.get('targetRole')      ?? '');
    const careerStage      = String(fd.get('careerStage')     ?? '');
    const country          = String(fd.get('country')         ?? '');
    const challenge        = String(fd.get('challenge')       ?? '');
    const investmentReady  = String(fd.get('investmentReady') ?? '');
    const additionalInfo   = String(fd.get('additionalInfo')  ?? '');
    const resumeFile       = fd.get('resume') as File | null;
    const honeypot         = String(fd.get('_hp')             ?? '');

    // Honeypot — silently accept bots so they don't know they were blocked
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // File size guard — reject resumes over 5 MB
    const MAX_RESUME_BYTES = 5 * 1024 * 1024;
    if (resumeFile && resumeFile.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { error: 'Resume file exceeds the 5 MB limit.' },
        { status: 400 },
      );
    }

    // ── Upload resume to Supabase Storage ───────────────────────────
    let resumePath: string | null = null;
    if (resumeFile && resumeFile.size > 0) {
      const ext      = resumeFile.name.split('.').pop() ?? 'pdf';
      const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filename = `${Date.now()}-${safeName}.${ext}`;
      const buffer   = Buffer.from(await resumeFile.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filename, buffer, { contentType: resumeFile.type || 'application/pdf' });

      if (!uploadError) resumePath = filename;
    }

    // ── Save submission to Supabase ──────────────────────────────────
    const { error: insertError } = await supabase.from('submissions').insert({
      name,
      email,
      phone,
      services,
      target_role:      targetRole,
      career_stage:     careerStage,
      country,
      challenge,
      investment_ready: investmentReady,
      additional_info:  additionalInfo,
      resume_path:      resumePath,
    });

    if (insertError) throw insertError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 },
    );
  }
}
