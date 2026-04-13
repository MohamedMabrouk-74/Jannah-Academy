import styles from './Scholars.module.css'

const SCHOLARS = [
  {
    name: 'Sheikh Ahmad Al-Nouri',
    specialty: 'Quran & Tajweed',
    rating: '4.9',
    students: '1,200+',
    courses: 6,
    initials: 'AN',
    color: '#7c6af7',
  },
  {
    name: 'Dr. Fatima Al-Rashid',
    specialty: 'Arabic Language',
    rating: '4.8',
    students: '980+',
    courses: 4,
    initials: 'FR',
    color: '#5a4fcf',
  },
  {
    name: 'Sheikh Yusuf Ibrahim',
    specialty: 'Islamic Sciences',
    rating: '5.0',
    students: '750+',
    courses: 8,
    initials: 'YI',
    color: '#8b7cf8',
  },
  {
    name: 'Dr. Maryam Hassan',
    specialty: 'Fiqh & Aqeedah',
    rating: '4.9',
    students: '620+',
    courses: 5,
    initials: 'MH',
    color: '#6c5ce7',
  },
]

export default function Scholars() {
  return (
    <section id="scholars" className={styles.section}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Our scholars</span>
          <h2 className="section-title">
            Learn from the <span className="accent">world's best</span>
          </h2>
        </div>
        <div className={styles.grid}>
          {SCHOLARS.map((s, i) => (
            <div key={i} className={styles.card}>
              <div
                className={styles.avatar}
                style={{ background: `linear-gradient(135deg, ${s.color}99, ${s.color})` }}
              >
                {s.initials}
              </div>
              <h3 className={styles.name}>{s.name}</h3>
              <p className={styles.specialty}>{s.specialty}</p>
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaVal}>★ {s.rating}</span>
                  <span className={styles.metaKey}>Rating</span>
                </div>
                <div className={styles.metaDivider} />
                <div className={styles.metaItem}>
                  <span className={styles.metaVal}>{s.students}</span>
                  <span className={styles.metaKey}>Students</span>
                </div>
                <div className={styles.metaDivider} />
                <div className={styles.metaItem}>
                  <span className={styles.metaVal}>{s.courses}</span>
                  <span className={styles.metaKey}>Courses</span>
                </div>
              </div>
              <button className={styles.profileBtn}>View Profile →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
