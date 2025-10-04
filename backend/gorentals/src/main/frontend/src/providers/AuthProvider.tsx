import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import { usePrompt } from './PromptProvider'

type User = { id: number; name: string; email: string; roles: string[] }

type AuthContextType = {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const [user, setUser] = useState<User | null>(null)
  const { showPrompt } = usePrompt()

  useEffect(() => {
    if (token) {
      api.setToken(token)
      api.getMe().then(setUser).catch(() => setUser(null))
    } else {
      api.setToken(null)
      setUser(null)
    }
  }, [token])

  const value = useMemo<AuthContextType>(() => ({
    user,
    token,
    login: async (email, password) => {
      try {
        const res = await api.login(email, password)
        setToken(res.token)
        localStorage.setItem('token', res.token)
        setUser({ id: res.userId, name: res.name, email: res.email, roles: Array.from(res.roles || []) })
        showPrompt('Login successful', 'success')
      } catch (e: any) {
        showPrompt(e?.message || 'Login failed', 'error')
        throw e
      }
    },
    register: async (name, email, password) => {
      try {
        const res = await api.register(name, email, password)
        setToken(res.token)
        localStorage.setItem('token', res.token)
        setUser({ id: res.userId, name: res.name, email: res.email, roles: Array.from(res.roles || []) })
        showPrompt('Registration successful', 'success')
      } catch (e: any) {
        showPrompt(e?.message || 'Registration failed', 'error')
        throw e
      }
    },
    logout: () => {
      setToken(null)
      localStorage.removeItem('token')
    }
  }), [user, token, showPrompt])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
