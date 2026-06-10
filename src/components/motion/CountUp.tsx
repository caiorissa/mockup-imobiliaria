import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './MotionProvider'
import { cn } from '@/lib/cn'

interface CountUpProps {
  value: number
  duration?: number
  formatter?: (value: number) => string
  className?: string
}

export function CountUp({
  value,
  duration = 1200,
  formatter = (v) => v.toLocaleString('pt-BR'),
  className,
}: CountUpProps) {
  const reducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(reducedMotion ? value : 0)
  const prevValue = useRef(0)

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value)
      return
    }

    const start = prevValue.current
    const diff = value - start
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(start + diff * eased))
      if (progress < 1) requestAnimationFrame(animate)
      else prevValue.current = value
    }

    requestAnimationFrame(animate)
  }, [value, duration, reducedMotion])

  return <span className={cn('tabular-nums', className)}>{formatter(display)}</span>
}
