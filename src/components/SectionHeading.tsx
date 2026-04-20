import type { TextContent } from '../types/portfolio'
import { Reveal } from './Reveal'
import { RichText } from './RichText'

interface SectionHeadingProps {
  eyebrow: string
  title: TextContent
  description: TextContent
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <Reveal index={0} seed={2}>
        <p className="font-label text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--text-muted)]">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.04} index={1} seed={2}>
        <h2 className="mt-5 font-display text-4xl leading-tight tracking-[-0.04em] text-[var(--text-primary)] sm:text-5xl">
          <RichText value={title} />
        </h2>
      </Reveal>
      <Reveal delay={0.08} index={2} seed={2}>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
          <RichText value={description} />
        </p>
      </Reveal>
    </div>
  )
}
