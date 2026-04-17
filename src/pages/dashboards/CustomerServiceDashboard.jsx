import { useState } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import d from '../../components/dashboard/dash.module.css'
import styles from './CustomerServiceDashboard.module.css'

const TICKETS = [
  { id:'#4821', name:'Ahmad Siddiqui',  issue:'Payment not processing for annual plan', priority:'High',   status:'Open',        priorityC:'badgeRed',   statusC:'badgeRed',   time:'14m ago' },
  { id:'#4820', name:'Layla Ibrahim',   issue:'Cannot access course after enrollment',  priority:'High',   status:'Open',        priorityC:'badgeRed',   statusC:'badgeRed',   time:'31m ago' },
  { id:'#4819', name:'Yusuf Ali',       issue:'Request for course certificate reissue', priority:'Medium', status:'In Progress',  priorityC:'badgeAmber', statusC:'badgeAmber', time:'1h ago'  },
  { id:'#4818', name:'Sara Osman',      issue:'Login issue with Google SSO',            priority:'Medium', status:'In Progress',  priorityC:'badgeAmber', statusC:'badgeAmber', time:'2h ago'  },
  { id:'#4817', name:'Hassan Karimi',   issue:'Refund request — wrong course',          priority:'Low',    status:'Resolved',     priorityC:'badgeBlue',  statusC:'badgeGreen', time:'3h ago'  },
  { id:'#4816', name:'Nadia Farouk',    issue:'Scholarship inquiry',                    priority:'Low',    status:'Resolved',     priorityC:'badgeBlue',  statusC:'badgeGreen', time:'5h ago'  },
]

const CHAT_MSGS = [
  { from:'user', text:"Hi, I've been trying to pay for the annual plan but it keeps failing.", time:'2:14 PM' },
  { from:'agent',text:"Hello Ahmad! I'm sorry to hear that. Can you tell me which payment method you're using?", time:'2:15 PM' },
  { from:'user', text:"I'm trying with Visa card ending in 4242.", time:'2:16 PM' },
  { from:'agent',text:"Got it. Let me check your account and look into the payment gateway logs.", time:'2:17 PM' },
]

const DAYS_RES = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const OPEN_   = [12,18,14,22,16,8,6]
const CLOSED  = [18,24,22,28,20,10,4]

function ResolutionChart({ days, open, closed }) {
  const w=280,h=150,pad={t:8,r:8,b:24,l:8}
  const iw=w-pad.l-pad.r,ih=h-pad.t-pad.b
  const max=Math.max(...open,...closed)*1.15
  const bw=Math.floor(iw/days.length)-6
  const cx=(i)=>pad.l+i*(iw/days.length)+iw/(days.length*2)
  const by=(v)=>pad.t+ih-(v/max)*ih
  const bh=(v)=>(v/max)*ih
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{width:'100%'}}>
      {[0,8,16,24,32].map(v=>(
        <line key={v} x1={pad.l} y1={by(v)} x2={pad.l+iw} y2={by(v)} stroke="rgba(255,255,255,0.05)" strokeWidth={1}/>
      ))}
      {days.map((day,i)=>(
        <g key={day}>
          <rect x={cx(i)-bw/2} y={by(closed[i])} width={bw/2-1} height={bh(closed[i])} fill="#4ade80" opacity={0.8} rx={3}/>
          <rect x={cx(i)} y={by(open[i])} width={bw/2-1} height={bh(open[i])} fill="#f87171" opacity={0.8} rx={3}/>
          <text x={cx(i)} y={h-6} textAnchor="middle" fontSize={8} fill="rgba(240,238,255,0.3)">{day}</text>
        </g>
      ))}
    </svg>
  )
}

export default function CustomerServiceDashboard() {
  const [activeTicket, setActiveTicket] = useState(TICKETS[0])
  const [message, setMessage] = useState('')
  const [notes, setNotes] = useState('')

  return (
    <DashboardLayout avatar="CS" title="Customer Service Dashboard" subtitle="Support & Tickets">
      <div className={d.statsGrid}>
        <StatCard icon="🎫" iconBg="rgba(248,113,113,0.15)"  label="Open Tickets"   value="24"    sub="6 high priority"      change="-8%"    changeUp={false} />
        <StatCard icon="👍" iconBg="rgba(74,222,128,0.15)"   label="CSAT Score"     value="98%"   sub="From 312 ratings"     change="+1.2%"  changeUp />
        <StatCard icon="⏱" iconBg="rgba(96,165,250,0.15)"   label="Avg Response"   value="4m 12s" sub="Target: under 5m"    change="-42s"   changeUp />
        <StatCard icon="✓"  iconBg="rgba(124,106,247,0.15)"  label="Resolved Today" value="156"   sub="vs 134 yesterday"     change="+16.4%" changeUp />
      </div>

      <div className={styles.triCol}>
        {/* Tickets list */}
        <div className={styles.ticketPanel}>
          <div className={styles.ticketHeader}>
            <span className={d.panelTitle}>Support Tickets</span>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:12,fontWeight:700,color:'#f87171',background:'rgba(248,113,113,0.15)',padding:'2px 8px',borderRadius:20}}>24 Open</span>
              <button style={{background:'none',border:'none',color:'rgba(240,238,255,0.4)',cursor:'pointer',fontSize:16}}>⊟</button>
            </div>
          </div>
          <div className={styles.ticketList}>
            {TICKETS.map(t=>(
              <div
                key={t.id}
                className={`${styles.ticketItem} ${activeTicket.id===t.id?styles.ticketActive:''}`}
                onClick={()=>setActiveTicket(t)}
              >
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                  <span style={{fontSize:12,color:'rgba(240,238,255,0.4)'}}>{t.id}</span>
                  <span style={{fontSize:11,color:'rgba(240,238,255,0.35)'}}>{t.time}</span>
                </div>
                <div style={{fontSize:13,fontWeight:600,color:'#f0eeff',marginBottom:4}}>{t.name}</div>
                <div style={{fontSize:12,color:'rgba(240,238,255,0.5)',marginBottom:8,lineHeight:1.4}}>{t.issue}</div>
                <div style={{display:'flex',gap:6}}>
                  <span className={`${d.badge} ${d[t.priorityC]}`}>{t.priority}</span>
                  <span className={`${d.badge} ${d[t.statusC]}`}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className={styles.chatPanel}>
          <div className={styles.chatHeader}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:36,height:36,borderRadius:'50%',background:'rgba(74,222,128,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:'#4ade80'}}>AS</div>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:'#f0eeff'}}>{activeTicket.name}</div>
                <div style={{fontSize:11,color:'#4ade80'}}>● Online · {activeTicket.id}</div>
              </div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button style={{background:'none',border:'1px solid rgba(255,255,255,0.1)',color:'rgba(240,238,255,0.5)',width:32,height:32,borderRadius:8,cursor:'pointer',fontSize:14}}>📞</button>
              <button style={{background:'none',border:'1px solid rgba(255,255,255,0.1)',color:'rgba(240,238,255,0.5)',width:32,height:32,borderRadius:8,cursor:'pointer',fontSize:16}}>⋯</button>
            </div>
          </div>

          <div className={styles.chatMessages}>
            {CHAT_MSGS.map((msg,i)=>(
              <div key={i} className={`${styles.msg} ${msg.from==='agent'?styles.msgAgent:styles.msgUser}`}>
                <div className={`${styles.bubble} ${msg.from==='agent'?styles.bubbleAgent:styles.bubbleUser}`}>{msg.text}</div>
                <div className={styles.msgTime}>{msg.time}</div>
              </div>
            ))}
          </div>

          <div className={styles.chatInput}>
            <input
              value={message}
              onChange={e=>setMessage(e.target.value)}
              placeholder="Type a message..."
              className={styles.chatInputField}
              onKeyDown={e=>e.key==='Enter'&&setMessage('')}
            />
            <button className={styles.sendBtn} onClick={()=>setMessage('')}>➤</button>
          </div>
        </div>

        {/* Right aside */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className={d.panel}>
            <div className={d.panelTitle} style={{marginBottom:12}}>Daily Resolution</div>
            <div className={d.panelSub} style={{marginBottom:10}}>Open vs Resolved tickets</div>
            <ResolutionChart days={DAYS_RES} open={OPEN_} closed={CLOSED}/>
          </div>

          <div className={d.panel}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <span className={d.panelTitle}>Internal Notes</span>
              <span style={{fontSize:11,color:'#a29bfe',background:'rgba(162,155,254,0.12)',padding:'2px 8px',borderRadius:20}}>{activeTicket.id}</span>
            </div>
            <div style={{marginBottom:12}}>
              {[
                {author:'You',       color:'#a29bfe', time:'2:10 PM', note:'Customer called twice. Issue seems gateway-side. Escalated to tech.'},
                {author:'Supervisor',color:'#60a5fa', time:'2:05 PM', note:'Check if card BIN is blocked in payment processor settings.'},
              ].map((n,i)=>(
                <div key={i} style={{marginBottom:12,paddingBottom:12,borderBottom:i===0?'1px solid rgba(255,255,255,0.05)':'none'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                    <span style={{fontSize:12,fontWeight:600,color:n.color}}>{n.author}</span>
                    <span style={{fontSize:11,color:'rgba(240,238,255,0.35)'}}>{n.time}</span>
                  </div>
                  <p style={{fontSize:12,color:'rgba(240,238,255,0.6)',lineHeight:1.5,margin:0}}>{n.note}</p>
                </div>
              ))}
            </div>
            <textarea
              value={notes}
              onChange={e=>setNotes(e.target.value)}
              placeholder="Add internal note..."
              style={{width:'100%',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,padding:'10px 12px',color:'#f0eeff',fontSize:12,outline:'none',resize:'none',minHeight:72,fontFamily:'var(--font-sans)',marginBottom:10}}
            />
            <button style={{width:'100%',background:'linear-gradient(135deg,#5a4fcf,#7c6af7)',border:'none',color:'#fff',padding:10,borderRadius:9,fontSize:13,fontWeight:600,cursor:'pointer'}}>
              📝 Save Note
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
