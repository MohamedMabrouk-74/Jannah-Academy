import { useNavigate } from 'react-router-dom'
import styles from './Footer.module.css'

const NAV_LINKS = ['About', 'Courses', 'Contact', 'Privacy Policy', 'Terms']

const SOCIALS = [
  { icon: '𝕏', label: 'Twitter' },
  { icon: '📷', label: 'Instagram' },
  { icon: '▶', label: 'YouTube' },
  { icon: 'in', label: 'LinkedIn' },
]

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          {/* Logo */}
          <div className={styles.logo} onClick={() => navigate('/')}>
            <div className={styles.logoIcon}>✦</div>
            <span className={styles.logoText}>
              Jannah<span className={styles.logoAccent}>Academy</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className={styles.nav}>
            {NAV_LINKS.map(l => (
              <a key={l} href="#" className={styles.navLink}>{l}</a>
            ))}
          </nav>

          {/* Social icons */}
          <div className={styles.socials}>
            {SOCIALS.map(s => (
              <a key={s.label} href="#" className={styles.socialBtn} aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <span>© 2026 Jannah Academy. All rights reserved.</span>
          <span>Built with ♥</span>
        </div>
      </div>
    </footer>
  )
}
