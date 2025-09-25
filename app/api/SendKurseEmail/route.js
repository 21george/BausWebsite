import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const formData = await req.json();

    // Validate required fields
    if (!formData.email || !formData.fullname || !formData.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
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

    // Email to admin
   const Info = await transporter.sendMail({
      //from: `"Website Contact" <${process.env.EMAIL_FROM}>`,//
      to: process.env.EMAIL_TO,
      subject: `New Contact from ${formData.vorname}, ${formData.nachname}`,
      text: `
        Name: ${formData.vorname} ${formData.nachname}
        Email: ${formData.email}
        Phone: ${formData.telefon}
        Date of Birth: ${formData.geburtsdatum}
        Message: ${formData.message}
      `,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${formData.vorname}</p>
        <p><strong>Name:</strong> ${formData.nachname}</p>
        <p><strong>Name:</strong> ${formData.adresse}</p>
        <p><strong>Name:</strong> ${formData.geburtsdatum}</p>
        <p><strong>Name:</strong> ${formData.plz}</p>
        <p><strong>Name:</strong> ${formData.stadt}</p>
        <p><strong>Name:</strong> ${formData.kurs}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.telefon}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: formData.email,
      subject: 'Thank you for contacting us',
      text: `Dear ${formData.vorname} ${formData.nachname},\n\nThank you for your message. We'll contact you soon.\n\nBest regards,\n${process.env.EMAIL_FROM_NAME}`,
      html: `
        <div>
          <h1>Thank you for contacting us</h1>
          <p>Dear ${formData.vorname} ${formData.nachname},</p>
          <p>Thank you for choosing our kurse. We'll contact you soon.</p>
          <p>Best regards,<br/>${process.env.EMAIL_FROM_NAME}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}