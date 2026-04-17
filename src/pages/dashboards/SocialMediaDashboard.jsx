import { useInView } from '../../hooks/useInView'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import { AnimatedLineChart, AnimatedBarChart } from '../../components/dashboard/Charts'
import d from '../../components/dashboard/dash.module.css'

const MONTHS = ['Jan','Feb','Mar','Apr','May']
const IG = [18000,19500,21500,22800,24100]
const YT = [14000,15200,15200,17600,18200]
const TW = [6200, 6600, 6800, 7400, 8100]
const TK = [18000,22000,29800,33000,35600]

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const ENG  = [4.2,  5.1,  4.8,  6.2,  5.4,  6.8,  7.1]

const CONTENT = [
  { type:'🎬 Reel',     platform:'IG + TikTok', topic:'Quran tip of the day',         date:'Apr 10', eng:'4.8%', status:'Scheduled', statusC:'badgeBlue'   },
  { type:'🖼 Carousel', platform:'Instagram',   topic:'Arabic alphabet guide',          date:'Apr 11', eng:'—',    status:'Draft',     statusC:'badgePurple' },
  { type:'▶ Video',     platform:'YouTube',     topic:'Scholar Spotlight: Sheikh Omar', date:'Apr 8',  eng:'6.2%', status:'Published', statusC:'badgeGreen'  },
  { type:'# Thread',    platform:'Twitter/X',   topic:'10 Islamic quotes for Ramadan',  date:'Apr 7',  eng:'3.4%', status:'Published', statusC:'badgeGreen'  },
  { type:'◻ Story',    platform:'IG + FB',     topic:'New course announcement',        date:'Apr 12', eng:'—',    status:'Scheduled', statusC:'badgeBlue'   },
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

export default function SocialMediaDashboard() {
  const [tableRef, tableInView] = useInView()
  return (
    <DashboardLayout avatar="SM" title="Social Media Manager Dashboard" subtitle="Content & Ads">
      <div className={d.statsGrid}>
        <StatCard icon="📷" iconBg="rgba(248,113,113,0.15)" label="Instagram"  value="24.1K" sub="followers" change="+8.4%"  changeUp delay={0}   />
        <StatCard icon="▶"  iconBg="rgba(248,113,113,0.15)" label="YouTube"    value="18.2K" sub="followers" change="+12.1%" changeUp delay={80}  />
        <StatCard icon="#"  iconBg="rgba(96,165,250,0.15)"  label="Twitter/X"  value="8.1K"  sub="followers" change="+3.2%"  changeUp delay={160} />
        <StatCard icon="♪"  iconBg="rgba(74,222,128,0.15)"  label="TikTok"     value="35.6K" sub="followers" change="+24.8%" changeUp delay={240} />
      </div>

      <div className={d.twoCol}>
        <FadePanel delay={100}>
          <div className={d.panelHeader}>
            <div><div className={d.panelTitle}>Platform Follower Growth</div>
              <div className={d.panelSub}>5-month growth across all channels</div></div>
            <div className={d.tabGroup}><button className={d.tab}>7D</button><button className={`${d.tab} ${d.tabActive}`}>30D</button></div>
          </div>
          <div className={d.chartArea}>
            <AnimatedLineChart
              labels={MONTHS}
              series={[
                { label:'Instagram', data:IG, color:'#f87171' },
                { label:'YouTube',   data:YT, color:'#fb923c' },
                { label:'Twitter/X', data:TW, color:'#60a5fa' },
                { label:'TikTok',    data:TK, color:'#2dd4bf' },
              ]}
              yFormat={v => `${Math.round(v/1000)}K`}
            />
          </div>
          <div className={d.legend} style={{marginTop:8,justifyContent:'center'}}>
            {[['Instagram','#f87171'],['YouTube','#fb923c'],['Twitter/X','#60a5fa'],['TikTok','#2dd4bf']].map(([l,c]) => (
              <div key={l} className={d.legendItem}><div className={d.legendLine} style={{background:c}}/>{l}</div>
            ))}
          </div>
        </FadePanel>

        <FadePanel delay={200}>
          <div className={d.panelHeader}>
            <div><div className={d.panelTitle}>Engagement Rate</div>
              <div className={d.panelSub}>Daily avg this week</div></div>
            <div className={d.tabGroup}><button className={d.tab}>7D</button><button className={`${d.tab} ${d.tabActive}`}>30D</button></div>
          </div>
          <div className={d.chartArea}>
            <AnimatedBarChart
              days={DAYS}
              datasets={[{ data: ENG, color:'#fbbf24', label:'Engagement %' }]}
              yFormat={v => `${v.toFixed(1)}%`}
            />
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:14}}>
            {[['5.6%','Avg Rate'],['7.1%','Peak Day']].map(([v,l]) => (
              <div key={l} style={{background:'rgba(255,255,255,0.03)',borderRadius:10,padding:'10px 14px',textAlign:'center'}}>
                <div style={{fontSize:22,fontWeight:700,color:'#fbbf24',fontFamily:'var(--font-display)'}}>{v}</div>
                <div style={{fontSize:11,color:'rgba(240,238,255,0.4)',marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
        </FadePanel>
      </div>

      <div ref={tableRef} className={d.tableWrap} style={{
        margin:'0 32px',
        opacity: tableInView ? 1 : 0,
        transform: tableInView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease 100ms, transform 0.6s ease 100ms',
      }}>
        <div className={d.tableHeader}>
          <span className={d.tableTitle}>Content Calendar</span>
          <div className={d.tableActions}>
            <button className={d.filterBtn}>⊟ Filter</button>
            <button className={d.addBtn}>+ Add Content</button>
          </div>
        </div>
        <table>
          <thead><tr><th>Type</th><th>Platform</th><th>Topic</th><th>Publish Date</th><th>Engagement</th><th>Status</th></tr></thead>
          <tbody>
            {CONTENT.map((c,i) => (
              <tr key={c.topic} style={{
                opacity: tableInView ? 1 : 0,
                transform: tableInView ? 'translateX(0)' : 'translateX(-12px)',
                transition: `opacity 0.4s ease ${i*70}ms, transform 0.4s ease ${i*70}ms`,
              }}>
                <td className={d.tdBold}>{c.type}</td>
                <td>{c.platform}</td>
                <td>{c.topic}</td>
                <td>{c.date}</td>
                <td className={c.eng!=='—'?d.green:''}>{c.eng}</td>
                <td><span className={`${d.badge} ${d[c.statusC]}`}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
