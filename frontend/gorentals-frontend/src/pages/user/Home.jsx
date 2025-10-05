import React from 'react';
import KlookHeader from '../../components/KlookHeader';
import '../../styles/klook.css';
import homeimg1 from "../../assets/homeimg1.webp";
import homeimg2 from "../../assets/homeimg2.webp";
import homeimg3 from "../../assets/homeimg3.webp";
import homeimg4 from "../../assets/homeimg4.webp";
import homeimg5 from "../../assets/homeimg5.webp";

export default function Home() {
  return (
    <div className="klook">
      <KlookHeader />

      {/* Breadcrumb */}
      <div className="klook-breadcrumb">
        <span>GoRentals</span>
        <span className="sep">›</span>
        <span>India</span>
        <span className="sep">›</span>
        <span>India</span>
        <span className="sep">›</span>
        <span>Vehicle Rentals</span>
        <span className="sep">›</span>
        <span>Adventure Rides</span>
        <span className="sep">›</span>
        <span>Bikes for Rent</span>
      </div>

      {/* Title + chips + meta */}
      <div className="klook-title-wrap">
        <div className="klook-title">Miami Beach Bike Rentals</div>
        {/* <div className="klook-chips">
          <span className="k-chip">English</span>
          <span className="k-chip">Meet at location</span>
          <span className="k-chip">2hr – 10hr Duration</span>
        </div> */}
        <div className="klook-meta-row">
          <div className="klook-meta-left">
            <span>📍 850 Washington Avenue Miami Beach, FL 33139</span>
          </div>
          {/* <a className="klook-save" href="#">♡ Save to wishlist</a> */}
        </div>
      </div>

      {/* Gallery + price */}
      <section className="klook-hero">
        <div className="klook-grid">
          <img className="klook-big-img" alt="Gallery" src={homeimg1} />
          <div className="klook-right-grid">
            <div className="klook-right-top">
              <img className="klook-thumb" alt="t1" src={homeimg2} />
              <img className="klook-thumb" alt="t2" src={homeimg3} />
            </div>
            <div className="klook-right-bottom">
              <img className="klook-thumb" alt="t3" src={homeimg4} />
              <img className="klook-thumb" alt="t4" src={homeimg5} />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights + price card */}
      <section className="klook-highlights">
        <div className="klook-bullets">
          <ul>
            <li><b>Comfortable Rides</b> – Smooth gear shifts and easy-to-use frames for everyone.</li>
            <li><b>Flexible & Fun</b> – Ride at your own pace, whenever you want.</li>
            <li><b>Capture the Moments</b> – Enjoy the ride and create memories along the way.</li>
            


          </ul>
          <a className="klook-see-more" href="#">See more →</a>
        </div>
        <aside className="klook-price-card">
          <div className="price">₹ 1,899</div>
          <button className="klook-btn-orange cta">Select options</button>
        </aside>
      </section>

      {/* Offers */}
      <div className="klook-offers">
        <div className="klook-offer-row">
          <div>Offers for you</div>
          <div className="k-chip">INR1,000 off</div>
        </div>
      </div>

      {/* Packages section */}
      <section className="klook-packages">
        <div className="klook-card">
          <div className="inner">
            <div className="k-seg" role="tablist" aria-label="Package type">
              <button className="seg">2-Hour Bike Rentals</button>
              <button className="seg dim">4-Hour Bike Rentals</button>
              <button className="seg dim">DayPass Bike Rentals</button>
            </div>
            <div className="k-spacer-12" />
            <div className="k-item-row">
              <div>
                <div>Adult Rental (13+) (Men)</div>
              </div>
              <div className="k-qty" aria-label="quantity">
                <button aria-label="decrease">−</button>
                <div>0</div>
                <button aria-label="increase">＋</button>
              </div>
            </div>
            <div className="k-spacer-8" />
            <div className="k-item-row">
              <div>
                <div>Adult Rental (13+) (Ladies)</div>
              </div>
              <div className="k-qty">
                <button aria-label="decrease">−</button>
                <div>0</div>
                <button aria-label="increase">＋</button>
              </div>
            </div>
            <div className="k-spacer-8" />
            <div className="k-item-row">
              <div>
                <div>Child Rental (1–12)</div>
              </div>
              <div className="k-qty">
                <button aria-label="decrease">−</button>
                <div>0</div>
                <button aria-label="increase">＋</button>
              </div>
            </div>
            <div className="k-price-total">₹ 1,899</div>
            <div className="k-actions-row">
              <button className="k-btn-plain k-rounded-10">Add to cart</button>
              <button className="klook-btn-orange k-rounded-10">Book now</button>
            </div>
          </div>
        </div>

        <aside className="klook-card k-aside">
          <div className="inner">
            <div className="title">Package details</div>
            <div className="k-chip-green" style={{ marginTop: 8 }}>Book now for today</div>
            <ul className="k-list">
              <li>✔️ Tax included</li>
              <li>✔️ Helmets provided</li>
              <li>✔️ Baskets / Bike Bags</li>
              <li>✔️ Locks included</li>
              <li>✔️ Illustrated Maps</li>
              <li>✖️ Hotel pick-up & drop-off</li>
              <li>✖️ Transport</li>
              <li>✖️ Insurance</li>
            </ul>
          </div>
        </aside>
      </section>

      {/* What to expect */}
      <section className="klook-expect">
        <div className="k-section-title">What to expect</div>
        <p className="k-expect-text">
          Experience the joy of biking with our premium Cannondale rentals. Designed for smooth gear shifts and available in both step-through and standard frames, our bikes make every ride comfortable and effortless. Rent your bike today and enjoy freedom, flexibility, and fun on every journey!
        </p>
      </section>
    </div>
  );
}
