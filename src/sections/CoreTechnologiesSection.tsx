import { useEffect, useRef, useState } from 'react'

import { AppLink } from '../components/AppLink'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useTheme } from '../components/ThemeProvider'
import { RichText } from '../components/RichText'
import { getCardThemeStyle } from '../lib/cardTheme'
import { cn } from '../lib/cn'
import type { PortfolioSectionProps } from '../types/portfolio'

export default function CoreTechnologiesSection({ data }: PortfolioSectionProps) {
  const { resolvedTheme } = useTheme()
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const trackViewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [trackOffset, setTrackOffset] = useState(0)
  const maxIndex = Math.max(data.coreTechnologies.items.length - 1, 0)
  const stageHeight = maxIndex > 0 ? `calc(100svh + ${maxIndex * 38}svh)` : 'auto'

  const getSectionMetrics = () => {
    const section = sectionRef.current
    const sticky = stickyRef.current

    if (!section) {
      return null
    }

    const sectionTop = window.scrollY + section.getBoundingClientRect().top
    const stickyHeight = sticky?.offsetHeight ?? window.innerHeight
    const scrollRange = Math.max(section.offsetHeight - stickyHeight, 1)

    return { scrollRange, sectionTop }
  }

  const goToIndex = (nextIndex: number) => {
    const clampedIndex = Math.min(maxIndex, Math.max(0, nextIndex))
    const metrics = getSectionMetrics()

    setActiveIndex(clampedIndex)

    if (!metrics || maxIndex === 0) {
      return
    }

    window.scrollTo({
      top: metrics.sectionTop + metrics.scrollRange * (clampedIndex / maxIndex),
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const metrics = getSectionMetrics()

      if (!metrics) {
        return
      }

      const progress =
        maxIndex === 0
          ? 0
          : Math.min(1, Math.max(0, (window.scrollY - metrics.sectionTop) / metrics.scrollRange))
      const nextIndex = Math.min(maxIndex, Math.max(0, Math.round(progress * maxIndex)))

      setActiveIndex((value) => {
        if (value === nextIndex) {
          return value
        }

        return nextIndex
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [maxIndex])

  useEffect(() => {
    const updateOffset = () => {
      const viewport = trackViewportRef.current
      const track = trackRef.current
      const activeItem = itemRefs.current[activeIndex]

      if (!viewport || !track || !activeItem) {
        setTrackOffset(0)
        return
      }

      const viewportWidth = viewport.offsetWidth
      const itemWidth = activeItem.offsetWidth
      const centeredOffset = activeItem.offsetLeft - (viewportWidth - itemWidth) / 2
      const maxOffset = Math.max(track.scrollWidth - viewportWidth, 0)

      setTrackOffset(Math.min(maxOffset, Math.max(0, centeredOffset)))
    }

    updateOffset()
    window.addEventListener('resize', updateOffset)

    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            updateOffset()
          })

    if (resizeObserver) {
      if (trackViewportRef.current) {
        resizeObserver.observe(trackViewportRef.current)
      }

      if (trackRef.current) {
        resizeObserver.observe(trackRef.current)
      }

      itemRefs.current.forEach((item) => {
        if (item) {
          resizeObserver.observe(item)
        }
      })
    }

    return () => {
      window.removeEventListener('resize', updateOffset)
      resizeObserver?.disconnect()
    }
  }, [activeIndex, data.coreTechnologies.items.length])

  return (
    <div className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={data.coreTechnologies.eyebrow}
          title={data.coreTechnologies.title}
          description={data.coreTechnologies.description}
        />
      </div>

      <div ref={sectionRef} className="mt-10" style={{ minHeight: stageHeight }}>
        <div ref={stickyRef} className="core-tech-sticky">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-4 lg:px-5">
              <p className="core-tech-scroll-hint rounded-full px-4 py-2 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Scroll down to advance
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => goToIndex(activeIndex - 1)}
                  aria-label="Previous technology card"
                  disabled={activeIndex === 0}
                  className="neu-flat inline-flex h-12 w-12 items-center justify-center rounded-[1rem] text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button
                  type="button"
                  onClick={() => goToIndex(activeIndex + 1)}
                  aria-label="Next technology card"
                  disabled={activeIndex === maxIndex}
                  className="neu-flat inline-flex h-12 w-12 items-center justify-center rounded-[1rem] text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>

            <Reveal delay={0.06} index={1} seed={31}>
              <div className="mt-8 px-4 py-4 sm:px-4 lg:px-5">
                <div ref={trackViewportRef} className="overflow-hidden px-8 py-8">
                <div
                  ref={trackRef}
                  className="flex gap-5 transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${trackOffset}px)` }}
                >
                  {data.coreTechnologies.items.map((item, index) => {
                    const isActive = index === activeIndex
                    const content = (
                      <article
                        data-active={isActive}
                        className={cn(
                          'core-tech-card neu-flat min-h-[21rem] w-full shrink-0 rounded-[2.2rem] p-7 transition-all duration-300 md:w-[min(26rem,68vw)] xl:w-[24rem]',
                          isActive ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-65',
                        )}
                        style={getCardThemeStyle(data.site, resolvedTheme, item)}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="neu-pressed flex h-14 w-14 items-center justify-center rounded-2xl">
                            <span className="material-symbols-outlined text-[var(--accent-blue)]">
                              {item.icon}
                            </span>
                          </div>
                          <span className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                            {item.emphasis}
                          </span>
                        </div>

                        <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.04em] text-[var(--text-primary)]">
                          {item.label}
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
                          <RichText value={item.summary} />
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                          {item.tags.map((tag) => (
                            <span
                              key={`${item.label}-${tag}`}
                              className="neu-pressed rounded-full px-4 py-2 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-soft)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-7 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-blue)]">
                          {item.skillSlug ? 'Open placeholder page' : 'Homepage note'}
                        </div>
                      </article>
                    )

                    return item.skillSlug ? (
                      <AppLink
                        key={item.label}
                        href={`/skills/${item.skillSlug}`}
                        aria-label={item.label}
                        className="block w-full shrink-0 md:w-[min(26rem,68vw)] xl:w-[24rem]"
                      >
                        <div
                          ref={(node) => {
                            itemRefs.current[index] = node
                          }}
                        >
                          {content}
                        </div>
                      </AppLink>
                    ) : (
                      <div
                        key={item.label}
                        className="w-full shrink-0 md:w-[min(26rem,68vw)] xl:w-[24rem]"
                        ref={(node) => {
                          itemRefs.current[index] = node
                        }}
                      >
                        {content}
                      </div>
                    )
                  })}
                </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2">
                  {data.coreTechnologies.items.map((item, index) => (
                    <button
                      key={`${item.label}-dot`}
                      type="button"
                      aria-label={`Go to ${item.label}`}
                      onClick={() => goToIndex(index)}
                      className={cn(
                        'h-2.5 rounded-full transition-all duration-300',
                        index === activeIndex
                          ? 'core-tech-progress-active w-10'
                          : 'w-2.5 bg-[var(--outline-strong)]',
                      )}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}
