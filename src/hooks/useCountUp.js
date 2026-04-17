import { useState, useEffect } from 'react'

export function useCountUp(target, duration = 1400, delay = 0) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let raf
    const timer = setTimeout(() => {
      const start = performance.now()
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(Math.round(eased * target))
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, delay)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [target, duration, delay])

  return value
}
