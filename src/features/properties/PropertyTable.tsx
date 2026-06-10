import { useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { useState } from 'react'
import type { Property } from '@/types'
import { useData } from '@/context/DataContext'
import { formatCurrency } from '@/lib/format'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { cn } from '@/lib/cn'
import { ArrowUpDown } from 'lucide-react'

interface PropertyTableProps {
  data: Property[]
  selectedId?: string | null
  onSelect: (property: Property) => void
}

export function PropertyTable({ data, selectedId, onSelect }: PropertyTableProps) {
  const { getBroker } = useData()
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<Property>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ column }) => (
          <SortHeader column={column} label="Imóvel" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3 min-w-[200px]">
            <img
              src={row.original.imageUrl}
              alt=""
              className="size-10 rounded-lg object-cover shrink-0"
            />
            <div className="min-w-0">
              <p className="font-medium text-horizon-100 truncate">{row.original.title}</p>
              <p className="text-xs text-horizon-400 truncate">{row.original.address}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'neighborhood',
        header: 'Bairro',
        cell: ({ getValue }) => (
          <span className="text-sm text-horizon-300">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'type',
        header: 'Tipo',
        cell: ({ getValue }) => (
          <span className="text-sm text-horizon-400 capitalize">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'price',
        header: ({ column }) => (
          <SortHeader column={column} label="Preço" />
        ),
        cell: ({ getValue }) => (
          <span className="text-sm font-medium text-horizon-100 tabular-nums">
            {formatCurrency(getValue() as number)}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const status = getValue() as string
          return (
            <Badge variant={status === 'ativo' ? 'fechado' : 'default'}>
              {status}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'brokerId',
        header: 'Corretor',
        cell: ({ getValue }) => {
          const broker = getBroker(getValue() as string)
          return broker ? (
            <div className="flex items-center gap-2">
              <Avatar name={broker.name} size="sm" />
              <span className="text-sm text-horizon-300 hidden lg:inline">{broker.name}</span>
            </div>
          ) : null
        },
      },
    ],
    [getBroker],
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
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
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onSelect(row.original)}
              className={cn(
                'border-b border-horizon-700/50 cursor-pointer transition-colors',
                'hover:bg-horizon-800/50',
                selectedId === row.original.id && 'bg-accent-muted/20',
              )}
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
  )
}

function SortHeader({
  column,
  label,
}: {
  column: { getIsSorted: () => false | 'asc' | 'desc'; toggleSorting: (desc?: boolean) => void }
  label: string
}) {
  return (
    <button
      className="flex items-center gap-1 hover:text-horizon-200 transition-colors"
      onClick={() => column.toggleSorting()}
    >
      {label}
      <ArrowUpDown className="size-3" />
    </button>
  )
}
