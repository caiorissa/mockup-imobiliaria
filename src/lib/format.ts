import { format, formatDistanceToNow, parseISO, isToday, isTomorrow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatCompactCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toFixed(1).replace('.0', '')}M`
  }
  if (value >= 1_000) {
    return `R$ ${(value / 1_000).toFixed(0)}k`
  }
  return formatCurrency(value)
}

export function formatDate(date: string): string {
  return format(parseISO(date), "d 'de' MMM", { locale: ptBR })
}

export function formatDateTime(date: string, time?: string): string {
  const d = parseISO(date)
  if (isToday(d)) return `Hoje${time ? ` às ${time}` : ''}`
  if (isTomorrow(d)) return `Amanhã${time ? ` às ${time}` : ''}`
  return `${format(d, "d 'de' MMM", { locale: ptBR })}${time ? ` às ${time}` : ''}`
}

export function formatRelative(date: string): string {
  return formatDistanceToNow(parseISO(date), { addSuffix: true, locale: ptBR })
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}
