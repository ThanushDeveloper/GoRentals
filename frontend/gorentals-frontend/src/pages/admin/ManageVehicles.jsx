import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

export default function ManageVehicles() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [q, setQ] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try {
        const res = await axiosClient.get('/api/vehicles');
        setItems(res.data);
      } catch (e) {
        setError('Failed to load vehicles');
      } finally { setLoading(false); }
    };
    load();
  }, []);

  const filtered = items.filter((v) => `${v.make} ${v.model}`.toLowerCase().includes(q.toLowerCase()));

  if (loading) return <Spinner />;
  if (error) return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Manage Vehicles</h3>
        <input className="form-control" style={{ maxWidth: 280 }} placeholder="Search vehicles" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="row g-3">
        {filtered.map((v) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={v.id}>
            <div className="elevated-card h-100 d-flex flex-column">
              {v.imageUrls?.length ? (
                <img src={v.imageUrls[0]} alt={`${v.make} ${v.model}`} className="w-100" style={{ height: 160, objectFit: 'cover' }} />
              ) : (
                <div className="bg-light" style={{ height: 160 }} />
              )}
              <div className="p-3 d-flex flex-column gap-1">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="fw-semibold">{v.make} {v.model}</div>
                    <div className="muted small">{v.type} • {v.transmission} • {v.seats} seats</div>
                  </div>
                  <div className="fw-bold">${v.pricePerDay}</div>
                </div>
                <div className="mt-2 d-flex gap-2">
                  <Link to={`/vehicles/${v.id}`} className="btn btn-outline-secondary btn-sm flex-grow-1">View</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {!filtered.length && (
          <div className="col-12">
            <div className="alert alert-info">No vehicles found.</div>
          </div>
        )}
      </div>
    </div>
  );
}
