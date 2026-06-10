import { DashboardHero } from '@/features/dashboard/DashboardHero'
import { PipelineStrip } from '@/features/dashboard/PipelineStrip'
import { TodayAgenda } from '@/features/dashboard/TodayAgenda'
import { ActivityFeed } from '@/features/dashboard/ActivityFeed'
import { useData } from '@/context/DataContext'

export function Dashboard() {
  const { brokers } = useData()
  const userName = brokers[0]?.name.split(' ')[0] ?? 'Corretor'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'

  return (
    <div className="space-y-12 md:space-y-16">
      <DashboardHero greeting={greeting} userName={userName} />
      <PipelineStrip />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 pt-4 border-t border-horizon-800">
        <TodayAgenda />
        <ActivityFeed />
      </div>
    </div>
  )
}
