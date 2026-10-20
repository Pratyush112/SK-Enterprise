import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/outfit';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-700.css';
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx'
import { HelmetProvider } from 'react-helmet-async'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
)
