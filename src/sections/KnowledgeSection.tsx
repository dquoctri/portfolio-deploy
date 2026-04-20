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
  violet: 'text-[#8c96ff]',
  amber: 'text-[#ffd9a1]',
} as const

export default function KnowledgeSection({ data }: PortfolioSectionProps) {
  const { resolvedTheme } = useTheme()

  return (
    <div className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={data.technicalKnowledge.eyebrow}
          title={data.technicalKnowledge.title}
          description={data.technicalKnowledge.description}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.technicalKnowledge.categories.map((category, index) => (
            <Reveal key={category.label} delay={index * 0.04} index={index} seed={18}>
              <article
                className="neu-flat h-full rounded-[2.2rem] p-7"
                style={getCardThemeStyle(data.site, resolvedTheme, category)}
              >
                <div className="flex items-start justify-between gap-4">
                  <p
                    className={cn(
                      'font-label text-[10px] font-bold uppercase tracking-[0.22em]',
                      category.accentPreset
                        ? 'text-[var(--accent-blue)]'
                        : accentClasses[category.accentVariant ?? 'sky'],
                    )}
                  >
                    {category.label}
                  </p>
                  <div className="neu-pressed flex h-12 w-12 items-center justify-center rounded-2xl">
                    <span className="material-symbols-outlined text-[var(--accent-blue)]">
                      {category.icon}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                  <RichText value={category.summary} />
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {category.items.map((item) => (
                    <SkillReferenceChip key={item.label} item={item} className="tracking-[0.16em]" />
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
