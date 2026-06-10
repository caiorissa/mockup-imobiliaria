import { useMemo, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useData } from '@/context/DataContext'
import { PIPELINE_STAGES, type Lead, type PipelineStage } from '@/types'
import { formatCompactCurrency } from '@/lib/format'
import { CountUp } from '@/components/motion/CountUp'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { LeadCard } from './LeadCard'
import { LeadDetailPanel } from './LeadDetailPanel'
import { NewLeadSheet } from './NewLeadSheet'
import { cn } from '@/lib/cn'

export function KanbanBoard() {
  const { leads, moveLead, selectLead, selectedLeadId } = useData()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [newLeadOpen, setNewLeadOpen] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor),
  )

  const activeLead = activeId ? leads.find((l) => l.id === activeId) : null
  const selectedLead = selectedLeadId ? leads.find((l) => l.id === selectedLeadId) : null

  const columns = useMemo(() => {
    return PIPELINE_STAGES.map((stage) => ({
      ...stage,
      leads: leads.filter((l) => l.stage === stage.id),
      total: leads.filter((l) => l.stage === stage.id).reduce((s, l) => s + l.value, 0),
    }))
  }, [leads])

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    if (!over) return

    const leadId = active.id as string
    const overId = over.id as string

    let newStage: PipelineStage | null = null
    if (PIPELINE_STAGES.some((s) => s.id === overId)) {
      newStage = overId as PipelineStage
    } else {
      const overLead = leads.find((l) => l.id === overId)
      if (overLead) newStage = overLead.stage
    }

    if (newStage) {
      const lead = leads.find((l) => l.id === leadId)
      if (lead && lead.stage !== newStage) {
        moveLead(leadId, newStage)
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-horizon-50">Funil de atendimento</h1>
          <p className="mt-1 text-horizon-400">Arraste leads entre estágios para atualizar o pipeline</p>
        </div>
        <Button onClick={() => setNewLeadOpen(true)}>
          <Plus className="size-4" />
          Novo lead
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 min-h-[calc(100dvh-12rem)]">
        <div className="flex-1 lg:w-[60%] overflow-x-auto scrollbar-thin pb-2">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-4 min-w-max lg:min-w-0 lg:grid lg:grid-cols-4">
              {columns.map((col) => (
                <KanbanColumn
                  key={col.id}
                  stage={col.id}
                  label={col.label}
                  leads={col.leads}
                  total={col.total}
                  badgeVariant={col.id}
                  onSelectLead={selectLead}
                  selectedLeadId={selectedLeadId}
                />
              ))}
            </div>
            <DragOverlay>
              {activeLead && (
                <div className="rotate-2 opacity-90">
                  <LeadCard lead={activeLead} isDragging />
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </div>

        <div className="lg:w-[40%] shrink-0">
          <AnimatePresence mode="wait">
            {selectedLead ? (
              <motion.div
                key={selectedLead.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                className="sticky top-0"
              >
                <LeadDetailPanel lead={selectedLead} onClose={() => selectLead(null)} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-dashed border-horizon-600 bg-horizon-800/30 p-8 text-center"
              >
                <p className="text-horizon-400 text-sm">
                  Selecione um lead para ver detalhes
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <NewLeadSheet open={newLeadOpen} onOpenChange={setNewLeadOpen} />
    </>
  )
}

function KanbanColumn({
  stage,
  label,
  leads,
  total,
  badgeVariant,
  onSelectLead,
  selectedLeadId,
}: {
  stage: PipelineStage
  label: string
  leads: Lead[]
  total: number
  badgeVariant: PipelineStage
  onSelectLead: (id: string) => void
  selectedLeadId: string | null
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'w-[280px] lg:w-auto flex flex-col rounded-xl border bg-horizon-900/50 transition-colors',
        isOver ? 'border-accent bg-accent-muted/10' : 'border-horizon-700',
      )}
    >
      <div className="p-3 border-b border-horizon-700">
        <div className="flex items-center justify-between mb-2">
          <Badge variant={badgeVariant}>{label}</Badge>
          <span className="text-xs text-horizon-400 tabular-nums">{leads.length}</span>
        </div>
        <p className="text-sm font-medium text-horizon-100 tabular-nums">
          <CountUp value={total} formatter={formatCompactCurrency} />
        </p>
      </div>
      <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
        <div className="flex-1 p-2 space-y-2 min-h-[200px] max-h-[calc(100dvh-20rem)] overflow-y-auto scrollbar-thin">
          <AnimatePresence>
            {leads.map((lead) => (
              <motion.div
                key={lead.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <LeadCard
                  lead={lead}
                  onClick={() => onSelectLead(lead.id)}
                  isSelected={selectedLeadId === lead.id}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </div>
  )
}
