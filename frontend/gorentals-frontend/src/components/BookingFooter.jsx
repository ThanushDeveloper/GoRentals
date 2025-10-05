import React from 'react';
import '../styles/booking.css';

export default function BookingFooter() {
  return (
    <div className="bk">
      <footer className="bk-footer">
        <div className="inner">
          <div className="bk-footer-grid">
            <div>
              <h4>Support</h4>
              <a href="#">Customer Service</a>
              <a href="#">Safety resource centre</a>
              <a href="#">Coronavirus (COVID-19) FAQs</a>
            </div>
            <div>
              <h4>Discover</h4>
              <a href="#">Seasonal and holiday deals</a>
              <a href="#">Car hire</a>
              <a href="#">Flight finder</a>
            </div>
            <div>
              <h4>Terms</h4>
              <a href="#">Privacy & cookies</a>
              <a href="#">Terms of Service</a>
              <a href="#">Accessibility</a>
            </div>
            <div>
              <h4>About</h4>
              <a href="#">About GoRentals</a>
              <a href="#">How we work</a>
              <a href="#">Careers</a>
            </div>
          </div>
          <div className="bk-foot-bottom">
            <span>INR</span>
            <span>© {new Date().getFullYear()} GoRentals</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
