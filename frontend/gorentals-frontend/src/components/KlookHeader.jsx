import React from 'react';
import { Link } from 'react-router-dom';
import './KlookHeader.css';

export default function KlookHeader() {
  return (
    <header className="klook klook-header">
      <div className="bar">
        <Link to="/" className="brand" aria-label="GoRentals">
          <img className="klook-logo" alt="GoRentals" src="https://dummyimage.com/110x28/ff5a1f/ffffff&text=GoRentals" />
        </Link>
        <div className="klook-search" role="search">
          <img src="https://icons.getbootstrap.com/assets/icons/search.svg" alt="" width="16" height="16"/>
          <input placeholder="Search destinations or activities" />
        </div>
        <div className="nav-right">
          {/* <Link to="#" className="muted">INR ▾</Link>
          <Link to="#" className="muted">Go to app</Link>
          <Link to="#" className="muted">Help</Link>
          <Link to="#" className="muted d-none d-md-inline">Recently viewed</Link> */}
          <Link to="/register" className="muted d-none d-md-inline">Sign up</Link>
          <Link to="/login" className="klook-btn-orange">Log in</Link>
        </div>
      </div>
    </header>
  );
}