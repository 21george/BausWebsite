import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const formData = await req.json();

    // Validate required fields
    if (!formData.email || !formData.vorname || !formData.nachname) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields (email, vorname, nachname)' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.EMAIL_TO) {
      console.error('Missing required environment variables for email');
      console.error('Required: SMTP_HOST, SMTP_USER, SMTP_PASS, EMAIL_TO');
      console.error('Current values:');
      console.error('SMTP_HOST:', process.env.SMTP_HOST ? 'Set' : 'Missing');
      console.error('SMTP_USER:', process.env.SMTP_USER ? 'Set' : 'Missing');
      console.error('SMTP_PASS:', process.env.SMTP_PASS ? 'Set' : 'Missing');
      console.error('EMAIL_TO:', process.env.EMAIL_TO ? 'Set' : 'Missing');
      return NextResponse.json(
        { success: false, error: 'Email service not configured properly' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465',
      to:process.env.EMAIL_TO,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Skip verification and try sending directly - verification can be unreliable

    try {
      // Email to admin
      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME || 'Kursanmeldung'}" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `Neue Kursanmeldung von ${formData.vorname} ${formData.nachname}`,
        text: `
          Vorname: ${formData.vorname}
          Nachname: ${formData.nachname}
          Email: ${formData.email}
          Telefon: ${formData.telefon || 'Nicht angegeben'}
          Geburtsdatum: ${formData.geburtsdatum || 'Nicht angegeben'}
          Adresse: ${formData.adresse || 'Nicht angegeben'}
          PLZ: ${formData.plz || 'Nicht angegeben'}
          Stadt: ${formData.stadt || 'Nicht angegeben'}
          Gewählter Kurs: ${formData.kurs || 'Nicht angegeben'}
          Nachricht: ${formData.nachricht || 'Keine Nachricht'}
        `,
        html: `
          <h1>Neue Kursanmeldung</h1>
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p><strong>Vorname:</strong> ${formData.vorname}</p>
            <p><strong>Nachname:</strong> ${formData.nachname}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Telefon:</strong> ${formData.telefon || 'Nicht angegeben'}</p>
            <p><strong>Geburtsdatum:</strong> ${formData.geburtsdatum || 'Nicht angegeben'}</p>
            <p><strong>Adresse:</strong> ${formData.adresse || 'Nicht angegeben'}</p>
            <p><strong>PLZ:</strong> ${formData.plz || 'Nicht angegeben'}</p>
            <p><strong>Stadt:</strong> ${formData.stadt || 'Nicht angegeben'}</p>
            <p><strong>Gewählter Kurs:</strong> ${formData.kurs || 'Nicht angegeben'}</p>
            <p><strong>Nachricht:</strong> ${formData.nachricht || 'Keine Nachricht'}</p>
          </div>
        `,
      });

      // Confirmation email to user
      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME || 'Kursanmeldung'}" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
        to: formData.email,
        subject: 'Bestätigung Ihrer Kursanmeldung',
        text: `Liebe/r ${formData.vorname} ${formData.nachname},\n\nvielen Dank für Ihre Anmeldung zum Kurs "${formData.kurs || 'nicht spezifiziert'}". Wir werden uns in Kürze bei Ihnen melden.\n\nMit freundlichen Grüßen,\n${process.env.EMAIL_FROM_NAME || 'Das Team'}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h1>Bestätigung Ihrer Kursanmeldung</h1>
            <p>Liebe/r ${formData.vorname} ${formData.nachname},</p>
            <p>vielen Dank für Ihre Anmeldung zum Kurs <strong>"${formData.kurs || 'nicht spezifiziert'}"</strong>.</p>
            <p>Wir haben Ihre Anmeldung erhalten und werden uns in Kürze bei Ihnen melden, um weitere Details zu besprechen.</p>
            <p>Mit freundlichen Grüßen,<br/>${process.env.EMAIL_FROM_NAME || 'Das Team'}</p>
          </div>
        `,
      });

      return NextResponse.json({ success: true });
      
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      console.error('Error details:', {
        code: emailError.code,
        command: emailError.command,
        response: emailError.response,
        responseCode: emailError.responseCode
      });
      
      return NextResponse.json(
        { success: false, error: `Email sending failed: ${emailError.message}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}