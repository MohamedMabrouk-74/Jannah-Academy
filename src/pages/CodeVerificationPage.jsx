import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegistration } from '../context/RegistrationContext'
import f from '../components/FormFields.module.css'
import styles from './CodeVerificationPage.module.css'

export default function CodeVerificationPage() {
  const navigate = useNavigate()
  const { formData } = useRegistration()
  const [digits, setDigits] = useState(Array(6).fill(''))
  const refs = Array.from({ length: 6 }, () => useRef(null))

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const next = [...digits]
    next[i] = val
    setDigits(next)
    if (val && i < 5) refs[i + 1].current?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs[i - 1].current?.focus()
    }
  }

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const next = Array(6).fill('')
    text.split('').forEach((ch, i) => { next[i] = ch })
    setDigits(next)
    refs[Math.min(text.length, 5)].current?.focus()
    e.preventDefault()
  }

  const filled = digits.every((d) => d !== '')

  return (
    <div className={styles.page}>
      {/* envelope icon */}
      <div className={styles.mailIcon}>✉</div>

      <div className={styles.stepBadge}>Step 4 of 4 · Verify Email</div>

      <h1 className={styles.title}>Check Your Email</h1>
      <p className={styles.sub}>
        We've sent a 6-digit verification code to<br />
        <span className={styles.email}>{formData.email || 'ahmed@email.com'}</span>
      </p>

      {/* OTP inputs */}
      <div className={styles.otpRow} onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={refs[i]}
            className={`${styles.otpBox} ${d ? styles.otpFilled : ''}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
          />
        ))}
      </div>

      <button
        className={f.submitBtn}
        style={{ maxWidth: 380, margin: '0 auto', opacity: filled ? 1 : 0.5 }}
        disabled={!filled}
        onClick={() => navigate('/')}
      >
        Verify & Access Course
      </button>

      <p className={styles.resendRow}>
        Didn't receive the code?{' '}
        <button className={styles.resendBtn}>↺ Resend Code (expires in 10:00)</button>
      </p>

      <button className={f.backLink} onClick={() => navigate('/confirmation')} style={{ marginTop: 20 }}>
        ‹ Back to Confirmation
      </button>
    </div>
  )
}
