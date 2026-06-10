import type { ReactNode } from 'react'

interface PageHeaderProps {
  overline?: string
  title: string
  description?: string
  action?: ReactNode
}

export function PageHeader({ overline, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 pb-8 border-b border-horizon-800">
      <div>
        {overline && (
          <p className="text-[10px] uppercase tracking-[0.2em] text-accent/70 mb-2">{overline}</p>
        )}
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-horizon-50 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-horizon-500 max-w-xl">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
