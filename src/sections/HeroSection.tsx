import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useMemo, useRef } from 'react'

import { ButtonLink } from '../components/ButtonLink'
import { useCustomization } from '../components/CustomizationProvider'
import { Reveal } from '../components/Reveal'
import { RichText } from '../components/RichText'
import type { PortfolioSectionProps } from '../types/portfolio'

export default function HeroSection({ data }: PortfolioSectionProps) {
  const { availabilityId, availabilityOptions } = useCustomization()
  const shouldReduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 48])
  const imageRotate = useTransform(scrollYProgress, [0, 1], [3, shouldReduceMotion ? 3 : -2])
  const keywords = useMemo(() => data.hero.floatingKeywords, [data.hero.floatingKeywords])
  const availability =
    availabilityOptions.find((option) => option.id === availabilityId) ?? availabilityOptions[0]

  return (
    <div
      ref={sectionRef}
      className="relative px-6 pb-20 pt-[calc(var(--header-height)+2rem)] sm:px-8 lg:px-10"
    >
      <div className="mx-auto grid min-h-[calc(100svh-var(--header-height)-1.5rem)] max-w-7xl items-center gap-16 lg:grid-cols-[1.24fr_0.76fr]">
        <div className="max-w-[58rem]">
          <Reveal index={0} seed={1}>
            <div className="neu-pill inline-flex items-center gap-3 px-5 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-blue)] opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent-green)]" />
              </span>
              <span className="font-label text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                {availability?.label}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05} index={1} seed={1}>
            <h1 className="mt-8 max-w-[60rem] font-display text-[clamp(3.6rem,8vw,6.8rem)] font-bold leading-[0.92] tracking-[-0.07em] text-[var(--text-primary)]">
              <RichText value={data.hero.title} />
            </h1>
          </Reveal>

          <Reveal delay={0.08} index={2} seed={1}>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--text-muted)] sm:text-xl">
              <RichText value={data.hero.subtitle} />
            </p>
          </Reveal>

          <Reveal delay={0.12} index={3} seed={1}>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-soft)] sm:text-lg">
              <RichText value={data.hero.description} />
            </p>
          </Reveal>

          <Reveal delay={0.16} index={4} seed={1}>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href={data.hero.primaryCta.href} variant="primary">
                {data.hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink
                href={data.hero.secondaryCta.href}
                variant="secondary"
                target="_blank"
                rel="noreferrer"
              >
                {data.hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.22} index={5} seed={1}>
            <div className="mt-8 flex flex-wrap gap-3">
              {data.site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="neu-flat neu-soft-radius inline-flex items-center gap-2 px-4 py-3 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.28} index={6} seed={1}>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {data.hero.metrics.map((metric) => (
                <div key={metric.label} className="neu-flat neu-card-radius p-5">
                  <p className="font-display text-4xl font-bold tracking-[-0.05em] text-[var(--text-primary)]">
                    <RichText value={[{ text: metric.value, accent: true }]} />
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.32} index={7} seed={1}>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--text-soft)]">
              {availability?.description}
            </p>
          </Reveal>
        </div>

        <motion.div style={{ y: imageY }} className="flex justify-center lg:justify-end">
          <div className="relative grid items-end gap-5 sm:grid-cols-[0.72fr_1fr]">
            <div className="relative z-[1] sm:translate-y-10">
              <div className="neu-flat neu-card-radius p-4">
                <div className="overflow-hidden rounded-[var(--radius-card)] grayscale">
                  <img
                    src={data.hero.profileImage.src}
                    alt={data.hero.profileImage.alt}
                    className="h-[15rem] w-full object-cover object-top sm:h-[18rem]"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-display text-xl font-bold tracking-[-0.05em] text-[var(--text-primary)]">
                    Current
                  </p>
                  <p className="mt-1 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {data.site.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <motion.div
                style={{ rotate: imageRotate }}
                className="neu-extruded neu-panel-radius w-72 p-4 sm:w-[24rem]"
              >
                <div className="overflow-hidden rounded-[var(--radius-card)] grayscale transition-all duration-700 group-hover:grayscale-0">
                  <img
                    src={data.hero.futureProfileImage.src}
                    alt={data.hero.futureProfileImage.alt}
                    className="h-[20rem] w-full object-cover sm:h-[26rem]"
                  />
                </div>
              </motion.div>

              <div className="neu-flat neu-soft-radius absolute -right-4 -top-5 flex h-20 w-20 items-center justify-center sm:-right-7 sm:-top-7 sm:h-24 sm:w-24">
                <span className="material-symbols-outlined text-3xl text-[var(--accent-blue)] sm:text-4xl">
                  architecture
                </span>
              </div>

              <div className="neu-flat neu-soft-radius absolute -bottom-6 right-4 w-[15.5rem] px-5 py-3 sm:right-6 sm:w-[19rem]">
                <p className="font-display text-2xl font-bold leading-tight tracking-[-0.05em] text-[var(--accent-blue)]">
                  {data.site.futureRole}
                </p>
                <p className="mt-1 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  growing direction
                </p>
              </div>

              <div className="absolute -left-4 top-6 flex flex-col gap-3 sm:-left-10">
                {keywords.map((keyword, index) => (
                  <Reveal key={keyword} delay={0.18 + index * 0.04} index={index} seed={3}>
                    <div className="neu-pill px-4 py-2 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      {keyword}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
