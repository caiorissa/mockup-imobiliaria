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
      <p className="font-display text-2xl md:text-3xl text-horizon-100 -mb-6 md:-mb-8">
        {greeting}, <span className="text-horizon-400">{userName}</span>
      </p>

      <DashboardHero />
      <PipelineStrip />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 pt-4 border-t border-horizon-800">
        <TodayAgenda />
        <ActivityFeed />
      </div>
    </div>
  )
}
