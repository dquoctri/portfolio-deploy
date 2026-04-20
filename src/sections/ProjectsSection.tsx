import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useTheme } from '../components/ThemeProvider'
import { RichText } from '../components/RichText'
import { SkillReferenceChip } from '../components/SkillReferenceChip'
import { getCardThemeStyle } from '../lib/cardTheme'
import { cn } from '../lib/cn'
import type { PortfolioSectionProps } from '../types/portfolio'

export default function ProjectsSection({ data }: PortfolioSectionProps) {
  const { resolvedTheme } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const showcaseProjects = data.projects.filter((project) => project.status !== 'placeholder')
  const futureCards = data.projects.filter((project) => project.status === 'placeholder')
  const cardRefs = useRef<Array<HTMLElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

    let animationFrame = 0

    const updateActiveCard = () => {
      const viewportCenter = window.innerHeight / 2
      let nextIndex = 0
      let minDistance = Number.POSITIVE_INFINITY

      cardRefs.current.forEach((card, index) => {
        if (!card) {
          return
        }

        const rect = card.getBoundingClientRect()
        const cardCenter = rect.top + rect.height / 2
        const distance = Math.abs(viewportCenter - cardCenter)

        if (distance < minDistance) {
          minDistance = distance
          nextIndex = index
        }
      })

      setActiveIndex(nextIndex)
    }

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(updateActiveCard)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [shouldReduceMotion])

  return (
    <div className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Selected Work"
          title={[
            { text: 'A few projects where ' },
            { text: 'system complexity', accent: true },
            { text: ' met real product delivery.' },
          ]}
          description={[
            { text: 'As you scroll, the project nearest the center becomes the focused card. Placeholder cards below reserve space for future case studies and product storytelling.' },
          ]}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <Reveal index={0} seed={20}>
            <aside className="neu-flat rounded-[2.4rem] p-8 lg:sticky lg:top-28 lg:self-start">
              <p className="font-label text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                Scroll-focused showcase
              </p>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-[-0.05em] text-[var(--text-primary)]">
                Active project expands while others step back.
              </h3>
              <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
                The active card grows gently as it reaches the viewport center, making the section feel more guided without turning it into a heavy carousel.
              </p>
              <div className="mt-8 space-y-3">
                <div className="neu-pressed rounded-[1.6rem] p-5">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Active card
                  </p>
                  <p className="mt-2 font-display text-2xl font-bold tracking-[-0.04em] text-[var(--text-primary)]">
                    {showcaseProjects[activeIndex]?.title ?? showcaseProjects[0]?.title}
                  </p>
                </div>
                <div className="neu-pressed rounded-[1.6rem] p-5">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Next layer
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-primary)]">
                    Future placeholder cards stay visible below so deeper case studies can arrive later without redesign.
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>

          <div className="space-y-6">
            {showcaseProjects.map((project, index) => {
              const isActive = shouldReduceMotion ? true : activeIndex === index

              return (
                <Reveal key={project.title} delay={index * 0.05} index={index + 1} seed={21}>
                  <article
                    ref={(node) => {
                      cardRefs.current[index] = node
                    }}
                    data-active={isActive}
                    className={cn(
                      'neu-extruded overflow-hidden rounded-[2.5rem] transition-all duration-500',
                      isActive ? 'scale-100 opacity-100 shadow-[var(--shadow-shell-strong)]' : 'scale-[0.95] opacity-70',
                    )}
                    style={getCardThemeStyle(data.site, resolvedTheme, project)}
                  >
                    {project.media ? (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={project.media.src}
                          alt={project.media.alt}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(8,12,18,0.82))]" />
                      </div>
                    ) : null}

                    <div className="space-y-5 px-8 py-8">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--accent-blue)]">
                            {project.category}
                          </p>
                          <h3 className="mt-3 font-display text-3xl font-bold tracking-[-0.05em] text-[var(--text-primary)] sm:text-4xl">
                            {project.title}
                          </h3>
                        </div>
                        <div className="neu-pressed flex h-14 w-14 items-center justify-center rounded-2xl">
                          <span className="material-symbols-outlined text-[var(--accent-blue)]">
                            {project.icon}
                          </span>
                        </div>
                      </div>

                      <p className="text-base leading-8 text-[var(--text-muted)]">
                        <RichText value={project.summary} />
                      </p>
                      <p className="text-sm leading-7 text-[var(--text-soft)]">
                        <RichText value={project.impact} />
                      </p>

                      {project.focusNote ? (
                        <div className="neu-flat rounded-[1.5rem] px-5 py-4 text-sm leading-7 text-[var(--text-muted)]">
                          {project.focusNote}
                        </div>
                      ) : null}

                      <div className="flex flex-wrap gap-3">
                        {project.stack.map((item) => (
                          <SkillReferenceChip key={`${project.title}-${item.label}`} item={item} />
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {futureCards.map((project, index) => (
            <Reveal key={project.title} delay={0.08 + index * 0.05} index={index} seed={22}>
              <article
                className="neu-flat rounded-[2.2rem] p-7"
                style={getCardThemeStyle(data.site, resolvedTheme, project)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                      {project.category}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] text-[var(--text-primary)]">
                      {project.title}
                    </h3>
                  </div>
                  <div className="neu-pressed flex h-12 w-12 items-center justify-center rounded-2xl">
                    <span className="material-symbols-outlined text-[var(--accent-blue)]">
                      {project.icon}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                  <RichText value={project.summary} />
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">
                  <RichText value={project.impact} />
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.stack.map((item) => (
                    <SkillReferenceChip key={`${project.title}-${item.label}`} item={item} />
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
