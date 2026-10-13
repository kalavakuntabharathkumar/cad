import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppointmentsProvider } from './state/AppointmentsContext.jsx'
import App from './App.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppointmentsProvider>
      <App />
    </AppointmentsProvider>
  </React.StrictMode>
)
