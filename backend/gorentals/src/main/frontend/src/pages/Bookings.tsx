import { useEffect, useState } from 'react'
import { api, Booking } from '../api'
import { useAuth } from '../providers/AuthProvider'
import { usePrompt } from '../providers/PromptProvider'

export default function Bookings() {
  const { user } = useAuth()
  const { showPrompt } = usePrompt()
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    if (!user) return
    api.getMyBookings().then(setBookings).catch(() => showPrompt('Failed to load bookings', 'error'))
  }, [user, showPrompt])

  if (!user) return <div className="container"><p>Please login.</p></div>

  return (
    <div className="container">
      <h2>My Bookings</h2>
      <div className="grid">
        {bookings.map(b => (
          <div className="card" key={b.id}>
            {b.rentalImageUrl ? (<img src={b.rentalImageUrl} alt={b.rentalTitle} />) : (<div style={{height:160}} />)}
            <div className="content">
              <h3 className="title">{b.rentalTitle}</h3>
              <div className="muted">{b.startDate} → {b.endDate}</div>
              <div className="muted">${b.totalPrice} total • {b.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
