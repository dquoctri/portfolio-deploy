import { cn } from '../lib/cn'

interface SectionLoadingProps {
  label: string
  minHeightClassName: string
  pending?: boolean
}

export function SectionLoading({
  label,
  minHeightClassName,
  pending = false,
}: SectionLoadingProps) {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-7xl items-center px-6 py-20 sm:px-8 lg:px-10',
        minHeightClassName,
      )}
      aria-live={pending ? 'polite' : undefined}
    >
      <div className="neu-flat w-full rounded-[2.2rem] px-8 py-10">
        <div className="flex items-center gap-3">
          <span className={cn('h-2.5 w-2.5 rounded-full bg-[var(--accent-blue)]', pending && 'animate-pulse')} />
          <p className="font-label text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--text-muted)]">
            {pending ? 'Loading section' : 'Deferred section'}
          </p>
        </div>
        <h2 className="mt-5 font-display text-3xl tracking-[-0.04em] text-[var(--text-primary)]">
          {label}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
          This block is mounted only when it approaches the viewport so the initial load stays focused on the first impression.
        </p>
      </div>
    </div>
  )
}
