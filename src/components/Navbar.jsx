import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

const NAV_LINKS = ['Courses', 'Scholars', 'Community', 'Pricing']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        {/* Logo */}
        <a href="/" className={styles.logo}>
          <div className={styles.logoIcon}>✦</div>
          <span className={styles.logoText}>
            Jannah<span className={styles.logoAccent}>Academy</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className={styles.navLink}>
              {link}
            </a>
          ))}
        </div>

        {/* Desktop buttons */}
        <div className={styles.navRight}>
          <button className={styles.btnGhost}>Sign In</button>
          <button className={styles.btnStaff} onClick={() => navigate('/staff-login')}>⊙ Staff Login</button>
          <button className={styles.btnPrimary} onClick={() => navigate('/register')}>Get Started Free</button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <button className={styles.btnPrimary} style={{ width: '100%', padding: '12px', marginTop: '8px' }}>
            Get Started Free
          </button>
        </div>
      )}
    </header>
  )
}
