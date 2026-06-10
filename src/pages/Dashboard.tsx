import { DashboardBento } from '@/features/dashboard/DashboardBento'
import { MiniKanban } from '@/features/dashboard/MiniKanban'
import { TodayAgenda } from '@/features/dashboard/TodayAgenda'
import { ActivityFeed } from '@/features/dashboard/ActivityFeed'
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics'
import { useData } from '@/context/DataContext'

export function Dashboard() {
  const { leadsInPipeline, visitsToday, hotLeads } = useDashboardMetrics()
  const { brokers } = useData()
  const userName = brokers[0]?.name.split(' ')[0] ?? 'Corretor'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-horizon-50 md:text-3xl">
          Bom dia, {userName}
        </h1>
        <p className="mt-1 text-horizon-400">
          {leadsInPipeline} leads no pipeline · {visitsToday} visitas hoje · {hotLeads} leads quentes
        </p>
      </div>

      <DashboardBento />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <MiniKanban />
        </div>
        <div className="lg:col-span-2">
          <TodayAgenda />
        </div>
      </div>

      <ActivityFeed />
    </div>
  )
}
