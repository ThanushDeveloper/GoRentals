import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container py-5 container-narrow">
      <div className="elevated-card p-4 p-md-5 mb-4 auth-hero" style={{ overflow: 'hidden', position: 'relative' }}>
        <div className="container-fluid py-2 py-md-3">
          <h1 className="display-6 display-md-5 fw-bold">
            <span className="brand-gradient">Find your perfect ride</span>
          </h1>
          <p className="col-md-9 fs-5 muted">Premium vehicles, seamless booking, and flexible options. Luxury you can drive today.</p>

          <div className="search-hero p-2 p-md-3 mt-3">
            <div className="row g-2 align-items-center">
              <div className="col-12 col-md-4">
                <input className="form-control" placeholder="Pick-up location" />
              </div>
              <div className="col-6 col-md-3">
                <input type="date" className="form-control" />
              </div>
              <div className="col-6 col-md-3">
                <input type="date" className="form-control" />
              </div>
              <div className="col-12 col-md-2 d-grid">
                <Link className="btn btn-brand" to="/vehicles">Search</Link>
              </div>
            </div>
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