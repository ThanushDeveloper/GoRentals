import { FormEvent, useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('New User')
  const [email, setEmail] = useState('newuser@example.com')
  const [password, setPassword] = useState('changeme')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register(name, email, password)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Register</h2>
      <label>Name</label>
      <input value={name} onChange={e => setName(e.target.value)} required />
      <label>Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
      <label>Password</label>
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
      <button className="primary" disabled={loading}>{loading ? 'Creating account…' : 'Register'}</button>
    </form>
  )
}
