import { useAuth } from '../providers/AuthProvider'

export default function Dashboard() {
  const { user } = useAuth()
  return (
    <div className="container">
      <h2>Dashboard</h2>
      {user ? (
        <div className="card"><div className="content">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Roles:</strong> {user.roles?.join(', ')}</p>
        </div></div>
      ) : (
        <p>Please login.</p>
      )}
    </div>
  )
}
