import { Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

// Public pages
import LandingPage        from './pages/LandingPage'
import RegistrationPage   from './pages/RegistrationPage'
import PaymentPage        from './pages/PaymentPage'
import ConfirmationPage   from './pages/ConfirmationPage'
import CodeVerificationPage from './pages/CodeVerificationPage'
import StaffLoginPage     from './pages/StaffLoginPage'

// Dashboards
import CEODashboard              from './pages/dashboards/CEODashboard'
import MarketingManagerDashboard from './pages/dashboards/MarketingManagerDashboard'
import MarketerDashboard         from './pages/dashboards/MarketerDashboard'
import SocialMediaDashboard      from './pages/dashboards/SocialMediaDashboard'
import InstructorDashboard       from './pages/dashboards/InstructorDashboard'
import CustomerServiceDashboard  from './pages/dashboards/CustomerServiceDashboard'

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()
  const showNavbar = location.pathname === '/'

  return (
    <div className="app-shell">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(p => !p)} />
      <div className="app-content">
        <div className="ambient-blob-1" />
        <div className="ambient-blob-2" />
        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/"             element={<LandingPage />} />
          <Route path="/register"     element={<RegistrationPage />} />
          <Route path="/payment"      element={<PaymentPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/verify"       element={<CodeVerificationPage />} />
          <Route path="/staff-login"  element={<StaffLoginPage />} />

          {/* Dashboards */}
          <Route path="/dashboard/ceo"            element={<CEODashboard />} />
          <Route path="/dashboard/marketing"      element={<MarketingManagerDashboard />} />
          <Route path="/dashboard/marketer"       element={<MarketerDashboard />} />
          <Route path="/dashboard/social-media"   element={<SocialMediaDashboard />} />
          <Route path="/dashboard/instructor"     element={<InstructorDashboard />} />
          <Route path="/dashboard/customer-service" element={<CustomerServiceDashboard />} />
        </Routes>
      </div>
    </div>
  )
}
