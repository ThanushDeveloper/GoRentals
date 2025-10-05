import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import BookingLayout from '../../layouts/BookingLayout';
import BookingVehicleCard from '../../components/BookingVehicleCard';
import '../../styles/booking.css';

export default function BookingHome() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosClient.get('/api/vehicles');
        setVehicles(res.data || []);
      } catch (e) {
        setError('Failed to load vehicles');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <BookingLayout>
      <main className="bk">
        <div className="bk-page">
          <div className="bk-title-row">
            <div className="bk-title">Most booked vehicles this month</div>
            <a className="bk-seeall" href="#">See all</a>
          </div>

          {error && <div style={{marginTop:12, color:'#b91c1c', background:'#fee2e2', border:'1px solid #fecaca', padding:'8px 12px', borderRadius:10}}>{error}</div>}

          <div style={{marginTop: 16}} className="bk-grid">
            {loading && Array.from({length:8}).map((_,i)=> (
              <div key={i} className="bk-card" style={{height: 260, background:'#f3f4f6'}} />
            ))}
            {!loading && vehicles.map((v) => (
              <BookingVehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </main>
    </BookingLayout>
  );
}
