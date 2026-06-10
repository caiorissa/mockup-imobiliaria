import * as Popover from '@radix-ui/react-popover'
import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface HoverCardProps {
  trigger: ReactNode
  children: ReactNode
  className?: string
  openDelay?: number
}

export function HoverCard({ trigger, children, className, openDelay = 150 }: HoverCardProps) {
  const [open, setOpen] = useState(false)
  let timeout: ReturnType<typeof setTimeout>

  const handleEnter = () => {
    timeout = setTimeout(() => setOpen(true), openDelay)
  }

  const handleLeave = () => {
    clearTimeout(timeout)
    setOpen(false)
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
          {trigger}
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="right"
          sideOffset={8}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={handleLeave}
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
