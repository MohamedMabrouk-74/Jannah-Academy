import { useNavigate, useLocation } from 'react-router-dom'
import { useRegistration } from '../context/RegistrationContext'
import styles from './Sidebar.module.css'

const FLOW_STEPS = [
  { label: 'Registration', path: '/register', step: 1 },
  { label: 'Payment', path: '/payment', step: 2 },
  { label: 'Confirmation', path: '/confirmation', step: 3 },
  { label: 'Code Verification', path: '/verify', step: 4 },
]

const PUBLIC_ITEMS = [
  { icon: '⊙', label: 'Landing Page', path: '/' },
  { icon: '👤', label: 'Registration', path: '/register' },
  { icon: '💳', label: 'Payment', path: '/payment' },
  { icon: '✓', label: 'Confirmation', path: '/confirmation' },
  { icon: '✉', label: 'Code Verification', path: '/verify' },
]

const STAFF_ITEMS = [
  { icon: '🛡', label: 'Staff Login', path: '/staff-login' },
]

const DASHBOARDS = [
  { icon: '💼', label: 'CEO', color: '#a78bfa' },
  { icon: '◎', label: 'Marketing Manager', color: '#60a5fa' },
  { icon: '⇥', label: 'Marketer', color: '#34d399' },
  { icon: '⬡', label: 'Social Media Manager', color: '#f472b6' },
  { icon: '📖', label: 'Instructor', color: '#fb923c' },
  { icon: '💬', label: 'Customer Service', color: '#a78bfa' },
]

const FLOW_PATHS = ['/register', '/payment', '/confirmation', '/verify']

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentStep } = useRegistration()

  const isFlowPage = FLOW_PATHS.includes(location.pathname)
  const progress = (currentStep / 4) * 100

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.brandLogo}>
          <div className={styles.logoIcon} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>✦</div>
          {!collapsed && (
            <span className={styles.brandName} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              Jannah<span className={styles.brandAccent}>Academy</span>
            </span>
          )}
        </div>
        <button className={styles.collapseBtn} onClick={onToggle}>
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      <div className={styles.scroll}>
        {/* PUBLIC FLOW */}
        <div className={styles.group}>
          {!collapsed && <span className={styles.groupLabel}>PUBLIC FLOW</span>}
          {PUBLIC_ITEMS.map((item) => {
            const active = location.pathname === item.path
            return (
              <button
                key={item.label}
                className={`${styles.item} ${active ? styles.itemActive : ''}`}
                onClick={() => navigate(item.path)}
                title={collapsed ? item.label : ''}
              >
                <span className={styles.itemIcon}>{item.icon}</span>
                {!collapsed && <span className={styles.itemLabel}>{item.label}</span>}
                {!collapsed && active && <span className={styles.activeDot} />}
              </button>
            )
          })}
        </div>

        {/* Registration flow sub-steps */}
        {!collapsed && isFlowPage && (
          <div className={styles.flowBlock}>
            <p className={styles.flowTitle}>REGISTRATION FLOW</p>
            <div className={styles.flowSteps}>
              {FLOW_STEPS.map((s) => {
                const done = currentStep > s.step
                const active = currentStep === s.step
                return (
                  <div key={s.step} className={styles.flowStep}>
                    <div className={`${styles.flowDot} ${done ? styles.flowDone : ''} ${active ? styles.flowActive : ''}`}>
                      {done ? '✓' : s.step}
                    </div>
                    <span className={`${styles.flowLabel} ${active ? styles.flowLabelActive : ''} ${done ? styles.flowLabelDone : ''}`}>
                      {s.label}
                    </span>
                  </div>
                )
              })}
            </div>
            {/* Progress bar */}
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* STAFF */}
        <div className={styles.group}>
          {!collapsed && <span className={styles.groupLabel}>STAFF</span>}
          {STAFF_ITEMS.map((item) => {
            const active = location.pathname === item.path
            return (
              <button
                key={item.label}
                className={`${styles.item} ${active ? styles.itemActive : ''}`}
                onClick={() => navigate(item.path)}
                title={collapsed ? item.label : ''}
              >
                <span className={styles.itemIcon}>{item.icon}</span>
                {!collapsed && <span className={styles.itemLabel}>{item.label}</span>}
              </button>
            )
          })}
        </div>

        {/* DASHBOARDS */}
        <div className={styles.group}>
          {!collapsed && (
            <div className={styles.dashHeader}>
              <span className={styles.groupLabel}>DASHBOARDS</span>
              <span className={styles.badge}>6</span>
            </div>
          )}
          {collapsed && <span className={styles.badge} style={{ margin: '0 auto 8px' }}>6</span>}
          {DASHBOARDS.map((item) => (
            <button
              key={item.label}
              className={styles.item}
              title={collapsed ? item.label : ''}
            >
              <span
                className={styles.dashIcon}
                style={{ color: item.color, borderColor: item.color + '40', background: item.color + '18' }}
              >
                {item.icon}
              </span>
              {!collapsed && <span className={styles.itemLabel}>{item.label}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* User */}
      <div className={styles.userRow}>
        <div className={styles.userAvatar}>A</div>
        {!collapsed && (
          <div className={styles.userInfo}>
            <div className={styles.userName}>Ahmed Al-Rashid</div>
            <div className={styles.userEmail}>ahmed@email.com</div>
          </div>
        )}
      </div>
    </aside>
  )
}
