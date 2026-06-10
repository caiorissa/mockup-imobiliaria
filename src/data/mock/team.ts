import type { Branch, Broker } from '@/types'

export const branches: Branch[] = [
  { id: 'br-1', name: 'Horizonte Pinheiros', city: 'São Paulo' },
  { id: 'br-2', name: 'Horizonte Moema', city: 'São Paulo' },
  { id: 'br-3', name: 'Horizonte Vila Madalena', city: 'São Paulo' },
]

export const brokers: Broker[] = [
  { id: 'brk-1', name: 'Ana Costa', email: 'ana@horizonte.com.br', phone: '(11) 99876-5432', branchId: 'br-1' },
  { id: 'brk-2', name: 'Rafael Mendes', email: 'rafael@horizonte.com.br', phone: '(11) 98765-4321', branchId: 'br-1' },
  { id: 'brk-3', name: 'Marina Silva', email: 'marina@horizonte.com.br', phone: '(11) 97654-3210', branchId: 'br-2' },
  { id: 'brk-4', name: 'Lucas Ferreira', email: 'lucas@horizonte.com.br', phone: '(11) 96543-2109', branchId: 'br-2' },
  { id: 'brk-5', name: 'Juliana Rocha', email: 'juliana@horizonte.com.br', phone: '(11) 95432-1098', branchId: 'br-3' },
]
