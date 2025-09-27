
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getOnlineCourses } from "../actions/onlinecourses/GetCourses";
import { HeroSection } from "../components/HeroComponent/HeroSection";
import ServiceImage from "../../asset/images/IMG_2949.jpg";

export default function OnlineKurse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [purchaseForm, setPurchaseForm] = useState({
    customerName: '',
    customerEmail: ''
  });
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const result = await getOnlineCourses();
      if (result && result.success) {
        setCourses(result.data || []);
      } else {
        setError(result?.error || "Fehler beim Laden der Kurse");
      }
    } catch (err) {
      console.error('Error loading courses:', err);
      setError("Fehler beim Laden der Kurse: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleFormChange = (e) => {
    setPurchaseForm({
      ...purchaseForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    
    if (!selectedCourse || !purchaseForm.customerName || !purchaseForm.customerEmail) {
      alert("Bitte füllen Sie alle Felder aus");
      return;
    }
    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/create-course-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: selectedCourse.id,
          customerName: purchaseForm.customerName,
          customerEmail: purchaseForm.customerEmail
        })
      });

      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }

      const result = await response.json();
      
      if (result.success) {
        // Redirect to Stripe checkout
        window.location.href = result.url;
      } else {
        alert("Fehler bei der Checkout-Erstellung: " + (result.error || 'Unbekannter Fehler'));
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Ein Fehler ist aufgetreten: " + error.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Kurse werden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        backgroundImage={ServiceImage.src}
        title="Online Kurse"
        subtitle="Lernen Sie flexibel von zu Hause aus"
        titleStyles="text-4xl md:text-5xl lg:text-6xl font-bold"
        subtitleStyles="text-lg md:text-xl"
        containerStyles="mb-8"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {error ? (
          <div className="text-center py-16">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Fehler beim Laden</h2>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={loadCourses}
              className="mt-4 bg-yellow-900 hover:bg-yellow-800 text-white px-6 py-3 rounded-lg font-medium"
            >
              Erneut versuchen
            </button>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Keine Kurse verfügbar</h2>
            <p className="text-gray-600">Derzeit sind keine Online-Kurse verfügbar. Schauen Sie bald wieder vorbei!</p>
          </div>
        ) : (
          <>
            {/* Intro Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Unsere Online-Kurse
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Entdecken Sie unser Angebot an hochwertigen Online-Kursen. Nach dem Kauf erhalten Sie 
                sofort Zugang zu allen Kursmaterialien per E-Mail.
              </p>
            </div>

            {/* Courses Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Course Image */}
                  {course.thumbnail_url && (
                    <div className="h-48 bg-gradient-to-br from-yellow-900 to-yellow-700 flex items-center justify-center">
                      <img 
                        src={course.thumbnail_url} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* Course Info */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {course.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.duration_hours && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            ⏱️ {course.duration_hours}h
                          </span>
                        )}
                        {course.level && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            📈 {course.level}
                          </span>
                        )}
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                          📁 {course.course_files?.length || 0} Dateien
                        </span>
                      </div>
                    </div>

                    {/* Files Preview */}
                    {course.course_files?.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">📋 Enthaltene Dateien:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {course.course_files.slice(0, 3).map((file, fileIndex) => (
                            <li key={fileIndex} className="flex items-center gap-2">
                              <span>{file.file_type === 'video' ? '🎥' : '📄'}</span>
                              <span className="truncate">{file.file_name}</span>
                            </li>
                          ))}
                          {course.course_files.length > 3 && (
                            <li className="text-gray-500">... und {course.course_files.length - 3} weitere</li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Price and Buy Button */}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-yellow-900">
                        €{course.price.toFixed(2)}
                      </div>
                      <button
                        onClick={() => handlePurchaseClick(course)}
                        className="bg-yellow-900 hover:bg-yellow-800 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        🛒 Kaufen
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Info Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                ❓ Wie funktioniert's?
              </h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: "🛒", title: "Kurs wählen", desc: "Wählen Sie Ihren gewünschten Kurs aus" },
                  { icon: "💳", title: "Sicher bezahlen", desc: "Bezahlen Sie sicher mit Stripe" },
                  { icon: "📧", title: "E-Mail erhalten", desc: "Sie erhalten sofort Download-Links" },
                  { icon: "📚", title: "Sofort lernen", desc: "Alle Dateien stehen zum Download bereit" }
                ].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl mb-3">{step.icon}</div>
                    <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">💡 Wichtige Informationen:</h3>
                <ul className="text-yellow-700 text-sm space-y-1 list-disc list-inside">
                  <li>Sofortiger Zugang nach erfolgreicher Zahlung</li>
                  <li>Download-Links sind 7 Tage gültig</li>
                  <li>Bis zu 5 Downloads pro Kurs</li>
                  <li>Hochauflösende Videos und PDFs</li>
                  <li>Lebenslanger Zugang zu heruntergeladenen Inhalten</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Purchase Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🛒 Kurs kaufen
            </h2>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">{selectedCourse.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{selectedCourse.description}</p>
              <div className="text-xl font-bold text-yellow-900">€{selectedCourse.price.toFixed(2)}</div>
            </div>

            <form onSubmit={handlePurchase} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={purchaseForm.customerName}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-900 focus:outline-none"
                  placeholder="Ihr vollständiger Name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-Mail *
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={purchaseForm.customerEmail}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-900 focus:outline-none"
                  placeholder="ihre.email@example.com"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Die Download-Links werden an diese E-Mail-Adresse gesendet
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium"
                  disabled={isCheckingOut}
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-yellow-900 hover:bg-yellow-800 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Lädt..." : "💳 Zur Zahlung"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
