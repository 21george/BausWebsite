"use client";
import React, { useState, useEffect } from 'react';
import { getImpressumContent, updateImpressumContent } from '../../actions/Impressunm/GetImpressum';

export default function ImpressumAdmin() {
  const [impressumData, setImpressumData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadImpressumData();
  }, []);

  const loadImpressumData = async () => {
    try {
      setLoading(true);
      const result = await getImpressumContent();
      if (result.success) {
        setImpressumData(result.data);
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load impressum data' });
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (sectionKey) => {
    const section = impressumData[sectionKey];
    setEditingSection(sectionKey);
    setFormData({
      title: section?.title || '',
      content: section?.content || ''
    });
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setFormData({});
  };

  const saveSection = async () => {
    if (!editingSection) return;

    try {
      setSaving(true);
      const result = await updateImpressumContent(editingSection, {
        title: formData.title,
        content: formData.content
      });

      if (result.success) {
        setMessage({ type: 'success', text: 'Section updated successfully!' });
        await loadImpressumData();
        setEditingSection(null);
        setFormData({});
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update section' });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading impressum data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Impressum Management</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage the content of your impressum/legal page
            </p>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`px-6 py-4 border-l-4 ${
              message.type === 'success' 
                ? 'bg-green-50 border-green-400 text-green-700' 
                : 'bg-red-50 border-red-400 text-red-700'
            }`}>
              <p>{message.text}</p>
            </div>
          )}

          <div className="px-6 py-4">
            <div className="space-y-6">
              {Object.entries(impressumData).map(([sectionKey, section]) => (
                <div key={sectionKey} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900 capitalize">
                      {sectionKey.replace('_', ' ')}
                    </h3>
                    {editingSection === sectionKey ? (
                      <div className="space-x-2">
                        <button
                          onClick={saveSection}
                          disabled={saving}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                        >
                          {saving ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          onClick={cancelEditing}
                          disabled={saving}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(sectionKey)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Edit
                      </button>
                    )}
                  </div>

                  {editingSection === sectionKey ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Content
                        </label>
                        <textarea
                          value={formData.content}
                          onChange={(e) => handleInputChange('content', e.target.value)}
                          rows={8}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter content (use double line breaks for paragraphs)"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Title:</span>
                        <p className="text-sm text-gray-900">{section.title}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Content:</span>
                        <div className="text-sm text-gray-900 whitespace-pre-wrap max-h-32 overflow-y-auto">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <button
                onClick={loadImpressumData}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}