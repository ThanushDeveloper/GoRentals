import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DefaultLayout from './layouts/DefaultLayout';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/user/Home';
import Vehicles from './pages/user/Vehicles';
import VehicleDetails from './pages/user/VehicleDetails';
import BookingHistory from './pages/user/BookingHistory';
import Payments from './pages/user/Payments';
import Profile from './pages/user/Profile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/admin/Dashboard';
import ManageVehicles from './pages/admin/ManageVehicles';
import ManageUsers from './pages/admin/ManageUsers';
import ManageBookings from './pages/admin/ManageBookings';
import PaymentsAdmin from './pages/admin/PaymentsAdmin';
import Reports from './pages/admin/Reports';
import { RequireAuth } from './routes/ProtectedRoute';
import Reviews from './pages/user/Reviews';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* App routes */}
        <Routes>
          {/* Klook-like pages render their own header */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<DefaultLayout /> }>
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicles/:id" element={<VehicleDetails />} />
            <Route path="/register" element={<Register />} />

            <Route element={<RequireAuth role="USER" />}> 
              <Route path="/bookings" element={<BookingHistory />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/reviews" element={<Reviews />} />
            </Route>

            <Route element={<RequireAuth role="ADMIN" />}> 
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/vehicles" element={<ManageVehicles />} />
              <Route path="/admin/bookings" element={<ManageBookings />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/payments" element={<PaymentsAdmin />} />
              <Route path="/admin/reports" element={<Reports />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;