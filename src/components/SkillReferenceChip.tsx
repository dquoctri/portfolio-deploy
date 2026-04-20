import type { SkillReference } from '../types/portfolio'
import { cn } from '../lib/cn'
import { AppLink } from './AppLink'

interface SkillReferenceChipProps {
  item: SkillReference
  className?: string
}

export function SkillReferenceChip({ item, className }: SkillReferenceChipProps) {
  const chipClassName = cn(
    item.skillSlug
      ? 'neu-pill rounded-full px-4 py-2 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]'
      : 'neu-pressed rounded-full px-4 py-2 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-soft)]',
    className,
  )

  if (item.skillSlug) {
    return (
      <AppLink href={`/skills/${item.skillSlug}`} className={chipClassName}>
        {item.label}
      </AppLink>
    )
  }

  return <span className={chipClassName}>{item.label}</span>
}
