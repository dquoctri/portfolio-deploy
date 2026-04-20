import { forwardRef, type ReactNode } from 'react'

import { cn } from '../lib/cn'
import type { SectionTone } from '../types/portfolio'

interface SectionShellProps {
  id: string
  tone: SectionTone
  loaded?: boolean
  children: ReactNode
}

const toneClasses: Record<SectionTone, string> = {
  hero: 'bg-transparent',
  surface: 'bg-transparent',
  'surface-alt': 'bg-transparent',
}

export const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  ({ id, tone, loaded = true, children }, ref) => (
    <section
      id={id}
      ref={ref}
      data-loaded={loaded}
      className={cn('relative scroll-mt-28', toneClasses[tone])}
    >
      {children}
    </section>
  ),
)

SectionShell.displayName = 'SectionShell'
