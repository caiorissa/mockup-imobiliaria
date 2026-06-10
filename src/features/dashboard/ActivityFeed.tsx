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

export function ActivityFeed() {
  const { activities } = useData()

  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-horizon-50 mb-6">Movimentações</h3>
      <motion.ul
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="divide-y divide-horizon-800"
      >
        {activities.slice(0, 8).map((activity) => (
          <ActivityRow key={activity.id} activity={activity} />
        ))}
      </motion.ul>
    </div>
  )
}

function ActivityRow({ activity }: { activity: Activity }) {
  const Icon = icons[activity.type]

  return (
    <motion.li
      variants={staggerItem}
      className="flex gap-4 py-4 first:pt-0 group"
    >
      <div className="flex size-8 shrink-0 items-center justify-center border border-horizon-700 text-horizon-500 group-hover:border-accent/40 group-hover:text-accent transition-colors">
        <Icon className="size-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-horizon-200">{activity.title}</p>
        <p className="text-xs text-horizon-600 truncate mt-0.5">{activity.description}</p>
      </div>
      <time className="text-[10px] text-horizon-600 shrink-0 tabular-nums">
        {formatRelative(activity.timestamp)}
      </time>
    </motion.li>
  )
}
