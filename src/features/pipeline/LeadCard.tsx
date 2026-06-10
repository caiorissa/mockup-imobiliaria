import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Flame, Snowflake } from 'lucide-react'
import type { Lead } from '@/types'
import { useData } from '@/context/DataContext'
import { formatCompactCurrency, formatRelative } from '@/lib/format'
import { Avatar } from '@/components/ui/Avatar'
import { HoverCard } from '@/components/ui/HoverCard'
import { cn } from '@/lib/cn'

interface LeadCardProps {
  lead: Lead
  onClick?: () => void
  isSelected?: boolean
  isDragging?: boolean
}

export function LeadCard({ lead, onClick, isSelected, isDragging }: LeadCardProps) {
  const { getProperty, getBroker } = useData()
  const property = lead.propertyId ? getProperty(lead.propertyId) : null
  const broker = getBroker(lead.brokerId)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } =
    useSortable({ id: lead.id, disabled: isDragging })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const card = (
    <div
      ref={isDragging ? undefined : setNodeRef}
      style={isDragging ? undefined : style}
      onClick={onClick}
      className={cn(
        'group rounded-lg border bg-surface p-3 cursor-pointer transition-all',
        'hover:border-accent/40 hover:shadow-card',
        isSelected ? 'border-accent ring-1 ring-accent/30' : 'border-horizon-700',
        (isDragging || isSortableDragging) && 'opacity-50 shadow-elevated',
      )}
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 text-horizon-600 hover:text-horizon-400 cursor-grab active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="size-3.5" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm text-horizon-100 truncate">{lead.name}</p>
            {lead.temperature === 'quente' && (
              <Flame className="size-3 text-warning shrink-0" />
            )}
            {lead.temperature === 'frio' && (
              <Snowflake className="size-3 text-stage-visita shrink-0" />
            )}
          </div>
          {property && (
            <p className="mt-1 text-xs text-horizon-400 truncate">{property.neighborhood}</p>
          )}
          <div className="mt-2 flex items-center justify-between">
            {lead.value > 0 && (
              <span className="text-xs font-medium text-accent tabular-nums">
                {formatCompactCurrency(lead.value)}
              </span>
            )}
            {broker && <Avatar name={broker.name} size="sm" />}
          </div>
        </div>
      </div>
    </div>
  )

  if (isDragging) return card

  return (
    <HoverCard
      trigger={card}
      openDelay={150}
    >
      <div className="space-y-2">
        <p className="font-medium text-horizon-100">{lead.name}</p>
        <p className="text-xs text-horizon-400">{lead.email}</p>
        {property && (
          <p className="text-xs text-horizon-300">
            {property.title} — {formatCompactCurrency(property.price)}
          </p>
        )}
        <p className="text-[10px] text-horizon-500">
          Último contato {formatRelative(lead.lastContactAt)}
        </p>
      </div>
    </HoverCard>
  )
}
