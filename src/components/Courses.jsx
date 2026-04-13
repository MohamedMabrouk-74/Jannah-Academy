import { useState } from 'react'
import styles from './Courses.module.css'

const CATEGORIES = ['All', 'Quran', 'Arabic', 'Fiqh', 'Aqeedah', 'Seerah']

const COURSES = [
  { title: 'Foundations of Tajweed', category: 'Quran', level: 'Beginner', duration: '8 weeks', students: 420, rating: 4.9 },
  { title: 'Quranic Memorization Track', category: 'Quran', level: 'Intermediate', duration: '6 months', students: 210, rating: 5.0 },
  { title: 'Arabic for Beginners', category: 'Arabic', level: 'Beginner', duration: '10 weeks', students: 680, rating: 4.8 },
  { title: 'Classical Arabic Grammar', category: 'Arabic', level: 'Advanced', duration: '16 weeks', students: 190, rating: 4.9 },
  { title: 'Introduction to Fiqh', category: 'Fiqh', level: 'Beginner', duration: '6 weeks', students: 340, rating: 4.7 },
  { title: 'Usul al-Fiqh Masterclass', category: 'Fiqh', level: 'Advanced', duration: '12 weeks', students: 130, rating: 5.0 },
  { title: 'Aqeedah Essentials', category: 'Aqeedah', level: 'Beginner', duration: '8 weeks', students: 290, rating: 4.8 },
  { title: 'Seerah of the Prophet ﷺ', category: 'Seerah', level: 'Beginner', duration: '14 weeks', students: 510, rating: 4.9 },
]

const LEVEL_COLOR = {
  Beginner: styles.levelBeginner,
  Intermediate: styles.levelIntermediate,
  Advanced: styles.levelAdvanced,
}

export default function Courses() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? COURSES : COURSES.filter((c) => c.category === active)

  return (
    <section id="courses-list" className={styles.section}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Curriculum</span>
          <h2 className="section-title">
            Explore our <span className="accent">courses</span>
          </h2>
        </div>

        {/* Filter tabs */}
        <div className={styles.tabs}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.tab} ${active === cat ? styles.tabActive : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((course, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={`${styles.level} ${LEVEL_COLOR[course.level]}`}>
                  {course.level}
                </span>
                <span className={styles.category}>{course.category}</span>
              </div>
              <h3 className={styles.courseTitle}>{course.title}</h3>
              <div className={styles.meta}>
                <span>⏱ {course.duration}</span>
                <span>👥 {course.students.toLocaleString()}</span>
                <span>★ {course.rating}</span>
              </div>
              <button className={styles.enrollBtn}>Enroll Now →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
