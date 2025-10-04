import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, Rental } from '../api'
import { usePrompt } from '../providers/PromptProvider'

export default function Home() {
  const [vehicles, setVehicles] = useState<Rental[]>([])
  const { showPrompt } = usePrompt()

  useEffect(() => {
    api.getVehicles().then(setVehicles).catch(() => showPrompt('Failed to load vehicles', 'error'))
  }, [showPrompt])

  return (
    <div className="container">
      <div className="page-header">
        <h2>Available Vehicles</h2>
      </div>
      <div className="grid">
        {vehicles.map(v => (
          <div className="card" key={v.id}>
            {v.imageUrl ? (<img src={v.imageUrl} alt={v.title} />) : (<div style={{height:160}} />)}
            <div className="content">
              <h3 className="title">{v.title}</h3>
              <div className="muted">${v.pricePerDay} per day</div>
              <div style={{ height: 8 }} />
              <Link to={`/vehicles/${v.id}`} className="secondary">View details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
