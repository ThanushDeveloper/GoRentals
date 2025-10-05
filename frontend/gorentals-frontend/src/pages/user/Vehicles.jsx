import React, { useEffect, useMemo, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import Spinner from '../../components/Spinner';
import VehicleCard from '../../components/VehicleCard';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState({ q: '', type: '', minPrice: '', maxPrice: '', seats: '', transmission: '', sort: '' });
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    let items = vehicles;
    if (query.q) {
      const term = query.q.toLowerCase();
      items = items.filter((v) => `${v.make} ${v.model}`.toLowerCase().includes(term));
    }
    if (query.sort === 'priceAsc') items = [...items].sort((a, b) => Number(a.pricePerDay) - Number(b.pricePerDay));
    if (query.sort === 'priceDesc') items = [...items].sort((a, b) => Number(b.pricePerDay) - Number(a.pricePerDay));
    return items;
  }, [vehicles, query.q, query.sort]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (query.type) params.type = query.type;
        if (query.minPrice) params.minPrice = query.minPrice;
        if (query.maxPrice) params.maxPrice = query.maxPrice;
        if (query.seats) params.seats = query.seats;
        if (query.transmission) params.transmission = query.transmission;
        const res = await axiosClient.get('/api/vehicles', { params });
        setVehicles(res.data);
        setPage(1);
      } catch (e) {
        setError('Failed to load vehicles');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.type, query.minPrice, query.maxPrice, query.seats, query.transmission]);

  const pageCount = Math.ceil(filtered.length / pageSize) || 1;
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="container py-4 container-narrow">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-3">
        <div>
          <h2 className="mb-1">Vehicles</h2>
          <div className="muted">Choose your perfect ride</div>
        </div>
        <div className="tab-segment p-1 d-inline-flex gap-1">
          <button className={`btn btn-sm ${query.sort === '' ? 'btn-brand' : 'btn-outline-secondary'}`} onClick={() => setQuery({ ...query, sort: '' })}>Our picks</button>
          <button className={`btn btn-sm ${query.sort === 'priceAsc' ? 'btn-brand' : 'btn-outline-secondary'}`} onClick={() => setQuery({ ...query, sort: 'priceAsc' })}>Lowest price</button>
          <button className={`btn btn-sm ${query.sort === 'priceDesc' ? 'btn-brand' : 'btn-outline-secondary'}`} onClick={() => setQuery({ ...query, sort: 'priceDesc' })}>Top price</button>
        </div>
      </div>

      <div className="search-hero p-2 p-md-3 mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-4">
            <input className="form-control" placeholder="Search make or model" value={query.q} onChange={(e) => setQuery({ ...query, q: e.target.value })} />
          </div>
          <div className="col-6 col-md-2">
            <input className="form-control" placeholder="Type" value={query.type} onChange={(e) => setQuery({ ...query, type: e.target.value })} />
          </div>
          <div className="col-6 col-md-2">
            <input className="form-control" placeholder="Seats" type="number" value={query.seats} onChange={(e) => setQuery({ ...query, seats: e.target.value })} />
          </div>
          <div className="col-6 col-md-2">
            <input className="form-control" placeholder="Min Price" type="number" value={query.minPrice} onChange={(e) => setQuery({ ...query, minPrice: e.target.value })} />
          </div>
          <div className="col-6 col-md-2">
            <input className="form-control" placeholder="Max Price" type="number" value={query.maxPrice} onChange={(e) => setQuery({ ...query, maxPrice: e.target.value })} />
          </div>
          <div className="col-6 col-md-2">
            <select className="form-select" value={query.transmission} onChange={(e) => setQuery({ ...query, transmission: e.target.value })}>
              <option value="">Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div className="col-6 col-md-2 d-grid">
            <button className="btn btn-outline-secondary" onClick={() => setQuery({ q: '', type: '', minPrice: '', maxPrice: '', seats: '', transmission: '', sort: '' })}>Reset</button>
          </div>
        </div>
      </div>

      {loading && <Spinner />}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-3">
        {pageItems.map((v) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={v.id}>
            <VehicleCard vehicle={v} />
          </div>
        ))}
      </div>
      {!filtered.length && !loading && !error && (
        <div className="text-center py-5">No Vehicles Available</div>
      )}

      <nav className="mt-4">
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</button>
          </li>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <li key={n} className={`page-item ${n === page ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setPage(n)}>{n}</button>
            </li>
          ))}
          <li className={`page-item ${page === pageCount ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage((p) => Math.min(pageCount, p + 1))}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}