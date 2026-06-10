import { motion } from 'framer-motion'
import { Building2, CalendarDays, Handshake, UserPlus } from 'lucide-react'
import { useData } from '@/context/DataContext'
import { formatRelative } from '@/lib/format'
import { staggerContainer, staggerItem } from '@/lib/motion'
import type { Activity } from '@/types'

const icons = {
  lead: UserPlus,
  visit: CalendarDays,
  property: Building2,
  deal: Handshake,
}

const colors = {
  lead: 'text-stage-contato bg-stage-contato-muted',
  visit: 'text-stage-visita bg-stage-visita-muted',
  property: 'text-accent bg-accent-muted',
  deal: 'text-stage-fechado bg-stage-fechado-muted',
}

export function ActivityFeed() {
  const { activities } = useData()

  return (
    <div className="rounded-xl border border-horizon-700 bg-surface shadow-card">
      <div className="border-b border-horizon-700 px-5 py-4">
        <h2 className="font-display text-lg font-semibold text-horizon-100">Atividade recente</h2>
        <p className="text-sm text-horizon-400">Últimas movimentações</p>
      </div>
      <motion.ul
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="p-4 space-y-1"
      >
        {activities.slice(0, 6).map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </motion.ul>
    </div>
  )
}

function ActivityItem({ activity }: { activity: Activity }) {
  const Icon = icons[activity.type]
  const color = colors[activity.type]

  return (
    <motion.li
      variants={staggerItem}
      className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-horizon-800/50 transition-colors"
    >
      <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${color}`}>
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-horizon-100">{activity.title}</p>
        <p className="text-xs text-horizon-400 truncate">{activity.description}</p>
      </div>
      <span className="text-[10px] text-horizon-500 shrink-0 tabular-nums">
        {formatRelative(activity.timestamp)}
      </span>
    </motion.li>
  )
}
