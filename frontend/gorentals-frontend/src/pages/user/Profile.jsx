import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import Spinner from '../../components/Spinner';

export default function Profile() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [docs, setDocs] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosClient.get('/api/users/me');
        setMe(res.data);
        setName(res.data.name || '');
      } catch (e) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const loadDocs = async () => {
      try {
        const res = await axiosClient.get('/api/users/me/documents');
        setDocs(res.data);
      } catch {
        // ignore for now
      }
    };
    loadDocs();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await axiosClient.put('/api/users/me', { name });
      setMe(res.data);
      setMessage('Profile updated');
    } catch (e) {
      setMessage('Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axiosClient.post('/api/users/me/documents', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      const res = await axiosClient.get('/api/users/me/documents');
      setDocs(res.data);
      setMessage('Document uploaded');
    } catch {
      setMessage('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>;
  if (!me) return null;

  return (
    <div className="container py-4" style={{ maxWidth: 640 }}>
      <h3>Profile</h3>
      <form onSubmit={handleSave} className="card p-3 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" value={me.email} readOnly />
        </div>
        <button disabled={saving} className="btn btn-primary" type="submit">
          {saving ? 'Saving...' : 'Save'}
        </button>
        {message && <div className="mt-3 alert alert-info">{message}</div>}
      </form>

      <div className="card p-3 shadow-sm mt-4">
        <h5>Documents</h5>
        <input type="file" className="form-control mb-2" onChange={handleUpload} disabled={uploading} />
        <ul className="list-group">
          {docs.map((d) => (
            <li key={d.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{d.fileName || d.url || 'Document'}</span>
              {d.url && (
                <a className="btn btn-sm btn-outline-secondary" href={d.url} target="_blank" rel="noreferrer">View</a>
              )}
            </li>
          ))}
          {!docs.length && <li className="list-group-item">No documents uploaded</li>}
        </ul>
      </div>
    </div>
  );
}

