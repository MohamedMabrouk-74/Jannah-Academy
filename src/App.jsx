import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

// Pages
import LandingPage from './pages/LandingPage'
import RegistrationPage from './pages/RegistrationPage'
import PaymentPage from './pages/PaymentPage'
import ConfirmationPage from './pages/ConfirmationPage'
import CodeVerificationPage from './pages/CodeVerificationPage'
import StaffLoginPage from './pages/StaffLoginPage'

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()

  // Pages that show Navbar
  const showNavbar = location.pathname === '/'

  return (
    <div className="app-shell">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((p) => !p)}
      />
      <div className="app-content">
        <div className="ambient-blob-1" />
        <div className="ambient-blob-2" />
        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/verify" element={<CodeVerificationPage />} />
          <Route path="/staff-login" element={<StaffLoginPage />} />
        </Routes>
      </div>
    </div>
  )
}
