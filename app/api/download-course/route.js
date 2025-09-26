import { NextResponse } from "next/server";
import { getPurchaseByToken, incrementDownloadCount, logDownload } from "../../actions/onlinecourses/CourseActions";
import { createClient } from "../../../utils/superbase/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');
        const fileId = searchParams.get('file');

        if (!token) {
            return NextResponse.json(
                { error: "Download token is required" },
                { status: 400 }
            );
        }

        // Verify purchase and get course details
        const purchaseResult = await getPurchaseByToken(token);
        if (!purchaseResult.success) {
            return NextResponse.json(
                { error: "Invalid or expired download token" },
                { status: 404 }
            );
        }

        const purchase = purchaseResult.data;

        // Check download limits
        if (purchase.download_count >= purchase.max_downloads) {
            return NextResponse.json(
                { error: "Download limit exceeded" },
                { status: 403 }
            );
        }

        // Check if specific file requested or return download page
        if (fileId) {
            return await handleFileDownload(purchase, fileId, request);
        } else {
            return await generateDownloadPage(purchase, token);
        }

    } catch (error) {
        console.error("Error in download handler:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

async function handleFileDownload(purchase, fileId, request) {
    try {
        // Find the specific file
        const file = purchase.online_courses.course_files.find(f => f.id === fileId);
        if (!file) {
            return NextResponse.json(
                { error: "File not found" },
                { status: 404 }
            );
        }

        // Create Supabase client and get signed URL
        const supabase = await createClient();
        const { data, error } = await supabase.storage
            .from('course-files')
            .createSignedUrl(file.storage_path, 3600); // 1 hour expiry

        if (error) {
            console.error("Error creating signed URL:", error);
            return NextResponse.json(
                { error: "Failed to generate download link" },
                { status: 500 }
            );
        }

        // Log the download
        await logDownload({
            purchase_id: purchase.id,
            file_id: fileId,
            download_ip: request.headers.get('x-forwarded-for') || 
                         request.headers.get('x-real-ip') || 
                         'unknown',
            user_agent: request.headers.get('user-agent') || 'unknown'
        });

        // Increment download count (only once per session/purchase, not per file)
        await incrementDownloadCount(purchase.id);

        // Redirect to the signed URL
        return NextResponse.redirect(data.signedUrl);

    } catch (error) {
        console.error("Error handling file download:", error);
        return NextResponse.json(
            { error: "Download failed" },
            { status: 500 }
        );
    }
}

async function generateDownloadPage(purchase, token) {
    const course = purchase.online_courses;
    const files = course.course_files || [];
    
    const downloadPageHtml = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Download: ${course.title}</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
            .file-icon { font-size: 1.5rem; }
            .download-btn:hover { transform: translateY(-2px); transition: all 0.2s ease; }
        </style>
    </head>
    <body class="bg-gray-50 min-h-screen">
        <div class="container mx-auto px-4 py-8 max-w-4xl">
            <!-- Header -->
            <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div class="text-center">
                    <h1 class="text-3xl font-bold text-gray-800 mb-4">🎓 ${course.title}</h1>
                    <p class="text-gray-600 mb-4">${course.description || ''}</p>
                    <div class="bg-green-100 text-green-800 p-4 rounded-lg">
                        ✅ Zahlung erfolgreich! Ihre Kursmaterialien sind bereit zum Download.
                    </div>
                </div>
            </div>

            <!-- Download Info -->
            <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 class="text-xl font-semibold mb-4">📋 Download-Informationen</h2>
                <div class="grid md:grid-cols-3 gap-4 text-sm">
                    <div class="bg-blue-50 p-3 rounded">
                        <strong>⏰ Gültig bis:</strong><br>
                        ${new Date(purchase.download_expires_at).toLocaleDateString('de-DE')}
                    </div>
                    <div class="bg-yellow-50 p-3 rounded">
                        <strong>📥 Downloads verbleibt:</strong><br>
                        ${purchase.max_downloads - purchase.download_count} von ${purchase.max_downloads}
                    </div>
                    <div class="bg-green-50 p-3 rounded">
                        <strong>👤 Käufer:</strong><br>
                        ${purchase.customer_name}
                    </div>
                </div>
            </div>

            <!-- Course Files -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-xl font-semibold mb-6">📚 Kursmaterialien</h2>
                
                ${files.length === 0 ? 
                    '<p class="text-gray-500 text-center py-8">Keine Dateien verfügbar</p>' :
                    files.map(file => `
                        <div class="border rounded-lg p-4 mb-4 hover:bg-gray-50 transition-colors">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-4">
                                    <div class="file-icon">
                                        ${file.file_type === 'video' ? '🎥' : 
                                          file.file_type === 'pdf' ? '📄' : '📎'}
                                    </div>
                                    <div>
                                        <h3 class="font-medium text-gray-800">${file.file_name}</h3>
                                        <p class="text-sm text-gray-500">
                                            ${file.file_type.toUpperCase()} 
                                            ${file.file_size_mb ? `• ${file.file_size_mb} MB` : ''}
                                        </p>
                                    </div>
                                </div>
                                <a href="/api/download-course?token=${token}&file=${file.id}" 
                                   class="download-btn bg-yellow-900 hover:bg-yellow-800 text-white px-6 py-2 rounded-lg font-medium inline-flex items-center space-x-2">
                                    <span>📥</span>
                                    <span>Herunterladen</span>
                                </a>
                            </div>
                        </div>
                    `).join('')
                }
                
                ${files.length > 1 ? `
                    <div class="mt-6 p-4 bg-gray-100 rounded-lg text-center">
                        <button onclick="downloadAll()" 
                                class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium inline-flex items-center space-x-2">
                            <span>📦</span>
                            <span>Alle Dateien herunterladen</span>
                        </button>
                        <p class="text-sm text-gray-600 mt-2">Lädt alle Dateien nacheinander herunter</p>
                    </div>
                ` : ''}
            </div>

            <!-- Important Notes -->
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-8">
                <h3 class="font-semibold text-yellow-800 mb-2">⚠️ Wichtige Hinweise:</h3>
                <ul class="text-yellow-700 text-sm space-y-1 list-disc list-inside">
                    <li>Diese Download-Links sind nur für Sie bestimmt und dürfen nicht geteilt werden</li>
                    <li>Die Links sind nur bis zum angegebenen Datum gültig</li>
                    <li>Speichern Sie die Dateien lokal auf Ihrem Gerät</li>
                    <li>Bei technischen Problemen kontaktieren Sie unseren Support</li>
                </ul>
            </div>

            <!-- Footer -->
            <div class="text-center mt-8 text-gray-500 text-sm">
                <p>© 2024 Baus Physiotherapie & Heilkunde • Alle Rechte vorbehalten</p>
                <p class="mt-2">
                    <a href="mailto:support@baus-praxis.de" class="text-blue-600 hover:underline">
                        📧 Support kontaktieren
                    </a>
                </p>
            </div>
        </div>

        <script>
            function downloadAll() {
                const files = ${JSON.stringify(files)};
                const token = "${token}";
                
                if (files.length === 0) return;
                
                // Download files with delay to prevent browser blocking
                files.forEach((file, index) => {
                    setTimeout(() => {
                        const link = document.createElement('a');
                        link.href = \`/api/download-course?token=\${token}&file=\${file.id}\`;
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }, index * 1000); // 1 second delay between downloads
                });
                
                // Show success message
                setTimeout(() => {
                    alert('Alle Downloads wurden gestartet! Bitte überprüfen Sie Ihren Download-Ordner.');
                }, files.length * 1000 + 1000);
            }
        </script>
    </body>
    </html>
    `;

    return new NextResponse(downloadPageHtml, {
        headers: { 'Content-Type': 'text/html' },
    });
}