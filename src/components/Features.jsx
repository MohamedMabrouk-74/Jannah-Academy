import styles from './Features.module.css'

const FEATURES = [
  {
    icon: '📖',
    title: 'Quran & Tajweed',
    desc: 'Master recitation with certified huffaz and tajweed specialists from around the world.',
  },
  {
    icon: '🌙',
    title: 'Arabic Language',
    desc: 'From beginner to advanced — classical Fusha and modern standard Arabic with native teachers.',
  },
  {
    icon: '🕌',
    title: 'Islamic Sciences',
    desc: 'Fiqh, Aqeedah, Seerah, and Hadith with structured, peer-reviewed curricula.',
  },
  {
    icon: '🎓',
    title: 'Certified Outcomes',
    desc: 'Earn internationally recognized certificates upon completing each program track.',
  },
  {
    icon: '🤖',
    title: 'AI Personalization',
    desc: 'Adaptive learning paths that adjust to your pace, goals, and prior knowledge.',
  },
  {
    icon: '🌍',
    title: 'Global Community',
    desc: 'Connect with 2,800+ students and scholars across 60+ countries worldwide.',
  },
]

export default function Features() {
  return (
    <section id="courses" className={styles.section}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">What we offer</span>
          <h2 className="section-title">
            Everything you need to grow in{' '}
            <span className="accent">deen & knowledge</span>
          </h2>
        </div>
        <div className={styles.grid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}>{f.icon}</div>
              <h3 className={styles.title}>{f.title}</h3>
              <p className={styles.desc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
