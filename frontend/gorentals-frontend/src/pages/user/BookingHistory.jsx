import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import Spinner from '../../components/Spinner';

export default function BookingHistory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosClient.get('/api/bookings/me');
        setItems(res.data);
      } catch (e) {
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cancelBooking = async (id) => {
    try {
      await axiosClient.post(`/api/bookings/${id}/cancel`);
      setItems((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'CANCELLED' } : b)));
    } catch { alert('Cancel failed'); }
  };

  const extendBooking = async (id) => {
    const newEndDate = prompt('Enter new end date (YYYY-MM-DD)');
    if (!newEndDate) return;
    try {
      const res = await axiosClient.post(`/api/bookings/${id}/extend`, null, { params: { newEndDate } });
      setItems((prev) => prev.map((b) => (b.id === id ? res.data : b)));
    } catch { alert('Extend failed'); }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>;

  return (
    <div className="container py-4">
      <h3>My Bookings</h3>
      <div className="elevated-card p-3 table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{b.vehicle?.make} {b.vehicle?.model}</td>
                <td>{b.startDate}</td>
                <td>{b.endDate}</td>
                <td>{b.status}</td>
                <td>${b.totalAmount}</td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-danger" onClick={() => cancelBooking(b.id)} disabled={b.status === 'CANCELLED'}>Cancel</button>
                    <button className="btn btn-outline-primary" onClick={() => extendBooking(b.id)}>Extend</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


