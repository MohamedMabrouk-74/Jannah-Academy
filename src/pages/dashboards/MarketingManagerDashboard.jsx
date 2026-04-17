import { useInView } from '../../hooks/useInView'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import { AnimatedLineChart, AnimatedDonut } from '../../components/dashboard/Charts'
import d from '../../components/dashboard/dash.module.css'

const WEEKS = ['W1','W2','W3','W4','W5','W6']
const REACH_W  = [14000,16000,21000,20500,22000,27000]
const CLICKS_W = [4000, 5500, 7500, 8000, 9500, 12000]

const DONUT_TRAFFIC = [
  { label:'Organic',  pct:38, color:'#a29bfe' },
  { label:'Paid Ads', pct:27, color:'#60a5fa' },
  { label:'Social',   pct:22, color:'#2dd4bf' },
  { label:'Email',    pct:13, color:'#fbbf24' },
]

const CAMPAIGNS = [
  { name:'Ramadan Enrollment Drive', channel:'Multi-channel',   budget:'$12,000', spent:'$8,400',  leads:1840, conv:'12.4%', status:'Active',    statusC:'badgeGreen' },
  { name:'Arabic Starter Campaign',  channel:'Meta Ads',        budget:'$6,500',  spent:'$6,500',  leads:920,  conv:'9.8%',  status:'Completed', statusC:'badgeBlue'  },
  { name:'Quran Summer Program',     channel:'Google + Email',  budget:'$9,200',  spent:'$3,100',  leads:640,  conv:'14.2%', status:'Active',    statusC:'badgeGreen' },
  { name:'Scholar Webinar Series',   channel:'Email / YouTube', budget:'$2,800',  spent:'$1,200',  leads:380,  conv:'18.6%', status:'Paused',    statusC:'badgeAmber' },
  { name:'Global Reach Initiative',  channel:'TikTok + IG',    budget:'$14,000', spent:'$5,800',  leads:2100, conv:'8.2%',  status:'Active',    statusC:'badgeGreen' },
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

export default function MarketingManagerDashboard() {
  const [tableRef, tableInView] = useInView()

  return (
    <DashboardLayout avatar="MM" title="Marketing Manager Dashboard" subtitle="Campaigns & Strategy">
      <div className={d.statsGrid}>
        <StatCard icon="🎯" iconBg="rgba(96,165,250,0.15)"  label="Active Campaigns"     value="6"     sub="3 launching next week"  change="+2"     changeUp delay={0}   />
        <StatCard icon="👥" iconBg="rgba(124,106,247,0.15)" label="Total Reach"          value="284K"  sub="This month"             change="+31.4%" changeUp delay={80}  />
        <StatCard icon="📈" iconBg="rgba(74,222,128,0.15)"  label="Avg Conversion Rate" value="12.4%" sub="vs 9.8% last month"      change="+2.6%"  changeUp delay={160} />
        <StatCard icon="$"  iconBg="rgba(251,191,36,0.15)"  label="Budget Utilised"      value="$48K"  sub="of $72K total"          change="66.7%"  changeUp={false} delay={240} />
      </div>

      <div className={d.twoCol}>
        <FadePanel delay={100}>
          <div className={d.panelHeader}>
            <div>
              <div className={d.panelTitle}>Campaign Performance</div>
              <div className={d.panelSub}>6-week reach, clicks & conversion trend</div>
            </div>
            <div className={d.tabGroup}>
              <button className={d.tab}>7D</button>
              <button className={`${d.tab} ${d.tabActive}`}>30D</button>
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
            <div className={d.tabGroup}>
              <button className={d.tab}>7D</button>
              <button className={`${d.tab} ${d.tabActive}`}>30D</button>
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
                  <div style={{
                    width:`${item.pct}%`,height:'100%',background:item.color,borderRadius:4,
                    animation:`growBar 0.8s ease ${i*100+300}ms both`
                  }}/>
                </div>
                <span style={{fontSize:12,color:'rgba(240,238,255,0.6)',minWidth:28}}>{item.pct}%</span>
              </div>
            </div>
          ))}
        </FadePanel>
      </div>

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
            <input className={d.searchInput} placeholder="🔍 Search campaigns..."/>
            <button className={d.addBtn}>+ New Campaign</button>
          </div>
        </div>
        <table>
          <thead><tr><th>Campaign</th><th>Channel</th><th>Budget</th><th>Spent</th><th>Leads</th><th>Conv. Rate</th><th>Status</th></tr></thead>
          <tbody>
            {CAMPAIGNS.map((c,i) => (
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
