import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    // keep axios default header in sync
    if (token) {
      axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axiosClient.defaults.headers.common.Authorization;
    }
  }, [token]);

  useEffect(() => {
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    else localStorage.removeItem('refreshToken');
  }, [refreshToken]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.post('/api/auth/login', { email, password });
      // Persist immediately to avoid race conditions before first protected fetch
      const token = res.data.token;
      const rt = res.data.refreshToken;
      const userObj = { id: res.data.userId, name: res.data.name, email: res.data.email, roles: res.data.roles };
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', rt);
      localStorage.setItem('user', JSON.stringify(userObj));
      // Ensure axios sends auth on the very next request
      axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;

      setToken(token);
      setRefreshToken(rt);
      setUser(userObj);
      return { ok: true };
    } catch (e) {
      setError(e.response?.data?.message || 'Login failed');
      return { ok: false, error: e };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.post('/api/auth/register', { name, email, password });
      // Persist immediately to avoid race conditions before first protected fetch
      const token = res.data.token;
      const rt = res.data.refreshToken;
      const userObj = { id: res.data.userId, name: res.data.name, email: res.data.email, roles: res.data.roles };
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', rt);
      localStorage.setItem('user', JSON.stringify(userObj));
      // Ensure axios sends auth on the very next request
      axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;

      setToken(token);
      setRefreshToken(rt);
      setUser(userObj);
      return { ok: true };
    } catch (e) {
      setError(e.response?.data?.message || 'Registration failed');
      return { ok: false, error: e };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    const rt = localStorage.getItem('refreshToken');
    // fire-and-forget server revoke
    if (rt) {
      axiosClient.post('/api/auth/logout', { refreshToken: rt }).catch(() => {});
    }
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    delete axiosClient.defaults.headers.common.Authorization;
  };

  const isAdmin = !!user?.roles?.some?.((r) => String(r).includes('ADMIN'));
  const isUser = !!user?.roles?.some?.((r) => String(r).includes('USER'));

  const value = useMemo(() => ({ user, token, refreshToken, login, register, logout, loading, error, isAdmin, isUser }), [user, token, refreshToken, loading, error, isAdmin, isUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}


