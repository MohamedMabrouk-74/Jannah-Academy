import styles from './Footer.module.css'

const LINKS = {
  Learn: ['Courses', 'Scholars', 'Pricing', 'Community'],
  Company: ['About Us', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>✦</div>
            <span className={styles.logoText}>
              Jannah<span className={styles.logoAccent}>Academy</span>
            </span>
          </div>
          <p className={styles.tagline}>
            Your gateway to sacred knowledge. Learn Quran, Arabic, and Islamic sciences
            from world-class scholars.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.social}>𝕏</a>
            <a href="#" className={styles.social}>in</a>
            <a href="#" className={styles.social}>yt</a>
            <a href="#" className={styles.social}>ig</a>
          </div>
        </div>

        {/* Link columns */}
        <div className={styles.columns}>
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group} className={styles.column}>
              <h4 className={styles.colTitle}>{group}</h4>
              {links.map((link) => (
                <a key={link} href="#" className={styles.link}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>© 2026 JannahAcademy. All rights reserved.</p>
        <p className={styles.copy}>Built with ❤️ for the Ummah</p>
      </div>
    </footer>
  )
}
