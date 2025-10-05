import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

export default function ManageVehicles() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [q, setQ] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ make:'', model:'', year:'', type:'', pricePerDay:'', registrationNumber:'', seats:'', transmission:'', fuelType:'', description:'' });
  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try {
        const res = await axiosClient.get('/api/vehicles');
        setItems(res.data);
      } catch (e) {
        setError('Failed to load vehicles');
      } finally { setLoading(false); }
    };
    load();
  }, []);

  const filtered = items.filter((v) => `${v.make} ${v.model}`.toLowerCase().includes(q.toLowerCase()));

  if (loading) return <Spinner />;
  if (error) return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Manage Vehicles</h3>
        <div className="d-flex gap-2">
          <input className="form-control" style={{ maxWidth: 280 }} placeholder="Search vehicles" value={q} onChange={(e) => setQ(e.target.value)} />
          <button className="btn btn-brand" onClick={()=>setShowForm(true)}>Add Vehicle</button>
        </div>
      </div>
      <div className="row g-3">
        {filtered.map((v) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={v.id}>
            <div className="elevated-card h-100 d-flex flex-column">
              {v.imageUrls?.length ? (
                <img src={v.imageUrls[0]} alt={`${v.make} ${v.model}`} className="w-100" style={{ height: 160, objectFit: 'cover' }} />
              ) : (
                <div className="bg-light" style={{ height: 160 }} />
              )}
              <div className="p-3 d-flex flex-column gap-1">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <div className="fw-semibold">{v.make} {v.model}</div>
                    <div className="muted small">{v.type} • {v.transmission} • {v.seats} seats</div>
                  </div>
                  <div className="fw-bold">${v.pricePerDay}</div>
                </div>
                <div className="mt-2 d-flex gap-2">
                  <Link to={`/vehicles/${v.id}`} className="btn btn-outline-secondary btn-sm flex-grow-1">View</Link>
                  <button className="btn btn-outline-primary btn-sm" onClick={()=>{ setEditingId(v.id); setForm({ make:v.make||'', model:v.model||'', year:v.year||'', type:v.type||'', pricePerDay:v.pricePerDay||'', registrationNumber:v.registrationNumber||'', seats:v.seats||'', transmission:v.transmission||'', fuelType:v.fuelType||'', description:v.description||'' }); setFiles([]); setShowForm(true); }}>Edit</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={async ()=>{ if (!window.confirm('Delete this vehicle?')) return; try { await axiosClient.delete(`/api/vehicles/${v.id}`); const refreshed = await axiosClient.get('/api/vehicles'); setItems(refreshed.data); } catch { alert('Delete failed'); } }}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {!filtered.length && (
          <div className="col-12">
            <div className="alert alert-info">No vehicles found.</div>
          </div>
        )}
      </div>
      {showForm && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingId ? 'Edit Vehicle' : 'Add Vehicle'}</h5>
                <button type="button" className="btn-close" onClick={()=>setShowForm(false)} aria-label="Close" />
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6"><input className="form-control" placeholder="Make" value={form.make} onChange={(e)=>setForm({...form, make:e.target.value})} /></div>
                  <div className="col-md-6"><input className="form-control" placeholder="Model" value={form.model} onChange={(e)=>setForm({...form, model:e.target.value})} /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Year" type="number" value={form.year} onChange={(e)=>setForm({...form, year:e.target.value})} /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Type" value={form.type} onChange={(e)=>setForm({...form, type:e.target.value})} /></div>
                  <div className="col-md-4"><input className="form-control" placeholder="Price per day" type="number" value={form.pricePerDay} onChange={(e)=>setForm({...form, pricePerDay:e.target.value})} /></div>
                  <div className="col-md-6"><input className="form-control" placeholder="Registration Number" value={form.registrationNumber} onChange={(e)=>setForm({...form, registrationNumber:e.target.value})} /></div>
                  <div className="col-md-3"><input className="form-control" placeholder="Seats" type="number" value={form.seats} onChange={(e)=>setForm({...form, seats:e.target.value})} /></div>
                  <div className="col-md-3">
                    <select className="form-select" value={form.transmission} onChange={(e)=>setForm({...form, transmission:e.target.value})}>
                      <option value="">Transmission</option>
                      <option>Automatic</option>
                      <option>Manual</option>
                    </select>
                  </div>
                  <div className="col-md-6"><input className="form-control" placeholder="Fuel Type" value={form.fuelType} onChange={(e)=>setForm({...form, fuelType:e.target.value})} /></div>
                  <div className="col-12"><textarea className="form-control" placeholder="Description" rows="3" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} /></div>
                  <div className="col-12">
                    <label className="form-label">Images (one or more)</label>
                    <input className="form-control" type="file" multiple accept="image/*" onChange={(e)=>setFiles(Array.from(e.target.files))} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={()=>{ setShowForm(false); setEditingId(null); }}>Cancel</button>
                <button className="btn btn-brand" disabled={saving} onClick={async ()=>{
                  setSaving(true);
                  try {
                    let vehicleId = editingId;
                    if (editingId) {
                      const res = await axiosClient.put(`/api/vehicles/${editingId}`, form);
                      vehicleId = res.data.id;
                    } else {
                      const res = await axiosClient.post('/api/vehicles', form);
                      vehicleId = res.data.id;
                    }
                    if (files.length) {
                      const formData = new FormData();
                      files.forEach((f)=>formData.append('files', f));
                      await axiosClient.post(`/api/vehicles/${vehicleId}/images/batch`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                    }
                    // refresh list
                    const refreshed = await axiosClient.get('/api/vehicles');
                    setItems(refreshed.data);
                    setShowForm(false); setEditingId(null);
                    setForm({ make:'', model:'', year:'', type:'', pricePerDay:'', registrationNumber:'', seats:'', transmission:'', fuelType:'', description:'' });
                    setFiles([]);
                  } catch (e) {
                    alert('Failed to save vehicle');
                  } finally {
                    setSaving(false);
                  }
                }}>{saving ? 'Saving…' : 'Save Vehicle'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}