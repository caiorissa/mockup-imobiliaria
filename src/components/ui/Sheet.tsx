import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children: ReactNode
  className?: string
  side?: 'right' | 'bottom'
}

export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  side = 'right',
}: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-horizon-950/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className={cn(
                  'fixed z-50 flex flex-col bg-surface border-horizon-700 shadow-elevated',
                  side === 'right' &&
                    'inset-y-0 right-0 w-full max-w-lg border-l md:max-w-xl',
                  side === 'bottom' &&
                    'inset-x-0 bottom-0 max-h-[90vh] rounded-t-2xl border-t',
                  className,
                )}
                initial={
                  side === 'right' ? { x: '100%' } : { y: '100%' }
                }
                animate={{ x: 0, y: 0 }}
                exit={side === 'right' ? { x: '100%' } : { y: '100%' }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              >
                {(title || description) && (
                  <div className="flex items-start justify-between border-b border-horizon-700 px-6 py-4">
                    <div>
                      {title && (
                        <Dialog.Title className="font-display text-lg font-semibold text-horizon-100">
                          {title}
                        </Dialog.Title>
                      )}
                      {description && (
                        <Dialog.Description className="mt-1 text-sm text-horizon-400">
                          {description}
                        </Dialog.Description>
                      )}
                    </div>
                    <Dialog.Close className="rounded-lg p-1.5 text-horizon-400 hover:bg-horizon-700 hover:text-horizon-200 transition-colors">
                      <X className="size-4" />
                    </Dialog.Close>
                  </div>
                )}
                <div className="flex-1 overflow-y-auto scrollbar-thin">{children}</div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
