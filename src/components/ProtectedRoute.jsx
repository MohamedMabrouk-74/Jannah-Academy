import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ROUTE_ROLES = {
  '/dashboard/ceo':               'CEO',
  '/dashboard/ceo/plans':         'CEO',
  '/dashboard/ceo/reports':       'CEO',
  '/dashboard/ceo/track':         'CEO',
  '/dashboard/marketing':         'Marketing Manager',
  '/dashboard/marketing/plans':   'Marketing Manager',
  '/dashboard/marketing/strategy':'Marketing Manager',
  '/dashboard/marketing/report':  'Marketing Manager',
  '/dashboard/marketing/ceo-plans':'Marketing Manager',
  '/dashboard/marketer':          'Marketer',
  '/dashboard/marketer/execute':  'Marketer',
  '/dashboard/marketer/courses':  'Marketer',
  '/dashboard/social-media':      'Social Media Manager',
  '/dashboard/social-media/pages':'Social Media Manager',
  '/dashboard/social-media/ads':  'Social Media Manager',
  '/dashboard/social-media/ceo-plans':'Social Media Manager',
  '/dashboard/instructor':        'Instructor',
  '/dashboard/instructor/upload': 'Instructor',
  '/dashboard/instructor/reports':'Instructor',
  '/dashboard/instructor/ceo-plans':'Instructor',
  '/dashboard/customer-service':  'Customer Service',
  '/dashboard/customer-service/chat':     'Customer Service',
  '/dashboard/customer-service/ceo-plans':'Customer Service',
}

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) return <Navigate to="/staff-login" replace />

  const required = ROUTE_ROLES[location.pathname]
  if (required && user.role !== required) {
    return <Navigate to={user.config.navItems[0].path} replace />
  }

  return children
}
