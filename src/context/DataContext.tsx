import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { properties as initialProperties } from '@/data/mock/properties'
import { leads as initialLeads } from '@/data/mock/leads'
import { visits as initialVisits } from '@/data/mock/visits'
import { activities as initialActivities } from '@/data/mock/metrics'
import { defaultSettings } from '@/data/mock/settings'
import { brokers, branches } from '@/data/mock/team'
import type {
  Activity,
  AppSettings,
  Lead,
  PipelineStage,
  Property,
  Visit,
  VisitStatus,
} from '@/types'

interface DataContextValue {
  properties: Property[]
  leads: Lead[]
  visits: Visit[]
  activities: Activity[]
  settings: AppSettings
  brokers: typeof brokers
  branches: typeof branches
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void
  updateProperty: (id: string, updates: Partial<Property>) => void
  moveLead: (leadId: string, stage: PipelineStage) => void
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'lastContactAt'>) => void
  selectLead: (id: string | null) => void
  selectedLeadId: string | null
  addVisit: (visit: Omit<Visit, 'id'>) => void
  updateVisitStatus: (id: string, status: VisitStatus) => void
  updateSettings: (updates: Partial<AppSettings>) => void
  getBroker: (id: string) => (typeof brokers)[0] | undefined
  getProperty: (id: string) => Property | undefined
  getLead: (id: string) => Lead | undefined
}

const DataContext = createContext<DataContextValue | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState(initialProperties)
  const [leads, setLeads] = useState(initialLeads)
  const [visits, setVisits] = useState(initialVisits)
  const [activities, setActivities] = useState(initialActivities)
  const [settings, setSettings] = useState(defaultSettings)
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)

  const addProperty = (property: Omit<Property, 'id' | 'createdAt'>) => {
    const newProp: Property = {
      ...property,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setProperties((prev) => [newProp, ...prev])
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        type: 'property',
        title: 'Imóvel cadastrado',
        description: newProp.title,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ])
  }

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const moveLead = (leadId: string, stage: PipelineStage) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId ? { ...l, stage, lastContactAt: new Date().toISOString().split('T')[0] } : l,
      ),
    )
    const lead = leads.find((l) => l.id === leadId)
    if (lead) {
      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          type: 'lead',
          title: `Lead movido: ${lead.name}`,
          description: `Novo estágio: ${stage}`,
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ])
    }
  }

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt' | 'lastContactAt'>) => {
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastContactAt: new Date().toISOString().split('T')[0],
    }
    setLeads((prev) => [newLead, ...prev])
    setSelectedLeadId(newLead.id)
  }

  const addVisit = (visit: Omit<Visit, 'id'>) => {
    const newVisit: Visit = { ...visit, id: `vis-${Date.now()}` }
    setVisits((prev) => [...prev, newVisit])
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        type: 'visit',
        title: 'Visita agendada',
        description: `${visit.date} às ${visit.time}`,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ])
  }

  const updateVisitStatus = (id: string, status: VisitStatus) => {
    setVisits((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)))
  }

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }))
  }

  const value = useMemo(
    () => ({
      properties,
      leads,
      visits,
      activities,
      settings,
      brokers,
      branches,
      addProperty,
      updateProperty,
      moveLead,
      addLead,
      selectLead: setSelectedLeadId,
      selectedLeadId,
      addVisit,
      updateVisitStatus,
      updateSettings,
      getBroker: (id: string) => brokers.find((b) => b.id === id),
      getProperty: (id: string) => properties.find((p) => p.id === id),
      getLead: (id: string) => leads.find((l) => l.id === id),
    }),
    [properties, leads, visits, activities, settings, selectedLeadId],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
