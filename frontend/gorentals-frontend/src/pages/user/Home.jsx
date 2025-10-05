import React, { useEffect, useState } from 'react';
import KlookHeader from '../../components/KlookHeader';
import '../../styles/klook.css';
import axiosClient from '../../api/axiosClient';
import KlookFooter from '../../components/KlookFooter';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoadingVehicles(true);
      try {
        const res = await axiosClient.get('/api/vehicles');
        setVehicles(res.data || []);
      } catch (e) {
        setVehicles([]);
      } finally {
        setLoadingVehicles(false);
      }
    };
    load();
  }, []);
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

      {/* You might also like – Vehicles from database */}
      <section className="k-suggest">
        <div className="k-section-title">You might also like...</div>
        {loadingVehicles ? (
          <div className="k-vehicle-empty">Loading…</div>
        ) : vehicles.length === 0 ? (
          <div className="k-vehicle-empty">No Vehicles Available</div>
        ) : (
          <div className="k-vehicle-grid">
            {vehicles.map((v) => (
              <div key={v.id} className="k-card">
                {v.imageUrls?.length ? (
                  <img alt={`${v.make} ${v.model}`} src={v.imageUrls[0]} />
                ) : (
                  <img alt="vehicle" src="https://images.unsplash.com/photo-1517940310602-4d1b06dc1c4f?q=80&w=1200&auto=format&fit=crop" />
                )}
                <div className="content">
                  <div className="subtitle">{v.type} • {v.transmission || 'Automatic'}</div>
                  <div className="title">{v.make} {v.model}</div>
                  <div className="meta">100+ booked</div>
                  <div className="price">₹ {Number(v.pricePerDay).toLocaleString('en-IN')}</div>
                  <button className="klook-btn-orange k-rounded-10" style={{marginTop:10}} onClick={() => { setSelected(v); setShowBooking(true); }}>Book Now</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trending sights – static images to match layout */}
      <section className="k-suggest" style={{marginTop: 18}}>
        <div className="k-section-title">Trending sights</div>
        <div className="k-card-row">
          <div className="k-card"><img alt="s1" src="https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop" /><div className="content"><div className="title">Antelope Canyon</div></div></div>
          <div className="k-card"><img alt="s2" src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop" /><div className="content"><div className="title">Horseshoe Bend</div></div></div>
          <div className="k-card"><img alt="s3" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" /><div className="content"><div className="title">Yosemite</div></div></div>
          <div className="k-card"><img alt="s4" src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop" /><div className="content"><div className="title">Golden Gate</div></div></div>
        </div>
      </section>

      <KlookFooter />

      {/* Booking modal */}
      {showBooking && (
        <div className="k-modal-backdrop" role="dialog" aria-modal="true">
          <div className="k-modal">
            <div className="k-modal-header">
              <div className="k-modal-title">Book {selected?.make} {selected?.model}</div>
              <button className="k-modal-close" onClick={() => setShowBooking(false)}>✕</button>
            </div>
            <div className="k-modal-body">
              {bookingError && <div className="k-alert-error">{bookingError}</div>}
              <div className="k-form-grid">
                <div className="field">
                  <label>Name</label>
                  <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your full name" />
                </div>
                <div className="field">
                  <label>Mobile Number</label>
                  <input value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="10-digit mobile" />
                </div>
                <div className="field">
                  <label>Address</label>
                  <input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Street, City" />
                </div>
                <div className="field">
                  <label>Start Date</label>
                  <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
                </div>
                <div className="field">
                  <label>End Date</label>
                  <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="k-modal-footer">
              <button className="k-btn-plain" onClick={() => setShowBooking(false)}>Cancel</button>
              <button className="klook-btn-orange" disabled={bookingLoading} onClick={async ()=>{
                if (!user) { navigate('/login'); return; }
                setBookingLoading(true); setBookingError(null);
                try {
                  const params = { vehicleId: selected.id, name, mobile, address, startDate, endDate };
                  const res = await axiosClient.post('/api/bookings', null, { params });
                  setShowBooking(false);
                  navigate(`/payments?bookingId=${res.data.id}&amount=${res.data.totalAmount}`);
                } catch (e) {
                  setBookingError(e.response?.data?.message || 'Booking failed');
                } finally { setBookingLoading(false); }
              }}>{bookingLoading ? 'Booking…' : 'Confirm Booking'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}