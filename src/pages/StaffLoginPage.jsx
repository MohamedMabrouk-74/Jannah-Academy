import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, ROLE_CONFIGS } from '../context/AuthContext'
import f from '../components/FormFields.module.css'
import styles from './StaffLoginPage.module.css'

const ROLE_ROUTES = {
  'CEO':                  '/dashboard/ceo',
  'Marketing Manager':    '/dashboard/marketing',
  'Marketer':             '/dashboard/marketer',
  'Social Media Manager': '/dashboard/social-media',
  'Instructor':           '/dashboard/instructor',
  'Customer Service':     '/dashboard/customer-service',
}

const HINT_EMAILS = {
  'CEO':                  'ceo@academy.com',
  'Marketing Manager':    'mm@academy.com',
  'Marketer':             'mk@academy.com',
  'Social Media Manager': 'sm@academy.com',
  'Instructor':           'ins@academy.com',
  'Customer Service':     'cs@academy.com',
}

export default function StaffLoginPage() {
  const navigate = useNavigate()
  const { login, loginError } = useAuth()
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRoleChange = (r) => {
    setRole(r)
    setEmail(HINT_EMAILS[r] || '')
  }

  // user.login() + user.verify() from class diagram
  const handleSignIn = async () => {
    if (!role || !email || !password) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 600)) // simulate API
    const ok = login(email, password, role)
    setLoading(false)
    if (ok) navigate(ROLE_ROUTES[role])
  }

  return (
    <div className={styles.page}>
      <div className={styles.brand}>
        <div className={styles.logoIcon}>✦</div>
        <span className={styles.brandText}>
          Jannah<span className={styles.brandAccent}>Academy</span>
        </span>
      </div>

      <div className={styles.secureBadge}>🔒 Secure Staff Access Only</div>
      <h1 className={styles.title}>Staff Login</h1>
      <p className={styles.sub}>Sign in to access your dashboard</p>

      <div className={styles.card}>
        {/* role hint pills */}
        <div className={styles.rolePills}>
          {Object.keys(ROLE_CONFIGS).map(r => (
            <button
              key={r}
              className={`${styles.pill} ${role === r ? styles.pillActive : ''}`}
              onClick={() => handleRoleChange(r)}
              style={role === r ? { borderColor: ROLE_CONFIGS[r].color, color: ROLE_CONFIGS[r].color, background: ROLE_CONFIGS[r].color + '18' } : {}}
            >
              {ROLE_CONFIGS[r].icon} {r}
            </button>
          ))}
        </div>

        {/* Email */}
        <div className={f.field}>
          <label className={f.label}>Email</label>
          <div className={f.inputWrap}>
            <span className={f.inputIcon}>✉</span>
            <input
              className={f.input}
              type="email"
              placeholder="your.email@academy.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className={f.field}>
          <label className={f.label}>Password</label>
          <div className={f.inputWrap}>
            <span className={f.inputIcon}>🔒</span>
            <input
              className={f.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSignIn()}
            />
          </div>
        </div>

        {loginError && (
          <div className={styles.errorMsg}>⚠ {loginError}</div>
        )}

        {/* Dev hint */}
        <div className={styles.hint}>
          💡 Demo password: any 4+ characters
        </div>

        <button
          className={f.submitBtn}
          style={{ marginTop: 4, opacity: loading ? 0.7 : 1 }}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? '⏳ Signing in...' : '⊙ Sign In'}
        </button>

        <button className={styles.forgotBtn}>Forgot your password?</button>
      </div>
    </div>
  )
}
