import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

type Variant = 'success' | 'error' | 'info'

type PromptContextType = {
  showPrompt: (message: string, variant?: Variant, durationMs?: number) => void
}

const PromptContext = createContext<PromptContextType | undefined>(undefined)

export function usePrompt() {
  const ctx = useContext(PromptContext)
  if (!ctx) throw new Error('usePrompt must be used within PromptProvider')
  return ctx
}

export function PromptProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState<Variant>('info')
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const api = useMemo<PromptContextType>(() => ({
    showPrompt: (msg: string, v: Variant = 'info', durationMs = 1800) => {
      setMessage(msg)
      setVariant(v)
      setVisible(true)
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setVisible(false), durationMs)
    },
  }), [])

  return (
    <PromptContext.Provider value={api}>
      {children}
      <div
        className={`cursor-prompt ${visible ? 'visible' : ''} ${variant}`}
        style={{ left: pos.x, top: pos.y }}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
    </PromptContext.Provider>
  )
}
