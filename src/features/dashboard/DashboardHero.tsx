import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { CountUp } from '@/components/motion/CountUp'
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics'
import { formatCurrency, formatPercent } from '@/lib/format'
import { cn } from '@/lib/cn'

interface DashboardHeroProps {
  greeting: string
  userName: string
}

export function DashboardHero({ greeting, userName }: DashboardHeroProps) {
  const {
    pipelineTotal,
    activeProperties,
    visitsToday,
    conversionRate,
    pipelineSparkline,
    pipelineGrowth,
    leadsInPipeline,
    hotLeads,
  } = useDashboardMetrics()

  const growthPositive = pipelineGrowth >= 0

  const metrics = [
    { label: 'Pipeline ativo', value: pipelineTotal, format: formatCurrency },
    { label: 'Leads ativos', value: leadsInPipeline, format: (v: number) => String(v) },
    { label: 'Imóveis', value: activeProperties, format: (v: number) => String(v) },
    { label: 'Visitas hoje', value: visitsToday, format: (v: number) => String(v) },
    { label: 'Conversão', value: conversionRate, format: formatPercent },
    { label: 'Leads quentes', value: hotLeads, format: (v: number) => String(v) },
  ]

  return (
    <div className="relative -mx-4 md:-mx-8 mt-2 md:mt-4 overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-horizon-900 to-horizon-950" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'repeating-linear-gradient(90deg, #c17f59 0, #c17f59 1px, transparent 1px, transparent 80px)',
      }} />

      <div className="relative px-4 md:px-8 pt-12 pb-10 md:pt-16 md:pb-14">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl md:text-3xl text-horizon-100 mb-8 md:mb-10"
        >
          {greeting}, <span className="text-horizon-400">{userName}</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.03 }}
          className="text-xs uppercase tracking-[0.2em] text-accent/80 mb-3"
        >
          Operação · São Paulo
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
        >
          <div>
            <p className="text-sm text-horizon-400 mb-2">Valor em negociação</p>
            <p className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-horizon-50 tabular-nums tracking-tight">
              <CountUp value={pipelineTotal} formatter={formatCurrency} />
            </p>
            {pipelineGrowth !== 0 && (
              <div
                className={cn(
                  'mt-3 inline-flex items-center gap-1.5 text-sm',
                  growthPositive ? 'text-stage-fechado' : 'text-danger',
                )}
              >
                {growthPositive ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
                {growthPositive ? '+' : ''}{formatPercent(pipelineGrowth)} vs. mês anterior
              </div>
            )}
          </div>

          <div className="w-full lg:w-72 h-20 opacity-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pipelineSparkline}>
                <defs>
                  <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c17f59" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#c17f59" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#c17f59" strokeWidth={1.5} fill="url(#heroGrad)" />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-horizon-600 text-right mt-1">visitas na semana</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-10 pt-8 border-t border-horizon-700/50 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {metrics.slice(1).map((m) => (
            <div key={m.label}>
              <p className="text-[10px] uppercase tracking-wider text-horizon-500">{m.label}</p>
              <p className="mt-1 font-display text-2xl font-semibold text-horizon-100 tabular-nums">
                <CountUp value={m.value} formatter={m.format} />
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
