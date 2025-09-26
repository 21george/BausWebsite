import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const envVars = {
      SMTP_HOST: process.env.SMTP_HOST ? 'Set' : 'Missing',
      SMTP_PORT: process.env.SMTP_PORT || 'Not set (will default to 587)',
      SMTP_USER: process.env.SMTP_USER ? 'Set' : 'Missing',
      SMTP_PASS: process.env.SMTP_PASS ? 'Set' : 'Missing',
      EMAIL_FROM: process.env.EMAIL_FROM || 'Not set (will use SMTP_USER)',
      EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || 'Not set (will use default)',
      EMAIL_TO: process.env.EMAIL_TO ? 'Set' : 'Missing',
    };

    return NextResponse.json({
      success: true,
      message: 'Environment variables check',
      variables: envVars,
      notes: {
        required: ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'EMAIL_TO'],
        optional: ['SMTP_PORT', 'EMAIL_FROM', 'EMAIL_FROM_NAME'],
        recommendations: [
          'Make sure SMTP_HOST is correct (e.g., smtp.gmail.com, smtp.outlook.com)',
          'SMTP_PORT should be 587 for STARTTLS or 465 for SSL',
          'SMTP_USER should be your email address',
          'SMTP_PASS should be your email password or app-specific password',
          'EMAIL_TO should be where you want to receive the course registration emails'
        ]
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}