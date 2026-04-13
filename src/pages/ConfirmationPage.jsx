import { useNavigate } from 'react-router-dom'
import { useRegistration } from '../context/RegistrationContext'
import f from '../components/FormFields.module.css'
import styles from './ConfirmationPage.module.css'

const today = new Date()
const nextYear = new Date(today)
nextYear.setFullYear(today.getFullYear() + 1)
const fmt = (d) => d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

export default function ConfirmationPage() {
  const navigate = useNavigate()
  const { formData, setCurrentStep } = useRegistration()

  const handleNext = () => {
    setCurrentStep(4)
    navigate('/verify')
  }

  return (
    <div className={styles.page}>
      <div className={styles.glow} />
      <div className={styles.icon}>✓</div>
      <h1 className={styles.title}>Welcome to Jannah<br />Academy!</h1>
      <p className={styles.sub}>
        Your enrollment in{' '}
        <span className={styles.highlight}>Quran Memorization Program</span> is
        confirmed. An email confirmation has been sent to{' '}
        <span className={styles.email}>{formData.email || 'ahmed@email.com'}</span>
      </p>

      <div className={styles.orderCard}>
        <p className={styles.orderTitle}>ORDER DETAILS</p>
        {[
          ['Order ID', '#JA-2026-8471'],
          ['Course', 'Quran Memorization Program'],
          ['Plan', 'Annual Subscription'],
          ['Start Date', fmt(today)],
          ['Next Billing', fmt(nextYear)],
          ['Amount Charged', '$348.00'],
        ].map(([label, val]) => (
          <div key={label} className={styles.detailRow}>
            <span className={styles.detailLabel}>{label}</span>
            <span className={styles.detailVal} style={label === 'Amount Charged' ? { color: '#a29bfe' } : {}}>
              {val}
            </span>
          </div>
        ))}
      </div>

      <button className={f.submitBtn} style={{ maxWidth: 420, margin: '0 auto' }} onClick={handleNext}>
        Enter Verification Code →
      </button>

      <button
        style={{ background: 'none', border: 'none', color: 'rgba(240,238,255,0.45)', fontSize: 14, marginTop: 16, cursor: 'pointer' }}
      >
        Download Receipt
      </button>
    </div>
  )
}
