import { cn } from '@/lib/cn'

interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'size-7 text-xs',
  md: 'size-9 text-sm',
  lg: 'size-11 text-base',
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const colors = [
  'bg-accent-muted text-accent',
  'bg-stage-visita-muted text-stage-visita',
  'bg-stage-proposta-muted text-stage-proposta',
  'bg-stage-fechado-muted text-stage-fechado',
]

function getColor(name: string) {
  const idx = name.charCodeAt(0) % colors.length
  return colors[idx]
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium shrink-0',
        sizes[size],
        getColor(name),
        className,
      )}
      title={name}
    >
      {getInitials(name)}
    </div>
  )
}
