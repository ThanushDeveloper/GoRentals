import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login, loading, error, isAdmin, isUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.ok) {
      if (isAdmin) navigate('/admin');
      else navigate('/');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="elevated-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">Welcome back</h3>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => { setEmail('admin@gmail.com'); setPassword('admin@1234'); }}
                title="Fill admin demo"
              >
                Admin demo
              </button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div>
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button disabled={loading} className="btn btn-brand w-100" type="submit">
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className="mt-3 text-center">
              <span>Don't have an account? </span>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

