'use client';

import { useState } from 'react';
import { useCourseData } from '../../../hooks/useCourseData';

export default function CourseDataAdmin() {
  const { 
    courseData, 
    loading, 
    error, 
    updating, 
    updateCourseData, 
    getCourseDataHistory,
    restoreCourseDataVersion 
  } = useCourseData({ realtime: true });

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Initialize edit data when entering edit mode
  const handleEditMode = () => {
    if (!editMode && courseData) {
      setEditData(JSON.parse(JSON.stringify(courseData)));
    }
    setEditMode(!editMode);
  };

  // Save changes
  const handleSave = async () => {
    if (!editData) return;

    const success = await updateCourseData(editData);
    if (success) {
      setEditMode(false);
      setEditData(null);
    }
  };

  // Cancel changes
  const handleCancel = () => {
    setEditMode(false);
    setEditData(null);
  };

  // Load and show history
  const handleShowHistory = async () => {
    if (!showHistory) {
      try {
        const historyData = await getCourseDataHistory();
        setHistory(historyData);
      } catch (err) {
        console.error('Failed to load history:', err);
      }
    }
    setShowHistory(!showHistory);
  };

  // Restore version
  const handleRestoreVersion = async (versionId) => {
    const success = await restoreCourseDataVersion(versionId);
    if (success) {
      setShowHistory(false);
      setHistory([]);
    }
  };

  // Update specific field in edit data
  const updateField = (path, value) => {
    if (!editData) return;

    const pathArray = path.split('.');
    const updatedData = { ...editData };
    let current = updatedData;

    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) {
        current[pathArray[i]] = {};
      }
      current = current[pathArray[i]];
    }

    current[pathArray[pathArray.length - 1]] = value;
    setEditData(updatedData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-950 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Error Loading Course Data</h2>
          <p>{error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const displayData = editMode ? editData : courseData;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Course Data Management</h1>
            <div className="flex gap-2">
              <button
                onClick={handleShowHistory}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                {showHistory ? 'Hide' : 'Show'} History
              </button>
              {!editMode ? (
                <button
                  onClick={handleEditMode}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={updating}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {updating ? 'Saving...' : 'Save'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History Section */}
        {showHistory && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Version History</h2>
            {history.length === 0 ? (
              <p className="text-gray-600">No history available</p>
            ) : (
              <div className="space-y-2">
                {history.map((version) => (
                  <div key={version.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">Version {version.version}</span>
                      <span className="text-gray-600 ml-2">
                        {new Date(version.created_at).toLocaleString()}
                      </span>
                      {version.is_active && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          Active
                        </span>
                      )}
                    </div>
                    {!version.is_active && (
                      <button
                        onClick={() => handleRestoreVersion(version.id)}
                        disabled={updating}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                      >
                        Restore
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                {editMode ? (
                  <input
                    type="text"
                    value={displayData?.hero?.title || ''}
                    onChange={(e) => updateField('hero.title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">{displayData?.hero?.title}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                {editMode ? (
                  <input
                    type="text"
                    value={displayData?.hero?.image || ''}
                    onChange={(e) => updateField('hero.image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">{displayData?.hero?.image}</p>
                )}
              </div>
            </div>
          </div>

          {/* Main Course */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Main Course</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                {editMode ? (
                  <input
                    type="text"
                    value={displayData?.mainCourse?.title || ''}
                    onChange={(e) => updateField('mainCourse.title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">{displayData?.mainCourse?.title}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                {editMode ? (
                  <textarea
                    value={displayData?.mainCourse?.description || ''}
                    onChange={(e) => updateField('mainCourse.description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">{displayData?.mainCourse?.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Course Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Course Info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                {editMode ? (
                  <input
                    type="text"
                    value={displayData?.courseInfo?.startDate || ''}
                    onChange={(e) => updateField('courseInfo.startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">{displayData?.courseInfo?.startDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Week</label>
                {editMode ? (
                  <input
                    type="text"
                    value={displayData?.courseInfo?.consultationWeek || ''}
                    onChange={(e) => updateField('courseInfo.consultationWeek', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">{displayData?.courseInfo?.consultationWeek}</p>
                )}
              </div>
            </div>
          </div>

          {/* Yoga Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Yoga</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                {editMode ? (
                  <input
                    type="text"
                    value={displayData?.yoga?.title || ''}
                    onChange={(e) => updateField('yoga.title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">{displayData?.yoga?.title}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pricing Title</label>
                {editMode ? (
                  <input
                    type="text"
                    value={displayData?.yoga?.pricingTitle || ''}
                    onChange={(e) => updateField('yoga.pricingTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">{displayData?.yoga?.pricingTitle}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* JSON Preview */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Data Preview</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
            {JSON.stringify(displayData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}