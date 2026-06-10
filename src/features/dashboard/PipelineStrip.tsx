import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useData } from '@/context/DataContext'
import { PIPELINE_STAGES } from '@/types'
import { formatCompactCurrency } from '@/lib/format'
import { Section } from '@/components/ui/Section'
import { cn } from '@/lib/cn'

const stageAccent: Record<string, string> = {
  contato: 'border-stage-contato/50 bg-stage-contato-muted/30',
  visita: 'border-stage-visita/50 bg-stage-visita-muted/30',
  proposta: 'border-stage-proposta/50 bg-stage-proposta-muted/30',
  fechado: 'border-stage-fechado/50 bg-stage-fechado-muted/30',
}

export function PipelineStrip() {
  const { leads } = useData()

  return (
    <Section
      title="Funil"
      description="Pipeline em tempo real"
      bleed
      action={
        <Link
          to="/funil"
          className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors"
        >
          Abrir funil
          <ArrowRight className="size-3.5" />
        </Link>
      }
    >
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin snap-x snap-mandatory -mx-4 px-4 md:-mx-8 md:px-8">
        {PIPELINE_STAGES.map((stage, stageIndex) => {
          const stageLeads = leads.filter((l) => l.stage === stage.id)
          const total = stageLeads.reduce((sum, l) => sum + l.value, 0)

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: stageIndex * 0.06 }}
              className={cn(
                'snap-start shrink-0 w-[260px] border p-5 flex flex-col min-h-[220px]',
                stageAccent[stage.id],
              )}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs uppercase tracking-wider text-horizon-400">
                  {stage.label}
                </span>
                <span className="font-display text-2xl font-semibold text-horizon-50 tabular-nums">
                  {stageLeads.length}
                </span>
              </div>
              <p className="mt-2 text-sm text-accent tabular-nums font-medium">
                {formatCompactCurrency(total)}
              </p>

              <ul className="mt-auto pt-4 space-y-2 border-t border-horizon-700/40">
                {stageLeads.slice(0, 3).map((lead) => (
                  <li key={lead.id} className="text-sm text-horizon-300 truncate">
                    {lead.name}
                  </li>
                ))}
                {stageLeads.length === 0 && (
                  <li className="text-sm text-horizon-600 italic">Vazio</li>
                )}
                {stageLeads.length > 3 && (
                  <li className="text-xs text-horizon-500">+{stageLeads.length - 3}</li>
                )}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
