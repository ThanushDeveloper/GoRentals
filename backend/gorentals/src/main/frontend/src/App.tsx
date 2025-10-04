import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VehicleDetail from './pages/VehicleDetail'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import { useAuth } from './providers/AuthProvider'
import { usePrompt } from './providers/PromptProvider'

export default function App() {
  const { user, logout } = useAuth()
  const { showPrompt } = usePrompt()
  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    showPrompt('Logged out', 'info')
    navigate('/')
  }

  return (
    <div>
      <nav className="nav">
        <Link to="/">GoRentals</Link>
        <div className="spacer" />
        <Link to="/">Vehicles</Link>
        {user ? (
          <>
            <Link to="/bookings">My Bookings</Link>
            <Link to="/dashboard">Dashboard</Link>
            <button className="link" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles/:id" element={<VehicleDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </div>
  )
}
