import { X, Bed, Bath, Car, Maximize, MapPin } from 'lucide-react'
import type { Property } from '@/types'
import { useData } from '@/context/DataContext'
import { formatCurrency } from '@/lib/format'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'

interface PropertyPreviewProps {
  property: Property
  onClose: () => void
}

export function PropertyPreview({ property, onClose }: PropertyPreviewProps) {
  const { getBroker } = useData()
  const broker = getBroker(property.brokerId)

  return (
    <div className="rounded-xl border border-horizon-700 bg-surface shadow-elevated overflow-hidden sticky top-0">
      <div className="relative">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="h-48 w-full object-cover"
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-lg bg-horizon-950/60 p-1.5 text-horizon-100 backdrop-blur-sm lg:hidden"
        >
          <X className="size-4" />
        </button>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <Badge variant={property.status === 'ativo' ? 'fechado' : 'default'}>
            {property.status}
          </Badge>
          <Badge variant="default" className="capitalize">{property.type}</Badge>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <p className="text-xs text-horizon-400 flex items-center gap-1">
            <MapPin className="size-3" />
            {property.neighborhood}, {property.city}
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold text-horizon-100">
            {property.title}
          </h2>
          <p className="mt-2 font-display text-2xl font-semibold text-accent tabular-nums">
            {formatCurrency(property.price)}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Spec icon={Bed} value={String(property.bedrooms)} label="Quartos" />
          <Spec icon={Bath} value={String(property.bathrooms)} label="Banheiros" />
          <Spec icon={Car} value={String(property.parking)} label="Vagas" />
          <Spec icon={Maximize} value={`${property.area}`} label="m²" />
        </div>

        <p className="text-sm text-horizon-400">{property.address}</p>

        {broker && (
          <div className="flex items-center gap-3 rounded-lg bg-horizon-800 p-3">
            <Avatar name={broker.name} />
            <div>
              <p className="text-sm font-medium text-horizon-100">{broker.name}</p>
              <p className="text-xs text-horizon-400">{broker.phone}</p>
            </div>
          </div>
        )}

        <Button className="w-full">Agendar visita</Button>
      </div>
    </div>
  )
}

function Spec({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Bed
  value: string
  label: string
}) {
  return (
    <div className="rounded-lg bg-horizon-800 p-3 text-center">
      <Icon className="size-4 mx-auto text-horizon-400" />
      <p className="mt-1 text-sm font-medium text-horizon-100 tabular-nums">{value}</p>
      <p className="text-[10px] text-horizon-500">{label}</p>
    </div>
  )
}
