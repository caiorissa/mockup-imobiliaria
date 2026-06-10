import type { Property } from '@/types'
import { useData } from '@/context/DataContext'
import { formatCurrency } from '@/lib/format'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { Badge } from '@/components/ui/Badge'
import { Bed, Bath, Car, Maximize } from 'lucide-react'
import { cn } from '@/lib/cn'

interface PropertyCardProps {
  property: Property
  onClick?: () => void
  selected?: boolean
}

export function PropertyCard({ property, onClick, selected }: PropertyCardProps) {
  const { getBroker } = useData()
  const broker = getBroker(property.brokerId)

  return (
    <div onClick={onClick} className="cursor-pointer">
    <SpotlightCard
      className={cn(selected && 'ring-2 ring-accent')}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={property.status === 'ativo' ? 'fechado' : 'default'}>
            {property.status}
          </Badge>
          {property.featured && <Badge variant="contato">Destaque</Badge>}
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-horizon-400">{property.neighborhood}</p>
        <h3 className="mt-1 font-medium text-horizon-100 line-clamp-1">{property.title}</h3>
        <p className="mt-2 font-display text-lg font-semibold text-accent tabular-nums">
          {formatCurrency(property.price)}
        </p>
        <div className="mt-3 flex items-center gap-4 text-xs text-horizon-400">
          <span className="flex items-center gap-1"><Bed className="size-3.5" />{property.bedrooms}</span>
          <span className="flex items-center gap-1"><Bath className="size-3.5" />{property.bathrooms}</span>
          <span className="flex items-center gap-1"><Car className="size-3.5" />{property.parking}</span>
          <span className="flex items-center gap-1"><Maximize className="size-3.5" />{property.area}m²</span>
        </div>
        {broker && (
          <p className="mt-3 text-xs text-horizon-500">{broker.name}</p>
        )}
      </div>
    </SpotlightCard>
    </div>
  )
}
