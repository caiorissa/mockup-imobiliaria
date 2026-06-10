import { useMemo, useState } from 'react'
import { LayoutGrid, List, Plus } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { useData } from '@/context/DataContext'
import { neighborhoods } from '@/data/mock/neighborhoods'
import { TableCard } from '@/components/ui/TableCard'
import { FilterChipBar, type FilterChip } from '@/components/ui/FilterChipBar'
import { Button } from '@/components/ui/Button'
import { Sheet } from '@/components/ui/Sheet'
import { Popover } from '@/components/ui/Popover'
import { PropertyTable } from '@/features/properties/PropertyTable'
import { PropertyCard } from '@/features/properties/PropertyCard'
import { PropertyPreview } from '@/features/properties/PropertyPreview'
import { PropertyForm } from '@/features/properties/PropertyForm'
import type { Property, PropertyStatus } from '@/types'
import { cn } from '@/lib/cn'

export function Properties() {
  const { properties } = useData()
  const [view, setView] = useState<'table' | 'grid'>('table')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([])
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(10000000)
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | 'all'>('all')

  const chips: FilterChip[] = useMemo(() => {
    const result: FilterChip[] = []
    selectedNeighborhoods.forEach((n) => {
      result.push({ id: `nb-${n}`, label: 'Bairro', value: n })
    })
    if (priceMin > 0 || priceMax < 10000000) {
      result.push({
        id: 'price',
        label: 'Preço',
        value: `R$ ${(priceMin / 1000).toFixed(0)}k — R$ ${(priceMax / 1000000).toFixed(1)}M`,
      })
    }
    if (statusFilter !== 'all') {
      result.push({ id: 'status', label: 'Status', value: statusFilter })
    }
    return result
  }, [selectedNeighborhoods, priceMin, priceMax, statusFilter])

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (selectedNeighborhoods.length && !selectedNeighborhoods.includes(p.neighborhood)) return false
      if (p.price < priceMin || p.price > priceMax) return false
      if (statusFilter !== 'all' && p.status !== statusFilter) return false
      return true
    })
  }, [properties, selectedNeighborhoods, priceMin, priceMax, statusFilter])

  const removeChip = (id: string) => {
    if (id.startsWith('nb-')) {
      setSelectedNeighborhoods((prev) => prev.filter((n) => `nb-${n}` !== id))
    } else if (id === 'price') {
      setPriceMin(0)
      setPriceMax(10000000)
    } else if (id === 'status') {
      setStatusFilter('all')
    }
  }

  const toggleNeighborhood = (n: string) => {
    setSelectedNeighborhoods((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n],
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-horizon-50">Imóveis</h1>
          <p className="mt-1 text-horizon-400">Cadastro e gestão do portfólio</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-horizon-700 p-0.5">
            <button
              onClick={() => setView('table')}
              className={cn(
                'rounded-md p-2 transition-colors',
                view === 'table' ? 'bg-horizon-700 text-horizon-100' : 'text-horizon-400',
              )}
              aria-label="Visualização em tabela"
            >
              <List className="size-4" />
            </button>
            <button
              onClick={() => setView('grid')}
              className={cn(
                'rounded-md p-2 transition-colors',
                view === 'grid' ? 'bg-horizon-700 text-horizon-100' : 'text-horizon-400',
              )}
              aria-label="Visualização em grid"
            >
              <LayoutGrid className="size-4" />
            </button>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="size-4" />
            Cadastrar imóvel
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <TableCard
            title="Portfólio"
            count={filtered.length}
            empty={filtered.length === 0}
            emptyMessage="Nenhum imóvel corresponde aos filtros"
            filters={
              <FilterChipBar
                chips={chips}
                onRemove={removeChip}
                onAddClick={() => setFilterOpen(true)}
              />
            }
          >
            {view === 'table' ? (
              <PropertyTable
                data={filtered}
                selectedId={selectedProperty?.id}
                onSelect={setSelectedProperty}
              />
            ) : (
              <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    selected={selectedProperty?.id === property.id}
                    onClick={() => setSelectedProperty(property)}
                  />
                ))}
              </div>
            )}
          </TableCard>
        </div>

        <AnimatePresence>
          {selectedProperty && (
            <div className="lg:w-[340px] shrink-0">
              <PropertyPreview
                property={selectedProperty}
                onClose={() => setSelectedProperty(null)}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      <Sheet
        open={formOpen}
        onOpenChange={setFormOpen}
        title="Cadastrar imóvel"
        description="Adicione um novo imóvel ao portfólio"
      >
        <PropertyForm onSuccess={() => setFormOpen(false)} onCancel={() => setFormOpen(false)} />
      </Sheet>

      <Popover
        open={filterOpen}
        onOpenChange={setFilterOpen}
        trigger={<span />}
        className="w-80"
      >
        <div className="space-y-4">
          <p className="text-sm font-medium text-horizon-100">Filtros</p>
          <div>
            <p className="text-xs text-horizon-400 mb-2">Bairro</p>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
              {neighborhoods.map((n) => (
                <button
                  key={n}
                  onClick={() => toggleNeighborhood(n)}
                  className={cn(
                    'rounded-md px-2 py-1 text-xs transition-colors',
                    selectedNeighborhoods.includes(n)
                      ? 'bg-accent-muted text-accent'
                      : 'bg-horizon-700 text-horizon-300 hover:bg-horizon-600',
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-horizon-400 mb-2">
              Faixa de preço: R$ {(priceMin / 1000).toFixed(0)}k — R$ {(priceMax / 1000000).toFixed(1)}M
            </p>
            <input
              type="range"
              min={0}
              max={10000000}
              step={100000}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>
          <div>
            <p className="text-xs text-horizon-400 mb-2">Status</p>
            <div className="flex flex-wrap gap-1.5">
              {(['all', 'ativo', 'reservado', 'vendido', 'arquivado'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    'rounded-md px-2 py-1 text-xs capitalize transition-colors',
                    statusFilter === s
                      ? 'bg-accent-muted text-accent'
                      : 'bg-horizon-700 text-horizon-300',
                  )}
                >
                  {s === 'all' ? 'Todos' : s}
                </button>
              ))}
            </div>
          </div>
          <Button size="sm" className="w-full" onClick={() => setFilterOpen(false)}>
            Aplicar filtros
          </Button>
        </div>
      </Popover>
    </div>
  )
}
