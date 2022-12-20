import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/auth_provider'
import './index.scss'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

console.log(import.meta.env.VITE_NODE_ENV);
if (import.meta.env.VITE_NODE_ENV === 'production') {
  console.log('dev tool disabled');

  disableReactDevTools();
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
