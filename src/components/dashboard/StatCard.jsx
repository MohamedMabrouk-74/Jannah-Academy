import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'
import styles from './StatCard.module.css'

function parseNum(val) {
  if (typeof val !== 'string') return null
  const cleaned = val.replace(/[$,%K★\s+]/g, '')
  const n = parseFloat(cleaned)
  return isNaN(n) ? null : n
}

function formatVal(original, animated) {
  const s = original.toString()
  if (s.includes('$') && s.includes('K'))  return `$${animated}K`
  if (s.includes('$'))                      return `$${animated.toLocaleString()}`
  if (s.includes('%'))                      return `${animated}%`
  if (s.includes('K'))                      return `${animated}K`
  if (s.includes('★'))                      return `${animated} ★`
  if (s.includes(','))                      return animated.toLocaleString()
  return String(animated)
}

function AnimatedValue({ value, delay }) {
  const raw = parseNum(value)
  const animated = useCountUp(raw ?? 0, 1400, delay)
  if (raw === null) return <>{value}</>
  return <>{formatVal(value, animated)}</>
}

export default function StatCard({ icon, iconBg, label, value, sub, change, changeUp, delay = 0 }) {
  const [ref, inView] = useInView()
  const isUp = changeUp !== false

  return (
    <div
      ref={ref}
      className={styles.card}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <div className={styles.top}>
        <div className={styles.icon} style={{ background: iconBg || 'rgba(124,106,247,0.15)' }}>
          {icon}
        </div>
        <span className={`${styles.change} ${isUp ? styles.up : styles.down}`}>
          {isUp ? '↑' : '↓'} {change}
        </span>
      </div>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>
        {inView ? <AnimatedValue value={value} delay={delay} /> : '0'}
      </div>
      {sub && <div className={styles.sub}>{sub}</div>}
    </div>
  )
}
