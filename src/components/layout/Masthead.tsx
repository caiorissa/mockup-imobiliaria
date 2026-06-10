import { NavLink } from 'react-router-dom'
import { Search, Sun, Moon, Bell, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { useData } from '@/context/DataContext'
import { navigation } from '@/config/navigation'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { cn } from '@/lib/cn'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export function Masthead() {
  const { theme, setTheme, setCommandOpen, activeBranchId, setActiveBranchId } = useApp()
  const { branches } = useData()
  const activeBranch = branches.find((b) => b.id === activeBranchId)

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-horizon-700/80 bg-horizon-950/90 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-6 px-4 md:px-8">
        {/* Brand + branch */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center border border-accent/40 bg-accent/10">
              <svg viewBox="0 0 32 32" className="size-5" fill="none">
                <path d="M6 22L16 8l10 14H6z" stroke="currentColor" className="text-accent" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-base font-semibold text-horizon-50 leading-none">
                Horizonte
              </p>
              <p className="text-[10px] text-horizon-500 tracking-widest uppercase mt-0.5">
                Imobiliária
              </p>
            </div>
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="hidden lg:flex items-center gap-1.5 text-xs text-horizon-400 hover:text-horizon-200 transition-colors border-l border-horizon-700 pl-4">
              <span className="max-w-[120px] truncate">{activeBranch?.name}</span>
              <ChevronDown className="size-3 shrink-0" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="z-50 min-w-[200px] border border-horizon-700 bg-surface p-1 shadow-elevated"
                sideOffset={8}
              >
                {branches.map((branch) => (
                  <DropdownMenu.Item
                    key={branch.id}
                    className="px-3 py-2 text-sm text-horizon-200 outline-none cursor-pointer data-[highlighted]:bg-horizon-800"
                    onSelect={() => setActiveBranchId(branch.id)}
                  >
                    <p className="font-medium">{branch.name}</p>
                    <p className="text-xs text-horizon-500">{branch.city}</p>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        {/* Horizontal nav — desktop */}
        <nav className="hidden md:flex flex-1 items-center gap-1 min-w-0 overflow-x-auto scrollbar-thin">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'relative shrink-0 px-4 py-2 text-sm transition-colors',
                  isActive
                    ? 'text-horizon-50 font-medium'
                    : 'text-horizon-500 hover:text-horizon-200',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="masthead-active"
                      className="absolute inset-x-2 -bottom-[17px] h-px bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCommandOpen(true)}
            className="hidden sm:flex gap-2 text-horizon-500 hover:text-horizon-200"
          >
            <Search className="size-3.5" />
            <span className="text-xs hidden lg:inline">Buscar</span>
            <kbd className="hidden lg:inline rounded border border-horizon-700 px-1.5 py-0.5 text-[10px] font-mono text-horizon-500">
              ⌘K
            </kbd>
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'dark' || theme === 'system' ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          <Button variant="ghost" size="icon" aria-label="Notificações" className="relative">
            <Bell className="size-4" />
            <span className="absolute top-2 right-2 size-1.5 rounded-full bg-accent" />
          </Button>

          <div className="hidden sm:flex items-center gap-2 border-l border-horizon-700 pl-3 ml-1">
            <Avatar name="Ana Costa" size="sm" />
            <span className="text-xs text-horizon-400 hidden lg:block">Ana</span>
          </div>
        </div>
      </div>
    </header>
  )
}
