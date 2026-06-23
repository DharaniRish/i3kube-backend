import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: '18px',
                background: '#ffffff',
                color: '#111827',
              },
            }}
          />
        </AppProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
