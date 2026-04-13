import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Hero.module.css'

const STATS = [
  { num: '2,847', label: 'Active Students' },
  { num: '200+', label: 'Courses' },
  { num: '45', label: 'Expert Scholars' },
  { num: '4.9★', label: 'Average Rating' },
]

export default function Hero() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={styles.hero}>
      <div className={`${styles.badge} ${visible ? styles.show : ''}`}>
        <span>✦</span> Now with AI-powered personalized learning
      </div>

      <h1 className={`${styles.title} ${visible ? styles.show : ''}`}>
        Your Gateway to
        <br />
        <span className={styles.accent}>Sacred Knowledge</span>
      </h1>

      <p className={`${styles.subtitle} ${visible ? styles.show : ''}`}>
        Learn Quran, Arabic, and Islamic sciences from world-class scholars.
        Structured curricula. Certified outcomes.
      </p>

      <div className={`${styles.btns} ${visible ? styles.show : ''}`}>
        <button className={styles.btnBig} onClick={() => navigate('/register')}>
          Start Learning Free →
        </button>
        <button className={styles.btnOutline}>▷ Watch Demo</button>
      </div>

      <div className={`${styles.stats} ${visible ? styles.showStats : ''}`}>
        {STATS.map((s, i) => (
          <div key={i} className={styles.statItem}>
            <div className={styles.statNum}>{s.num}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
