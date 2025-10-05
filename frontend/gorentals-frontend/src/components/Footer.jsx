import React from 'react';

export default function Footer() {
  return (
    <footer className="app-footer mt-auto py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <span className="fw-semibold">GoRental</span>
          <span className="muted">© {new Date().getFullYear()}</span>
        </div>
        <div className="d-flex gap-3 muted">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Support</span>
        </div>
      </div>
    </footer>
  );
}
