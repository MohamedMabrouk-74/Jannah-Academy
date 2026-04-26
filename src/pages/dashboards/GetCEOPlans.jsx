import { useAuth } from '../../context/AuthContext'
import { useInView } from '../../hooks/useInView'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import d from '../../components/dashboard/dash.module.css'

// getCEOPlans() method from class diagram — available to MM, Social Media, Instructor, Customer Service
const CEO_PLANS = [
  { dept: 'Marketing Manager', target: '500K revenue',      deadline: 'Jun 30, 2026', priority: 'High',   note: 'Focus on Ramadan campaigns and Q2 enrollment push.' },
  { dept: 'Marketer',          target: '200K ad reach',     deadline: 'May 31, 2026', priority: 'Medium', note: 'Boost Quran and Arabic courses on Meta and TikTok.' },
  { dept: 'Social Media',      target: '50K followers',     deadline: 'Jul 31, 2026', priority: 'Medium', note: 'Consistent posting schedule, 2x reels per week.' },
  { dept: 'Instructor',        target: '95% completion',    deadline: 'Jun 1, 2026',  priority: 'High',   note: 'Improve L6-L8 lesson engagement and reduce drop-off.' },
  { dept: 'Customer Service',  target: '<4m response time', deadline: 'May 1, 2026',  priority: 'Low',    note: 'Reduce ticket backlog, hire 1 extra agent.' },
]

const PRIORITY_COLOR = { High: '#f87171', Medium: '#fbbf24', Low: '#4ade80' }

export default function GetCEOPlans() {
  const { user } = useAuth()
  const [ref, inView] = useInView()

  // Show only the plan relevant to the current user's role
  const myPlan = CEO_PLANS.find(p => p.dept === user?.role) || null
  const allPlans = user?.role === 'CEO' ? CEO_PLANS : CEO_PLANS

  return (
    <DashboardLayout
      avatar={user?.config?.avatar}
      title="CEO Plans"
      subtitle={`${user?.role} · Strategic direction from CEO`}
    >
      <div style={{ padding: '24px 32px' }}>
        {/* My assigned plan highlighted */}
        {myPlan && (
          <div style={{
            background: 'rgba(124,106,247,0.08)',
            border: '1px solid rgba(124,106,247,0.3)',
            borderRadius: 16,
            padding: '20px 24px',
            marginBottom: 24,
          }}>
            <div style={{ fontSize: 11, letterSpacing: 1, color: '#a29bfe', marginBottom: 8, fontWeight: 600 }}>YOUR ASSIGNED PLAN</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#f0eeff', fontFamily: 'var(--font-display)', marginBottom: 4 }}>{myPlan.target}</div>
                <div style={{ fontSize: 13, color: 'rgba(240,238,255,0.55)' }}>Deadline: {myPlan.deadline}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: PRIORITY_COLOR[myPlan.priority], background: PRIORITY_COLOR[myPlan.priority] + '18', padding: '4px 12px', borderRadius: 20, alignSelf: 'center' }}>
                {myPlan.priority} Priority
              </span>
            </div>
            {myPlan.note && (
              <div style={{ marginTop: 14, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, fontSize: 13, color: 'rgba(240,238,255,0.65)', lineHeight: 1.6 }}>
                💬 "{myPlan.note}"
              </div>
            )}
          </div>
        )}

        {/* All plans overview */}
        <div style={{ fontSize: 13, color: 'rgba(240,238,255,0.4)', marginBottom: 14 }}>All Department Plans</div>
        <div ref={ref} className={d.tableWrap} style={{ margin: 0 }}>
          <table>
            <thead><tr><th>Department</th><th>Target</th><th>Deadline</th><th>Priority</th><th>Notes</th></tr></thead>
            <tbody>
              {allPlans.map((p, i) => (
                <tr key={p.dept} style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateX(0)' : 'translateX(-12px)',
                  transition: `opacity 0.4s ease ${i * 70}ms, transform 0.4s ease ${i * 70}ms`,
                  background: p.dept === user?.role ? 'rgba(124,106,247,0.06)' : 'transparent',
                }}>
                  <td className={d.tdBold}>{p.dept} {p.dept === user?.role && '← you'}</td>
                  <td>{p.target}</td>
                  <td style={{ color: 'rgba(240,238,255,0.5)' }}>{p.deadline}</td>
                  <td><span style={{ fontSize: 12, fontWeight: 600, color: PRIORITY_COLOR[p.priority] }}>{p.priority}</span></td>
                  <td style={{ fontSize: 12, color: 'rgba(240,238,255,0.5)', maxWidth: 200 }}>{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
