import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import Spinner from '../../components/Spinner';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosClient.get('/api/admin/dashboard');
        setData(res.data);
      } catch (e) {
        setError('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>;
  if (!data) return null;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Admin Dashboard</h3>
        <div className="muted">Overview</div>
      </div>
      <div className="row g-3">
        {Object.entries(data).map(([key, val]) => (
          <div className="col-6 col-md-3" key={key}>
            <div className="elevated-card text-center p-3">
              <div className="muted text-uppercase small">{key.replace(/_/g, ' ')}</div>
              <div className="display-6 fw-bold">{val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

