import { motion } from 'framer-motion'
import { pageVariants, easeOut } from '@/lib/motion'
import type { ReactNode } from 'react'

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={easeOut}
    >
      {children}
    </motion.div>
  )
}
