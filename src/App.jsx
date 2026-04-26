import { Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

// Public
import LandingPage          from './pages/LandingPage'
import RegistrationPage     from './pages/RegistrationPage'
import PaymentPage          from './pages/PaymentPage'
import ConfirmationPage     from './pages/ConfirmationPage'
import CodeVerificationPage from './pages/CodeVerificationPage'
import StaffLoginPage       from './pages/StaffLoginPage'

// Dashboards
import CEODashboard              from './pages/dashboards/CEODashboard'
import MarketingManagerDashboard from './pages/dashboards/MarketingManagerDashboard'
import MarketerDashboard         from './pages/dashboards/MarketerDashboard'
import SocialMediaDashboard      from './pages/dashboards/SocialMediaDashboard'
import InstructorDashboard       from './pages/dashboards/InstructorDashboard'
import CustomerServiceDashboard  from './pages/dashboards/CustomerServiceDashboard'

// CEO sub-pages (setPlans, askForReports, trackLevels)
import { CEOSetPlans, CEOAskReports, CEOTrackLevels } from './pages/dashboards/CEOSubPages'

// Shared getCEOPlans page
import GetCEOPlans from './pages/dashboards/GetCEOPlans'

function P({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}

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
          {/* Public flow */}
          <Route path="/"             element={<LandingPage />} />
          <Route path="/register"     element={<RegistrationPage />} />
          <Route path="/payment"      element={<PaymentPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/verify"       element={<CodeVerificationPage />} />
          <Route path="/staff-login"  element={<StaffLoginPage />} />

          {/* CEO — setPlans, askForReports, trackLevels */}
          <Route path="/dashboard/ceo"         element={<P><CEODashboard /></P>} />
          <Route path="/dashboard/ceo/plans"   element={<P><CEOSetPlans /></P>} />
          <Route path="/dashboard/ceo/reports" element={<P><CEOAskReports /></P>} />
          <Route path="/dashboard/ceo/track"   element={<P><CEOTrackLevels /></P>} />

          {/* Marketing Manager — setMarketingPlan, updateMarketingStrategy, generateLoadReport, getCEOPlans */}
          <Route path="/dashboard/marketing"           element={<P><MarketingManagerDashboard /></P>} />
          <Route path="/dashboard/marketing/plans"     element={<P><GetCEOPlans /></P>} />
          <Route path="/dashboard/marketing/strategy"  element={<P><MarketingManagerDashboard /></P>} />
          <Route path="/dashboard/marketing/report"    element={<P><MarketingManagerDashboard /></P>} />
          <Route path="/dashboard/marketing/ceo-plans" element={<P><GetCEOPlans /></P>} />

          {/* Marketer — excuteMarketingPlans, marketingForCourses */}
          <Route path="/dashboard/marketer"          element={<P><MarketerDashboard /></P>} />
          <Route path="/dashboard/marketer/execute"  element={<P><MarketerDashboard /></P>} />
          <Route path="/dashboard/marketer/courses"  element={<P><MarketerDashboard /></P>} />

          {/* Social Media Manager — managePages, trackAdvertisements, getCEOPlans */}
          <Route path="/dashboard/social-media"           element={<P><SocialMediaDashboard /></P>} />
          <Route path="/dashboard/social-media/pages"     element={<P><SocialMediaDashboard /></P>} />
          <Route path="/dashboard/social-media/ads"       element={<P><SocialMediaDashboard /></P>} />
          <Route path="/dashboard/social-media/ceo-plans" element={<P><GetCEOPlans /></P>} />

          {/* Instructor — getCEOPlans, getStudentsReports, updateStudentReports */}
          <Route path="/dashboard/instructor"           element={<P><InstructorDashboard /></P>} />
          <Route path="/dashboard/instructor/upload"    element={<P><InstructorDashboard /></P>} />
          <Route path="/dashboard/instructor/reports"   element={<P><InstructorDashboard /></P>} />
          <Route path="/dashboard/instructor/ceo-plans" element={<P><GetCEOPlans /></P>} />

          {/* Customer Service — communicateWithStudent, getCEOPlans */}
          <Route path="/dashboard/customer-service"           element={<P><CustomerServiceDashboard /></P>} />
          <Route path="/dashboard/customer-service/chat"      element={<P><CustomerServiceDashboard /></P>} />
          <Route path="/dashboard/customer-service/ceo-plans" element={<P><GetCEOPlans /></P>} />
        </Routes>
      </div>
    </div>
  )
}
