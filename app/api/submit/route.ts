import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabaseClient } from '@/lib/supabase';

const MAX_RESUME_BYTES = 4 * 1024 * 1024;

const ALLOWED_RESUME_TYPES: Record<
  string,
  { mime: string; signature: number[] }
> = {
  pdf: {
    mime: 'application/pdf',
    signature: [0x25, 0x50, 0x44, 0x46, 0x2d], // %PDF-
  },
  doc: {
    mime: 'application/msword',
    signature: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1],
  },
  docx: {
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    signature: [0x50, 0x4b, 0x03, 0x04], // ZIP container
  },
};


function getResumeExtension(filename: string): string | null {
  const extension = filename.split('.').pop()?.toLowerCase();

  return extension && extension in ALLOWED_RESUME_TYPES
    ? extension
    : null;
}

function hasValidSignature(
  buffer: Buffer,
  signature: number[],
): boolean {
  return signature.every((byte, index) => buffer[index] === byte);
}

export async function POST(request: NextRequest) {
  try {
    const fd = await request.formData();

    const name = String(fd.get('name') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const phone = String(fd.get('phone') ?? '').trim();
    const services = String(fd.get('services') ?? '');
    const targetRole = String(fd.get('targetRole') ?? '').trim();
    const careerStage = String(fd.get('careerStage') ?? '');
    const country = String(fd.get('country') ?? '').trim();
    const challenge = String(fd.get('challenge') ?? '').trim();
    const investmentReady = String(fd.get('investmentReady') ?? '');
    const additionalInfo = String(fd.get('additionalInfo') ?? '');
    const resumeEntry = fd.get('resume');
    const honeypot = String(fd.get('_hp') ?? '');

    // Honeypot: silently accept bot submissions without processing them.
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Validate required contact and career information.
    if (
      !name ||
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !phone ||
      !services.trim() ||
      !targetRole ||
      !careerStage.trim() ||
      !country ||
      !challenge ||
      !investmentReady.trim()
    ) {
      return NextResponse.json(
        { error: 'Please complete all required fields with valid information.' },
        { status: 400 },
      );
    }

    // RESUME IS REQUIRED.
    if (
      !(resumeEntry instanceof File) ||
      resumeEntry.size === 0 ||
      !resumeEntry.name.trim()
    ) {
      return NextResponse.json(
        { error: 'Please upload your resume before submitting.' },
        { status: 400 },
      );
    }

    const resumeFile = resumeEntry;

    // Enforce the 5 MB limit.
    if (resumeFile.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { error: 'Resume file exceeds the 4 MB limit.' },
        { status: 400 },
      );
    }

    // Validate the filename extension.
    const extension = getResumeExtension(resumeFile.name);

    if (!extension) {
      return NextResponse.json(
        {
          error: 'Invalid resume format. Please upload a PDF, DOC, or DOCX file.',
        },
        { status: 400 },
      );
    }

    const resumeType = ALLOWED_RESUME_TYPES[extension];

    // Reject a declared MIME type that conflicts with the extension.
    if (resumeFile.type && resumeFile.type !== resumeType.mime) {
      return NextResponse.json(
        {
          error: 'The resume file type does not match its extension.',
        },
        { status: 400 },
      );
    }

    // Read and check the file signature.
    const buffer = Buffer.from(await resumeFile.arrayBuffer());

    if (!hasValidSignature(buffer, resumeType.signature)) {
      return NextResponse.json(
        {
          error: 'The uploaded file does not appear to be a valid resume document.',
        },
        { status: 400 },
      );
    }

    // Upload the required resume to Supabase Storage.
    const supabase = getSupabaseClient();

    const safeName =
      name.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 60) ||
      'applicant';

    const filename =
      `${Date.now()}-${crypto.randomUUID()}-${safeName}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filename, buffer, {
        contentType: resumeType.mime,
        upsert: false,
      });

    if (uploadError) {
      console.error('Resume upload failed:', uploadError);

      return NextResponse.json(
        {
          error: 'We could not upload your resume. Please try again.',
        },
        { status: 500 },
      );
    }

    // Save the submission only after the resume upload succeeds.
    const { error: insertError } = await supabase
      .from('submissions')
      .insert({
        name,
        email,
        phone,
        services,
        target_role: targetRole,
        career_stage: careerStage,
        country,
        challenge,
        investment_ready: investmentReady,
        additional_info: additionalInfo,
        resume_path: filename,
      });

    if (insertError) {
      console.error('Submission database insert failed:', insertError);

      // Avoid leaving an orphaned resume when the database insert fails.
      const { error: cleanupError } = await supabase.storage
        .from('resumes')
        .remove([filename]);

      if (cleanupError) {
        console.error('Resume cleanup failed:', cleanupError);
      }

      return NextResponse.json(
        { error: 'Failed to save your submission. Please try again.' },
        { status: 500 },
      );
    }

    // Notify the MyHireRoads team via Resend.
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('Email notification skipped: RESEND_API_KEY is missing.');
    } else {
      try {
        const resend = new Resend(resendApiKey);

        const { error: emailError } = await resend.emails.send({
          from: 'MyHireRoads <no-reply@myhireroad.com>',
          to: process.env.NOTIFY_EMAIL ?? 'edeaibuedefe2@gmail.com',
          subject: `New Consultation Request — ${name}`,
          html: `
            <h2>New Consultation Request</h2>
            <table cellpadding="6" style="border-collapse:collapse;">
              <tr><td><strong>Name</strong></td><td>${name}</td></tr>
              <tr><td><strong>Email</strong></td><td>${email}</td></tr>
              <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
              <tr><td><strong>Services</strong></td><td>${services}</td></tr>
              <tr><td><strong>Target Role</strong></td><td>${targetRole}</td></tr>
              <tr><td><strong>Career Stage</strong></td><td>${careerStage}</td></tr>
              <tr><td><strong>Country</strong></td><td>${country}</td></tr>
              <tr><td><strong>Challenge</strong></td><td>${challenge}</td></tr>
              <tr><td><strong>Investment Ready</strong></td><td>${investmentReady}</td></tr>
              ${additionalInfo ? `<tr><td><strong>Additional Info</strong></td><td>${additionalInfo}</td></tr>` : ''}
            </table>
            <p style="margin-top:16px;">Log in to the dashboard to view the full submission and resume.</p>
          `,
        });

        if (emailError) {
          console.error('Resend notification failed:', emailError);
        }
      } catch (notifyError) {
        // Do not lose a successfully saved submission if email notification fails.
        console.error('Resend notification error:', notifyError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Form submission error:', error);

    return NextResponse.json(
      { error: 'Failed to process submission. Please try again.' },
      { status: 500 },
    );
  }
}