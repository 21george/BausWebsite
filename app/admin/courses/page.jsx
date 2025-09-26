"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CourseAdmin() {
  const [courses, setCourses] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load courses
      const coursesResult = await getOnlineCourses();
      if (coursesResult.success) {
        setCourses(coursesResult.data);
      }

      // Load recent purchases (you'd need to create this API)
      // const purchasesResult = await getRecentPurchases();
      // if (purchasesResult.success) {
      //   setPurchases(purchasesResult.data);
      // }
    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            📊 Kurs-Administration
          </h1>
          <p className="text-gray-600">Verwalten Sie Ihre Online-Kurse und Verkäufe</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'courses', name: 'Kurse', icon: '📚' },
                { id: 'purchases', name: 'Verkäufe', icon: '💰' },
                { id: 'analytics', name: 'Analytics', icon: '📈' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-yellow-900 text-yellow-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon} {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'courses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Verfügbare Kurse</h2>
                  <button className="bg-yellow-900 hover:bg-yellow-800 text-white px-4 py-2 rounded-lg font-medium">
                    ➕ Neuen Kurs hinzufügen
                  </button>
                </div>

                <div className="space-y-4">
                  {courses.map((course) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-lg p-6"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 mb-3">{course.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              €{course.price}
                            </span>
                            {course.duration_hours && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {course.duration_hours}h
                              </span>
                            )}
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                              {course.course_files?.length || 0} Dateien
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              course.is_active 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {course.is_active ? 'Aktiv' : 'Inaktiv'}
                            </span>
                          </div>

                          {course.course_files?.length > 0 && (
                            <div className="mb-3">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Dateien:</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {course.course_files.map((file, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <span>{file.file_type === 'video' ? '🎥' : '📄'}</span>
                                    <span>{file.file_name}</span>
                                    {file.file_size_mb && (
                                      <span className="text-gray-400">({file.file_size_mb} MB)</span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 ml-4">
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                            ✏️ Bearbeiten
                          </button>
                          <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm">
                            📁 Dateien
                          </button>
                          <button className={`px-3 py-1 rounded text-sm ${
                            course.is_active 
                              ? 'bg-red-500 hover:bg-red-600 text-white' 
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}>
                            {course.is_active ? '❌ Deaktivieren' : '✅ Aktivieren'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'purchases' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Aktuelle Verkäufe</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-yellow-700">
                    📊 Verkaufs-Dashboard wird geladen...
                    <br />
                    <small className="text-yellow-600">
                      Hier würden Sie alle Käufe, Download-Status und Zahlungen sehen.
                    </small>
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Analytics & Statistiken</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">📚 Aktive Kurse</h3>
                    <div className="text-3xl font-bold text-blue-600">
                      {courses.filter(c => c.is_active).length}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">💰 Gesamt-Umsatz</h3>
                    <div className="text-3xl font-bold text-green-600">€0.00</div>
                    <small className="text-green-600">Heute</small>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">🛒 Verkäufe</h3>
                    <div className="text-3xl font-bold text-purple-600">0</div>
                    <small className="text-purple-600">Diese Woche</small>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">⚡ System-Status</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Stripe Zahlungen: Aktiv</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>E-Mail Service: Aktiv</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>File Storage: Aktiv</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Download Links: Aktiv</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Import the required functions
import { getOnlineCourses } from "../actions/onlinecourses/CourseActions";