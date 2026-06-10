import { NavLink } from 'react-router-dom'
import { mobileNavigation } from '@/config/navigation'
import { cn } from '@/lib/cn'

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 flex md:hidden border-t border-horizon-700 bg-horizon-900/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      {mobileNavigation.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors',
                isActive ? 'text-accent' : 'text-horizon-400',
              )
            }
          >
            <Icon className="size-5" />
            {item.label}
          </NavLink>
        )
      })}
    </nav>
  )
}
