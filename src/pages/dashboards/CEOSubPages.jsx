import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useInView } from '../../hooks/useInView'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import d from '../../components/dashboard/dash.module.css'

function FadePanel({ children, delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={d.panel} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

/* ── CEO.setPlans() ──────────────────────────────────────── */
const DEPARTMENTS = ['Marketing Manager', 'Marketer', 'Social Media Manager', 'Instructor', 'Customer Service']

export function CEOSetPlans() {
  const { user } = useAuth()
  const [plans, setPlans] = useState({
    'Marketing Manager':    { target: '500K', deadline: '2026-06-30', priority: 'High',   note: '' },
    'Marketer':             { target: '200K', deadline: '2026-05-31', priority: 'Medium', note: '' },
    'Social Media Manager': { target: '50K followers', deadline: '2026-07-31', priority: 'Medium', note: '' },
    'Instructor':           { target: '95% completion', deadline: '2026-06-01', priority: 'High', note: '' },
    'Customer Service':     { target: '<4m response', deadline: '2026-05-01', priority: 'Low', note: '' },
  })
  const [saved, setSaved] = useState(false)

  const update = (dept, field, val) =>
    setPlans(p => ({ ...p, [dept]: { ...p[dept], [field]: val } }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const PRIORITY_COLORS = { High: '#f87171', Medium: '#fbbf24', Low: '#4ade80' }

  return (
    <DashboardLayout avatar={user?.config?.avatar} title="Set Plans" subtitle="CEO · Distribute plans to departments">
      <div style={{ padding: '24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 16 }}>
          {DEPARTMENTS.map((dept, i) => (
            <FadePanel key={dept} delay={i * 80}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(124,106,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📋</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#f0eeff' }}>{dept}</div>
                  <div style={{ fontSize: 11, color: 'rgba(240,238,255,0.4)' }}>Assigned plan</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(240,238,255,0.4)', marginBottom: 4 }}>Target</div>
                  <input
                    value={plans[dept].target}
                    onChange={e => update(dept, 'target', e.target.value)}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 10px', color: '#f0eeff', fontSize: 13, outline: 'none' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(240,238,255,0.4)', marginBottom: 4 }}>Deadline</div>
                  <input
                    type="date"
                    value={plans[dept].deadline}
                    onChange={e => update(dept, 'deadline', e.target.value)}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 10px', color: '#f0eeff', fontSize: 13, outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: 'rgba(240,238,255,0.4)', marginBottom: 6 }}>Priority</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['High', 'Medium', 'Low'].map(p => (
                    <button key={p} onClick={() => update(dept, 'priority', p)} style={{
                      flex: 1, padding: '6px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      border: plans[dept].priority === p ? `1px solid ${PRIORITY_COLORS[p]}` : '1px solid rgba(255,255,255,0.08)',
                      background: plans[dept].priority === p ? PRIORITY_COLORS[p] + '20' : 'none',
                      color: plans[dept].priority === p ? PRIORITY_COLORS[p] : 'rgba(240,238,255,0.4)',
                    }}>{p}</button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: 'rgba(240,238,255,0.4)', marginBottom: 4 }}>Notes</div>
                <textarea
                  value={plans[dept].note}
                  onChange={e => update(dept, 'note', e.target.value)}
                  placeholder="Add instructions..."
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '8px 10px', color: '#f0eeff', fontSize: 12, outline: 'none', resize: 'none', minHeight: 60, fontFamily: 'var(--font-sans)' }}
                />
              </div>
            </FadePanel>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
          <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(240,238,255,0.6)', padding: '10px 24px', borderRadius: 10, fontSize: 14, cursor: 'pointer' }}>
            Reset
          </button>
          <button onClick={handleSave} style={{
            background: saved ? 'linear-gradient(135deg,#059669,#34d399)' : 'linear-gradient(135deg,#5a4fcf,#7c6af7)',
            border: 'none', color: '#fff', padding: '10px 28px', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer',
            transition: 'background 0.3s',
          }}>
            {saved ? '✓ Plans Saved!' : '📤 Send Plans to Departments'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

/* ── CEO.askForReports() ─────────────────────────────────── */
const REPORTS = [
  { from: 'Marketing Manager', title: 'Q1 Campaign Performance',    date: 'Apr 9',  status: 'Received', statusC: '#4ade80', size: '2.4 MB' },
  { from: 'Marketer',          title: 'Monthly Ad Spend Summary',   date: 'Apr 10', status: 'Pending',  statusC: '#fbbf24', size: '—' },
  { from: 'Social Media',      title: 'Follower Growth Apr 2026',   date: 'Apr 8',  status: 'Received', statusC: '#4ade80', size: '1.1 MB' },
  { from: 'Instructor',        title: 'Student Progress Report',    date: 'Apr 11', status: 'Pending',  statusC: '#fbbf24', size: '—' },
  { from: 'Customer Service',  title: 'Ticket Resolution Report',   date: 'Apr 7',  status: 'Received', statusC: '#4ade80', size: '0.8 MB' },
]

export function CEOAskReports() {
  const { user } = useAuth()
  const [requesting, setRequesting] = useState(null)
  const [ref, inView] = useInView()

  const handleRequest = (from) => {
    setRequesting(from)
    setTimeout(() => setRequesting(null), 1500)
  }

  return (
    <DashboardLayout avatar={user?.config?.avatar} title="Ask for Reports" subtitle="CEO · Request & review department reports">
      <div style={{ padding: '24px 32px' }}>
        <div className={d.tableWrap} style={{ margin: 0 }}>
          <div className={d.tableHeader}>
            <span className={d.tableTitle}>Department Reports</span>
            <span style={{ fontSize: 12, color: '#4ade80' }}>3 Received · 2 Pending</span>
          </div>
          <table>
            <thead>
              <tr><th>Department</th><th>Report</th><th>Date</th><th>Size</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody ref={ref}>
              {REPORTS.map((r, i) => (
                <tr key={r.from} style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateX(0)' : 'translateX(-12px)',
                  transition: `opacity 0.4s ease ${i * 70}ms, transform 0.4s ease ${i * 70}ms`,
                }}>
                  <td className={d.tdBold}>{r.from}</td>
                  <td>{r.title}</td>
                  <td style={{ color: 'rgba(240,238,255,0.5)' }}>{r.date}</td>
                  <td>{r.size}</td>
                  <td><span style={{ fontSize: 12, fontWeight: 600, color: r.statusC }}>{r.status}</span></td>
                  <td>
                    {r.status === 'Received'
                      ? <button style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', padding: '5px 12px', borderRadius: 7, fontSize: 12, cursor: 'pointer' }}>↓ Download</button>
                      : <button onClick={() => handleRequest(r.from)} style={{
                          background: requesting === r.from ? 'rgba(251,191,36,0.15)' : 'rgba(124,106,247,0.12)',
                          border: `1px solid ${requesting === r.from ? 'rgba(251,191,36,0.4)' : 'rgba(124,106,247,0.3)'}`,
                          color: requesting === r.from ? '#fbbf24' : '#a29bfe',
                          padding: '5px 12px', borderRadius: 7, fontSize: 12, cursor: 'pointer',
                        }}>
                          {requesting === r.from ? '✓ Requested' : '📨 Request'}
                        </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}

/* ── CEO.trackLevels() ───────────────────────────────────── */
const LEVELS = [
  { dept: 'Marketing Manager', kpi: 'Campaign ROI',    current: 87, target: 90, trend: '+5%',  up: true },
  { dept: 'Marketer',          kpi: 'Lead Conversion', current: 74, target: 80, trend: '+11%', up: true },
  { dept: 'Social Media',      kpi: 'Engagement Rate', current: 92, target: 85, trend: '+8.4%',up: true },
  { dept: 'Instructor',        kpi: 'Avg Completion',  current: 78, target: 85, trend: '+7%',  up: true },
  { dept: 'Customer Service',  kpi: 'CSAT Score',      current: 98, target: 95, trend: '+1.2%',up: true },
  { dept: 'Students',          kpi: 'Retention Rate',  current: 94, target: 90, trend: '+2.1%',up: true },
]

function TrackBar({ current, target, delay }) {
  const [ref, inView] = useInView()
  const pct = Math.min(current, 100)
  const tPct = Math.min(target, 100)
  const color = current >= target ? '#4ade80' : current >= target * 0.9 ? '#fbbf24' : '#f87171'
  return (
    <div ref={ref} style={{ position: 'relative', height: 8, background: 'rgba(255,255,255,0.07)', borderRadius: 6, overflow: 'hidden', marginTop: 8 }}>
      <div style={{ height: '100%', background: color, borderRadius: 6, width: inView ? `${pct}%` : '0%', transition: `width 1s ease ${delay}ms` }} />
      <div style={{ position: 'absolute', top: 0, left: `${tPct}%`, width: 2, height: '100%', background: 'rgba(255,255,255,0.4)', transform: 'translateX(-50%)' }} />
    </div>
  )
}

export function CEOTrackLevels() {
  const { user } = useAuth()
  return (
    <DashboardLayout avatar={user?.config?.avatar} title="Track Levels" subtitle="CEO · Monitor department KPI performance">
      <div style={{ padding: '24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
          {LEVELS.map((l, i) => (
            <FadePanel key={l.dept} delay={i * 70}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#f0eeff' }}>{l.dept}</div>
                  <div style={{ fontSize: 12, color: 'rgba(240,238,255,0.45)' }}>{l.kpi}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: l.up ? '#4ade80' : '#f87171', alignSelf: 'center' }}>
                  {l.up ? '↑' : '↓'} {l.trend}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(240,238,255,0.4)', marginBottom: 2 }}>
                <span>Current: <strong style={{ color: '#f0eeff' }}>{l.current}%</strong></span>
                <span>Target: {l.target}%</span>
              </div>
              <TrackBar current={l.current} target={l.target} delay={i * 80 + 200} />
            </FadePanel>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}