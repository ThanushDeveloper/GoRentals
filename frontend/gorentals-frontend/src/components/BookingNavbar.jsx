import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/booking.css';

export default function BookingNavbar() {
  return (
    <div className="bk">
      <nav className="bk-navbar">
        <div className="inner">
          <Link to="/" className="bk-brand" aria-label="GoRentals">GoRentals</Link>
          <div className="bk-navspace" />
          <NavLink to="/" className="bk-nav-link">Home</NavLink>
          <NavLink to="/vehicles" className="bk-nav-link">Vehicles</NavLink>
          <NavLink to="/login" className="bk-nav-link">Login</NavLink>
          <Link to="/register" className="bk-cta">Sign up</Link>
        </div>
      </nav>
    </div>
  );
}
