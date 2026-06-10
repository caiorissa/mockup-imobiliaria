import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { CommandMenu } from './CommandMenu'
import { MobileBottomNav } from './MobileBottomNav'
import { PageTransition } from '@/components/motion/PageTransition'
import { Skeleton } from '@/components/ui/Skeleton'

function PageLoader() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <Skeleton className="h-64" />
    </div>
  )
}

export function AppLayout() {
  return (
    <div className="flex h-dvh overflow-hidden bg-horizon-950">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto scrollbar-thin architectural-grid">
          <div className="mx-auto max-w-[1440px] p-4 pb-24 md:p-6 md:pb-6">
            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait">
                <PageTransition>
                  <Outlet />
                </PageTransition>
              </AnimatePresence>
            </Suspense>
          </div>
        </main>
      </div>
      <CommandMenu />
      <MobileBottomNav />
    </div>
  )
}
