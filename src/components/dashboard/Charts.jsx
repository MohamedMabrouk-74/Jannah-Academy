import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'

/* ─── Animated Bar Chart ─────────────────────────────────────── */
export function AnimatedBarChart({ days, datasets, yFormat = (v) => v }) {
  const [ref, inView] = useInView()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const duration = 900
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 2.5)
      setProgress(eased)
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView])

  const w = 560, h = 190, pad = { t: 10, r: 10, b: 28, l: 48 }
  const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b
  const allVals = datasets.flatMap(d => d.data)
  const max = Math.max(...allVals) * 1.15
  const bw = Math.floor(iw / days.length) - 8
  const cx = (i) => pad.l + i * (iw / days.length) + iw / (days.length * 2)
  const by = (v) => pad.t + ih - (v / max) * ih * progress
  const bh = (v) => (v / max) * ih * progress
  const yticks = [0, max * 0.33, max * 0.66, max].map(Math.round)

  return (
    <svg ref={ref} viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', overflow: 'visible' }}>
      {yticks.map((v) => (
        <g key={v}>
          <text x={pad.l - 6} y={pad.t + ih - (v / max) * ih + 4} textAnchor="end" fontSize={9} fill="rgba(240,238,255,0.3)">
            {yFormat(v)}
          </text>
          <line x1={pad.l} y1={pad.t + ih - (v / max) * ih} x2={pad.l + iw} y2={pad.t + ih - (v / max) * ih}
            stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        </g>
      ))}
      {days.map((day, i) => (
        <g key={day}>
          {datasets.map((ds, di) => {
            const offset = (di - (datasets.length - 1) / 2) * (bw / datasets.length + 2)
            const barW = bw / datasets.length - 2
            return (
              <rect
                key={ds.color}
                x={cx(i) - barW / 2 + offset}
                y={by(ds.data[i])}
                width={Math.max(barW, 0)}
                height={bh(ds.data[i])}
                fill={ds.color}
                opacity={0.85}
                rx={3}
              />
            )
          })}
          <text x={cx(i)} y={h - 6} textAnchor="middle" fontSize={9} fill="rgba(240,238,255,0.3)">{day}</text>
        </g>
      ))}
    </svg>
  )
}

/* ─── Animated Line / Area Chart ────────────────────────────── */
export function AnimatedLineChart({ labels, series, yFormat = (v) => `${Math.round(v / 1000)}K` }) {
  const [ref, inView] = useInView()
  const [clipWidth, setClipWidth] = useState(0)
  const id = useRef(`clip-${Math.random().toString(36).slice(2)}`)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const duration = 1200
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 2)
      setClipWidth(eased * 560)
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView])

  const w = 560, h = 190, pad = { t: 10, r: 10, b: 28, l: 48 }
  const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b
  const allVals = series.flatMap(s => s.data)
  const max = Math.max(...allVals) * 1.1
  const px = (i) => pad.l + (i / (labels.length - 1)) * iw
  const py = (v) => pad.t + ih - (v / max) * ih
  const path = (data) => data.map((v, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(' ')
  const area = (data) => `${path(data)} L${px(data.length - 1)},${pad.t + ih} L${pad.l},${pad.t + ih} Z`
  const yticks = [0, max * 0.25, max * 0.5, max * 0.75, max].map(Math.round)

  return (
    <svg ref={ref} viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', overflow: 'visible' }}>
      <defs>
        <clipPath id={id.current}>
          <rect x={pad.l} y={0} width={clipWidth} height={h} />
        </clipPath>
      </defs>
      {yticks.map((v) => (
        <g key={v}>
          <text x={pad.l - 6} y={py(v) + 4} textAnchor="end" fontSize={9} fill="rgba(240,238,255,0.3)">{yFormat(v)}</text>
          <line x1={pad.l} y1={py(v)} x2={pad.l + iw} y2={py(v)} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        </g>
      ))}
      <g clipPath={`url(#${id.current})`}>
        {series.map(s => (
          <g key={s.label}>
            <path d={area(s.data)} fill={`${s.color}20`} />
            <path d={path(s.data)} fill="none" stroke={s.color} strokeWidth={2}
              strokeLinejoin="round" strokeLinecap="round"
              strokeDasharray={s.dashed ? '5 3' : undefined} />
          </g>
        ))}
      </g>
      {labels.map((l, i) => (
        <text key={l} x={px(i)} y={h - 6} textAnchor="middle" fontSize={9} fill="rgba(240,238,255,0.3)">{l}</text>
      ))}
    </svg>
  )
}

/* ─── Animated Donut Chart ───────────────────────────────────── */
export function AnimatedDonut({ data, size = 160, stroke = 28 }) {
  const [ref, inView] = useInView()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const duration = 1000
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 2.5)
      setProgress(eased)
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView])

  const r = size / 2 - stroke / 2 - 2
  const cx = size / 2, cy = size / 2
  const circ = 2 * Math.PI * r
  let cumulative = 0

  return (
    <svg ref={ref} viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
      {/* Track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
      {data.map((item) => {
        const pct = item.pct * progress
        const offset = circ - (pct / 100) * circ
        const rotation = (cumulative / 100) * 360 - 90
        cumulative += item.pct
        return (
          <circle
            key={item.label}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={item.color}
            strokeWidth={stroke}
            strokeDasharray={`${circ}`}
            strokeDashoffset={offset}
            strokeLinecap="butt"
            transform={`rotate(${rotation} ${cx} ${cy})`}
            style={{ transition: 'stroke-dashoffset 0.05s' }}
          />
        )
      })}
      <circle cx={cx} cy={cy} r={r - stroke / 2 - 1} fill="#0b0918" />
    </svg>
  )
}

/* ─── Animated Progress Bar ──────────────────────────────────── */
export function AnimatedProgressBar({ value, color, delay = 0 }) {
  const [ref, inView] = useInView()
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => {
      let raf
      const start = performance.now()
      const step = (now) => {
        const t = Math.min((now - start) / 700, 1)
        const eased = 1 - Math.pow(1 - t, 2)
        setWidth(eased * value)
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
      return () => cancelAnimationFrame(raf)
    }, delay)
    return () => clearTimeout(timer)
  }, [inView, value, delay])

  const c = color || (value >= 80 ? '#4ade80' : value >= 65 ? '#fbbf24' : '#f87171')
  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${width}%`, height: '100%', background: c, borderRadius: 4, transition: 'width 0.05s' }} />
      </div>
      <span style={{ fontSize: 12, color: 'rgba(240,238,255,0.6)', minWidth: 32 }}>{Math.round(width)}%</span>
    </div>
  )
}
