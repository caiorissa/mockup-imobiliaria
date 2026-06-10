import { NavLink, useNavigate } from 'react-router-dom'
import { Search, Sun, Moon, Bell, ChevronDown, Settings, User, LogOut, HelpCircle } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useData } from '@/context/DataContext'
import { useToast } from '@/context/ToastContext'
import { navigation } from '@/config/navigation'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { cn } from '@/lib/cn'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export function Masthead() {
  const { theme, setTheme, setCommandOpen, activeBranchId, setActiveBranchId } = useApp()
  const { branches, brokers } = useData()
  const { toast } = useToast()
  const navigate = useNavigate()
  const activeBranch = branches.find((b) => b.id === activeBranchId)
  const user = brokers[0]

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  const handleLogout = () => {
    toast('Sessão encerrada. Até logo!', 'info')
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 shrink-0 overflow-hidden border-b border-horizon-700/80 bg-horizon-950/90 backdrop-blur-xl">
      <div className="flex h-16 items-stretch gap-6 px-4 md:px-8">
        {/* Brand + branch */}
        <div className="flex items-center gap-4 shrink-0 self-center">
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
            <DropdownMenu.Trigger className="hidden lg:flex items-center gap-1.5 text-xs text-horizon-400 hover:text-horizon-200 transition-colors bg-transparent border-0 outline-none cursor-pointer">
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
        <nav className="hidden md:flex flex-1 items-stretch gap-1 min-w-0 overflow-hidden">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'relative flex shrink-0 items-center px-4 text-sm transition-colors',
                  isActive
                    ? 'text-horizon-50 font-medium shadow-[inset_0_-2px_0_0_var(--color-accent)]'
                    : 'text-horizon-500 hover:text-horizon-200',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0 self-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/ajuda')}
            className="hidden md:flex gap-1.5 text-horizon-500 hover:text-horizon-200"
          >
            <HelpCircle className="size-3.5" />
            <span className="text-xs">Ajuda</span>
          </Button>

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

          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex items-center gap-2 ml-1 rounded-lg bg-transparent border-0 outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-horizon-950">
              <Avatar name={user?.name ?? 'Usuário'} size="sm" />
              <span className="text-xs text-horizon-400 hidden lg:block max-w-[80px] truncate">
                {user?.name.split(' ')[0]}
              </span>
              <ChevronDown className="size-3 text-horizon-500 hidden lg:block" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="z-50 min-w-[220px] rounded-xl border border-horizon-700 bg-surface p-1.5 shadow-elevated"
                sideOffset={8}
                align="end"
              >
                <div className="px-3 py-2.5 border-b border-horizon-800 mb-1">
                  <p className="text-sm font-medium text-horizon-100">{user?.name}</p>
                  <p className="text-xs text-horizon-500 truncate">{user?.email}</p>
                  <p className="text-[10px] text-horizon-600 mt-0.5">Corretora</p>
                </div>

                <UserMenuItem icon={User} label="Meu perfil" onSelect={() => navigate('/configuracoes')} />
                <UserMenuItem icon={Settings} label="Configurações" onSelect={() => navigate('/configuracoes')} />
                <UserMenuItem
                  icon={HelpCircle}
                  label="Central de ajuda"
                  onSelect={() => navigate('/ajuda')}
                />

                <DropdownMenu.Separator className="my-1 h-px bg-horizon-800" />

                <UserMenuItem
                  icon={LogOut}
                  label="Sair da conta"
                  onSelect={handleLogout}
                  destructive
                />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  )
}

function UserMenuItem({
  icon: Icon,
  label,
  onSelect,
  destructive,
}: {
  icon: typeof Settings
  label: string
  onSelect: () => void
  destructive?: boolean
}) {
  return (
    <DropdownMenu.Item
      className={cn(
        'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm outline-none cursor-pointer',
        'data-[highlighted]:bg-horizon-800',
        destructive
          ? 'text-danger data-[highlighted]:text-danger'
          : 'text-horizon-200 data-[highlighted]:text-horizon-50',
      )}
      onSelect={onSelect}
    >
      <Icon className="size-4 shrink-0 opacity-70" />
      {label}
    </DropdownMenu.Item>
  )
}
