import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'
import { FileQuestion, WifiOff, AlertTriangle } from 'lucide-react'
import { Button } from './Button'

interface TableCardProps {
  title: string
  count?: number
  description?: string
  actions?: ReactNode
  filters?: ReactNode
  children: ReactNode
  className?: string
  empty?: boolean
  emptyMessage?: string
  error?: boolean
  offline?: boolean
}

export function TableCard({
  title,
  count,
  description,
  actions,
  filters,
  children,
  className,
  empty,
  emptyMessage = 'Nenhum registro encontrado',
  error,
  offline,
}: TableCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-horizon-700 bg-surface shadow-card overflow-hidden',
        className,
      )}
    >
      <div className="flex flex-col gap-4 border-b border-horizon-700 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-semibold text-horizon-100">{title}</h2>
            {count !== undefined && (
              <span className="rounded-md bg-horizon-700 px-2 py-0.5 text-xs font-medium text-horizon-300 tabular-nums">
                {count}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-0.5 text-sm text-horizon-400">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
      {filters && (
        <div className="border-b border-horizon-700 px-5 py-3">{filters}</div>
      )}
      <div className="relative">
        {empty || error || offline ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            {offline ? (
              <WifiOff className="size-10 text-horizon-500 mb-3" />
            ) : error ? (
              <AlertTriangle className="size-10 text-warning mb-3" />
            ) : (
              <FileQuestion className="size-10 text-horizon-500 mb-3" />
            )}
            <p className="text-sm text-horizon-400">
              {offline
                ? 'Você está offline. Verifique sua conexão.'
                : error
                  ? 'Algo deu errado. Tente novamente.'
                  : emptyMessage}
            </p>
            {(error || offline) && (
              <Button variant="secondary" size="sm" className="mt-4">
                Tentar novamente
              </Button>
            )}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
