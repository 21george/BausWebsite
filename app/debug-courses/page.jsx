"use client";
import React, { useState, useEffect } from "react";

export default function DebugCourseSystem() {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const runTest = async (testName, url, method = 'GET', body = null) => {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        }
      };
      
      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      const contentType = response.headers.get('content-type');
      
      let result;
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        result = { error: 'Non-JSON response', content: await response.text() };
      }

      setTestResults(prev => ({
        ...prev,
        [testName]: {
          success: response.ok,
          status: response.status,
          result,
          timestamp: new Date().toISOString()
        }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [testName]: {
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        }
      }));
    }
  };

  const runAllTests = async () => {
    setLoading(true);
    setTestResults({});

    // Test 1: Basic API
    await runTest('basic-api', '/api/test-course-api');

    // Test 2: Courses endpoint (if database is set up)
    await runTest('get-courses', '/api/test-course-api', 'POST');

    // Test 3: Create checkout (will fail without proper data, but should return JSON error)
    await runTest('create-checkout', '/api/create-course-checkout', 'POST', {
      courseId: 'test-id',
      customerName: 'Test User',
      customerEmail: 'test@example.com'
    });

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          🔧 Course System Debug
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <button
            onClick={runAllTests}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? 'Running Tests...' : '🚀 Run System Tests'}
          </button>
        </div>

        {Object.keys(testResults).length > 0 && (
          <div className="space-y-4">
            {Object.entries(testResults).map(([testName, result]) => (
              <div
                key={testName}
                className={`bg-white rounded-lg shadow p-6 border-l-4 ${
                  result.success ? 'border-green-500' : 'border-red-500'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {result.success ? '✅' : '❌'} {testName}
                  </h3>
                  <span className={`px-3 py-1 rounded text-sm ${
                    result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {result.status || 'ERROR'}
                  </span>
                </div>

                <div className="bg-gray-100 rounded p-4 mb-3">
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(result.result || result.error, null, 2)}
                  </pre>
                </div>

                <p className="text-xs text-gray-500">
                  {result.timestamp}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Environment Check */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">📋 Environment Checklist</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span>Database tables created in Supabase</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span>Stripe keys configured in environment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span>SMTP email settings configured</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span>Supabase storage bucket created</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">📝 Next Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-700">
            <li>Run the SQL schema files in Supabase</li>
            <li>Configure environment variables</li>
            <li>Set up Stripe webhook endpoint</li>
            <li>Create course-files storage bucket</li>
            <li>Add sample course data</li>
            <li>Test the full purchase flow</li>
          </ol>
        </div>
      </div>
    </div>
  );
}