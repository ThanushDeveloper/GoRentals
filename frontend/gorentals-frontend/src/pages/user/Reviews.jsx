import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import Spinner from '../../components/Spinner';

export default function Reviews() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosClient.get('/api/bookings/me');
        const reviews = res.data
          .filter((b) => b.feedback)
          .map((b) => ({ id: b.id, vehicle: `${b.vehicle?.make} ${b.vehicle?.model}`, feedback: b.feedback }));
        setItems(reviews);
      } catch (e) {
        setError('Failed to load reviews');
      } finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>;

  return (
    <div className="container py-4">
      <h3>My Reviews</h3>
      <ul className="list-group elevated-card p-0">
        {items.map((r) => (
          <li key={r.id} className="list-group-item bg-transparent">
            <strong>{r.vehicle}:</strong> {r.feedback}
          </li>
        ))}
        {!items.length && <li className="list-group-item bg-transparent">No reviews yet.</li>}
      </ul>
    </div>
  );
}