import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  index?: number
  seed?: number
  distance?: number
}

function getDeterministicMotion(index: number, seed: number, distance: number) {
  const mix = (index * 11 + seed * 17) % 7
  const xOffsets = [0, 8, -10, 6, -6, 12, -8]
  const scaleOffsets = [0, 0.004, 0.008, 0.006, 0.01, 0.004, 0.008]

  return {
    x: xOffsets[mix],
    y: distance + mix * 3,
    scale: 0.985 + scaleOffsets[mix],
    delay: mix * 0.028,
  }
}

export function Reveal({
  children,
  className,
  delay = 0,
  index = 0,
  seed = 0,
  distance = 20,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const motionConfig = getDeterministicMotion(index, seed, distance)

  return (
    <motion.div
      className={cn(className)}
      initial={
        shouldReduceMotion
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : {
              opacity: 0,
              x: motionConfig.x,
              y: motionConfig.y,
              scale: motionConfig.scale,
            }
      }
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.72,
        delay: shouldReduceMotion ? 0 : delay + motionConfig.delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
