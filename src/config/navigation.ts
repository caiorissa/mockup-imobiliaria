import {
  LayoutDashboard,
  Kanban,
  Building2,
  CalendarDays,
  Users,
} from 'lucide-react'

export const navigation = [
  { path: '/', label: 'Início', icon: LayoutDashboard },
  { path: '/funil', label: 'Funil', icon: Kanban },
  { path: '/imoveis', label: 'Imóveis', icon: Building2 },
  { path: '/visitas', label: 'Visitas', icon: CalendarDays },
  { path: '/leads', label: 'Leads', icon: Users },
] as const

export const mobileNavigation = [
  { path: '/', label: 'Início', icon: LayoutDashboard },
  { path: '/funil', label: 'Funil', icon: Kanban },
  { path: '/imoveis', label: 'Imóveis', icon: Building2 },
  { path: '/visitas', label: 'Visitas', icon: CalendarDays },
] as const
