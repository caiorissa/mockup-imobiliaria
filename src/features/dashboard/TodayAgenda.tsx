import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { useData } from '@/context/DataContext'
import { MOCK_TODAY } from '@/lib/dashboard'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { staggerContainer, staggerItem } from '@/lib/motion'

export function TodayAgenda() {
  const { visits, getLead, getProperty, getBroker } = useData()
  const todayVisits = visits
    .filter((v) => v.date === MOCK_TODAY && v.status !== 'cancelada')
    .sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <h3 className="font-display text-lg font-semibold text-horizon-50">Hoje</h3>
        <Link to="/visitas" className="text-xs text-accent hover:underline">
          Ver agenda →
        </Link>
      </div>

      {todayVisits.length === 0 ? (
        <p className="text-sm text-horizon-600 py-8">Nenhuma visita agendada</p>
      ) : (
        <motion.ol
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="relative border-l border-horizon-700 ml-3 space-y-0"
        >
          {todayVisits.map((visit) => {
            const lead = getLead(visit.leadId)
            const property = getProperty(visit.propertyId)
            const broker = getBroker(visit.brokerId)
            return (
              <motion.li
                key={visit.id}
                variants={staggerItem}
                className="relative pl-8 pb-8 last:pb-0"
              >
                <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-accent ring-4 ring-horizon-950" />
                <time className="text-xs font-medium text-accent tabular-nums">{visit.time}</time>
                <p className="mt-1 font-medium text-horizon-100">{lead?.name}</p>
                <p className="mt-0.5 text-sm text-horizon-500 flex items-center gap-1 truncate">
                  <MapPin className="size-3 shrink-0" />
                  {property?.neighborhood}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant={visit.status === 'confirmada' ? 'fechado' : 'visita'}>
                    {visit.status}
                  </Badge>
                  {broker && <Avatar name={broker.name} size="sm" />}
                </div>
              </motion.li>
            )
          })}
        </motion.ol>
      )}
    </div>
  )
}
