import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegistration } from '../context/RegistrationContext'
import { FlowLayout, StepBadge } from '../components/FlowLayout'
import f from '../components/FormFields.module.css'

const BENEFITS = [
  { icon: '⚡', text: 'Get started in under 5 minutes' },
  { icon: '🎓', text: 'Learn from certified scholars' },
  { icon: '📱', text: 'Study on any device, anywhere' },
  { icon: '💬', text: 'Live Q&A sessions weekly' },
  { icon: '🏅', text: 'Earn recognized certificates' },
  { icon: '✕', text: 'Cancel subscription anytime' },
]

const COURSES = [
  'Quran Memorization — Tajweed & Hifz',
  'Arabic Language Mastery',
  'Islamic Jurisprudence (Fiqh)',
  'Aqeedah Essentials',
  'Seerah of the Prophet ﷺ',
]

export default function RegistrationPage() {
  const navigate = useNavigate()
  const { formData, updateForm, setCurrentStep } = useRegistration()
  const [local, setLocal] = useState({ ...formData })

  const set = (k) => (e) => setLocal((p) => ({ ...p, [k]: e.target.value }))
  const setCheck = (k) => (e) => setLocal((p) => ({ ...p, [k]: e.target.checked }))

  const handleSubmit = () => {
    updateForm(local)
    setCurrentStep(2)
    navigate('/payment')
  }

  const aside = (
    <>
      <div className={f.asideCard}>
        <p className={f.asideTitle}>WHY 2,847 STUDENTS CHOSE US</p>
        {BENEFITS.map((b, i) => (
          <div key={i} className={f.benefitItem}>
            <span className={f.benefitIcon}>{b.icon}</span>
            {b.text}
          </div>
        ))}
      </div>

      <div className={f.asideCard}>
        <p style={{ fontSize: 16, fontWeight: 600, color: '#f0eeff', marginBottom: 4 }}>
          Growing community
        </p>
        <p style={{ fontSize: 13, color: 'rgba(240,238,255,0.45)', marginBottom: 16 }}>
          New enrollments monthly
        </p>
        {/* Mini chart SVG */}
        <svg viewBox="0 0 220 60" style={{ width: '100%' }}>
          <polyline
            points="0,50 40,42 80,38 120,28 160,18 200,8 220,5"
            fill="none"
            stroke="#7c6af7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="0,50 40,42 80,38 120,28 160,18 200,8 220,5 220,60 0,60"
            fill="rgba(124,106,247,0.08)"
          />
          {['Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => (
            <text
              key={m}
              x={i * 50 + 5}
              y={58}
              fontSize="9"
              fill="rgba(240,238,255,0.3)"
            >
              {m}
            </text>
          ))}
        </svg>
      </div>
    </>
  )

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <FlowLayout aside={aside}>
        <button className={f.backLink} onClick={() => navigate('/')}>
          ‹ Back to Landing
        </button>

        <StepBadge step={1} total={4} label="Create Account" />

        <h1 className={f.pageTitle}>Join Jannah Academy</h1>
        <p className={f.pageSub}>Fill in your details to start your learning journey</p>

        <div className={f.row}>
          <div className={f.field}>
            <label className={f.label}>First Name</label>
            <div className={f.inputWrap}>
              <span className={f.inputIcon}>👤</span>
              <input
                className={f.input}
                placeholder="Ahmed"
                value={local.firstName}
                onChange={set('firstName')}
              />
            </div>
          </div>
          <div className={f.field}>
            <label className={f.label}>Last Name</label>
            <div className={f.inputWrap}>
              <span className={f.inputIcon}>👤</span>
              <input
                className={f.input}
                placeholder="Al-Rashid"
                value={local.lastName}
                onChange={set('lastName')}
              />
            </div>
          </div>
        </div>

        <div className={f.field}>
          <label className={f.label}>Email Address</label>
          <div className={f.inputWrap}>
            <span className={f.inputIcon}>✉</span>
            <input
              className={f.input}
              type="email"
              placeholder="ahmed@email.com"
              value={local.email}
              onChange={set('email')}
            />
          </div>
        </div>

        <div className={f.field}>
          <label className={f.label}>Phone Number</label>
          <div className={f.inputWrap}>
            <span className={f.inputIcon}>📞</span>
            <input
              className={f.input}
              type="tel"
              placeholder="+966 5x xxx xxxx"
              value={local.phone}
              onChange={set('phone')}
            />
          </div>
        </div>

        <div className={f.field}>
          <label className={f.label}>Password</label>
          <div className={f.inputWrap}>
            <span className={f.inputIcon}>🔒</span>
            <input
              className={f.input}
              type="password"
              placeholder="••••••••"
              value={local.password}
              onChange={set('password')}
            />
          </div>
        </div>

        <div className={f.field}>
          <label className={f.label}>Choose Your First Course</label>
          <select
            className={f.select}
            value={local.course}
            onChange={set('course')}
          >
            {COURSES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className={f.checkRow}>
          <input
            type="checkbox"
            className={f.checkbox}
            checked={local.agreedToTerms}
            onChange={setCheck('agreedToTerms')}
          />
          <label className={f.checkLabel}>
            I agree to the <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>
          </label>
        </div>

        <button className={f.submitBtn} onClick={handleSubmit}>
          Continue to Payment →
        </button>
      </FlowLayout>
    </div>
  )
}
