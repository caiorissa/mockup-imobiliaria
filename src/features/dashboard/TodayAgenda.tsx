import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clock, MapPin } from 'lucide-react'
import { useData } from '@/context/DataContext'
import { formatDateTime } from '@/lib/format'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { staggerContainer, staggerItem } from '@/lib/motion'

export function TodayAgenda() {
  const { visits, getLead, getProperty, getBroker } = useData()
  const today = '2026-06-10'
  const todayVisits = visits
    .filter((v) => v.date === today && v.status !== 'cancelada')
    .sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div className="rounded-xl border border-horizon-700 bg-surface shadow-card">
      <div className="flex items-center justify-between border-b border-horizon-700 px-5 py-4">
        <div>
          <h2 className="font-display text-lg font-semibold text-horizon-100">Agenda de hoje</h2>
          <p className="text-sm text-horizon-400">{todayVisits.length} visitas agendadas</p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/visitas">Ver agenda</Link>
        </Button>
      </div>
      <motion.ul
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="divide-y divide-horizon-700"
      >
        {todayVisits.map((visit) => {
          const lead = getLead(visit.leadId)
          const property = getProperty(visit.propertyId)
          const broker = getBroker(visit.brokerId)
          return (
            <motion.li
              key={visit.id}
              variants={staggerItem}
              className="flex items-start gap-4 px-5 py-4 hover:bg-horizon-800/50 transition-colors"
            >
              <div className="flex flex-col items-center shrink-0 w-12">
                <span className="text-sm font-semibold text-accent tabular-nums">{visit.time}</span>
                <span className="text-[10px] text-horizon-500 uppercase">{visit.period}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-horizon-100 truncate">{lead?.name}</p>
                  <Badge variant={visit.status === 'confirmada' ? 'fechado' : 'visita'}>
                    {visit.status}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-horizon-400 truncate flex items-center gap-1">
                  <MapPin className="size-3 shrink-0" />
                  {property?.title}
                </p>
                <p className="mt-1 text-xs text-horizon-500 flex items-center gap-1">
                  <Clock className="size-3" />
                  {formatDateTime(visit.date, visit.time)}
                </p>
              </div>
              {broker && <Avatar name={broker.name} size="sm" />}
            </motion.li>
          )
        })}
      </motion.ul>
    </div>
  )
}
