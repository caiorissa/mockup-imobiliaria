import { NavLink } from 'react-router-dom'
import { ChevronLeft, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { useData } from '@/context/DataContext'
import { navigation } from '@/config/navigation'
import { cn } from '@/lib/cn'
import { Tooltip, TooltipProvider } from '@/components/ui/Tooltip'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, activeBranchId, setActiveBranchId } = useApp()
  const { branches } = useData()
  const activeBranch = branches.find((b) => b.id === activeBranchId)

  return (
    <TooltipProvider>
      <aside
        className={cn(
          'hidden md:flex flex-col border-r border-horizon-700 bg-horizon-900 transition-[width] duration-300 ease-linear shrink-0',
          sidebarCollapsed ? 'w-[68px]' : 'w-[240px]',
        )}
      >
        <div className="flex h-14 items-center gap-3 border-b border-horizon-700 px-4">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-muted">
            <svg viewBox="0 0 32 32" className="size-5" fill="none">
              <path d="M6 22L16 8l10 14H6z" stroke="currentColor" className="text-accent" strokeWidth="1.5" />
            </svg>
          </div>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-w-0"
            >
              <p className="font-display text-sm font-semibold text-horizon-100 truncate">
                Horizonte
              </p>
              <p className="text-[10px] text-horizon-400 truncate">CRM Imobiliário</p>
            </motion.div>
          )}
        </div>

        {!sidebarCollapsed && (
          <div className="border-b border-horizon-700 p-3">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="flex w-full items-center gap-2 rounded-lg border border-horizon-700 bg-horizon-800 px-3 py-2 text-left text-sm hover:bg-horizon-700 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-horizon-100 truncate">{activeBranch?.name}</p>
                  <p className="text-xs text-horizon-400">{activeBranch?.city}</p>
                </div>
                <ChevronDown className="size-4 shrink-0 text-horizon-400" />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="z-50 min-w-[200px] rounded-xl border border-horizon-700 bg-surface p-1 shadow-elevated"
                  sideOffset={4}
                >
                  {branches.map((branch) => (
                    <DropdownMenu.Item
                      key={branch.id}
                      className="rounded-lg px-3 py-2 text-sm text-horizon-200 outline-none cursor-pointer data-[highlighted]:bg-horizon-700"
                      onSelect={() => setActiveBranchId(branch.id)}
                    >
                      <p className="font-medium">{branch.name}</p>
                      <p className="text-xs text-horizon-400">{branch.city}</p>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        )}

        <nav className="flex-1 p-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const link = (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-accent-muted text-accent'
                      : 'text-horizon-400 hover:bg-horizon-800 hover:text-horizon-200',
                  )
                }
              >
                <Icon className="size-[18px] shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </NavLink>
            )

            return sidebarCollapsed ? (
              <Tooltip key={item.path} content={item.label} side="right">
                {link}
              </Tooltip>
            ) : (
              link
            )
          })}
        </nav>

        <div className="border-t border-horizon-700 p-3">
          <button
            onClick={toggleSidebar}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-horizon-400 hover:bg-horizon-800 hover:text-horizon-200 transition-colors"
            aria-label={sidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            <ChevronLeft
              className={cn('size-4 transition-transform', sidebarCollapsed && 'rotate-180')}
            />
            {!sidebarCollapsed && <span>Recolher</span>}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
