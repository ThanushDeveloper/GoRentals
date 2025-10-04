
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function RequireAuth({ role }) {
  const { user, isAdmin, isUser } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role === 'ADMIN' && !isAdmin) return <Navigate to="/" replace />;
  if (role === 'USER' && !isUser) return <Navigate to="/" replace />;
  return <Outlet />;
}

