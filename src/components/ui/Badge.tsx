import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'contato' | 'visita' | 'proposta' | 'fechado' | 'success' | 'warning' | 'danger'
  className?: string
}

const variants = {
  default: 'bg-horizon-700 text-horizon-200',
  contato: 'bg-stage-contato-muted text-stage-contato',
  visita: 'bg-stage-visita-muted text-stage-visita',
  proposta: 'bg-stage-proposta-muted text-stage-proposta',
  fechado: 'bg-stage-fechado-muted text-stage-fechado',
  success: 'bg-success-muted text-success',
  warning: 'bg-warning-muted text-warning',
  danger: 'bg-danger-muted text-danger',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
