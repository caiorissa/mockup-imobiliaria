import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Masthead } from './Masthead'
import { CommandMenu } from './CommandMenu'
import { FloatingDock } from './FloatingDock'
import { Footer } from './Footer'
import { PageTransition } from '@/components/motion/PageTransition'
import { Skeleton } from '@/components/ui/Skeleton'

function PageLoader() {
  return (
    <div className="space-y-8 py-8">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  )
}

export function AppLayout() {
  return (
    <div className="min-h-dvh flex flex-col bg-horizon-950">
      <Masthead />
      <main className="flex-1 pb-28 md:pb-12">
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-8 md:py-10">
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <PageTransition>
                <Outlet />
              </PageTransition>
            </AnimatePresence>
          </Suspense>
        </div>
      </main>
      <Footer />
      <CommandMenu />
      <FloatingDock />
    </div>
  )
}
