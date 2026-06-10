import { addDays, format, parseISO, startOfWeek } from 'date-fns'
import type { Lead, Property, Visit } from '@/types'

/** Data de referência "hoje" alinhada aos mocks de visitas e leads */
export const MOCK_TODAY = '2026-06-10'

export interface ComputedDashboardMetrics {
  pipelineTotal: number
  activeProperties: number
  visitsToday: number
  conversionRate: number
  pipelineGrowth: number
  pipelineSparkline: { day: string; value: number }[]
  totalLeads: number
  leadsInPipeline: number
  hotLeads: number
}

export function computeDashboardMetrics(
  leads: Lead[],
  properties: Property[],
  visits: Visit[],
): ComputedDashboardMetrics {
  const pipelineTotal = leads
    .filter((l) => l.stage !== 'fechado' && l.value > 0)
    .reduce((sum, l) => sum + l.value, 0)

  const activeProperties = properties.filter((p) => p.status === 'ativo').length

  const visitsToday = visits.filter(
    (v) => v.date === MOCK_TODAY && v.status !== 'cancelada',
  ).length

  const totalLeads = leads.length
  const closedLeads = leads.filter((l) => l.stage === 'fechado').length
  const conversionRate = totalLeads > 0 ? (closedLeads / totalLeads) * 100 : 0

  const leadsInPipeline = leads.filter((l) => l.stage !== 'fechado').length
  const hotLeads = leads.filter((l) => l.temperature === 'quente').length

  const weekStart = startOfWeek(parseISO(MOCK_TODAY), { weekStartsOn: 1 })
  const dayLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
  const pipelineSparkline = dayLabels.map((day, i) => {
    const dateStr = format(addDays(weekStart, i), 'yyyy-MM-dd')
    const value = visits.filter((v) => v.date === dateStr && v.status !== 'cancelada').length
    return { day, value }
  })

  const juneValue = leads
    .filter((l) => l.createdAt.startsWith('2026-06') && l.value > 0)
    .reduce((s, l) => s + l.value, 0)
  const mayValue = leads
    .filter((l) => l.createdAt.startsWith('2026-05') && l.value > 0)
    .reduce((s, l) => s + l.value, 0)
  const pipelineGrowth = mayValue > 0 ? ((juneValue - mayValue) / mayValue) * 100 : 0

  return {
    pipelineTotal,
    activeProperties,
    visitsToday,
    conversionRate,
    pipelineGrowth,
    pipelineSparkline,
    totalLeads,
    leadsInPipeline,
    hotLeads,
  }
}
