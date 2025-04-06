import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const formData = await request.json();

    // Validate required fields
    if (!formData.email || !formData.fullname || !formData.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Email to admin
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact from ${formData.fullname}`,
      text: `
        Name: ${formData.fullname}
        Email: ${formData.email}
        Phone: ${formData.telefone}
        Date: ${formData.date}
        Message: ${formData.message}
      `,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${formData.fullname}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.telefone}</p>
        <p><strong>Date:</strong> ${formData.date}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: formData.email,
      subject: 'Thank you for contacting us',
      text: `Dear ${formData.fullname},\n\nThank you for your message. We'll contact you soon.\n\nBest regards,\n${process.env.EMAIL_FROM_NAME}`,
      html: `
        <div>
          <h1>Thank you for contacting us</h1>
          <p>Dear ${formData.fullname},</p>
          <p>Thank you for your message. We'll contact you soon.</p>
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