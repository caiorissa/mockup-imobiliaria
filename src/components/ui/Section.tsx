import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface SectionProps {
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
  className?: string
  bleed?: boolean
}

export function Section({ title, description, action, children, className, bleed }: SectionProps) {
  return (
    <section className={cn(bleed && '-mx-4 md:-mx-8', className)}>
      <div className={cn('flex items-end justify-between gap-4', bleed ? 'px-4 md:px-8' : '')}>
        <div>
          <h2 className="font-display text-xl md:text-2xl font-semibold text-horizon-50">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-horizon-500">{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className={cn('mt-5', bleed && 'px-4 md:px-8')}>{children}</div>
    </section>
  )
}
