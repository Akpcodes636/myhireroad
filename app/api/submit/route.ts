import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabase';

const OWNER_EMAIL = process.env.GMAIL_USER ?? 'myhireroads@gmail.com';

const BOOKING_URL =
  'https://app.acuityscheduling.com/schedule.php?owner=36932701&appointmentType=category:Career%20Consultation';

function row(label: string, value: string) {
  return `<tr><td style="padding:6px 12px 6px 0;font-weight:600;color:#061B55;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#334155">${value || '—'}</td></tr>`;
}

export async function POST(request: NextRequest) {
  try {
    const fd = await request.formData();

    const name = String(fd.get('name') ?? '');
    const email = String(fd.get('email') ?? '');
    const phone = String(fd.get('phone') ?? '');
    const services = String(fd.get('services') ?? '');
    const targetRole = String(fd.get('targetRole') ?? '');
    const careerStage = String(fd.get('careerStage') ?? '');
    const country = String(fd.get('country') ?? '');
    const challenge = String(fd.get('challenge') ?? '');
    const investmentReady = String(fd.get('investmentReady') ?? '');
    const additionalInfo = String(fd.get('additionalInfo') ?? '');
    const resumeFile = fd.get('resume') as File | null;
    const honeypot = String(fd.get('_hp') ?? '');

    // Honeypot check — bots fill hidden fields, humans don't
    if (honeypot) {
      // Silently accept so bots don't know they were blocked
      return NextResponse.json({ success: true });
    }

    // File size check — reject resumes over 5 MB
    const MAX_RESUME_BYTES = 5 * 1024 * 1024;
    if (resumeFile && resumeFile.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { error: 'Resume file exceeds the 5 MB limit.' },
        { status: 400 },
      );
    }

    // ── Save to Supabase ─────────────────────────────────────────────
    let resumePath: string | null = null;
    if (resumeFile && resumeFile.size > 0) {
      const ext = resumeFile.name.split('.').pop() ?? 'pdf';
      const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filename = `${Date.now()}-${safeName}.${ext}`;
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filename, buffer, { contentType: resumeFile.type || 'application/pdf' });
      if (!uploadError) resumePath = filename;
    }

    await supabase.from('submissions').insert({
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
      resume_path: resumePath,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Build resume attachment for both emails
    const attachments: { filename: string; content: Buffer }[] = [];
    if (resumeFile && resumeFile.size > 0) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      attachments.push({ filename: resumeFile.name, content: buffer });
    }

    const tableHtml = `
      <table style="border-collapse:collapse;width:100%;font-size:14px;font-family:sans-serif">
        ${row('Name', name)}
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Services', services)}
        ${row('Target Role', targetRole)}
        ${row('Career Stage', careerStage)}
        ${row('Country', country)}
        ${row('Challenge', challenge)}
        ${row('Investment Ready', investmentReady)}
        ${row('Additional Info', additionalInfo)}
      </table>`;

    // ── Email to business owner ──────────────────────────────────────
    await transporter.sendMail({
      from: `"My Hire Roads" <${OWNER_EMAIL}>`,
      to: OWNER_EMAIL,
      subject: `New Career Consultation Request — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0f172a">
          <h2 style="margin-bottom:4px;color:#061B55">New Consultation Request</h2>
          <p style="margin-top:0;color:#64748b;font-size:13px">Submitted via myhireroads.com</p>
          ${tableHtml}
          ${resumeFile && resumeFile.size > 0 ? '<p style="margin-top:16px;font-weight:600;color:#0866E8">Resume attached.</p>' : '<p style="margin-top:16px;color:#94a3b8">No resume uploaded.</p>'}
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0"/>
          <a href="${BOOKING_URL}" style="display:inline-block;background:#0866E8;color:#fff;padding:12px 24px;border-radius:10px;font-weight:700;text-decoration:none;font-size:14px">View Booking Page →</a>
        </div>`,
      attachments,
    });

    // ── Confirmation email to client ─────────────────────────────────
    await transporter.sendMail({
      from: `"My Hire Roads" <${OWNER_EMAIL}>`,
      to: email,
      subject: 'Your My Hire Roads Consultation Request — Next Steps',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0f172a">
          <h2 style="color:#061B55">Thank you, ${name}!</h2>
          <p style="color:#475569;line-height:1.7">
            We've received your career consultation request. Our team will review your details
            and reach out within <strong>24 hours</strong>.
          </p>
          <p style="color:#475569;line-height:1.7">
            In the meantime, you can go ahead and book your consultation slot:
          </p>
          <a href="${BOOKING_URL}" style="display:inline-block;background:#0866E8;color:#fff;padding:14px 28px;border-radius:10px;font-weight:700;text-decoration:none;font-size:15px;margin-bottom:24px">
            Book Your Consultation →
          </a>
          ${resumeFile && resumeFile.size > 0 ? '<p style="color:#475569">Your resume is attached to this email for your records.</p>' : ''}
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0"/>
          <p style="color:#94a3b8;font-size:13px">
            Questions? Reply to this email or contact us at
            <a href="mailto:myhireroads@gmail.com" style="color:#0866E8">myhireroads@gmail.com</a>.
          </p>
          <p style="color:#94a3b8;font-size:12px;margin-top:8px">My Hire Roads · Strategic Career Services in Florida</p>
        </div>`,
      attachments, // client also gets their resume back
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 },
    );
  }
}
