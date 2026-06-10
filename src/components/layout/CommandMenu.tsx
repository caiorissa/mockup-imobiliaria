import { useNavigate } from 'react-router-dom'
import { Command } from 'cmdk'
import * as Dialog from '@radix-ui/react-dialog'
import {
  Building2,
  Users,
  CalendarDays,
  Kanban,
  Plus,
  Search,
} from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useData } from '@/context/DataContext'
import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/cn'

export function CommandMenu() {
  const { commandOpen, setCommandOpen } = useApp()
  const { leads, properties } = useData()
  const navigate = useNavigate()

  const run = (fn: () => void) => {
    setCommandOpen(false)
    fn()
  }

  return (
    <Dialog.Root open={commandOpen} onOpenChange={setCommandOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-horizon-950/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-xl border border-horizon-700 bg-surface shadow-elevated overflow-hidden">
          <Dialog.Title className="sr-only">Menu de comandos</Dialog.Title>
          <Command className="flex flex-col" loop>
            <div className="flex items-center gap-3 border-b border-horizon-700 px-4">
              <Search className="size-4 text-horizon-400 shrink-0" />
              <Command.Input
                placeholder="Buscar leads, imóveis ou ações..."
                className="flex-1 bg-transparent py-3.5 text-sm text-horizon-100 placeholder:text-horizon-500 outline-none"
              />
            </div>
            <Command.List className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
              <Command.Empty className="py-8 text-center text-sm text-horizon-400">
                Nenhum resultado encontrado.
              </Command.Empty>

              <Command.Group
                heading="Ações"
                className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-horizon-400"
              >
                <CommandItem
                  icon={Plus}
                  onSelect={() => run(() => navigate('/imoveis'))}
                  label="Cadastrar imóvel"
                />
                <CommandItem
                  icon={CalendarDays}
                  onSelect={() => run(() => navigate('/visitas'))}
                  label="Agendar visita"
                />
                <CommandItem
                  icon={Kanban}
                  onSelect={() => run(() => navigate('/funil'))}
                  label="Abrir funil de atendimento"
                />
              </Command.Group>

              <Command.Group
                heading="Leads"
                className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-horizon-400"
              >
                {leads.slice(0, 6).map((lead) => (
                  <CommandItem
                    key={lead.id}
                    icon={Users}
                    onSelect={() => run(() => navigate('/funil'))}
                    label={lead.name}
                    sub={lead.phone}
                  />
                ))}
              </Command.Group>

              <Command.Group
                heading="Imóveis"
                className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-horizon-400"
              >
                {properties.slice(0, 6).map((prop) => (
                  <CommandItem
                    key={prop.id}
                    icon={Building2}
                    onSelect={() => run(() => navigate('/imoveis'))}
                    label={prop.title}
                    sub={`${prop.neighborhood} · ${formatCurrency(prop.price)}`}
                  />
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function CommandItem({
  icon: Icon,
  label,
  sub,
  onSelect,
}: {
  icon: typeof Search
  label: string
  sub?: string
  onSelect: () => void
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm',
        'text-horizon-200 aria-selected:bg-horizon-700 aria-selected:text-horizon-100',
      )}
    >
      <Icon className="size-4 text-horizon-400 shrink-0" />
      <div className="min-w-0">
        <p className="truncate font-medium">{label}</p>
        {sub && <p className="truncate text-xs text-horizon-400">{sub}</p>}
      </div>
    </Command.Item>
  )
}
