import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegistration } from '../context/RegistrationContext'
import { FlowLayout, StepBadge } from '../components/FlowLayout'
import f from '../components/FormFields.module.css'
import styles from './PaymentPage.module.css'

export default function PaymentPage() {
  const navigate = useNavigate()
  const { formData, setCurrentStep } = useRegistration()
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', zip: '', name: '' })

  const set = (k) => (e) => setCard((p) => ({ ...p, [k]: e.target.value }))

  const handlePay = () => {
    setCurrentStep(3)
    navigate('/confirmation')
  }

  const aside = (
    <div className={f.asideCard}>
      <p className={f.asideTitle} style={{ marginBottom: 20 }}>Order Summary</p>

      <div className={styles.courseRow}>
        <div className={styles.courseThumb}>📖</div>
        <div>
          <div className={styles.courseName}>Quran Memorization</div>
          <div className={styles.coursePlan}>Annual Plan · $29/mo</div>
        </div>
      </div>

      <div className={styles.lineItems}>
        {[
          ['Course Access', '$29/mo'],
          ['Live Sessions', 'Included'],
          ['Certificate', 'Included'],
          ['Processing Fee', '$0.00'],
        ].map(([label, val]) => (
          <div key={label} className={styles.lineItem}>
            <span className={styles.lineLabel}>{label}</span>
            <span className={styles.lineVal}>{val}</span>
          </div>
        ))}
      </div>

      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Total Due Today</span>
        <span className={styles.totalVal}>$348</span>
      </div>

      <div className={styles.perks}>
        {['Full course access immediately', 'Weekly live scholar sessions', 'Tajweed correction & feedback', 'Completion certificate'].map((p) => (
          <div key={p} className={styles.perk}>
            <span className={styles.perkCheck}>✓</span> {p}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <FlowLayout aside={aside}>
        <button className={f.backLink} onClick={() => navigate('/register')}>
          ‹ Back
        </button>

        <StepBadge step={2} total={4} label="Choose Plan & Pay" />

        <h2 className={f.pageTitle} style={{ fontSize: 28 }}>Payment Details</h2>

        <div className={f.field} style={{ marginTop: 24 }}>
          <label className={f.label}>Card Number</label>
          <div className={f.inputWrap}>
            <span className={f.inputIcon}>💳</span>
            <input
              className={f.input}
              placeholder="1234 5678 9012 3456"
              value={card.number}
              onChange={set('number')}
              maxLength={19}
            />
          </div>
        </div>

        <div className={f.row} style={{ gap: 12 }}>
          <div className={f.field}>
            <label className={f.label}>Expiry</label>
            <div className={f.inputWrap}>
              <input className={f.input} placeholder="MM / YY" value={card.expiry} onChange={set('expiry')} maxLength={7} />
            </div>
          </div>
          <div className={f.field}>
            <label className={f.label}>CVV</label>
            <div className={f.inputWrap}>
              <input className={f.input} placeholder="123" value={card.cvv} onChange={set('cvv')} maxLength={4} />
            </div>
          </div>
          <div className={f.field}>
            <label className={f.label}>ZIP Code</label>
            <div className={f.inputWrap}>
              <input className={f.input} placeholder="12345" value={card.zip} onChange={set('zip')} maxLength={10} />
            </div>
          </div>
        </div>

        <div className={f.field}>
          <label className={f.label}>Name on Card</label>
          <div className={f.inputWrap}>
            <input
              className={f.input}
              placeholder={formData.firstName ? `${formData.firstName} ${formData.lastName}` : 'Ahmed Al-Rashid'}
              value={card.name}
              onChange={set('name')}
            />
          </div>
        </div>

        <button className={f.submitBtn} onClick={handlePay} style={{ marginTop: 8 }}>
          🔒 Pay $348 Securely
        </button>

        <p className={styles.secureNote}>
          🔒 256-bit SSL encryption · PCI DSS compliant · Cancel anytime
        </p>
      </FlowLayout>
    </div>
  )
}
