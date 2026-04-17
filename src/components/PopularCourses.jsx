import { useNavigate } from 'react-router-dom'
import styles from './PopularCourses.module.css'

const COURSES = [
  {
    title: 'Quran Memorization',
    level: 'All Levels',
    levelColor: '#7c6af7',
    rating: 4.9,
    students: 842,
    price: 49,
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
  },
  {
    title: 'Arabic Language Mastery',
    level: 'Beginner → Advanced',
    levelColor: '#06b6d4',
    rating: 4.8,
    students: 631,
    price: 39,
    gradient: 'linear-gradient(135deg, #0c2a3a 0%, #0e4a6a 100%)',
  },
  {
    title: 'Islamic Jurisprudence',
    level: 'Intermediate',
    levelColor: '#10b981',
    rating: 4.9,
    students: 412,
    price: 59,
    gradient: 'linear-gradient(135deg, #0a2a1e 0%, #134e35 100%)',
  },
]

export default function PopularCourses() {
  const navigate = useNavigate()

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Popular Courses</h2>
          <a href="#" className={styles.viewAll}>View All &rsaquo;</a>
        </div>

        <div className={styles.grid}>
          {COURSES.map((course, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.thumb} style={{ background: course.gradient }}>
                <span
                  className={styles.levelBadge}
                  style={{ color: course.levelColor, borderColor: course.levelColor + '55', background: course.levelColor + '15' }}
                >
                  {course.level}
                </span>
                <div className={styles.thumbIcon}>📖</div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <div className={styles.meta}>
                  <span className={styles.rating}>★ {course.rating}</span>
                  <span className={styles.dot}>·</span>
                  <span className={styles.students}>{course.students.toLocaleString()} students</span>
                </div>
                <div className={styles.bottom}>
                  <span className={styles.price}>
                    <span className={styles.priceNum}>${course.price}</span>
                    <span className={styles.pricePer}>/mo</span>
                  </span>
                  <button className={styles.enrollBtn} onClick={() => navigate('/register')}>
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
