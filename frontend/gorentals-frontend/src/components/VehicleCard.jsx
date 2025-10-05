import React from 'react';
import { Link } from 'react-router-dom';

export default function VehicleCard({ vehicle }) {
  return (
    <div className="elevated-card vehicle-card h-100">
      {vehicle.imageUrls?.length ? (
        <img
          src={vehicle.imageUrls[0]}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="vehicle-image w-100"
        />
      ) : (
        <div className="bg-light" style={{ height: 180 }} />
      )}
      <div className="p-3 d-flex flex-column gap-1">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="mb-0">{vehicle.make} {vehicle.model}</h5>
          <span className="fw-bold">${vehicle.pricePerDay} / day</span>
        </div>
        <div className="muted small">{vehicle.type} • {vehicle.transmission} • {vehicle.seats} seats</div>
        <div className="mt-2 d-flex gap-2">
          <Link to={`/vehicles/${vehicle.id}`} className="btn btn-brand btn-sm flex-grow-1">Rent Now</Link>
          <Link to={`/vehicles/${vehicle.id}`} className="btn btn-outline-secondary btn-sm">Details</Link>
        </div>
      </div>
    </div>
  );
}
