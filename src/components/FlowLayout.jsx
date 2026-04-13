import styles from './FlowLayout.module.css'

export function StepBadge({ step, total, label }) {
  return (
    <div className={styles.stepBadge}>
      Step {step} of {total} · {label}
    </div>
  )
}

export function FlowLayout({ children, aside }) {
  return (
    <div className={styles.layout}>
      <div className={styles.main}>{children}</div>
      {aside && <aside className={styles.aside}>{aside}</aside>}
    </div>
  )
}
