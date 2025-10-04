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
      <h3>Admin Dashboard</h3>
      <div className="row g-3">
        {Object.entries(data).map(([key, val]) => (
          <div className="col-md-3" key={key}>
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-capitalize">{key}</h5>
                <p className="display-6 fw-bold">{val}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
