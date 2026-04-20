import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useTheme } from '../components/ThemeProvider'
import { RichText } from '../components/RichText'
import { SkillReferenceChip } from '../components/SkillReferenceChip'
import { getCardThemeStyle } from '../lib/cardTheme'
import type { PortfolioSectionProps } from '../types/portfolio'

export default function ExperienceSection({ data }: PortfolioSectionProps) {
  const { resolvedTheme } = useTheme()

  return (
    <div className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Experience"
          title={[
            { text: 'Delivery that scales from ' },
            { text: 'feature work', accent: true },
            { text: ' to architecture thinking.' },
          ]}
          description={[
            { text: 'The portfolio keeps this section prominent because it is the clearest proof of shipping ability, leadership, and technical growth.' },
          ]}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.84fr_1.16fr]">
          <Reveal index={0} seed={8}>
            <aside className="neu-flat rounded-[2.4rem] p-8 lg:sticky lg:top-28 lg:self-start">
              <p className="font-label text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                Current positioning
              </p>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-[-0.05em] text-[var(--text-primary)]">
                {data.site.role}
              </h3>
              <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
                Strong in backend delivery today, while building the storytelling and systems perspective expected from a future solution architect.
              </p>
              <div className="mt-8 space-y-3">
                <div className="neu-pressed rounded-[1.6rem] p-5">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Base
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-primary)]">
                    {data.site.location}
                  </p>
                </div>
                <div className="neu-pressed rounded-[1.6rem] p-5">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Resume focus
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-primary)]">
                    Backend systems, responsive interfaces, delivery discipline, and architecture readiness.
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>

          <div className="space-y-6">
            {data.experience.map((item, index) => (
              <Reveal
                key={`${item.company}-${item.role}`}
                delay={0.04 + index * 0.04}
                index={index}
                seed={9}
              >
                <article
                  className="neu-flat rounded-[2.4rem] p-8 sm:p-10"
                  style={getCardThemeStyle(data.site, resolvedTheme, item)}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--text-primary)] sm:text-4xl">
                        {item.role}
                      </h3>
                      <p className="mt-2 font-label text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        {item.company}
                      </p>
                    </div>
                    <div className="text-sm leading-7 text-[var(--text-soft)] sm:text-right">
                      {item.period}
                      <br />
                      {item.location}
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    {item.highlights.map((highlight, highlightIndex) => (
                      <Reveal
                        key={highlightIndex}
                        delay={0.08 + highlightIndex * 0.03}
                        index={highlightIndex}
                        seed={12 + index}
                      >
                        <div className="flex gap-4">
                          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--accent-blue)]" />
                          <p className="text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                            <RichText value={highlight} />
                          </p>
                        </div>
                      </Reveal>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    {item.tools.map((tool) => (
                      <SkillReferenceChip key={tool.label} item={tool} />
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
