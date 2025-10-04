type AuthResponse = { token: string; userId: number; name: string; email: string; roles: string[] }
export type Rental = { id: number; title: string; description: string; pricePerDay: number; imageUrl?: string }
export type Booking = { id: number; rentalId: number; rentalTitle: string; rentalImageUrl?: string; startDate: string; endDate: string; totalPrice: number; status: string }

const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || '' // e.g., http://localhost:8080 for dev when not proxying

let authToken: string | null = null

async function request(path: string, init?: RequestInit) {
  const res = await fetch(`${API_ORIGIN}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(init?.headers || {}),
    },
    ...init,
  })
  if (!res.ok) {
    let msg = `HTTP ${res.status}`
    try {
      const data = await res.json()
      if (data?.message) msg = data.message
    } catch {}
    throw new Error(msg)
  }
  if (res.status === 204) return null
  const ct = res.headers.get('Content-Type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

export const api = {
  setToken(t: string | null) {
    authToken = t
  },
  async login(email: string, password: string): Promise<AuthResponse> {
    return request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
  },
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    return request('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) })
  },
  async getMe() {
    return request('/api/users/me')
  },
  async getVehicles(): Promise<Rental[]> {
    return request('/api/vehicles')
  },
  async getVehicle(id: number): Promise<Rental> {
    return request(`/api/vehicles/${id}`)
  },
  async createBooking(rentalId: number, startDate: string, endDate: string) {
    return request('/api/bookings', {
      method: 'POST',
      body: JSON.stringify({ rentalId, startDate, endDate }),
    })
  },
  async getMyBookings(): Promise<Booking[]> {
    return request('/api/bookings/my')
  },
}
