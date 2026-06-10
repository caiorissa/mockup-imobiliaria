import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface Tab {
  value: string
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultValue?: string
  className?: string
}

export function Tabs({ tabs, defaultValue, className }: TabsProps) {
  return (
    <TabsPrimitive.Root defaultValue={defaultValue ?? tabs[0]?.value} className={className}>
      <TabsPrimitive.List className="flex gap-1 border-b border-horizon-700 pb-px">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.value}
            value={tab.value}
            className={cn(
              'px-4 py-2 text-sm font-medium text-horizon-400 transition-colors',
              'hover:text-horizon-200',
              'data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
            )}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {tabs.map((tab) => (
        <TabsPrimitive.Content key={tab.value} value={tab.value} className="pt-4">
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}
