import React from 'react';
import '../styles/klook.css';

export default function KlookFooter() {
  return (
    <footer className="klook klook-footer">
      <div className="klook-footer-inner">
        <div className="klook-footer-columns">
          <div className="klook-footer-col">
            <div className="klook-footer-title">Support</div>
            <ul>
              <li><a href="#">Coronavirus (COVID-19) FAQs</a></li>
              <li><a href="#">Manage your trips</a></li>
              <li><a href="#">Contact Customer Service</a></li>
              <li><a href="#">Safety resource centre</a></li>
            </ul>
          </div>
          <div className="klook-footer-col">
            <div className="klook-footer-title">Discover</div>
            <ul>
              <li><a href="#">Genius loyalty programme</a></li>
              <li><a href="#">Seasonal and holiday deals</a></li>
              <li><a href="#">Travel articles</a></li>
              <li><a href="#">Booking.com for Business</a></li>
              <li><a href="#">Traveller Review Awards</a></li>
              <li><a href="#">Car hire</a></li>
              <li><a href="#">Flight finder</a></li>
              <li><a href="#">Restaurant reservations</a></li>
              <li><a href="#">Booking.com for Travel Agents</a></li>
            </ul>
          </div>
          <div className="klook-footer-col">
            <div className="klook-footer-title">Terms and settings</div>
            <ul>
              <li><a href="#">Privacy & cookies</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Accessibility Statement</a></li>
              <li><a href="#">Grievance officer</a></li>
              <li><a href="#">Modern Slavery Statement</a></li>
              <li><a href="#">Human Rights Statement</a></li>
            </ul>
          </div>
          <div className="klook-footer-col">
            <div className="klook-footer-title">Partners</div>
            <ul>
              <li><a href="#">Extranet login</a></li>
              <li><a href="#">Partner help</a></li>
              <li><a href="#">List your property</a></li>
              <li><a href="#">Become an affiliate</a></li>
            </ul>
          </div>
          <div className="klook-footer-col">
            <div className="klook-footer-title">About</div>
            <ul>
              <li><a href="#">About Booking.com</a></li>
              <li><a href="#">How we work</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Press centre</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Investor relations</a></li>
              <li><a href="#">Corporate contact</a></li>
              <li><a href="#">Content guidelines and reporting</a></li>
            </ul>
          </div>
        </div>

        <div className="klook-footer-currency">
          <span className="flag">🇮🇳</span>
          <span>INR</span>
        </div>

        <div className="klook-footer-disclaimer">
          Booking.com is part of Booking Holdings Inc., the world leader in online travel and related services.
        </div>
        <div className="klook-footer-logos">
          <span className="logo-text">Booking.com</span>
          <span className="logo-text">priceline</span>
          <span className="logo-text">KAYAK</span>
          <span className="logo-text">agoda</span>
          <span className="logo-text">OpenTable</span>
        </div>
        <div className="klook-footer-copy">Copyright © 1996–2025 Booking.com™. All rights reserved.</div>
      </div>
    </footer>
  );
}
