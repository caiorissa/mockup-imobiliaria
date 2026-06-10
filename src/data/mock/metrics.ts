import type { Activity } from '@/types'

export const activities: Activity[] = [
  { id: 'act-1', type: 'lead', title: 'Novo lead: Patricia Souza', description: 'Indicação — interesse em casa Jardins', timestamp: '2026-06-09T14:30:00' },
  { id: 'act-2', type: 'visit', title: 'Visita realizada', description: 'Carlos Eduardo visitou apt. Pinheiros', timestamp: '2026-06-09T14:00:00' },
  { id: 'act-3', type: 'deal', title: 'Proposta recebida', description: 'Helena Costa — R$ 5.500.000', timestamp: '2026-06-09T11:20:00' },
  { id: 'act-4', type: 'property', title: 'Imóvel cadastrado', description: 'Cobertura Pinheiros — rooftop', timestamp: '2026-06-09T09:45:00' },
  { id: 'act-5', type: 'visit', title: 'Visita confirmada', description: 'Gustavo Henrique — Cobertura Moema', timestamp: '2026-06-08T16:00:00' },
  { id: 'act-6', type: 'lead', title: 'Lead movido para Proposta', description: 'William Santos — Cobertura Jardins', timestamp: '2026-06-08T14:15:00' },
  { id: 'act-7', type: 'deal', title: 'Negociação em andamento', description: 'Igor Santana — contraproposta analisada', timestamp: '2026-06-08T10:30:00' },
  { id: 'act-8', type: 'property', title: 'Status atualizado', description: 'Apt. Vila Olímpia — reservado', timestamp: '2026-06-07T17:00:00' },
]
