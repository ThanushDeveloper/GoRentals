import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container py-5">
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Welcome to GoRental</h1>
          <p className="col-md-8 fs-4">Find and book your perfect ride from our wide range of vehicles.</p>
          <Link className="btn btn-primary btn-lg" to="/vehicles">Browse Vehicles</Link>
        </div>
      </div>
    </div>
  );
}

