import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import KlookHeader from '../../components/KlookHeader';
import KlookFooter from '../../components/KlookFooter';
import '../../styles/klook.css';

export default function Login() {
  const { login, loading, error, isAdmin, isUser, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    if (!loading && user) {
      if (isAdmin) navigate('/admin');
      else navigate('/');
    }
  }, [user, isAdmin, loading, navigate]);

  return (
    <div className="klook">
      <KlookHeader />
      <div className="klogin">
        <div className="card">
          <div className="title">Log in</div>
          {error && (
            <div style={{marginTop:12, color:'#b91c1c', background:'#fee2e2', border:'1px solid #fecaca', padding:'8px 12px', borderRadius:10}}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email</label>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="you@example.com" />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            <button className="klook-btn-orange cta" type="submit" disabled={loading}>
              {loading ? 'Logging in…' : 'Log in'}
            </button>
          </form>
          <div style={{marginTop:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <button
              type="button"
              onClick={() => { setEmail('admin@gmail.com'); setPassword('admin@1234'); }}
              style={{background:'#f3f4f6', border:'1px solid #e5e7eb', padding:'8px 10px', borderRadius:10}}
            >
              Fill admin demo
            </button>
            <div>
              Don't have an account? <Link to="/register" style={{color:'#ff5a1f', fontWeight:700}}>Sign up</Link>
            </div>
          </div>
        </div>
      </div>
      <KlookFooter />
    </div>
  );
}
