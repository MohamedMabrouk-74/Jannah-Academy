import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import f from '../components/FormFields.module.css'
import styles from './StaffLoginPage.module.css'

const ROLES = [
  'CEO',
  'Marketing Manager',
  'Marketer',
  'Social Media Manager',
  'Instructor',
  'Customer Service',
]

export default function StaffLoginPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={styles.page}>
      {/* Logo */}
      <div className={styles.brand}>
        <div className={styles.logoIcon}>✦</div>
        <span className={styles.brandText}>
          Jannah<span className={styles.brandAccent}>Academy</span>
        </span>
      </div>

      <div className={styles.secureBadge}>⊙ Secure Staff Access Only</div>

      <h1 className={styles.title}>Staff Login</h1>
      <p className={styles.sub}>Sign in to access your dashboard</p>

      <div className={styles.card}>
        {/* Role selector */}
        <div className={f.field}>
          <label className={f.label}>Select your role</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, opacity: 0.45 }}>👤</span>
            <select
              className={f.select}
              style={{ paddingLeft: 38 }}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Choose your role...</option>
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button className={f.submitBtn} style={{ marginTop: 4 }}>
          ⊙ Sign In
        </button>

        <button className={styles.forgotBtn}>Forgot your password?</button>
      </div>
    </div>
  )
}
