export type Theme = 'dark' | 'light' | 'system'

export type PipelineStage = 'contato' | 'visita' | 'proposta' | 'fechado'

export type PropertyType = 'apartamento' | 'casa' | 'cobertura' | 'studio' | 'comercial'
export type PropertyStatus = 'ativo' | 'reservado' | 'vendido' | 'arquivado'

export type LeadTemperature = 'quente' | 'morno' | 'frio'
export type LeadSource = 'site' | 'indicacao' | 'portal' | 'instagram' | 'whatsapp'

export type VisitStatus = 'agendada' | 'confirmada' | 'realizada' | 'cancelada'
export type VisitPeriod = 'manha' | 'tarde' | 'noite'

export interface Broker {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  branchId: string
}

export interface Branch {
  id: string
  name: string
  city: string
}

export interface Property {
  id: string
  title: string
  address: string
  neighborhood: string
  city: string
  type: PropertyType
  status: PropertyStatus
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  parking: number
  brokerId: string
  imageUrl: string
  featured: boolean
  createdAt: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  stage: PipelineStage
  temperature: LeadTemperature
  source: LeadSource
  propertyId?: string
  brokerId: string
  value: number
  lastContactAt: string
  notes: string
  createdAt: string
}

export interface Visit {
  id: string
  leadId: string
  propertyId: string
  brokerId: string
  date: string
  time: string
  period: VisitPeriod
  status: VisitStatus
  notes?: string
}

export interface Activity {
  id: string
  type: 'lead' | 'visit' | 'property' | 'deal'
  title: string
  description: string
  timestamp: string
}

export interface DashboardMetrics {
  pipelineTotal: number
  activeProperties: number
  visitsToday: number
  conversionRate: number
  pipelineSparkline: { day: string; value: number }[]
}

export interface AppSettings {
  notifications: {
    newLeads: boolean
    visitReminders: boolean
    dealUpdates: boolean
  }
  pipeline: {
    autoAssign: boolean
    showValue: boolean
  }
}

export const PIPELINE_STAGES: { id: PipelineStage; label: string; color: string }[] = [
  { id: 'contato', label: 'Novo contato', color: 'stage-contato' },
  { id: 'visita', label: 'Visita agendada', color: 'stage-visita' },
  { id: 'proposta', label: 'Proposta', color: 'stage-proposta' },
  { id: 'fechado', label: 'Fechado', color: 'stage-fechado' },
]
