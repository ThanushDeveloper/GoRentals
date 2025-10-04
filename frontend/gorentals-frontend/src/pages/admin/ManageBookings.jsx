import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import Spinner from '../../components/Spinner';

// Placeholder admin booking management; adjust if dedicated admin endpoints exist
export default function ManageBookings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try {
        // If backend has /api/admin/bookings, switch to that.
        const res = await axiosClient.get('/api/admin/dashboard');
        // No direct list from dashboard; show empty/placeholder
        setItems([]);
      } catch (e) {
        setError('Failed to load bookings');
      } finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>;

  return (
    <div className="container py-4">
      <h3>Manage Bookings</h3>
      <p>Pending backend list API. Replace with proper endpoint when available.</p>
      {!items.length && <div className="alert alert-info">No data to display.</div>}
    </div>
  );
}
