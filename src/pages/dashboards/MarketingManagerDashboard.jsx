import { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import { AnimatedLineChart, AnimatedDonut } from '../../components/dashboard/Charts'
import d from '../../components/dashboard/dash.module.css'
import styles from './MarketingManagerDashboard.module.css'

const WEEKS = ['W1','W2','W3','W4','W5','W6']
const REACH_W  = [14000,16000,21000,20500,22000,27000]
const CLICKS_W = [4000, 5500, 7500, 8000, 9500, 12000]

const DONUT_TRAFFIC = [
  { label:'Organic',  pct:38, color:'#a29bfe' },
  { label:'Paid Ads', pct:27, color:'#60a5fa' },
  { label:'Social',   pct:22, color:'#2dd4bf' },
  { label:'Email',    pct:13, color:'#fbbf24' },
]

const INITIAL_CAMPAIGNS = [
  { name:'Ramadan Enrollment Drive', channel:'Multi-channel',   budget:'$12,000', spent:'$8,400',  leads:1840, conv:'12.4%', status:'Active',    statusC:'badgeGreen' },
  { name:'Arabic Starter Campaign',  channel:'Meta Ads',        budget:'$6,500',  spent:'$6,500',  leads:920,  conv:'9.8%',  status:'Completed', statusC:'badgeBlue'  },
  { name:'Quran Summer Program',     channel:'Google + Email',  budget:'$9,200',  spent:'$3,100',  leads:640,  conv:'14.2%', status:'Active',    statusC:'badgeGreen' },
  { name:'Scholar Webinar Series',   channel:'Email / YouTube', budget:'$2,800',  spent:'$1,200',  leads:380,  conv:'18.6%', status:'Paused',    statusC:'badgeAmber' },
  { name:'Global Reach Initiative',  channel:'TikTok + IG',    budget:'$14,000', spent:'$5,800',  leads:2100, conv:'8.2%',  status:'Active',    statusC:'badgeGreen' },
]

const CHANNELS = ['Multi-channel', 'Meta Ads', 'Google + Email', 'Email / YouTube', 'TikTok + IG', 'Google Ads', 'YouTube']

function FadePanel({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={d.panel} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>{children}</div>
  )
}

/* ── Set Marketing Strategy Modal */
function StrategyModal({ onClose }) {
  const [form, setForm] = useState({
    goal: 'Increase enrollment by 30%',
    budget: '72000',
    channels: ['Meta Ads', 'Google + Email'],
    priority: 'Quran Memorization',
    timeline: '2026-06-30',
    kpi: '15%',
  })
  const [saved, setSaved] = useState(false)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const toggleChannel = (ch) => {
    setForm(p => ({
      ...p,
      channels: p.channels.includes(ch)
        ? p.channels.filter(c => c !== ch)
        : [...p.channels, ch],
    }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => { setSaved(false); onClose() }, 1500)
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <div className={styles.modalTitle}>Set Marketing Strategy</div>
            <div className={styles.modalSub}>updateMarketingStrategy() — Define the campaign direction</div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.modalBody}>
          {/* Goal */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Strategy Goal</label>
            <input
              className={styles.input}
              value={form.goal}
              onChange={e => set('goal', e.target.value)}
              placeholder="e.g. Increase enrollment by 30%"
            />
          </div>

          {/* Budget + KPI */}
          <div className={styles.row2}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Total Budget ($)</label>
              <input
                className={styles.input}
                type="number"
                value={form.budget}
                onChange={e => set('budget', e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Target Conversion KPI</label>
              <input
                className={styles.input}
                value={form.kpi}
                onChange={e => set('kpi', e.target.value)}
                placeholder="e.g. 15%"
              />
            </div>
          </div>

          {/* Channels */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Active Channels</label>
            <div className={styles.chipGroup}>
              {CHANNELS.map(ch => (
                <button
                  key={ch}
                  className={`${styles.chip} ${form.channels.includes(ch) ? styles.chipActive : ''}`}
                  onClick={() => toggleChannel(ch)}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Course + Deadline */}
          <div className={styles.row2}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Priority Course</label>
              <select className={styles.input} value={form.priority} onChange={e => set('priority', e.target.value)}>
                {['Quran Memorization','Arabic Language','Islamic Jurisprudence','Tajweed Mastery'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Strategy Deadline</label>
              <input
                className={styles.input}
                type="date"
                value={form.timeline}
                onChange={e => set('timeline', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnCancel} onClick={onClose}>Cancel</button>
          <button
            className={styles.btnSave}
            onClick={handleSave}
            style={saved ? { background: 'linear-gradient(135deg,#059669,#34d399)' } : {}}
          >
            {saved ? '✓ Strategy Saved!' : '📤 Save Strategy'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Generate Report Modal  */
function ReportModal({ onClose }) {
  const [type, setType] = useState('Monthly')
  const [sections, setSections] = useState(['Revenue Analysis','Campaign Performance','Conversion Rates'])
  const [email, setEmail] = useState('mm@academy.com')
  const [generating, setGenerating] = useState(false)
  const [done, setDone] = useState(false)

  const ALL_SECTIONS = ['Revenue Analysis','Campaign Performance','Conversion Rates','Traffic Sources','Budget Utilisation','Lead Quality','ROI by Channel']

  const toggleSection = s => setSections(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])

  // generateLoadReport() from class diagram
  const handleGenerate = async () => {
    setGenerating(true)
    await new Promise(r => setTimeout(r, 1800))
    setGenerating(false)
    setDone(true)
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <div className={styles.modalTitle}>Generate Report</div>
            <div className={styles.modalSub}>generateLoadReport() — Build & send marketing report</div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {!done ? (
          <>
            <div className={styles.modalBody}>
              {/* Report Type */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Report Type</label>
                <div className={styles.typeGroup}>
                  {['Monthly','Quarterly','Yearly','Custom'].map(t => (
                    <button
                      key={t}
                      className={`${styles.typeBtn} ${type === t ? styles.typeBtnActive : ''}`}
                      onClick={() => setType(t)}
                    >{t}</button>
                  ))}
                </div>
              </div>

              {/* Sections */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Include Sections</label>
                {ALL_SECTIONS.map(s => (
                  <div key={s} className={styles.checkRow} onClick={() => toggleSection(s)}>
                    <div className={`${styles.checkbox} ${sections.includes(s) ? styles.checkboxOn : ''}`}>
                      {sections.includes(s) && '✓'}
                    </div>
                    <span className={styles.checkLabel}>{s}</span>
                  </div>
                ))}
              </div>

              {/* Email */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Send to Email</label>
                <input
                  className={styles.input}
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.btnCancel} onClick={onClose}>Cancel</button>
              <button
                className={styles.btnSave}
                onClick={handleGenerate}
                disabled={generating || sections.length === 0}
                style={{ opacity: sections.length === 0 ? 0.5 : 1 }}
              >
                {generating
                  ? <span className={styles.spinner}>⏳ Generating...</span>
                  : '📊 Generate & Send'}
              </button>
            </div>
          </>
        ) : (
          <div className={styles.successBody}>
            <div className={styles.successIcon}>✓</div>
            <div className={styles.successTitle}>{type} Report Generated!</div>
            <div className={styles.successSub}>
              Sent to <strong>{email}</strong> with {sections.length} sections.<br/>
              Report ID: <code>#RPT-{Date.now().toString().slice(-6)}</code>
            </div>
            <button className={styles.btnSave} onClick={onClose} style={{ marginTop: 16, width: '100%' }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Main Dashboard  */
export default function MarketingManagerDashboard() {
  const [tableRef, tableInView] = useInView()
  const [search, setSearch]         = useState('')
  const [campaigns, setCampaigns]   = useState(INITIAL_CAMPAIGNS)
  const [showStrategy, setShowStrategy] = useState(false)
  const [showReport, setShowReport]     = useState(false)

  const filtered = campaigns.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.channel.toLowerCase().includes(search.toLowerCase())
  )

  const headerActions = (
    <>
      <button
        className={styles.btnStrategy}
        onClick={() => setShowStrategy(true)}
      >
        🎯 Set Marketing Strategy
      </button>
      <button
        className={styles.btnReport}
        onClick={() => setShowReport(true)}
      >
        📊 Generate Report
      </button>
    </>
  )

  return (
    <DashboardLayout
      avatar="MM"
      title="Marketing Manager Dashboard"
      subtitle="Campaigns & Strategy"
      actions={headerActions}
    >
      {showStrategy && <StrategyModal onClose={() => setShowStrategy(false)} />}
      {showReport   && <ReportModal  onClose={() => setShowReport(false)}   />}

      <div className={d.statsGrid}>
        <StatCard icon="🎯" iconBg="rgba(96,165,250,0.15)"  label="Active Campaigns"     value="6"     sub="3 launching next week" change="+2"     changeUp delay={0}   />
        <StatCard icon="👥" iconBg="rgba(124,106,247,0.15)" label="Total Reach"          value="284K"  sub="This month"            change="+31.4%" changeUp delay={80}  />
        <StatCard icon="📈" iconBg="rgba(74,222,128,0.15)"  label="Avg Conversion Rate" value="12.4%" sub="vs 9.8% last month"     change="+2.6%"  changeUp delay={160} />
        <StatCard icon="$"  iconBg="rgba(251,191,36,0.15)"  label="Budget Utilised"      value="$48K"  sub="of $72K total"         change="66.7%"  changeUp={false} delay={240} />
      </div>

      <div className={d.twoCol}>
        <FadePanel delay={100}>
          <div className={d.panelHeader}>
            <div>
              <div className={d.panelTitle}>Campaign Performance</div>
              <div className={d.panelSub}>6-week reach & clicks trend</div>
            </div>
          </div>
          <div className={d.chartArea}>
            <AnimatedLineChart
              labels={WEEKS}
              series={[
                { label:'Reach',  data: REACH_W,  color:'#7c6af7' },
                { label:'Clicks', data: CLICKS_W, color:'#a29bfe' },
              ]}
              yFormat={v => `${Math.round(v/1000)}K`}
            />
          </div>
          <div className={d.legend} style={{marginTop:12}}>
            <div className={d.legendItem}><div className={d.legendLine} style={{background:'#7c6af7'}}/> Reach</div>
            <div className={d.legendItem}><div className={d.legendLine} style={{background:'#a29bfe'}}/> Clicks</div>
          </div>
        </FadePanel>

        <FadePanel delay={200}>
          <div className={d.panelHeader}>
            <div>
              <div className={d.panelTitle}>Traffic Sources</div>
              <div className={d.panelSub}>Lead origin breakdown</div>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'center',margin:'12px 0 10px'}}>
            <AnimatedDonut data={DONUT_TRAFFIC} size={150} stroke={26}/>
          </div>
          {DONUT_TRAFFIC.map((item, i) => (
            <div key={item.label} style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
              <div className={d.legendItem}>
                <div className={d.legendDot} style={{background:item.color}}/>
                <span style={{fontSize:13}}>{item.label}</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:80,height:3,background:'rgba(255,255,255,0.07)',borderRadius:4,overflow:'hidden'}}>
                  <div style={{width:`${item.pct}%`,height:'100%',background:item.color,borderRadius:4,animation:`growBar 0.8s ease ${i*100+300}ms both`}}/>
                </div>
                <span style={{fontSize:12,color:'rgba(240,238,255,0.6)',minWidth:28}}>{item.pct}%</span>
              </div>
            </div>
          ))}
        </FadePanel>
      </div>

      {/* Campaigns Table */}
      <div
        ref={tableRef}
        className={d.tableWrap}
        style={{
          margin:'0 32px',
          opacity: tableInView ? 1 : 0,
          transform: tableInView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s ease 100ms, transform 0.6s ease 100ms',
        }}
      >
        <div className={d.tableHeader}>
          <span className={d.tableTitle}>All Campaigns</span>
          <div className={d.tableActions}>
            {/* Functional search */}
            <input
              className={d.searchInput}
              placeholder="🔍 Search campaigns..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <table>
          <thead>
            <tr><th>Campaign</th><th>Channel</th><th>Budget</th><th>Spent</th><th>Leads</th><th>Conv. Rate</th><th>Status</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{textAlign:'center',padding:'24px',color:'rgba(240,238,255,0.35)'}}>No campaigns match "{search}"</td></tr>
            ) : filtered.map((c, i) => (
              <tr key={c.name} style={{
                opacity: tableInView ? 1 : 0,
                transform: tableInView ? 'translateX(0)' : 'translateX(-12px)',
                transition: `opacity 0.4s ease ${i*70}ms, transform 0.4s ease ${i*70}ms`,
              }}>
                <td className={d.tdBold}>{c.name}</td>
                <td>{c.channel}</td>
                <td>{c.budget}</td>
                <td className={d.amber}>{c.spent}</td>
                <td>{c.leads.toLocaleString()}</td>
                <td className={d.green}>{c.conv}</td>
                <td><span className={`${d.badge} ${d[c.statusC]}`}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
