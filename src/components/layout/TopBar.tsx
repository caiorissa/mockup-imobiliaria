import { useLocation } from 'react-router-dom'
import { Search, Sun, Moon, Bell } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { navigation } from '@/config/navigation'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'

export function TopBar() {
  const { theme, setTheme, setCommandOpen } = useApp()
  const location = useLocation()

  const currentNav = navigation.find(
    (n) => n.path === location.pathname || (n.path !== '/' && location.pathname.startsWith(n.path)),
  )
  const pageTitle = currentNav?.label ?? 'Horizonte'

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-horizon-700 bg-horizon-900/80 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-3 md:hidden">
        <div className="flex size-7 items-center justify-center rounded-lg bg-accent-muted">
          <svg viewBox="0 0 32 32" className="size-4" fill="none">
            <path d="M6 22L16 8l10 14H6z" stroke="currentColor" className="text-accent" strokeWidth="1.5" />
          </svg>
        </div>
        <h1 className="font-display text-base font-semibold text-horizon-100">{pageTitle}</h1>
      </div>

      <div className="hidden md:block">
        <h1 className="font-display text-lg font-semibold text-horizon-100">{pageTitle}</h1>
        <p className="text-xs text-horizon-400">
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setCommandOpen(true)}
          className="hidden sm:flex gap-2 text-horizon-400"
        >
          <Search className="size-3.5" />
          <span className="text-xs">Buscar...</span>
          <kbd className="ml-2 rounded border border-horizon-600 bg-horizon-800 px-1.5 py-0.5 text-[10px] font-mono">
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
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-accent" />
        </Button>

        <Avatar name="Ana Costa" size="sm" className="hidden sm:flex" />
      </div>
    </header>
  )
}
