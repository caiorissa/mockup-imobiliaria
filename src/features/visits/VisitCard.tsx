import { Check, X, Clock } from 'lucide-react'
import type { Visit } from '@/types'
import { useData } from '@/context/DataContext'
import { useToast } from '@/context/ToastContext'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

interface VisitCardProps {
  visit: Visit
}

const periodLabels = { manha: 'Manhã', tarde: 'Tarde', noite: 'Noite' }

export function VisitCard({ visit }: VisitCardProps) {
  const { getLead, getProperty, getBroker, updateVisitStatus } = useData()
  const { toast } = useToast()
  const lead = getLead(visit.leadId)
  const property = getProperty(visit.propertyId)
  const broker = getBroker(visit.brokerId)

  const handleConfirm = () => {
    updateVisitStatus(visit.id, 'confirmada')
    toast('Visita confirmada')
  }

  const handleCancel = () => {
    updateVisitStatus(visit.id, 'cancelada')
    toast('Visita cancelada', 'info')
  }

  return (
    <div
      className={cn(
        'rounded-xl border border-horizon-700 bg-surface p-4 transition-all',
        'hover:border-horizon-600 hover:shadow-card',
        visit.status === 'cancelada' && 'opacity-50',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center rounded-lg bg-horizon-800 px-3 py-2">
            <span className="text-sm font-semibold text-accent tabular-nums">{visit.time}</span>
            <span className="text-[10px] text-horizon-500">{periodLabels[visit.period]}</span>
          </div>
          <div>
            <p className="font-medium text-horizon-100">{lead?.name}</p>
            <p className="text-sm text-horizon-400 truncate max-w-[200px]">{property?.title}</p>
            <p className="text-xs text-horizon-500 mt-0.5">{property?.neighborhood}</p>
          </div>
        </div>
        <Badge
          variant={
            visit.status === 'confirmada'
              ? 'fechado'
              : visit.status === 'cancelada'
                ? 'danger'
                : 'visita'
          }
        >
          {visit.status}
        </Badge>
      </div>

      {broker && (
        <div className="mt-3 flex items-center gap-2">
          <Avatar name={broker.name} size="sm" />
          <span className="text-xs text-horizon-400">{broker.name}</span>
        </div>
      )}

      {visit.status === 'agendada' && (
        <div className="mt-3 flex gap-2">
          <Button size="sm" variant="secondary" className="flex-1" onClick={handleConfirm}>
            <Check className="size-3.5" />
            Confirmar
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCancel}>
            <X className="size-3.5" />
          </Button>
        </div>
      )}

      {visit.status === 'confirmada' && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-stage-fechado">
          <Clock className="size-3" />
          Confirmada
        </div>
      )}
    </div>
  )
}
