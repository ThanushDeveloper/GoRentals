import { FormEvent, useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('user@gorentals.com')
  const [password, setPassword] = useState('user123')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Login</h2>
      <label>Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
      <label>Password</label>
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
      <button className="primary" disabled={loading}>{loading ? 'Signing in…' : 'Login'}</button>
    </form>
  )
}
