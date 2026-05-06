import { createContext, useContext, useState } from 'react'

// ── Class Diagram: user base + role subclasses ──────────────────
const ROLE_CONFIGS = {
  CEO: {
    label: 'CEO',
    avatar: 'KA',
    color: '#a78bfa',
    icon: '💼',
    // CEO methods: setPlans, askForReports, trackLevels
    navItems: [
      { icon: '📊', label: 'Strategic Overview', path: '/dashboard/ceo' },
      { icon: '📋', label: 'Set Plans',          path: '/dashboard/ceo/plans' },
      { icon: '📄', label: 'Ask for Reports',    path: '/dashboard/ceo/reports' },
      { icon: '📈', label: 'Track Levels',       path: '/dashboard/ceo/track' },
    ],
    permissions: ['setPlans', 'askForReports', 'trackLevels', 'getCEOPlans'],
  },
  'Marketing Manager': {
    label: 'Marketing Manager',
    avatar: 'MM',
    color: '#60a5fa',
    icon: '◎',
    // Methods: setMarketingPlan, updateMarketingStrategy, generateLoadReport, getCEOPlans
    navItems: [
      { icon: '📊', label: 'Overview',              path: '/dashboard/marketing' },
      { icon: '🎯', label: 'Set Marketing Plan',    path: '/dashboard/marketing/plans' },
      { icon: '🔄', label: 'Update Strategy',       path: '/dashboard/marketing/strategy' },
      { icon: '📑', label: 'Generate Load Report',  path: '/dashboard/marketing/report' },
      { icon: '📋', label: 'Get CEO Plans',         path: '/dashboard/marketing/ceo-plans' },
    ],
    permissions: ['setMarketingPlan', 'updateMarketingStrategy', 'generateLoadReport', 'getCEOPlans'],
  },
  Marketer: {
    label: 'Marketer',
    avatar: 'MK',
    color: '#34d399',
    icon: '⇥',
    // Methods: excuteMarketingPlans, marketingForCourses
    navItems: [
      { icon: '📊', label: 'Overview',                path: '/dashboard/marketer' },
      { icon: '⚡', label: 'Marketing Plans', path: '/dashboard/marketer/execute' },
      { icon: '🎓', label: 'Market for Courses',      path: '/dashboard/marketer/courses' },
    ],
    permissions: ['excuteMarketingPlans', 'marketingForCourses'],
  },
  'Social Media Manager': {
    label: 'Social Media Manager',
    avatar: 'SM',
    color: '#f472b6',
    icon: '⬡',
    // Methods: excuteMarketingPlans, managePages, trackAdvertisements, getCEOPlans
    navItems: [
      { icon: '📊', label: 'Overview',            path: '/dashboard/social-media' },
      { icon: '📱', label: 'Manage Pages',        path: '/dashboard/social-media/pages' },
      { icon: '📣', label: 'Track Advertisements',path: '/dashboard/social-media/ads' },
      { icon: '📋', label: 'Get CEO Plans',       path: '/dashboard/social-media/ceo-plans' },
    ],
    permissions: ['managePages', 'trackAdvertisements', 'getCEOPlans', 'excuteMarketingPlans'],
  },
  Instructor: {
    label: 'Instructor',
    avatar: 'IN',
    color: '#fb923c',
    icon: '📖',
    // Methods: getCEOPlans, getStudentsReports, updateStudentReports
    navItems: [
      { icon: '📊', label: 'Overview',               path: '/dashboard/instructor' },
      { icon: '📤', label: 'Upload Student Reports',  path: '/dashboard/instructor/upload' },
      { icon: '📥', label: 'Get Student Reports',     path: '/dashboard/instructor/reports' },
      { icon: '📋', label: 'Get CEO Plans',           path: '/dashboard/instructor/ceo-plans' },
    ],
    permissions: ['getCEOPlans', 'getStudentsReports', 'updateStudentReports'],
  },
  'Customer Service': {
    label: 'Customer Service',
    avatar: 'CS',
    color: '#a78bfa',
    icon: '💬',
    // Methods: communicateWithStudent, getCEOPlans
    navItems: [
      { icon: '📊', label: 'Overview',               path: '/dashboard/customer-service' },
      { icon: '💬', label: 'Communicate w/ Students', path: '/dashboard/customer-service/chat' },
      { icon: '📋', label: 'Get CEO Plans',           path: '/dashboard/customer-service/ceo-plans' },
    ],
    permissions: ['communicateWithStudent', 'getCEOPlans'],
  },
}

// Mock user store (in real app → API)
const MOCK_USERS = {
  'ceo@academy.com':      { id: 1, name: 'Khalid Al-Ahmad', role: 'CEO',                  number: '+966501234567' },
  'mm@academy.com':       { id: 2, name: 'Mona Mahmoud',    role: 'Marketing Manager',     number: '+966502345678' },
  'mk@academy.com':       { id: 3, name: 'Malik Karimi',    role: 'Marketer',              marketingCode: 'MK-2026' },
  'sm@academy.com':       { id: 4, name: 'Sara Mansour',    role: 'Social Media Manager',  number: '+966504567890' },
  'ins@academy.com':      { id: 5, name: 'Ibrahim Nasser',  role: 'Instructor',            phone: '+966505678901' },
  'cs@academy.com':       { id: 6, name: 'Ahmed Al-Rashid', role: 'Customer Service',      phone: '+966506789012' },
}

// ── Context ──────────────────────────────────────────────────────
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loginError, setLoginError] = useState('')

  // user.login() from class diagram
  const login = (email, password, role) => {
    const found = MOCK_USERS[email.toLowerCase()]
    if (!found) { setLoginError('User not found'); return false }
    if (found.role !== role) { setLoginError('Role mismatch for this email'); return false }
    if (password.length < 4) { setLoginError('Invalid password'); return false }

    const config = ROLE_CONFIGS[found.role]
    setUser({ ...found, config })
    setLoginError('')
    return true
  }

  // user.verify() from class diagram
  const verify = (code) => code === '123456'

  const logout = () => setUser(null)

  const hasPermission = (method) => user?.config?.permissions?.includes(method) ?? false

  return (
    <AuthContext.Provider value={{ user, login, logout, verify, loginError, hasPermission, ROLE_CONFIGS }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export { ROLE_CONFIGS }
