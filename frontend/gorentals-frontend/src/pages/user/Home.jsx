import React from 'react';
import KlookHeader from '../../components/KlookHeader';
import '../../styles/klook.css';

export default function Home() {
  return (
    <div className="klook">
      <KlookHeader />

      {/* Breadcrumb */}
      <div className="klook-breadcrumb">
        <span>Klook Travel</span>
        <span className="sep">›</span>
        <span>United States</span>
        <span className="sep">›</span>
        <span>Miami</span>
        <span className="sep">›</span>
        <span>Tours & experiences</span>
        <span className="sep">›</span>
        <span>Outdoor & sports activities</span>
        <span className="sep">›</span>
        <span>Scooter rentals</span>
      </div>

      {/* Title + chips + meta */}
      <div className="klook-title-wrap">
        <div className="klook-title">Miami Beach Bike Rentals</div>
        <div className="klook-chips">
          <span className="k-chip">English</span>
          <span className="k-chip">Meet at location</span>
          <span className="k-chip">2hr – 10hr Duration</span>
        </div>
        <div className="klook-meta-row">
          <div className="klook-meta-left">
            <span>📍 850 Washington Avenue Miami Beach, FL 33139</span>
          </div>
          <a className="klook-save" href="#">♡ Save to wishlist</a>
        </div>
      </div>

      {/* Gallery + price */}
      <section className="klook-hero">
        <div className="klook-grid">
          <img className="klook-big-img" alt="Gallery" src="https://images.unsplash.com/photo-1519340333755-54d69ba1be2b?q=80&w=1600&auto=format&fit=crop" />
          <div className="klook-right-grid">
            <div className="klook-right-top">
              <img className="klook-thumb" alt="t1" src="https://images.unsplash.com/photo-1529429612779-c8e40ef2f36e?q=80&w=800&auto=format&fit=crop" />
              <img className="klook-thumb" alt="t2" src="https://images.unsplash.com/photo-1520975922171-8a8d1d4a19a8?q=80&w=800&auto=format&fit=crop" />
            </div>
            <div className="klook-right-bottom">
              <img className="klook-thumb" alt="t3" src="https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?q=80&w=800&auto=format&fit=crop" />
              <img className="klook-thumb" alt="t4" src="https://images.unsplash.com/photo-1516383607781-913a19294fd1?q=80&w=800&auto=format&fit=crop" />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights + price card */}
      <section className="klook-highlights">
        <div className="klook-bullets">
          <ul>
            <li>Explore Ocean Drive, one of the most famous strips of South Beach Miami</li>
            <li>Ride the bike path all the way down to the South Pointe Pier</li>
            <li>Snap pictures with beautiful Art Deco buildings from the 30s</li>
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
              <li>✔️ Tax</li>
              <li>✔️ Helmets</li>
              <li>✔️ Baskets/Bike Bags</li>
              <li>✔️ Locks</li>
              <li>✔️ Illustrated Maps</li>
              <li>✖️ Hotel pick up and drop off</li>
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
          Biking is the best way to explore Miami Beach! Our Cannondale bikes are hybrids between comfort and performance with gear shifts, available in step-through and straight frame.
          In this bike-friendly city, you can feel the full ambiance of Ocean Drive and the Espanola Way district.
        </p>
      </section>
    </div>
  );
}
