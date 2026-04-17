import { useInView } from '../../hooks/useInView'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import { AnimatedBarChart, AnimatedProgressBar } from '../../components/dashboard/Charts'
import d from '../../components/dashboard/dash.module.css'

const LESSONS    = ['L1','L2','L3','L4','L5','L6','L7','L8']
const COMPLETION = [98,  97,  95,  92,  88,  72,  68,  41]

const STUDENTS = [
  { initials:'AA', name:'Ahmed Al-Rashid', progress:82, lessons:'14/18', lastActive:'Apr 8',  score:91, status:'On Track',  statusC:'badgeBlue'  },
  { initials:'FK', name:'Fatima Khalid',   progress:94, lessons:'17/18', lastActive:'Apr 9',  score:96, status:'Excellent', statusC:'badgeGreen' },
  { initials:'OB', name:'Omar Benali',     progress:65, lessons:'11/18', lastActive:'Apr 5',  score:74, status:'At Risk',   statusC:'badgeRed'   },
  { initials:'MY', name:'Mariam Yusuf',    progress:78, lessons:'13/18', lastActive:'Apr 7',  score:85, status:'On Track',  statusC:'badgeBlue'  },
  { initials:'IH', name:'Ibrahim Hassan',  progress:41, lessons:'7/18',  lastActive:'Apr 1',  score:62, status:'At Risk',   statusC:'badgeRed'   },
  { initials:'KN', name:'Khadija Noor',    progress:88, lessons:'16/18', lastActive:'Apr 9',  score:93, status:'Excellent', statusC:'badgeGreen' },
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

function CourseProgressBar({ done, delay }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{ height:4, background:'rgba(255,255,255,0.07)', borderRadius:4, overflow:'hidden', marginBottom:14 }}>
      <div style={{
        width: inView ? `${done}%` : '0%',
        height:'100%',
        background:'linear-gradient(90deg,#5a4fcf,#7c6af7)',
        borderRadius:4,
        transition: `width 1s ease ${delay}ms`,
      }}/>
    </div>
  )
}

export default function InstructorDashboard() {
  const [tableRef, tableInView] = useInView()
  return (
    <DashboardLayout avatar="IN" title="Instructor Dashboard" subtitle="Courses & Students">
      <div className={d.statsGrid}>
        <StatCard icon="👥" iconBg="rgba(74,222,128,0.15)"  label="My Students"    value="247"   sub="Across 2 courses"   change="+18"  changeUp delay={0}   />
        <StatCard icon="🏆" iconBg="rgba(96,165,250,0.15)"  label="Avg Completion" value="78%"   sub="vs 71% last month"  change="+7%"  changeUp delay={80}  />
        <StatCard icon="⭐" iconBg="rgba(251,191,36,0.15)"  label="Avg Rating"     value="4.9"   sub="From 189 reviews"   change="+0.1" changeUp delay={160} />
        <StatCard icon="📖" iconBg="rgba(124,106,247,0.15)" label="Lessons Live"   value="30"    sub="18 + 12 lessons"    change="+8"   changeUp delay={240} />
      </div>

      <div className={d.twoCol}>
        <FadePanel delay={100}>
          <div className={d.panelHeader}>
            <div><div className={d.panelTitle}>Lesson Completion Rate</div>
              <div className={d.panelSub}>% of students completing each lesson — Quran Level 1</div></div>
            <div className={d.tabGroup}><button className={d.tab}>7D</button><button className={`${d.tab} ${d.tabActive}`}>30D</button></div>
          </div>
          <div className={d.chartArea}>
            <AnimatedBarChart
              days={LESSONS}
              datasets={[{ data: COMPLETION, label:'Completion', color: '#4ade80' }]}
              yFormat={v => `${Math.round(v)}%`}
            />
          </div>
        </FadePanel>

        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          {[
            { title:'Quran Memorization — Level 1', students:247, rating:4.9, lessons:18, done:78, delay:150 },
            { title:'Tajweed Mastery',               students:134, rating:4.8, lessons:12, done:62, delay:250 },
          ].map(course => (
            <FadePanel key={course.title} delay={course.delay}>
              <div style={{fontFamily:'var(--font-display)',fontSize:14,fontWeight:600,color:'#f0eeff',marginBottom:4}}>{course.title}</div>
              <div style={{display:'flex',gap:16,fontSize:12,color:'rgba(240,238,255,0.45)',marginBottom:12}}>
                <span>{course.students} students</span><span>★ {course.rating}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'rgba(240,238,255,0.4)',marginBottom:6}}>
                <span>{course.lessons} lessons</span>
                <span className={d.green}>{course.done}% done</span>
              </div>
              <CourseProgressBar done={course.done} delay={course.delay + 200}/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                <button style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',color:'rgba(240,238,255,0.7)',padding:'8px',borderRadius:8,fontSize:12,cursor:'pointer'}}>Manage</button>
                <button style={{background:'linear-gradient(135deg,#5a4fcf,#7c6af7)',border:'none',color:'#fff',padding:'8px',borderRadius:8,fontSize:12,fontWeight:600,cursor:'pointer'}}>Add Lesson</button>
              </div>
            </FadePanel>
          ))}
          <FadePanel delay={300}>
            <div style={{fontFamily:'var(--font-display)',fontSize:14,fontWeight:600,color:'#f0eeff',marginBottom:4}}>Upload Results</div>
            <div style={{fontSize:12,color:'rgba(240,238,255,0.4)'}}>Upload student test results, quiz scores, or progress reports.</div>
          </FadePanel>
        </div>
      </div>

      <div ref={tableRef} className={d.tableWrap} style={{
        margin:'0 32px',
        opacity: tableInView ? 1 : 0,
        transform: tableInView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease 100ms, transform 0.6s ease 100ms',
      }}>
        <div className={d.tableHeader}>
          <span className={d.tableTitle}>Student Reports</span>
          <div className={d.tableActions}>
            <input className={d.searchInput} placeholder="🔍 Search students..."/>
            <button className={d.filterBtn}>↓ Export</button>
          </div>
        </div>
        <table>
          <thead><tr><th>Student</th><th>Progress</th><th>Lessons</th><th>Last Active</th><th>Score</th><th>Status</th></tr></thead>
          <tbody>
            {STUDENTS.map((s,i) => (
              <tr key={s.name} style={{
                opacity: tableInView ? 1 : 0,
                transform: tableInView ? 'translateX(0)' : 'translateX(-12px)',
                transition: `opacity 0.4s ease ${i*70}ms, transform 0.4s ease ${i*70}ms`,
              }}>
                <td>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <div style={{width:30,height:30,borderRadius:'50%',background:'rgba(124,106,247,0.25)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'#a29bfe'}}>{s.initials}</div>
                    <span className={d.tdBold}>{s.name}</span>
                  </div>
                </td>
                <td style={{minWidth:140}}>
                  <AnimatedProgressBar value={s.progress} delay={i * 80}/>
                </td>
                <td>{s.lessons}</td>
                <td>{s.lastActive}</td>
                <td style={{color:s.score>=90?'#4ade80':s.score>=75?'#fbbf24':'#f87171',fontWeight:700}}>{s.score}</td>
                <td><span className={`${d.badge} ${d[s.statusC]}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
