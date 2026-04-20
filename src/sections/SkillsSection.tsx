import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useTheme } from '../components/ThemeProvider'
import { RichText } from '../components/RichText'
import { getCardThemeStyle } from '../lib/cardTheme'
import { SkillReferenceChip } from '../components/SkillReferenceChip'
import { cn } from '../lib/cn'
import type { PortfolioSectionProps } from '../types/portfolio'

const accentClasses = {
  emerald: 'text-[var(--accent-green)]',
  sky: 'text-[var(--accent-blue)]',
  violet: 'text-[#7f8fff]',
  amber: 'text-[#ffa1a1]',
} as const

export default function SkillsSection({ data }: PortfolioSectionProps) {
  const { resolvedTheme } = useTheme()

  return (
    <div className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills"
          title={[
            { text: 'Core skill groups presented as ' },
            { text: 'reusable resume blocks', accent: true },
            { text: '.' },
          ]}
          description={[
            { text: 'This layer keeps the homepage easy to scan while still feeling structured enough for real hiring and consulting conversations.' },
          ]}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {data.skills.map((group, index) => (
            <Reveal key={group.label} delay={index * 0.05} index={index} seed={14}>
              <article
                className="neu-flat h-full rounded-[2.2rem] p-7"
                style={getCardThemeStyle(data.site, resolvedTheme, group)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className={cn(
                        'font-label text-[10px] font-bold uppercase tracking-[0.22em]',
                        group.accentPreset ? 'text-[var(--accent-blue)]' : accentClasses[group.accentVariant ?? 'sky'],
                      )}
                    >
                      {group.label}
                    </p>
                    {group.proficiency ? (
                      <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                        <RichText value={group.proficiency} />
                      </p>
                    ) : null}
                  </div>
                  <div className="neu-pressed flex h-14 w-14 items-center justify-center rounded-2xl">
                    <span className="material-symbols-outlined text-[var(--accent-blue)]">
                      {group.icon}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <SkillReferenceChip key={item.label} item={item} />
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
