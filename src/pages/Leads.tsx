import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { Flame, Snowflake, ExternalLink } from 'lucide-react'
import { useData } from '@/context/DataContext'
import { formatCurrency, formatRelative } from '@/lib/format'
import { TableCard } from '@/components/ui/TableCard'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import type { Lead } from '@/types'
import { PageHeader } from '@/components/ui/PageHeader'
import { cn } from '@/lib/cn'

type QuickFilter = 'all' | 'sem-contato' | 'quente' | 'frio'

export function Leads() {
  const { leads, getProperty, getBroker, selectLead } = useData()
  const navigate = useNavigate()
  const [sorting, setSorting] = useState<SortingState>([])
  const [quickFilter, setQuickFilter] = useState<QuickFilter>('all')

  const filtered = useMemo(() => {
    const now = new Date('2026-06-10')
    return leads.filter((lead) => {
      if (quickFilter === 'quente') return lead.temperature === 'quente'
      if (quickFilter === 'frio') return lead.temperature === 'frio'
      if (quickFilter === 'sem-contato') {
        const last = new Date(lead.lastContactAt)
        const diff = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
        return diff >= 7
      }
      return true
    })
  }, [leads, quickFilter])

  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Lead',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar name={row.original.name} size="sm" />
            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-medium text-horizon-100">{row.original.name}</p>
                {row.original.temperature === 'quente' && (
                  <Flame className="size-3 text-warning" />
                )}
                {row.original.temperature === 'frio' && (
                  <Snowflake className="size-3 text-stage-visita" />
                )}
              </div>
              <p className="text-xs text-horizon-400">{row.original.phone}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'source',
        header: 'Origem',
        cell: ({ getValue }) => (
          <span className="text-sm text-horizon-400 capitalize">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'stage',
        header: 'Estágio',
        cell: ({ getValue }) => (
          <Badge variant={getValue() as Lead['stage']}>{getValue() as string}</Badge>
        ),
      },
      {
        id: 'property',
        header: 'Imóvel',
        cell: ({ row }) => {
          const prop = row.original.propertyId
            ? getProperty(row.original.propertyId)
            : null
          return prop ? (
            <span className="text-sm text-horizon-300 truncate max-w-[160px] block">
              {prop.neighborhood}
            </span>
          ) : (
            <span className="text-sm text-horizon-500">—</span>
          )
        },
      },
      {
        accessorKey: 'value',
        header: 'Valor',
        cell: ({ getValue }) => {
          const v = getValue() as number
          return v > 0 ? (
            <span className="text-sm font-medium tabular-nums text-horizon-100">
              {formatCurrency(v)}
            </span>
          ) : (
            <span className="text-horizon-500">—</span>
          )
        },
      },
      {
        accessorKey: 'lastContactAt',
        header: 'Último contato',
        cell: ({ getValue }) => (
          <span className="text-sm text-horizon-400">
            {formatRelative(getValue() as string)}
          </span>
        ),
      },
      {
        id: 'broker',
        header: 'Corretor',
        cell: ({ row }) => {
          const broker = getBroker(row.original.brokerId)
          return broker ? (
            <span className="text-sm text-horizon-300">{broker.name}</span>
          ) : null
        },
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              selectLead(row.original.id)
              navigate('/funil')
            }}
          >
            <ExternalLink className="size-3.5" />
          </Button>
        ),
      },
    ],
    [getProperty, getBroker, selectLead, navigate],
  )

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const filters = [
    { id: 'all' as const, label: 'Todos' },
    { id: 'sem-contato' as const, label: 'Sem contato 7d' },
    { id: 'quente' as const, label: 'Quentes' },
    { id: 'frio' as const, label: 'Frios' },
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        overline="Contatos"
        title="Leads"
        description="Gestão de contatos e oportunidades"
      />

      <TableCard
        title="Todos os leads"
        count={filtered.length}
        filters={
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setQuickFilter(f.id)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                  quickFilter === f.id
                    ? 'bg-accent-muted text-accent'
                    : 'bg-horizon-800 text-horizon-400 hover:text-horizon-200',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        }
      >
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b border-horizon-700">
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-horizon-400"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => {
                    selectLead(row.original.id)
                    navigate('/funil')
                  }}
                  className="border-b border-horizon-700/50 cursor-pointer hover:bg-horizon-800/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableCard>
    </div>
  )
}
