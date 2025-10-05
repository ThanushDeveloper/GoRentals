import React, { useState } from 'react';
import BookingLayout from '../../layouts/BookingLayout';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/booking.css';

export default function BookingLogin() {
  const { login, loading, error, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.ok) {
      if (isAdmin) navigate('/admin');
      else navigate('/');
    }
  };

  return (
    <BookingLayout>
      <div className="bk">
        <div className="bk-auth">
          <div className="card">
            <div className="title">Log in</div>
            {error && (
              <div style={{marginTop:12, color:'#b91c1c', background:'#fee2e2', border:'1px solid #fecaca', padding:'8px 12px', borderRadius:10}}>
                {error}
              </div>
            )}
            <form onSubmit={onSubmit}>
              <div className="bk-field">
                <label>Email</label>
                <input className="bk-input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="you@example.com" />
              </div>
              <div className="bk-field">
                <label>Password</label>
                <input className="bk-input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required placeholder="••••••••" />
              </div>
              <button className="bk-btn" type="submit" disabled={loading} style={{width:'100%', marginTop: 12}}>
                {loading ? 'Logging in…' : 'Log in'}
              </button>
            </form>
            <div className="bk-actions">
              <button
                type="button"
                onClick={() => { setEmail('admin@gmail.com'); setPassword('admin@1234'); }}
                style={{background:'#f3f4f6', border:'1px solid #e5e7eb', padding:'8px 10px', borderRadius:10}}
              >
                Fill admin demo
              </button>
              <div>
                Don't have an account? <Link to="/register" style={{color:'#0071c2', fontWeight:700}}>Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BookingLayout>
  );
}
