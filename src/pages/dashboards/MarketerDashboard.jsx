import { useInView } from '../../hooks/useInView'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import { AnimatedBarChart } from '../../components/dashboard/Charts'
import d from '../../components/dashboard/dash.module.css'

const DAYS  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const IMP   = [8500, 10000,9200, 14000,13000,7000, 6500]
const CLKS  = [3200, 4100, 3800, 5500, 5100, 2800, 2600]
const CONVS = [410,  520,  480,  690,  640,  340,  310]

const CHANNELS = [
  { label:'Meta Ads', pct:42, color:'#60a5fa' },
  { label:'Google',   pct:28, color:'#a29bfe' },
  { label:'Email',    pct:18, color:'#4ade80' },
  { label:'TikTok',   pct:12, color:'#fbbf24' },
]

const ALERTS = [
  { icon:'🟡', text:'Arabic campaign CTR dropped 1.2%' },
  { icon:'✅', text:'Quran campaign hit 10K reach' },
  { icon:'🔴', text:'Budget limit: Meta Ads 90%' },
]

const PROMO = [
  { title:'Quran Memorization', tag:'Quran',      tagC:'#a29bfe', enrolled:3840, ctr:'4.2%', channel:'Email + Google' },
  { title:'Arabic Starter',     tag:'Language',   tagC:'#60a5fa', enrolled:1240, ctr:'3.8%', channel:'Meta Ads'       },
  { title:'Fiqh Foundations',   tag:'Islamic Law',tagC:'#a29bfe', enrolled:820,  ctr:'2.9%', channel:'Organic'        },
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

function ChannelBar({ label, pct, color, delay }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{ marginBottom: 12 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
        <span style={{ fontSize:13, color:'rgba(240,238,255,0.7)' }}>{label}</span>
        <span style={{ fontSize:13, fontWeight:600, color:'rgba(240,238,255,0.9)' }}>{pct}%</span>
      </div>
      <div style={{ height:4, background:'rgba(255,255,255,0.07)', borderRadius:4, overflow:'hidden' }}>
        <div style={{
          height:'100%', background:color, borderRadius:4,
          width: inView ? `${pct}%` : '0%',
          transition: `width 0.8s ease ${delay}ms`,
        }}/>
      </div>
    </div>
  )
}

export default function MarketerDashboard() {
  const [promoRef, promoInView] = useInView()

  return (
    <DashboardLayout avatar="MK" title="Marketer Dashboard" subtitle="Campaign Execution">
      <div className={d.statsGrid}>
        <StatCard icon="⚡" iconBg="rgba(124,106,247,0.15)" label="Campaigns Running" value="8"     sub="Across 4 channels"    change="+3"     changeUp delay={0}   />
        <StatCard icon="👥" iconBg="rgba(74,222,128,0.15)"  label="Total Leads"       value="42K"   sub="This quarter"         change="+28.4%" changeUp delay={80}  />
        <StatCard icon="🎯" iconBg="rgba(96,165,250,0.15)"  label="Conversions"       value="3,248" sub="7.7% conversion rate" change="+11.2%" changeUp delay={160} />
        <StatCard icon="$"  iconBg="rgba(251,191,36,0.15)"  label="Ad Spend"          value="$12.4K" sub="of $18K budget"      change="68.9%"  changeUp={false} delay={240} />
      </div>

      <div className={d.twoCol}>
        <FadePanel delay={100}>
          <div className={d.panelHeader}>
            <div>
              <div className={d.panelTitle}>Daily Campaign Performance</div>
              <div className={d.panelSub}>This week — impressions, clicks & conversions</div>
            </div>
            <div className={d.tabGroup}>
              <button className={d.tab}>7D</button>
              <button className={`${d.tab} ${d.tabActive}`}>30D</button>
            </div>
          </div>
          <div className={d.chartArea}>
            <AnimatedBarChart
              days={DAYS}
              datasets={[
                { data: IMP,   color:'#60a5fa', label:'Impressions' },
                { data: CLKS,  color:'#a29bfe', label:'Clicks' },
                { data: CONVS, color:'#4ade80', label:'Conversions' },
              ]}
              yFormat={v => `${Math.round(v/1000)}K`}
            />
          </div>
          <div className={d.legend} style={{marginTop:12,justifyContent:'center'}}>
            <div className={d.legendItem}><div className={d.legendDot} style={{background:'#60a5fa'}}/> Impressions</div>
            <div className={d.legendItem}><div className={d.legendDot} style={{background:'#a29bfe'}}/> Clicks</div>
            <div className={d.legendItem}><div className={d.legendDot} style={{background:'#4ade80'}}/> Conversions</div>
          </div>
        </FadePanel>

        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <FadePanel delay={150}>
            <div className={d.panelTitle} style={{marginBottom:14}}>CHANNEL SPLIT</div>
            {CHANNELS.map((c,i) => <ChannelBar key={c.label} {...c} delay={i*80+200}/>)}
          </FadePanel>
          <FadePanel delay={250}>
            <div className={d.panelTitle} style={{marginBottom:12}}>TODAY'S ALERTS</div>
            {ALERTS.map((a,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:i<ALERTS.length-1?'1px solid rgba(255,255,255,0.05)':'none'}}>
                <span style={{fontSize:14}}>{a.icon}</span>
                <span style={{fontSize:13,color:'rgba(240,238,255,0.65)'}}>{a.text}</span>
              </div>
            ))}
          </FadePanel>
        </div>
      </div>

      <div className={d.section}>
        <div className={d.tableHeader} style={{padding:'18px 0 14px',borderBottom:'none'}}>
          <span className={d.tableTitle}>Course Promotion Tools</span>
          <span style={{fontSize:13,color:'#4ade80',fontWeight:600}}>3 Courses Active</span>
        </div>
        <div ref={promoRef} style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
          {PROMO.map((c,i) => (
            <div key={c.title} className={d.panel} style={{
              opacity: promoInView ? 1 : 0,
              transform: promoInView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
              transition: `opacity 0.5s ease ${i*100}ms, transform 0.5s ease ${i*100}ms`,
            }}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                <div>
                  <div style={{fontFamily:'var(--font-display)',fontSize:15,fontWeight:600,color:'#f0eeff',marginBottom:4}}>{c.title}</div>
                  <span style={{fontSize:11,color:c.tagC,background:c.tagC+'18',padding:'2px 8px',borderRadius:20,fontWeight:600}}>{c.tag}</span>
                </div>
                <span style={{color:'rgba(240,238,255,0.3)',fontSize:18}}>⋯</span>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,margin:'14px 0 8px'}}>
                <div><div style={{fontSize:11,color:'rgba(240,238,255,0.4)',marginBottom:2}}>Enrolled</div>
                  <div style={{fontSize:18,fontWeight:700,color:'#f0eeff',fontFamily:'var(--font-display)'}}>{c.enrolled.toLocaleString()}</div></div>
                <div><div style={{fontSize:11,color:'rgba(240,238,255,0.4)',marginBottom:2}}>CTR</div>
                  <div style={{fontSize:18,fontWeight:700,color:'#4ade80',fontFamily:'var(--font-display)'}}>{c.ctr}</div></div>
              </div>
              <div style={{fontSize:12,color:'rgba(240,238,255,0.4)',marginBottom:12}}>Current: {c.channel}</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                <button style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',color:'rgba(240,238,255,0.7)',padding:'8px',borderRadius:8,fontSize:12,cursor:'pointer'}}>✎ Edit</button>
                <button style={{background:'linear-gradient(135deg,#5a4fcf,#7c6af7)',border:'none',color:'#fff',padding:'8px',borderRadius:8,fontSize:12,fontWeight:600,cursor:'pointer'}}>⚡ Boost</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
