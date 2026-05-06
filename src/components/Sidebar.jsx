import { useNavigate, useLocation } from 'react-router-dom'
import { useRegistration } from '../context/RegistrationContext'
import { useAuth } from '../context/AuthContext'
import styles from './Sidebar.module.css'

const FLOW_STEPS = [
  { label: 'Registration',     path: '/register',     step: 1 },
  { label: 'Payment',          path: '/payment',      step: 2 },
  { label: 'Confirmation',     path: '/confirmation', step: 3 },
  { label: 'Code Verification',path: '/verify',       step: 4 },
]

const FLOW_PATHS = ['/register', '/payment', '/confirmation', '/verify']

export default function Sidebar({ collapsed, onToggle }) {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { currentStep } = useRegistration()
  const { user, logout } = useAuth()

  const isFlowPage  = FLOW_PATHS.includes(location.pathname)
  const isDashboard = location.pathname.startsWith('/dashboard')
  const progress    = (currentStep / 4) * 100

  const handleLogout = () => {
    logout()
    navigate('/staff-login')
  }

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

        {/* Registration progress sub-steps */}
        {!collapsed && isFlowPage && (
          <div className={styles.flowBlock}>
            <p className={styles.flowTitle}>REGISTRATION FLOW</p>
            <div className={styles.flowSteps}>
              {FLOW_STEPS.map(s => {
                const done   = currentStep > s.step
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
          <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* ── STAFF LOGIN (when not logged in) ── */}
        {!user && (
          <div className={styles.group}>
            {!collapsed && <span className={styles.groupLabel}>STAFF</span>}
            <button
              className={`${styles.item} ${location.pathname === '/staff-login' ? styles.itemActive : ''}`}
              onClick={() => navigate('/staff-login')}
              title={collapsed ? 'Staff Login' : ''}
            >
              <span className={styles.itemIcon}>🛡</span>
              {!collapsed && <span className={styles.itemLabel}>Staff Login</span>}
            </button>
          </div>
        )}

        {/* ── ROLE NAV (when logged in) ── */}
        {user && (
          <div className={styles.group}>
            {!collapsed && (
              <div className={styles.roleHeader}>
                <div className={styles.roleAvatar} style={{ background: user.config.color + '30', color: user.config.color }}>
                  {user.config.icon}
                </div>
                <div className={styles.roleInfo}>
                  <div className={styles.roleName}>{user.name}</div>
                  <div className={styles.roleTitle}>{user.role}</div>
                </div>
              </div>
            )}
            {!collapsed && <span className={styles.groupLabel} style={{ marginTop: 8 }}>MY DASHBOARD</span>}
            {user.config.navItems.map(item => {
              const active = location.pathname === item.path
              return (
                <button
                  key={item.label}
                  className={`${styles.item} ${active ? styles.itemActive : ''}`}
                  onClick={() => navigate(item.path)}
                  title={collapsed ? item.label : ''}
                  style={active ? { borderLeft: `2px solid ${user.config.color}` } : {}}
                >
                  <span className={styles.itemIcon}>{item.icon}</span>
                  {!collapsed && <span className={styles.itemLabel}>{item.label}</span>}
                  {!collapsed && active && <span className={styles.activeDot} style={{ background: user.config.color }} />}
                </button>
              )
            })}

            {/* Logout */}
            <button
              className={styles.item}
              onClick={handleLogout}
              title={collapsed ? 'Logout' : ''}
              style={{ marginTop: 8 }}
            >
              <span className={styles.itemIcon}>🚪</span>
              {!collapsed && <span className={styles.itemLabel} style={{ color: '#f87171' }}>Logout</span>}
            </button>
          </div>
        )}
      </div>

      {/* User row */}
      <div className={styles.userRow}>
        <div className={styles.userAvatar} style={user ? { background: `linear-gradient(135deg, ${user.config.color}99, ${user.config.color})` } : {}}>
          {user ? user.config.avatar : 'A'}
        </div>
        {!collapsed && (
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user ? user.name : 'Mohamed Mabrouk'}</div>
            <div className={styles.userEmail}>{user ? user.role : 'mohamed@email.com'}</div>
          </div>
        )}
      </div>
    </aside>
  )
}