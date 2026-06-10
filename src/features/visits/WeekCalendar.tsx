import { useMemo } from 'react'
import {
  startOfWeek,
  addDays,
  format,
  isSameDay,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useData } from '@/context/DataContext'
import { cn } from '@/lib/cn'

interface WeekCalendarProps {
  selectedDate: Date
  onSelectDate: (date: Date) => void
}

export function WeekCalendar({ selectedDate, onSelectDate }: WeekCalendarProps) {
  const { visits } = useData()
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 })

  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  }, [weekStart])

  const visitCountByDay = useMemo(() => {
    const counts = new Map<string, number>()
    visits.forEach((v) => {
      if (v.status !== 'cancelada') {
        counts.set(v.date, (counts.get(v.date) ?? 0) + 1)
      }
    })
    return counts
  }, [visits])

  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((day) => {
        const dateStr = format(day, 'yyyy-MM-dd')
        const count = visitCountByDay.get(dateStr) ?? 0
        const isSelected = isSameDay(day, selectedDate)
        const isToday = isSameDay(day, new Date('2026-06-10'))

        return (
          <button
            key={dateStr}
            onClick={() => onSelectDate(day)}
            className={cn(
              'flex flex-col items-center rounded-xl p-3 transition-all',
              'hover:bg-horizon-800',
              isSelected && 'bg-accent-muted border border-accent/30',
              !isSelected && 'border border-transparent',
            )}
          >
            <span className="text-[10px] uppercase text-horizon-500">
              {format(day, 'EEE', { locale: ptBR })}
            </span>
            <span
              className={cn(
                'mt-1 text-lg font-semibold tabular-nums',
                isToday ? 'text-accent' : 'text-horizon-100',
              )}
            >
              {format(day, 'd')}
            </span>
            {count > 0 && (
              <span className="mt-1.5 flex items-center gap-0.5">
                {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
                  <span key={i} className="size-1.5 rounded-full bg-stage-visita" />
                ))}
                {count > 3 && (
                  <span className="text-[9px] text-horizon-400 ml-0.5">+{count - 3}</span>
                )}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
