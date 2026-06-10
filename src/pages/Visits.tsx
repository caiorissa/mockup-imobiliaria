import { useMemo, useState } from 'react'
import { format, addWeeks, subWeeks } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useData } from '@/context/DataContext'
import { WeekCalendar } from '@/features/visits/WeekCalendar'
import { VisitCard } from '@/features/visits/VisitCard'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import type { VisitPeriod } from '@/types'

const periods: { id: VisitPeriod; label: string }[] = [
  { id: 'manha', label: 'Manhã' },
  { id: 'tarde', label: 'Tarde' },
  { id: 'noite', label: 'Noite' },
]

export function Visits() {
  const { visits, brokers } = useData()
  const [weekDate, setWeekDate] = useState(new Date('2026-06-10'))
  const [selectedDate, setSelectedDate] = useState(new Date('2026-06-10'))
  const [brokerFilter, setBrokerFilter] = useState('all')

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd')

  const dayVisits = useMemo(() => {
    return visits
      .filter((v) => {
        if (v.date !== selectedDateStr) return false
        if (brokerFilter !== 'all' && v.brokerId !== brokerFilter) return false
        return v.status !== 'cancelada'
      })
      .sort((a, b) => a.time.localeCompare(b.time))
  }, [visits, selectedDateStr, brokerFilter])

  const visitsByPeriod = useMemo(() => {
    const map: Record<VisitPeriod, typeof dayVisits> = {
      manha: [],
      tarde: [],
      noite: [],
    }
    dayVisits.forEach((v) => map[v.period].push(v))
    return map
  }, [dayVisits])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-horizon-50">Visitas</h1>
          <p className="mt-1 text-horizon-400">Agenda semanal de visitas marcadas</p>
        </div>
        <Select
          value={brokerFilter}
          onValueChange={setBrokerFilter}
          options={[
            { value: 'all', label: 'Todos os corretores' },
            ...brokers.map((b) => ({ value: b.id, label: b.name })),
          ]}
          className="w-48"
        />
      </div>

      <div className="rounded-xl border border-horizon-700 bg-surface p-4 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setWeekDate(subWeeks(weekDate, 1))}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <p className="font-display text-lg font-semibold text-horizon-100 capitalize">
            {format(weekDate, "MMMM yyyy", { locale: undefined })}
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setWeekDate(addWeeks(weekDate, 1))}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <WeekCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold text-horizon-100 mb-4">
          {format(selectedDate, "EEEE, d 'de' MMMM", { locale: undefined })}
          <span className="ml-2 text-sm font-normal text-horizon-400">
            ({dayVisits.length} visitas)
          </span>
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">
          {periods.map((period) => (
            <div key={period.id}>
              <h3 className="text-xs font-medium uppercase tracking-wide text-horizon-400 mb-3">
                {period.label}
              </h3>
              <div className="space-y-3">
                {visitsByPeriod[period.id].length === 0 ? (
                  <p className="text-sm text-horizon-500 py-8 text-center rounded-xl border border-dashed border-horizon-700">
                    Nenhuma visita
                  </p>
                ) : (
                  visitsByPeriod[period.id].map((visit) => (
                    <VisitCard key={visit.id} visit={visit} />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
