import { ButtonLink } from '../../components/ButtonLink'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { RichText } from '../../components/RichText'
import { portfolioData } from '../../data/portfolioData'
import type { SkillRouteItem } from '../../types/portfolio'

interface SkillPlaceholderPageProps {
  skill?: SkillRouteItem
}

const placeholderStateLabels = {
  planned: 'Planned',
  parked: 'Parked',
  work_in_progress: 'Work in progress',
} as const

export function SkillPlaceholderPage({ skill }: SkillPlaceholderPageProps) {
  const codeSample = portfolioData.codeSamples[1] ?? portfolioData.codeSamples[0]

  return (
    <>
      <Header site={portfolioData.site} sections={[]} />

      <main
        id="content"
        className="relative z-10 px-6 pb-16 pt-[calc(var(--header-height)+2rem)] sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <section className="neu-extruded rounded-[2.6rem] p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="neu-pill px-4 py-2 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Skill route
                </span>
                {skill ? (
                  <span className="neu-flat rounded-full px-4 py-2 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-primary)]">
                    {placeholderStateLabels[skill.placeholderState]}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-7 font-display text-4xl font-bold tracking-[-0.06em] text-[var(--text-primary)] sm:text-6xl">
                {skill?.routeTitle ?? 'Skill page not found'}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                <RichText
                  value={
                    skill?.placeholderSummary ?? [
                      {
                        text: 'The requested skill page does not exist yet, so the portfolio has redirected to a placeholder shell.',
                      },
                    ]
                  }
                />
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                <RichText
                  value={
                    skill?.heroNote ?? [
                      { text: 'Use the homepage to explore the current overview while this route is being prepared.' },
                    ]
                  }
                />
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {(skill?.tags ?? ['Portfolio', 'Placeholder', 'Documentation']).map((tag) => (
                  <span
                    key={tag}
                    className="neu-pill rounded-full px-4 py-2 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href="/" variant="primary">
                  Back To Portfolio
                </ButtonLink>
                <ButtonLink href="#skill-roadmap" variant="secondary">
                  View Placeholder Notes
                </ButtonLink>
              </div>
            </section>

            <aside id="skill-roadmap" className="grid gap-6">
              <div className="neu-flat rounded-[2.4rem] p-7">
                <div className="flex items-center gap-3">
                  <div className="neu-pressed flex h-14 w-14 items-center justify-center rounded-2xl">
                    <span className="material-symbols-outlined text-[var(--accent-blue)]">
                      {skill?.icon ?? 'note_stack'}
                    </span>
                  </div>
                  <div>
                    <p className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      Placeholder status
                    </p>
                    <p className="mt-2 font-display text-2xl font-bold tracking-[-0.04em] text-[var(--text-primary)]">
                      {skill?.label ?? 'Unknown skill'}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-[var(--text-muted)]">
                  This route is intentionally live already so future knowledge notes can be published without changing the navigation model again.
                </p>
              </div>

              <div className="neu-flat rounded-[2.4rem] p-7">
                <p className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Planned structure
                </p>
                <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--text-muted)]">
                  <p>1. Delivery notes and implementation patterns.</p>
                  <p>2. Tradeoffs, architecture decisions, and production lessons.</p>
                  <p>3. Short examples, diagrams, and work-in-progress references.</p>
                </div>
              </div>

              <div className="neu-flat rounded-[2.4rem] p-7">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Placeholder code
                  </p>
                  <span className="neu-pill px-3 py-1.5 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    {codeSample.language}
                  </span>
                </div>
                <div className="code-surface neu-inset scrollbar-soft mt-5 overflow-hidden rounded-[1.9rem] p-5">
                  <pre className="scrollbar-soft overflow-x-auto text-sm leading-7 text-[var(--text-muted)]">
                    {codeSample.lines
                      .map((line) => `${'  '.repeat(line.indent ?? 0)}${line.tokens.map((token) => token.text).join('')}`)
                      .join('\n')}
                  </pre>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer site={portfolioData.site} />
    </>
  )
}
