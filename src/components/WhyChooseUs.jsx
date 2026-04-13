import styles from './WhyChooseUs.module.css'

const ITEMS = [
  {
    icon: '📚',
    iconBg: '#3d2fa0',
    iconColor: '#a29bfe',
    title: '200+ Structured Courses',
    desc: 'Systematically designed curricula from beginner to advanced levels in Islamic sciences.',
  },
  {
    icon: '🌐',
    iconBg: '#1a3a5c',
    iconColor: '#60b0f4',
    title: 'Live Scholarly Sessions',
    desc: 'Weekly interactive sessions with certified scholars from across the Muslim world.',
  },
  {
    icon: '🏅',
    iconBg: '#1a3a2a',
    iconColor: '#4ade80',
    title: 'Accredited Certificates',
    desc: 'Internationally recognized certificates upon successful course completion.',
  },
  {
    icon: '⚡',
    iconBg: '#3d2060',
    iconColor: '#c084fc',
    title: 'AI-Powered Learning',
    desc: 'Personalized study plans adapted to your pace, goals, and learning style.',
  },
  {
    icon: '👥',
    iconBg: '#1a3a2a',
    iconColor: '#34d399',
    title: 'Global Community',
    desc: 'Connect with 2,800+ students and scholars worldwide in moderated forums.',
  },
  {
    icon: '🌙',
    iconBg: '#3a2a1a',
    iconColor: '#fbbf24',
    title: 'Flexible Schedule',
    desc: 'Learn at your own pace with lifetime access to all recorded sessions.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>WHY CHOOSE US</span>
          <h2 className={styles.title}>A Complete Learning Experience</h2>
        </div>
        <div className={styles.grid}>
          {ITEMS.map((item, i) => (
            <div key={i} className={styles.card}>
              <div
                className={styles.iconWrap}
                style={{ background: item.iconBg }}
              >
                <span className={styles.icon} style={{ filter: 'none', fontSize: '20px' }}>
                  {item.icon}
                </span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
