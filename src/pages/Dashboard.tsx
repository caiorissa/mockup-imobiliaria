import { DashboardBento } from '@/features/dashboard/DashboardBento'
import { MiniKanban } from '@/features/dashboard/MiniKanban'
import { TodayAgenda } from '@/features/dashboard/TodayAgenda'
import { ActivityFeed } from '@/features/dashboard/ActivityFeed'

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-horizon-50 md:text-3xl">
          Bom dia, Ana
        </h1>
        <p className="mt-1 text-horizon-400">
          Aqui está o panorama da sua operação hoje.
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
