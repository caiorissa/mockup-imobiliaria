import { X, Plus } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from './Button'

export interface FilterChip {
  id: string
  label: string
  value: string
}

interface FilterChipBarProps {
  chips: FilterChip[]
  onRemove: (id: string) => void
  onAddClick?: () => void
  className?: string
}

export function FilterChipBar({ chips, onRemove, onAddClick, className }: FilterChipBarProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {chips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1.5 rounded-lg bg-accent-muted border border-accent/20 px-2.5 py-1 text-xs font-medium text-accent"
        >
          <span className="text-horizon-400">{chip.label}:</span>
          {chip.value}
          <button
            onClick={() => onRemove(chip.id)}
            className="rounded p-0.5 hover:bg-accent/20 transition-colors"
            aria-label={`Remover filtro ${chip.label}`}
          >
            <X className="size-3" />
          </button>
        </span>
      ))}
      {onAddClick && (
        <Button variant="ghost" size="sm" onClick={onAddClick} className="h-7 text-xs">
          <Plus className="size-3" />
          Filtro
        </Button>
      )}
    </div>
  )
}
