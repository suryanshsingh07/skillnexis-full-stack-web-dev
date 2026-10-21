import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5006/api';

export const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);

  const fileInputRef = useRef(null);

  // Fetch existing uploaded images on mount
  const loadGallery = async () => {
    try {
      const res = await axios.get(`${API_BASE}/uploads`);
      setGallery(res.data.images || []);
    } catch (err) {
      console.error('Failed to load gallery:', err.message);
    } finally {
      setLoadingGallery(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  // Cleanup object URL when previewUrl changes or component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const validateAndSetFile = (file) => {
    setErrorMessage(null);
    setStatusMessage(null);

    if (!file) return;

    // Validate MIME type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Invalid file format. Only JPEG, PNG, and WebP images are permitted.');
      return;
    }

    // Validate file size: 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage('File size exceeds 5MB limit. Please select a smaller image.');
      return;
    }

    // Revoke previous URL if any
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const newUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(newUrl);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) validateAndSetFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) validateAndSetFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select an image first.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setErrorMessage(null);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await axios.post(`${API_BASE}/uploads/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });

      setStatusMessage({
        type: 'success',
        text: 'Image uploaded successfully!',
        data: res.data.file
      });

      // Clear preview
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      // Reload gallery
      loadGallery();
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (filename) => {
    if (!window.confirm('Delete this uploaded image?')) return;
    try {
      await axios.delete(`${API_BASE}/uploads/${filename}`);
      setGallery(gallery.filter(img => img.filename !== filename));
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete image.');
    }
  };

  const handleCancelSelection = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          padding: '0.4rem 1rem',
          borderRadius: '9999px',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          color: '#a5b4fc',
          fontSize: '0.8rem',
          fontWeight: 600,
          marginBottom: '0.75rem'
        }}>
          SkillNexis Week 3 — Assignment 2
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#f9fafb', letterSpacing: '-0.02em' }}>
          Multer Image Upload Feature
        </h1>
        <p style={{ color: '#9ca3af', maxWidth: '580px', margin: '0.5rem auto 0' }}>
          Real-time preview with URL.createObjectURL(), client/server type & size validation, upload progress, and static serving.
        </p>
      </div>

      {/* Upload Card */}
      <div className="card" style={{ marginBottom: '2.5rem' }}>
        {errorMessage && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5',
            padding: '0.85rem 1rem',
            borderRadius: '8px',
            marginBottom: '1.25rem',
            fontSize: '0.9rem'
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: '0.4rem' }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {errorMessage}
          </div>
        )}

        {statusMessage && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#6ee7b7',
            padding: '0.85rem 1rem',
            borderRadius: '8px',
            marginBottom: '1.25rem',
            fontSize: '0.9rem'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'text-bottom', marginRight: '0.4rem' }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {statusMessage.text}
            <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.35rem' }}>
              File URL: <a href={statusMessage.data.url} target="_blank" rel="noreferrer" style={{ color: '#818cf8', wordBreak: 'break-all' }}>{statusMessage.data.url}</a>
            </div>
          </div>
        )}

        {!previewUrl ? (
          <div
            className="dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f9fafb' }}>
              Click to browse or drag & drop an image
            </h3>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.4rem' }}>
              Supported formats: JPEG, PNG, WebP (Max 5MB)
            </p>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{
                width: '180px',
                height: '180px',
                borderRadius: '10px',
                overflow: 'hidden',
                background: '#1f2937',
                border: '1px solid var(--border-color)',
                flexShrink: 0
              }}>
                <img
                  src={previewUrl}
                  alt="Selected preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: 1, minWidth: '220px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f9fafb', wordBreak: 'break-all' }}>
                  {selectedFile.name}
                </h3>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', fontSize: '0.85rem', color: '#9ca3af' }}>
                  <span>Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                  <span>•</span>
                  <span>Type: {selectedFile.type}</span>
                </div>

                {uploading && (
                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.35rem' }}>
                      <span>Uploading to Express backend...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#374151', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${uploadProgress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #6366f1, #10b981)',
                        transition: 'width 0.2s ease'
                      }} />
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="btn-primary"
                  >
                    {uploading ? `Uploading (${uploadProgress}%)...` : 'Upload Image'}
                  </button>
                  <button
                    onClick={handleCancelSelection}
                    disabled={uploading}
                    className="btn-secondary"
                  >
                    Change Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Gallery Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f9fafb' }}>
            Uploaded Images Gallery ({gallery.length})
          </h2>
          <button onClick={loadGallery} className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 21h5v-5" />
            </svg>
            Refresh
          </button>
        </div>

        {loadingGallery ? (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: '#9ca3af' }}>Loading gallery...</div>
        ) : gallery.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', color: '#9ca3af' }}>
            No images uploaded yet. Select an image above to test Multer file storage.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}>
            {gallery.map((img) => (
              <div key={img.filename} className="card" style={{ padding: '0.75rem', overflow: 'hidden' }}>
                <div style={{ height: '160px', borderRadius: '8px', overflow: 'hidden', background: '#111827', marginBottom: '0.75rem' }}>
                  <img
                    src={img.url}
                    alt={img.filename}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Load+Error';
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.65rem' }}>
                  <div style={{ fontWeight: 600, color: '#f9fafb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {img.filename}
                  </div>
                  <div>{(img.size / 1024).toFixed(1)} KB</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a
                    href={img.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    style={{ flex: 1, textAlign: 'center', padding: '0.35rem 0.5rem', fontSize: '0.75rem', textDecoration: 'none' }}
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDeleteImage(img.filename)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.75rem',
                      borderRadius: '6px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer style={{
        textAlign: 'center',
        padding: '3rem 0 1rem',
        fontSize: '0.8rem',
        color: '#6b7280',
        borderTop: '1px solid var(--border-color)',
        marginTop: '3rem'
      }}>
        SkillNexis Full Stack Web Development Internship — Week 3 | Suryansh Singh
      </footer>
    </div>
  );
};

export default App;
