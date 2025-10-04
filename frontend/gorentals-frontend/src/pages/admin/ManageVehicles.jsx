import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import Spinner from '../../components/Spinner';

export default function ManageVehicles() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ make: '', model: '', year: '', type: '', pricePerDay: '', seats: '', transmission: '', fuelType: '', description: '' });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.get('/api/vehicles');
      setItems(res.data);
    } catch (e) {
      setError('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosClient.post('/api/vehicles', { ...form, year: Number(form.year) || 0, seats: Number(form.seats) || 0 });
      setForm({ make: '', model: '', year: '', type: '', pricePerDay: '', seats: '', transmission: '', fuelType: '', description: '' });
      await load();
    } catch (e) {
      alert('Create failed');
    } finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete vehicle?')) return;
    try { await axiosClient.delete(`/api/vehicles/${id}`); await load(); } catch { alert('Delete failed'); }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="container py-4"><div className="alert alert-danger">{error}</div></div>;

  return (
    <div className="container py-4">
      <h3>Manage Vehicles</h3>

      <form className="card p-3 shadow-sm mb-4" onSubmit={create}>
        <div className="row g-2">
          {['make','model','year','type','pricePerDay','seats','transmission','fuelType'].map((key) => (
            <div className="col-md-3" key={key}>
              <input className="form-control" placeholder={key} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
            </div>
          ))}
          <div className="col-12">
            <textarea className="form-control" placeholder="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="col-12">
            <button disabled={saving} className="btn btn-primary" type="submit">{saving ? 'Saving...' : 'Add Vehicle'}</button>
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Make</th>
              <th>Model</th>
              <th>Type</th>
              <th>Price/Day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.make}</td>
                <td>{v.model}</td>
                <td>{v.type}</td>
                <td>${v.pricePerDay}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => remove(v.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
