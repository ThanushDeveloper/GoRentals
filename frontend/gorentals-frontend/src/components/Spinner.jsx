import React from 'react';

export default function Spinner({ className = '' }) {
  return (
    <div className={`d-flex justify-content-center align-items-center ${className}`} style={{ minHeight: '120px' }}>
      <div className="loader-dots" aria-label="Loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}