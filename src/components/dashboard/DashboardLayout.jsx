import { useEffect, useState } from 'react'
import styles from './DashboardLayout.module.css'

export default function DashboardLayout({ avatar, title, subtitle, children }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 50); return () => clearTimeout(t) }, [])

  return (
    <div className={styles.page}>
      <div className={styles.header} style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-12px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}>
        <div className={styles.headerLeft}>
          <div className={styles.avatar}>{avatar}</div>
          <div>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle} · Last updated: just now</p>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.btnExport}>↓ Export</button>
          <button className={styles.btnNew}>+ New Report</button>
          <button className={styles.iconBtn}>🔔</button>
          <button className={styles.iconBtn}>⚙</button>
        </div>
      </div>
      {children}
    </div>
  )
}
