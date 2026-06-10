import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  label?: string
  className?: string
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder = 'Selecionar',
  label,
  className,
}: SelectProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <span className="block text-xs font-medium text-horizon-400 uppercase tracking-wide">
          {label}
        </span>
      )}
      <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
        <SelectPrimitive.Trigger
          className={cn(
            'flex h-9 w-full items-center justify-between rounded-lg border border-horizon-600',
            'bg-horizon-800 px-3 text-sm text-horizon-100',
            'focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30',
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDown className="size-4 text-horizon-400" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="z-50 overflow-hidden rounded-xl border border-horizon-700 bg-surface shadow-elevated"
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((opt) => (
                <SelectPrimitive.Item
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    'relative flex cursor-pointer select-none items-center rounded-lg px-8 py-2 text-sm',
                    'text-horizon-200 outline-none',
                    'data-[highlighted]:bg-horizon-700 data-[highlighted]:text-horizon-100',
                  )}
                >
                  <SelectPrimitive.ItemIndicator className="absolute left-2">
                    <Check className="size-4 text-accent" />
                  </SelectPrimitive.ItemIndicator>
                  <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  )
}
