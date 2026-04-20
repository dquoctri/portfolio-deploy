import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

interface AccentTextProps {
  children: ReactNode
  className?: string
}

export function AccentText({ children, className }: AccentTextProps) {
  return <span className={cn('accent-gradient-text', className)}>{children}</span>
}
