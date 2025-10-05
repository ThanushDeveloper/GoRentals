import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import KlookHeader from '../../components/KlookHeader';
import KlookFooter from '../../components/KlookFooter';
import '../../styles/klook.css';

export default function Register() {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(name, email, password);
    if (res.ok) {
      navigate('/');
    }
  };

  return (
    <div className="klook">
      <KlookHeader />
      <div className="klogin">
        <div className="card">
          <div className="title">Create your account</div>
          {error && <div className="k-alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button disabled={loading} className="klook-btn-orange cta" type="submit">
              {loading ? 'Creating account…' : 'Sign up'}
            </button>
          </form>
          <div className="actions">
            <div>
              Already have an account? <Link to="/login" className="klook-link-orange">Log in</Link>
            </div>
          </div>
        </div>
      </div>
      <KlookFooter />
    </div>
  );
}



