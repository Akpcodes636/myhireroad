import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';


export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
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

    // ── Notify via Web3Forms ─────────────────────────────────────────
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (accessKey) {
      const submittedAt = new Date().toLocaleString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
      });

      const row = (label: string, value: string) => `
        <tr>
          <td style="padding:10px 16px;background:#f8faff;border-bottom:1px solid #e2ecff;width:36%;font-size:13px;font-weight:600;color:#374151;white-space:nowrap;vertical-align:top;">
            ${label}
          </td>
          <td style="padding:10px 16px;border-bottom:1px solid #e2ecff;font-size:14px;color:#1e3a6e;vertical-align:top;">
            ${value}
          </td>
        </tr>`;

      const htmlMessage = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f0f4fb;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4fb;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0866E8;border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
            <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">My Hire Roads</p>
            <p style="margin:6px 0 0;font-size:13px;color:#bfdbfe;letter-spacing:0.4px;text-transform:uppercase;">New Consultation Request</p>
          </td>
        </tr>

        <!-- Alert banner -->
        <tr>
          <td style="background:#1d4ed8;padding:12px 32px;text-align:center;">
            <p style="margin:0;font-size:13px;color:#dbeafe;">
              Submitted on <strong style="color:#ffffff;">${submittedAt}</strong>
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:28px 32px 8px;">
            <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6;">
              A new prospect has completed the career intake form. Their details are below.
              You can reply directly to this email to reach them.
            </p>
          </td>
        </tr>

        <!-- Contact Info -->
        <tr>
          <td style="background:#ffffff;padding:0 32px 20px;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#6b7280;letter-spacing:0.8px;text-transform:uppercase;">Contact Information</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2ecff;border-radius:8px;overflow:hidden;">
              ${row('Full Name', name)}
              ${row('Email Address', `<a href="mailto:${email}" style="color:#0866E8;text-decoration:none;">${email}</a>`)}
              ${row('Phone Number', phone)}
              ${row('Country', country)}
            </table>
          </td>
        </tr>

        <!-- Career Profile -->
        <tr>
          <td style="background:#ffffff;padding:0 32px 20px;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#6b7280;letter-spacing:0.8px;text-transform:uppercase;">Career Profile</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2ecff;border-radius:8px;overflow:hidden;">
              ${row('Target / Current Role', targetRole)}
              ${row('Career Stage', careerStage)}
              ${row('Services Requested', services)}
              ${row('Investment Readiness', investmentReady)}
              ${row('Resume Attached', resumePath ? '&#10003; Uploaded' : 'Not provided')}
            </table>
          </td>
        </tr>

        <!-- Career Challenge -->
        <tr>
          <td style="background:#ffffff;padding:0 32px 20px;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#6b7280;letter-spacing:0.8px;text-transform:uppercase;">Biggest Career Challenge</p>
            <div style="border:1px solid #e2ecff;border-radius:8px;padding:14px 16px;font-size:14px;color:#1e3a6e;line-height:1.7;white-space:pre-wrap;">
              ${challenge.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
            </div>
          </td>
        </tr>

        ${additionalInfo ? `
        <!-- Additional Info -->
        <tr>
          <td style="background:#ffffff;padding:0 32px 20px;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#6b7280;letter-spacing:0.8px;text-transform:uppercase;">Additional Information</p>
            <div style="border:1px solid #e2ecff;border-radius:8px;padding:14px 16px;font-size:14px;color:#1e3a6e;line-height:1.7;white-space:pre-wrap;">
              ${additionalInfo.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
            </div>
          </td>
        </tr>` : ''}

        <!-- CTA -->
        <tr>
          <td style="background:#ffffff;padding:8px 32px 28px;text-align:center;">
            <a href="mailto:${email}"
               style="display:inline-block;background:#0866E8;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:8px;">
              Reply to ${name.split(' ')[0]}
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8faff;border-top:1px solid #e2ecff;border-radius:0 0 12px 12px;padding:16px 32px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              This notification was sent automatically from the My Hire Roads intake form.
            </p>
            <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">
              &copy; ${new Date().getFullYear()} My Hire Roads &mdash; All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            subject:    `New Consultation Request — ${name}`,
            from_name:  'My Hire Roads',
            replyto:    email,
            message:    htmlMessage,
            botcheck:   false,
          }),
        });
      } catch (emailErr) {
        // Log but don't fail the submission if the email fails
        console.error('Web3Forms notification error:', emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 },
    );
  }
}
