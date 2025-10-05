import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container py-5">
      <div className="elevated-card p-5 mb-4" style={{ overflow: 'hidden', position: 'relative' }}>
        <div className="position-absolute top-0 end-0 opacity-25" style={{ filter: 'blur(40px)', transform: 'translate(20%, -20%)' }}>
          <div style={{ width: 320, height: 320, background: 'radial-gradient(closest-side, var(--brand), transparent)' }} />
        </div>
        <div className="container-fluid py-3">
          <h1 className="display-5 fw-bold"><span className="brand-gradient">Rent smarter</span> with GoRental</h1>
          <p className="col-md-8 fs-5 muted">Premium cars, transparent pricing, and instant booking. Drive what you love, when you want.</p>
          <div className="d-flex gap-2 flex-wrap">
            <Link className="btn btn-brand btn-lg" to="/vehicles">Browse Vehicles</Link>
            <Link className="btn btn-outline-secondary btn-lg" to="/login">Sign in</Link>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="elevated-card p-3 h-100">
            <h5>Wide selection</h5>
            <div className="muted">Sedans, SUVs, and more — find the perfect match.</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="elevated-card p-3 h-100">
            <h5>Best prices</h5>
            <div className="muted">Competitive daily rates with no hidden fees.</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="elevated-card p-3 h-100">
            <h5>Instant booking</h5>
            <div className="muted">Reserve your ride in a few clicks.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

