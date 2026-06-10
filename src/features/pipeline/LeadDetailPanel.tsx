import { X, Phone, Mail, MapPin, Clock } from 'lucide-react'
import type { Lead } from '@/types'
import { useData } from '@/context/DataContext'
import { formatCurrency, formatRelative } from '@/lib/format'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'

interface LeadDetailPanelProps {
  lead: Lead
  onClose: () => void
}

export function LeadDetailPanel({ lead, onClose }: LeadDetailPanelProps) {
  const { getProperty, getBroker } = useData()
  const property = lead.propertyId ? getProperty(lead.propertyId) : null
  const broker = getBroker(lead.brokerId)

  const history = [
    { date: lead.createdAt, event: 'Lead criado', source: lead.source },
    { date: lead.lastContactAt, event: 'Último contato', source: '' },
  ]

  return (
    <div className="rounded-xl border border-horizon-700 bg-surface shadow-elevated overflow-hidden">
      <div className="flex items-start justify-between border-b border-horizon-700 p-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-xl font-semibold text-horizon-100">{lead.name}</h2>
            <Badge variant={lead.stage}>{lead.stage}</Badge>
          </div>
          <p className="mt-1 text-sm text-horizon-400 capitalize">{lead.temperature} · {lead.source}</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-horizon-400 hover:bg-horizon-700 transition-colors lg:hidden"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="p-5 space-y-5">
        {lead.value > 0 && (
          <div className="rounded-lg bg-accent-muted border border-accent/20 p-4">
            <p className="text-xs text-horizon-400 uppercase tracking-wide">Valor em negociação</p>
            <p className="mt-1 font-display text-2xl font-semibold text-accent tabular-nums">
              {formatCurrency(lead.value)}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <ContactRow icon={Phone} value={lead.phone} />
          <ContactRow icon={Mail} value={lead.email} />
          <ContactRow icon={Clock} value={`Último contato ${formatRelative(lead.lastContactAt)}`} />
        </div>

        {property && (
          <div className="rounded-lg border border-horizon-700 overflow-hidden">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="h-32 w-full object-cover"
            />
            <div className="p-3">
              <p className="font-medium text-sm text-horizon-100">{property.title}</p>
              <p className="mt-1 text-xs text-horizon-400 flex items-center gap-1">
                <MapPin className="size-3" />
                {property.neighborhood} · {formatCurrency(property.price)}
              </p>
            </div>
          </div>
        )}

        {broker && (
          <div className="flex items-center gap-3 rounded-lg bg-horizon-800 p-3">
            <Avatar name={broker.name} />
            <div>
              <p className="text-sm font-medium text-horizon-100">{broker.name}</p>
              <p className="text-xs text-horizon-400">Corretor responsável</p>
            </div>
          </div>
        )}

        {lead.notes && (
          <div>
            <p className="text-xs font-medium text-horizon-400 uppercase tracking-wide mb-2">Notas</p>
            <p className="text-sm text-horizon-300">{lead.notes}</p>
          </div>
        )}

        <div>
          <p className="text-xs font-medium text-horizon-400 uppercase tracking-wide mb-3">Histórico</p>
          <ul className="space-y-3">
            {history.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <div className="w-1 shrink-0 rounded-full bg-accent" />
                <div>
                  <p className="text-horizon-100">{item.event}</p>
                  <p className="text-xs text-horizon-500">
                    {item.date}{item.source ? ` · ${item.source}` : ''}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2 pt-2">
          <Button className="flex-1" size="sm">Agendar visita</Button>
          <Button variant="secondary" className="flex-1" size="sm">Registrar contato</Button>
        </div>
      </div>
    </div>
  )
}

function ContactRow({ icon: Icon, value }: { icon: typeof Phone; value: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-horizon-300">
      <Icon className="size-4 text-horizon-500 shrink-0" />
      {value}
    </div>
  )
}
