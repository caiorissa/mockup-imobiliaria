import { useMemo } from 'react'
import { useData } from '@/context/DataContext'
import { computeDashboardMetrics } from '@/lib/dashboard'

export function useDashboardMetrics() {
  const { leads, properties, visits } = useData()

  return useMemo(
    () => computeDashboardMetrics(leads, properties, visits),
    [leads, properties, visits],
  )
}
