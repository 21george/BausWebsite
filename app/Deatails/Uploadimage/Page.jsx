"use client";
import { useState } from "react";
import { uploadWorkImage } from "../../../app/actions/worldetails/uploadImage";

export function ImageUploadForm({ workId }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !workId) return;

    setUploading(true);
    setError(null);
    setSuccess(false);

    const result = await uploadWorkImage(file, file.name, workId);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
    }

    setUploading(false);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-4">Upload Work Image</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />
        <button
          type="submit"
          disabled={uploading || !file}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
      
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {success && (
        <p className="mt-2 text-green-500">
          Image uploaded successfully!
        </p>
      )}
    </div>
  );
}