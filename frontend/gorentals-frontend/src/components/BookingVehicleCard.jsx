import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/booking.css';

export default function BookingVehicleCard({ vehicle }) {
  const title = `${vehicle.make ?? ''} ${vehicle.model ?? ''}`.trim();
  const brand = vehicle.make ?? '';
  const price = vehicle.pricePerDay;
  const image = vehicle.imageUrls && vehicle.imageUrls.length > 0 ? vehicle.imageUrls[0] : 'https://images.unsplash.com/photo-1549921296-3b4a70b01f9a?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="bk-card">
      <img className="img" src={image} alt={title || 'Vehicle'} />
      <div className="body">
        <div className="bk-name">{title || 'Vehicle'}</div>
        <div className="bk-sub">Brand: {brand || '—'}</div>
        <div className="bk-price-row">
          <div className="bk-price">₹ {price}/day</div>
          <Link to={`/vehicles/${vehicle.id}`} className="bk-btn">Rent Now</Link>
        </div>
      </div>
    </div>
  );
}
