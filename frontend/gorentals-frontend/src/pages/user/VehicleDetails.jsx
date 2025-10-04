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
      const res = await axiosClient.post('/api/bookings', null, { params: { vehicleId: id, startDate, endDate } });
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
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-md-6">
          {vehicle.imageUrls?.length ? (
            <img src={vehicle.imageUrls[0]} alt={`${vehicle.make} ${vehicle.model}`} className="img-fluid rounded" />
          ) : (
            <div className="bg-light rounded" style={{ height: 300 }} />
          )}
        </div>
        <div className="col-md-6">
          <h2>{vehicle.make} {vehicle.model} ({vehicle.year})</h2>
          <p className="text-muted">{vehicle.type} • {vehicle.transmission} • {vehicle.seats} seats • {vehicle.fuelType}</p>
          <p>{vehicle.description}</p>
          <h4 className="fw-bold mb-3">${vehicle.pricePerDay} / day</h4>

          <div className="row g-2 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Start Date</label>
              <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">End Date</label>
              <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="col-md-4">
              <button disabled={bookingLoading} onClick={handleBook} className="btn btn-primary w-100">
                {bookingLoading ? 'Booking...' : 'Book Now'}
              </button>
            </div>
          </div>
          {bookingError && <div className="alert alert-danger mt-3">{bookingError}</div>}
        </div>
      </div>
    </div>
  );
}
