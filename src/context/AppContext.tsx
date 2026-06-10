import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Theme } from '@/types'

interface AppContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
  commandOpen: boolean
  setCommandOpen: (open: boolean) => void
  activeBranchId: string
  setActiveBranchId: (id: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  const isLight =
    theme === 'light' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches)
  root.classList.add(isLight ? 'light' : 'dark')
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('horizonte-theme') as Theme) || 'dark'
  })
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [activeBranchId, setActiveBranchId] = useState('br-1')

  const setTheme = (t: Theme) => {
    setThemeState(t)
    localStorage.setItem('horizonte-theme', t)
    applyTheme(t)
  }

  const toggleSidebar = () => setSidebarCollapsed((c) => !c)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        commandOpen,
        setCommandOpen,
        activeBranchId,
        setActiveBranchId,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
