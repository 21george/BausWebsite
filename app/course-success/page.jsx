"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CourseSuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);
    const [sessionData, setSessionData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (sessionId) {
            verifyPayment();
        } else {
            setError("Keine Sitzungs-ID gefunden");
            setLoading(false);
        }
    }, [sessionId]);

    const verifyPayment = async () => {
        try {
            const response = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sessionId })
            });

            // Check if the response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned non-JSON response');
            }

            const result = await response.json();
            
            if (result.success) {
                setSessionData(result.data);
            } else {
                setError(result.error || "Zahlung konnte nicht verifiziert werden");
            }
        } catch (err) {
            console.error('Payment verification error:', err);
            setError("Fehler bei der Zahlungsverifikation: " + err.message);
        } finally {
            setLoading(false);
        }
    };    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Zahlung wird verifiziert...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <motion.div  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center" >
                    <div className="text-red-500 text-6xl mb-4">❌</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Fehler</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link href="/OnlineKurse" className="bg-yellow-900 hover:bg-yellow-800 text-white px-6 py-3 rounded-lg font-medium inline-block">
                        Zurück zu den Kursen
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                    {/* Success Header */}
                    <div className="bg-green-500 text-white p-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="text-6xl mb-4"
                        >
                            🎉
                        </motion.div>
                        <h1 className="text-3xl font-bold mb-2">Zahlung erfolgreich!</h1>
                        <p className="text-green-100">Ihr Kurs wurde erfolgreich gekauft</p>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {sessionData && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    📚 {sessionData.course_title || 'Ihr Kurs'}
                                </h2>
                                
                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-gray-700 mb-2">💰 Zahlungsdetails</h3>
                                        <p><strong>Betrag:</strong> €{sessionData.amount_total / 100}</p>
                                        <p><strong>Währung:</strong> {sessionData.currency?.toUpperCase()}</p>
                                        <p><strong>Status:</strong> <span className="text-green-600">Bezahlt</span></p>
                                    </div>
                                    
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-gray-700 mb-2">📧 Kunden-Info</h3>
                                        <p><strong>E-Mail:</strong> {sessionData.customer_email}</p>
                                        <p><strong>Name:</strong> {sessionData.customer_name || 'Nicht angegeben'}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* What happens next */}
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                            <h3 className="font-semibold text-blue-800 mb-3">📬 Was passiert als nächstes?</h3>
                            <ul className="text-blue-700 space-y-2 list-disc list-inside">
                                <li>Sie erhalten in wenigen Minuten eine E-Mail mit den Download-Links</li>
                                <li>Die Download-Links sind 7 Tage gültig</li>
                                <li>Sie können jeden Kurs bis zu 5 Mal herunterladen</li>
                                <li>Alle Dateien werden in hochauflösender Qualität bereitgestellt</li>
                            </ul>
                        </div>

                        {/* Support Info */}
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                            <h3 className="font-semibold text-yellow-800 mb-3">💡 Brauchen Sie Hilfe?</h3>
                            <p className="text-yellow-700 mb-3">
                                Falls Sie keine E-Mail erhalten oder technische Probleme haben:
                            </p>
                            <div className="space-y-2 text-yellow-700">
                                <p>📧 E-Mail: <a href="mailto:support@baus-praxis.de" className="text-blue-600 hover:underline">support@baus-praxis.de</a></p>
                                <p>📞 Telefon: <a href="tel:+4912345678" className="text-blue-600 hover:underline">+49 123 456 78</a></p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                href="/OnlineKurse"
                                className="bg-yellow-900 hover:bg-yellow-800 text-white px-8 py-3 rounded-lg font-medium text-center transition-colors"
                            >
                                🔙 Weitere Kurse entdecken
                            </Link>
                            
                            <Link 
                                href="/"
                                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium text-center transition-colors"
                            >
                                🏠 Zur Startseite
                            </Link>
                        </div>

                        {/* Order Details */}
                        {sessionData && (
                            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                                <p>Bestellnummer: {sessionData.payment_intent}</p>
                                <p>Datum: {new Date().toLocaleDateString('de-DE')}</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}