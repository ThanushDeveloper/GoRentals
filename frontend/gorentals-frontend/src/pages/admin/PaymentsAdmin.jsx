import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import Spinner from '../../components/Spinner';

export default function PaymentsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.get('/api/admin/payments');
      setItems(res.data);
    } catch (e) {
      setError('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await axiosClient.put(`/api/admin/payments/${id}/status`, null, { params: { status } });
      await load();
    } catch (e) {
      alert('Failed to update');
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>;

  return (
    <div className="container py-4">
      <h3>Payments</h3>
      <div className="elevated-card p-3 table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Booking</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.booking?.id}</td>
                <td>${p.amount}</td>
                <td>{p.method}</td>
                <td>{p.status}</td>
                <td>
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-success" onClick={() => updateStatus(p.id, 'APPROVED')}>Approve</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => updateStatus(p.id, 'REJECTED')}>Reject</button>
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

