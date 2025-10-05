import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

export default function Payments() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const bookingId = params.get('bookingId');
  const amount = params.get('amount');
  const [method, setMethod] = useState('CARD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axiosClient.post('/api/payments', null, { params: { bookingId, amount, method } });
      setSuccess('Payment successful');
      setTimeout(() => navigate('/bookings'), 1200);
    } catch (e) {
      setError(e.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (!bookingId) return <div className="container py-4">Missing booking.</div>;

  return (
    <div className="container py-4">
      <h3>Payment</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handlePay} className="elevated-card p-3" style={{ maxWidth: 480 }}>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input className="form-control" value={amount} readOnly />
        </div>
        <div className="mb-3">
          <label className="form-label">Method</label>
          <select className="form-select" value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="CARD">Card</option>
            <option value="UPI">UPI</option>
            <option value="CASH">Cash</option>
          </select>
        </div>
        <button disabled={loading} className="btn btn-brand" type="submit">
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </div>
  );
}