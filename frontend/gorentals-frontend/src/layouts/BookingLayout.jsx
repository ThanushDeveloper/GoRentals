import React from 'react';
import BookingNavbar from '../components/BookingNavbar';
import BookingFooter from '../components/BookingFooter';
import '../styles/booking.css';

export default function BookingLayout({ children }) {
  return (
    <div className="bk">
      <BookingNavbar />
      {children}
      <BookingFooter />
    </div>
  );
}
