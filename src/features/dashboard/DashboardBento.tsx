import { motion } from 'framer-motion'
import { ArrowUpRight, Building2, CalendarDays, TrendingUp } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { CountUp } from '@/components/motion/CountUp'
import { dashboardMetrics } from '@/data/mock/metrics'
import { formatCurrency, formatPercent } from '@/lib/format'
import { staggerContainer, staggerItem } from '@/lib/motion'
import { cn } from '@/lib/cn'

export function DashboardBento() {
  const { pipelineTotal, activeProperties, visitsToday, conversionRate, pipelineSparkline } =
    dashboardMetrics

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid gap-4 md:grid-cols-12 md:grid-rows-2"
    >
      {/* Hero metric */}
      <motion.div
        variants={staggerItem}
        className="md:col-span-5 md:row-span-2 rounded-xl border border-horizon-700 bg-surface p-6 shadow-card flex flex-col justify-between"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-horizon-400">
            Pipeline total
          </p>
          <p className="mt-2 font-display text-4xl md:text-5xl font-semibold text-horizon-50 tabular-nums">
            <CountUp value={pipelineTotal} formatter={formatCurrency} />
          </p>
          <div className="mt-3 flex items-center gap-2 text-sm text-stage-fechado">
            <ArrowUpRight className="size-4" />
            <span>+12,4% este mês</span>
          </div>
        </div>
        <div className="mt-6 h-24 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={pipelineSparkline}>
              <defs>
                <linearGradient id="pipelineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c17f59" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#c17f59" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#c17f59"
                strokeWidth={2}
                fill="url(#pipelineGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <KpiCard
        icon={Building2}
        label="Imóveis ativos"
        value={activeProperties}
        suffix=""
        className="md:col-span-2"
      />
      <KpiCard
        icon={CalendarDays}
        label="Visitas hoje"
        value={visitsToday}
        suffix=""
        className="md:col-span-2"
        highlight
      />
      <KpiCard
        icon={TrendingUp}
        label="Taxa conversão"
        value={conversionRate}
        suffix="%"
        decimals
        className="md:col-span-3"
      />
    </motion.div>
  )
}

function KpiCard({
  icon: Icon,
  label,
  value,
  suffix,
  decimals,
  className,
  highlight,
}: {
  icon: typeof Building2
  label: string
  value: number
  suffix: string
  decimals?: boolean
  className?: string
  highlight?: boolean
}) {
  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        'rounded-xl border border-horizon-700 bg-surface p-5 shadow-card',
        highlight && 'border-accent/30 bg-accent-muted/30',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-horizon-400">{label}</p>
        <Icon className={cn('size-4', highlight ? 'text-accent' : 'text-horizon-500')} />
      </div>
      <p className="mt-3 font-display text-2xl font-semibold text-horizon-100 tabular-nums">
        <CountUp
          value={value}
          formatter={(v) => (decimals ? formatPercent(v) : `${v}${suffix}`)}
        />
      </p>
    </motion.div>
  )
}
