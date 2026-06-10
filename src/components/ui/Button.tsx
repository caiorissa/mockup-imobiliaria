import { Slot } from '@radix-ui/react-slot'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
  asChild?: boolean
}

const variants = {
  primary:
    'bg-accent text-on-accent hover:bg-accent-hover shadow-sm active:scale-[0.98]',
  secondary:
    'bg-horizon-700 text-horizon-100 hover:bg-horizon-600 border border-horizon-600 active:scale-[0.98]',
  ghost:
    'text-horizon-300 hover:bg-horizon-700 hover:text-horizon-100 active:scale-[0.98]',
  danger:
    'bg-danger-muted text-danger hover:bg-danger/20 active:scale-[0.98]',
}

const sizes = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-9 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-11 px-5 text-sm gap-2 rounded-xl',
  icon: 'size-9 rounded-lg',
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  loading,
  asChild,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        'disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </Comp>
  )
}
