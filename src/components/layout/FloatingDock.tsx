import { NavLink } from 'react-router-dom'
import { mobileNavigation } from '@/config/navigation'
import { cn } from '@/lib/cn'

export function FloatingDock() {
  return (
    <nav className="fixed bottom-5 inset-x-4 z-40 md:hidden">
      <div className="flex items-center justify-around rounded-2xl border border-horizon-700/80 bg-horizon-900/95 backdrop-blur-xl shadow-elevated px-2 py-2">
        {mobileNavigation.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 text-[10px] font-medium transition-all min-w-[56px]',
                  isActive
                    ? 'bg-accent/15 text-accent'
                    : 'text-horizon-500',
                )
              }
            >
              <Icon className="size-5" />
              {item.label}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
