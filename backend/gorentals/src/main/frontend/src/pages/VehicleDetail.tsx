import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, Rental } from '../api'
import { usePrompt } from '../providers/PromptProvider'
import { useAuth } from '../providers/AuthProvider'

export default function VehicleDetail() {
  const { id } = useParams()
  const [vehicle, setVehicle] = useState<Rental | null>(null)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const { user } = useAuth()
  const { showPrompt } = usePrompt()

  useEffect(() => {
    if (id) api.getVehicle(Number(id)).then(setVehicle).catch(() => showPrompt('Vehicle not found', 'error'))
  }, [id, showPrompt])

  const onBook = async (e: FormEvent) => {
    e.preventDefault()
    if (!id) return
    try {
      await api.createBooking(Number(id), start, end)
      showPrompt('Booking confirmed!', 'success')
      setStart(''); setEnd('')
    } catch (e: any) {
      showPrompt(e?.message || 'Booking failed', 'error')
    }
  }

  if (!vehicle) return <div className="container"><p>Loading…</p></div>

  return (
    <div className="container">
      <div className="card" style={{ overflow: 'hidden' }}>
        {vehicle.imageUrl ? (<img src={vehicle.imageUrl} alt={vehicle.title} style={{ maxHeight: 280, objectFit: 'cover' }} />) : null}
        <div className="content">
          <h2 className="title">{vehicle.title}</h2>
          <p className="muted">{vehicle.description}</p>
          <p><strong>${vehicle.pricePerDay}</strong> per day</p>

          {user ? (
            <form onSubmit={onBook} className="actions" style={{ alignItems: 'end' }}>
              <div>
                <label>Start</label>
                <input type="date" value={start} onChange={e => setStart(e.target.value)} required />
              </div>
              <div>
                <label>End</label>
                <input type="date" value={end} onChange={e => setEnd(e.target.value)} required />
              </div>
              <button className="primary">Book</button>
            </form>
          ) : (
            <p className="muted">Login to book this vehicle.</p>
          )}
        </div>
      </div>
    </div>
  )
}
