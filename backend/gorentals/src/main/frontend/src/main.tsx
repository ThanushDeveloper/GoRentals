import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from './providers/AuthProvider'
import { PromptProvider } from './providers/PromptProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PromptProvider>
          <App />
        </PromptProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
