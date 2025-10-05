import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import Spinner from '../../components/Spinner';

export default function ManageBookings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const res = await axiosClient.get('/api/admin/bookings');
      setItems(res.data || []);
    } catch (e) {
      setError('Failed to load bookings');
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await axiosClient.put(`/api/admin/bookings/${id}/status`, null, { params: { status } });
      setItems((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    } catch { alert('Failed to update status'); }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Manage Bookings</h3>
        <button className="btn btn-outline-secondary" onClick={load}>Refresh</button>
      </div>
      <div className="elevated-card p-3 table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Vehicle</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.user?.name || b.user?.email}</td>
                <td>{b.vehicle?.make} {b.vehicle?.model}</td>
                <td>{b.startDate}</td>
                <td>{b.endDate}</td>
                <td><span className="badge bg-secondary">{b.status}</span></td>
                <td>₹ {Number(b.totalAmount).toLocaleString('en-IN')}</td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-primary" onClick={() => updateStatus(b.id, 'BOOKED')}>Confirm</button>
                    <button className="btn btn-outline-warning" onClick={() => updateStatus(b.id, 'BIKE_TAKEN')}>Bike Taken</button>
                    <button className="btn btn-outline-success" onClick={() => updateStatus(b.id, 'RETURNED')}>Returned</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!items.length && <div className="alert alert-info">No bookings found.</div>}
      </div>
    </div>
  );
}