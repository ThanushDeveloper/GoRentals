import React from 'react';

export default function Spinner({ className = '' }) {
  return (
    <div className={`d-flex justify-content-center align-items-center ${className}`} style={{ minHeight: '120px' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
