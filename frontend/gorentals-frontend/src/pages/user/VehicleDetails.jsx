import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import Spinner from '../../components/Spinner';
import { useAuth } from '../../context/AuthContext';

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosClient.get(`/api/vehicles/${id}`);
        setVehicle(res.data);
      } catch (e) {
        setError('Failed to load vehicle');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleBook = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setBookingLoading(true);
    setBookingError(null);
    try {
      const res = await axiosClient.post('/api/bookings', null, { params: { vehicleId: id, name, mobile, address, startDate, endDate } });
      navigate(`/payments?bookingId=${res.data.id}&amount=${res.data.totalAmount}`);
    } catch (e) {
      setBookingError(e.response?.data?.message || 'Failed to create booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>;
  if (!vehicle) return null;

  return (
    <div className="container py-4 container-narrow">
      <div className="row g-4">
        <div className="col-md-7">
          <div className="elevated-card overflow-hidden">
            {vehicle.imageUrls?.length ? (
              <img src={vehicle.imageUrls[0]} alt={`${vehicle.make} ${vehicle.model}`} className="w-100" style={{ maxHeight: 420, objectFit: 'cover' }} />
            ) : (
              <div className="bg-light" style={{ height: 420 }} />
            )}
          </div>
        </div>
        <div className="col-md-5">
          <div className="elevated-card p-3">
            <div className="d-flex justify-content-between align-items-start">
              <h2 className="mb-1">{vehicle.make} {vehicle.model} ({vehicle.year})</h2>
              <span className="badge bg-primary">{vehicle.type}</span>
            </div>
            <div className="muted mb-2">{vehicle.transmission} • {vehicle.seats} seats • {vehicle.fuelType}</div>
            <p className="mb-3">{vehicle.description}</p>
            <h4 className="fw-bold mb-3">${vehicle.pricePerDay} / day</h4>

            <div className="row g-2 align-items-end">
              <div className="col-12">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Mobile</label>
                <input type="tel" className="form-control" value={mobile} onChange={(e) => setMobile(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Start Date</label>
                <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">End Date</label>
                <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <div className="col-12">
                <button disabled={bookingLoading} onClick={handleBook} className="btn btn-brand w-100">
                  {bookingLoading ? 'Booking...' : 'Book Now'}
                </button>
              </div>
            </div>
            {bookingError && <div className="alert alert-danger mt-3">{bookingError}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}