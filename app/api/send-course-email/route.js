import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getCourseById } from "../../../utils/courseDatabase";

export async function POST(request) {
    try {
        const { purchaseId, customerEmail, customerName, downloadToken, courseId } = await request.json();

        if (!purchaseId || !customerEmail || !downloadToken || !courseId) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Get course details
        const courseResult = await getCourseById(courseId);
        if (!courseResult.success) {
            return NextResponse.json(
                { success: false, error: 'Course not found' },
                { status: 404 }
            );
        }

        const course = courseResult.data;
        const downloadUrl = `${process.env.NEXT_PUBLIC_URL}/download-course?token=${downloadToken}`;

        // Create transporter
        const transporter = nodemailer.createTransporter({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_PORT === '465',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content
        const emailHtml = `
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ihr Online-Kurs ist bereit zum Download</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #8B4513; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background-color: #f9f9f9; }
                .download-section { background-color: white; padding: 20px; margin: 20px 0; border-left: 4px solid #8B4513; }
                .button { 
                    display: inline-block; 
                    background-color: #8B4513; 
                    color: white; 
                    padding: 12px 24px; 
                    text-decoration: none; 
                    border-radius: 5px;
                    margin: 10px 0;
                }
                .files-list { margin: 15px 0; }
                .file-item { 
                    padding: 8px 12px; 
                    margin: 5px 0; 
                    background-color: #f0f0f0; 
                    border-radius: 3px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
                .warning { color: #d32f2f; font-weight: bold; margin: 15px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 Vielen Dank für Ihren Kauf!</h1>
                </div>
                
                <div class="content">
                    <h2>Hallo ${customerName},</h2>
                    
                    <p>Vielen Dank für den Kauf von <strong>"${course.title}"</strong>. Ihr Kurs ist jetzt zum Download bereit!</p>
                    
                    <div class="download-section">
                        <h3>📚 Kurs-Details:</h3>
                        <p><strong>Titel:</strong> ${course.title}</p>
                        <p><strong>Beschreibung:</strong> ${course.description || 'Keine Beschreibung verfügbar'}</p>
                        ${course.duration_hours ? `<p><strong>Dauer:</strong> ${course.duration_hours} Stunden</p>` : ''}
                        ${course.level ? `<p><strong>Level:</strong> ${course.level}</p>` : ''}
                        
                        <h3>📥 Download-Informationen:</h3>
                        <div class="files-list">
                            ${course.course_files.map(file => `
                                <div class="file-item">
                                    <span>📄 ${file.file_name}</span>
                                    <span>${file.file_size_mb ? file.file_size_mb + ' MB' : ''} (${file.file_type.toUpperCase()})</span>
                                </div>
                            `).join('')}
                        </div>
                        
                        <p class="warning">⚠️ Wichtige Hinweise:</p>
                        <ul>
                            <li>Diese Download-Links sind 7 Tage gültig</li>
                            <li>Sie können die Dateien maximal 5 Mal herunterladen</li>
                            <li>Die Links sind nur für Sie bestimmt und sollten nicht geteilt werden</li>
                        </ul>
                        
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="${downloadUrl}" class="button">🔽 Kurs jetzt herunterladen</a>
                        </div>
                        
                        <p style="font-size: 12px; color: #666;">
                            Alternativ können Sie diesen Link in Ihren Browser kopieren:<br>
                            <code>${downloadUrl}</code>
                        </p>
                    </div>
                    
                    <p>Bei Fragen oder Problemen wenden Sie sich gerne an uns.</p>
                    
                    <p>Viel Erfolg mit Ihrem neuen Kurs!</p>
                    
                    <p>Mit freundlichen Grüßen,<br>
                    Ihr Baus-Team</p>
                </div>
                
                <div class="footer">
                    <p>Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese E-Mail.</p>
                    <p>© 2024 Baus Physiotherapie & Heilkunde</p>
                </div>
            </div>
        </body>
        </html>
        `;

        const emailText = `
        Vielen Dank für Ihren Kauf!
        
        Hallo ${customerName},
        
        Vielen Dank für den Kauf von "${course.title}". Ihr Kurs ist jetzt zum Download bereit!
        
        Download-Link: ${downloadUrl}
        
        Wichtige Hinweise:
        - Diese Download-Links sind 7 Tage gültig
        - Sie können die Dateien maximal 5 Mal herunterladen
        - Die Links sind nur für Sie bestimmt und sollten nicht geteilt werden
        
        Dateien in diesem Kurs:
        ${course.course_files.map(file => `- ${file.file_name} (${file.file_type.toUpperCase()})`).join('\n')}
        
        Bei Fragen oder Problemen wenden Sie sich gerne an uns.
        
        Mit freundlichen Grüßen,
        Ihr Baus-Team
        `;

        // Send email
        await transporter.sendMail({
            from: `"Baus Online-Kurse" <${process.env.SMTP_USER}>`,
            to: customerEmail,
            subject: `🎉 Ihr Online-Kurs "${course.title}" ist bereit zum Download`,
            text: emailText,
            html: emailHtml,
        });

        return NextResponse.json({
            success: true,
            message: 'Download email sent successfully'
        });

    } catch (error) {
        console.error("Error sending course email:", error);
        return NextResponse.json(
            { success: false, error: 'Failed to send email' },
            { status: 500 }
        );
    }
}