import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DefaultLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}