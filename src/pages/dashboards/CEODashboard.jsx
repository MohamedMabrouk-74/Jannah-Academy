import { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import { AnimatedLineChart, AnimatedDonut } from '../../components/dashboard/Charts'
import d from '../../components/dashboard/dash.module.css'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const REVENUE = [28000,32000,38000,42000,45000,52000,79000,88000,95000,105000,115000,125000]
const TARGET  = [35000,38000,42000,48000,52000,58000,75000,82000,90000,98000,108000,118000]

const DONUT = [
  { label:'Quran',  pct:35, color:'#a29bfe' },
  { label:'Arabic', pct:28, color:'#60a5fa' },
  { label:'Fiqh',   pct:15, color:'#2dd4bf' },
  { label:'History',pct:12, color:'#fbbf24' },
  { label:'Tajweed',pct:6,  color:'#4ade80' },
  { label:'Seerah', pct:4,  color:'#f87171' },
]

const COURSES = [
  { name:'Quran Memorization', students:3840, rev:'$112K', growth:'+18%', up:true,  rating:4.9 },
  { name:'Arabic Language',    students:2910, rev:'$84K',  growth:'+12%', up:true,  rating:4.8 },
  { name:'Fiqh Studies',       students:1820, rev:'$52K',  growth:'+6%',  up:true,  rating:4.7 },
  { name:'Islamic History',    students:1450, rev:'$41K',  growth:'-3%',  up:false, rating:4.6 },
  { name:'Tajweed Mastery',    students:1240, rev:'$35K',  growth:'+22%', up:true,  rating:4.9 },
]

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

function FadeTable({ children, delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={d.tableWrap} style={{
      margin: '0 32px',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>{children}</div>
  )
}

export default function CEODashboard() {
  return (
    <DashboardLayout avatar="KA" title="CEO Dashboard" subtitle="Strategic Overview">
      <div className={d.statsGrid}>
        <StatCard icon="👥" iconBg="rgba(124,106,247,0.15)" label="Total Students"  value="12,847" sub="Across all programs"  change="+14.2%" changeUp delay={0}   />
        <StatCard icon="$"  iconBg="rgba(74,222,128,0.15)"  label="Monthly Revenue" value="$284K"  sub="vs $241K last month" change="+17.8%" changeUp delay={80}  />
        <StatCard icon="📈" iconBg="rgba(96,165,250,0.15)"  label="Retention Rate"  value="94.2%" sub="30-day active"         change="+2.1%"  changeUp delay={160} />
        <StatCard icon="📖" iconBg="rgba(251,191,36,0.15)"  label="Active Courses"  value="47"    sub="12 launching soon"     change="+8"     changeUp delay={240} />
      </div>

      <div className={d.twoCol}>
        <FadePanel delay={100}>
          <div className={d.panelHeader}>
            <div>
              <div className={d.panelTitle}>Revenue vs Target</div>
              <div className={d.panelSub}>Monthly performance overview — FY 2025-2026</div>
            </div>
            <div className={d.tabGroup}>
              <button className={d.tab}>7D</button>
              <button className={`${d.tab} ${d.tabActive}`}>30D</button>
            </div>
          </div>
          <div className={d.chartArea}>
            <AnimatedLineChart
              labels={MONTHS}
              series={[
                { label:'Revenue', data: REVENUE, color:'#7c6af7' },
                { label:'Target',  data: TARGET,  color:'#4ade80', dashed: true },
              ]}
              yFormat={v => `$${Math.round(v/1000)}K`}
            />
          </div>
          <div className={d.legend} style={{marginTop:8}}>
            <div className={d.legendItem}><div className={d.legendLine} style={{background:'#7c6af7'}}/> Revenue</div>
            <div className={d.legendItem}><div className={d.legendLine} style={{background:'#4ade80',borderTop:'2px dashed #4ade80',height:0}}/> Target</div>
          </div>
        </FadePanel>

        <FadePanel delay={200}>
          <div className={d.panelHeader}>
            <div>
              <div className={d.panelTitle}>Course Enrollment</div>
              <div className={d.panelSub}>Students by program</div>
            </div>
            <div className={d.tabGroup}>
              <button className={d.tab}>7D</button>
              <button className={`${d.tab} ${d.tabActive}`}>30D</button>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'center',margin:'16px 0 10px'}}>
            <AnimatedDonut data={DONUT} size={170} stroke={30}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px 16px'}}>
            {DONUT.map(item => (
              <div key={item.label} className={d.legendItem}>
                <div className={d.legendDot} style={{background:item.color}}/>{item.label}
              </div>
            ))}
          </div>
        </FadePanel>
      </div>

      <FadeTable delay={150}>
        <div className={d.tableHeader}>
          <span className={d.tableTitle}>Top Performing Courses</span>
          <button className={d.filterBtn}>⊟ Filter</button>
        </div>
        <table>
          <thead><tr><th>Course</th><th>Students</th><th>Revenue</th><th>Growth</th><th>Rating</th></tr></thead>
          <tbody>
            {COURSES.map((c,i) => (
              <tr key={c.name} style={{animationDelay:`${i*60}ms`}}>
                <td className={d.tdBold}>{c.name}</td>
                <td>{c.students.toLocaleString()}</td>
                <td className={d.green}>{c.rev}</td>
                <td><span className={c.up ? d.green : d.red}>{c.up?'↑':'↓'} {c.growth}</span></td>
                <td>★ {c.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeTable>

      <div style={{margin:'16px 32px 0'}}>
        <FadePanel delay={200}>
          <div className={d.panelTitle} style={{marginBottom:16}}>Request Report</div>
          <div style={{fontSize:12,color:'rgba(240,238,255,0.4)',marginBottom:8}}>Report Type</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:16}}>
            {['Monthly','Quarterly','Yearly','Custom'].map((t,i) => (
              <button key={t} style={{
                background: i===0?'linear-gradient(135deg,#5a4fcf,#7c6af7)':'rgba(255,255,255,0.04)',
                border: i===0?'none':'1px solid rgba(255,255,255,0.1)',
                color: i===0?'#fff':'rgba(240,238,255,0.55)',
                padding:'8px',borderRadius:8,fontSize:13,cursor:'pointer'
              }}>{t}</button>
            ))}
          </div>
          <div style={{fontSize:12,color:'rgba(240,238,255,0.4)',marginBottom:10}}>Include Sections</div>
          {['Revenue Analysis','Student Metrics','Course Performance','Marketing ROI'].map(s=>(
            <div key={s} style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
              <div style={{width:16,height:16,background:'#7c6af7',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'#fff'}}>✓</div>
              <span style={{fontSize:13,color:'rgba(240,238,255,0.65)'}}>{s}</span>
            </div>
          ))}
          <div style={{fontSize:12,color:'rgba(240,238,255,0.4)',margin:'12px 0 6px'}}>Delivery</div>
          <input placeholder="Email address" style={{width:'100%',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'10px 12px',color:'#f0eeff',fontSize:13,outline:'none',marginBottom:12}}/>
          <button style={{width:'100%',background:'linear-gradient(135deg,#5a4fcf,#7c6af7)',border:'none',color:'#fff',padding:12,borderRadius:10,fontSize:14,fontWeight:600,cursor:'pointer'}}>
            ✦ Generate & Send
          </button>
        </FadePanel>
      </div>
    </DashboardLayout>
  )
}
