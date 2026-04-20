import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useTheme } from '../components/ThemeProvider'
import { RichText } from '../components/RichText'
import { getCardThemeStyle } from '../lib/cardTheme'
import { SkillReferenceChip } from '../components/SkillReferenceChip'
import type { PortfolioSectionProps } from '../types/portfolio'

export default function AboutSection({ data }: PortfolioSectionProps) {
  const { resolvedTheme } = useTheme()

  return (
    <div className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow={data.summary.eyebrow}
          title={data.summary.title}
          description={data.summary.description}
        />

        <div className="grid gap-6">
          <div className="neu-flat rounded-[2.2rem] p-8">
            <div className="grid gap-5">
              {data.summary.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={0.04 + index * 0.05} index={index} seed={5}>
                  <p className="text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                    <RichText value={paragraph} />
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.16} index={3} seed={5}>
              <div className="mt-8 flex flex-wrap gap-3">
                {data.summary.focusAreas.map((focusArea) => (
                  <SkillReferenceChip
                    key={focusArea.label}
                    item={focusArea}
                    className="text-[11px] tracking-[0.16em]"
                  />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2} index={4} seed={5}>
              <p className="mt-8 text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                <RichText value={data.summary.futureStatement} />
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {data.summary.cards.map((card, index) => (
              <Reveal key={card.label} delay={0.08 + index * 0.05} index={index} seed={6}>
                <article
                  className="neu-flat h-full rounded-[2rem] p-6"
                  style={getCardThemeStyle(data.site, resolvedTheme, card)}
                >
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {card.label}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.05em] text-[var(--text-primary)]">
                    {card.value}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{card.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
