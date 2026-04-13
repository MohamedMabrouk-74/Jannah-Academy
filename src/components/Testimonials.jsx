import styles from './Testimonials.module.css'

const TESTIMONIALS = [
  {
    quote:
      'Jannah Academy completely transformed my relationship with the Quran. The structured approach and live sessions with scholars made all the difference.',
    name: 'Fatima Hassan',
    location: 'UAE',
    rating: 5,
    initials: 'F',
    color: '#7c6af7',
  },
  {
    quote:
      'The Arabic language course is phenomenal. Within 6 months I could read classical Islamic texts. The AI-powered personalization is a game-changer.',
    name: 'Omar Abdullah',
    location: 'UK',
    rating: 5,
    initials: 'O',
    color: '#5a4fcf',
  },
]

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>What Students Say</h2>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={styles.card}>
              {/* Quote icon */}
              <div className={styles.quoteIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="6" fill="rgba(124,106,247,0.15)" />
                  <path d="M7 10h3v3H7v3H5v-3H3v-3h2V8h2v2zm8 0h3v3h-3v3h-2v-3h-2v-3h2V8h2v2z" fill="#a29bfe" />
                </svg>
              </div>

              <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>

              <div className={styles.footer}>
                <div className={styles.author}>
                  <div
                    className={styles.avatar}
                    style={{ background: `linear-gradient(135deg, ${t.color}99, ${t.color})` }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className={styles.name}>{t.name}</div>
                    <div className={styles.location}>{t.location}</div>
                  </div>
                </div>
                <div className={styles.stars}>
                  {'★'.repeat(t.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
