import * as Popover from '@radix-ui/react-popover'
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface HoverCardProps {
  trigger: ReactNode
  children: ReactNode
  className?: string
  openDelay?: number
}

export function HoverCard({ trigger, children, className, openDelay = 150 }: HoverCardProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div
          onMouseEnter={(e) => {
            const target = e.currentTarget
            setTimeout(() => {
              target.click()
            }, openDelay)
          }}
        >
          {trigger}
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="right"
          sideOffset={8}
          className={cn(
            'z-50 w-72 rounded-xl border border-horizon-700 bg-surface p-4 shadow-elevated',
            'animate-in fade-in-0 zoom-in-95',
            className,
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
