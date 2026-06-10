import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '@/context/DataContext'
import { PIPELINE_STAGES } from '@/types'
import { formatCompactCurrency } from '@/lib/format'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export function MiniKanban() {
  const { leads } = useData()

  return (
    <div className="rounded-xl border border-horizon-700 bg-surface shadow-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-horizon-700 px-5 py-4">
        <div>
          <h2 className="font-display text-lg font-semibold text-horizon-100">Funil resumido</h2>
          <p className="text-sm text-horizon-400">Visão rápida do pipeline</p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/funil">
            Ver completo
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-horizon-700 p-px">
        {PIPELINE_STAGES.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage.id)
          const total = stageLeads.reduce((sum, l) => sum + l.value, 0)
          return (
            <div key={stage.id} className="bg-surface p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge variant={stage.id}>{stage.label}</Badge>
                <span className="text-xs text-horizon-400 tabular-nums">{stageLeads.length}</span>
              </div>
              <p className="text-sm font-medium text-horizon-100 tabular-nums mb-3">
                {formatCompactCurrency(total)}
              </p>
              <div className="space-y-2">
                {stageLeads.slice(0, 2).map((lead, i) => (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-lg bg-horizon-800 px-2.5 py-2 text-xs text-horizon-300 truncate"
                  >
                    {lead.name}
                  </motion.div>
                ))}
                {stageLeads.length > 2 && (
                  <p className="text-[10px] text-horizon-500">+{stageLeads.length - 2} mais</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
