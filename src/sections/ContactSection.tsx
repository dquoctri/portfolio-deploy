import { ButtonLink } from '../components/ButtonLink'
import { useCustomization } from '../components/CustomizationProvider'
import { Reveal } from '../components/Reveal'
import { RichText } from '../components/RichText'
import type { PortfolioSectionProps } from '../types/portfolio'

export default function ContactSection({ data }: PortfolioSectionProps) {
  const { availabilityId, availabilityOptions } = useCustomization()
  const availability =
    availabilityOptions.find((option) => option.id === availabilityId) ?? availabilityOptions[0]

  return (
    <div className="px-6 pb-10 pt-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="neu-extruded rounded-[3rem] p-4">
          <div className="relative overflow-hidden rounded-[2.4rem] px-8 py-12 sm:px-12 sm:py-14">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(111,231,200,0.08),rgba(0,212,255,0.12),transparent_70%)]" />
            <div className="relative z-10 max-w-3xl">
              <Reveal index={0} seed={28}>
                <p className="font-label text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  {data.contact.eyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.04} index={1} seed={28}>
                <h2 className="mt-5 font-display text-4xl font-bold leading-tight tracking-[-0.05em] text-[var(--text-primary)] sm:text-6xl">
                  <RichText value={data.contact.title} />
                </h2>
              </Reveal>
              <Reveal delay={0.08} index={2} seed={28}>
                <p className="mt-5 text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                  <RichText value={data.contact.description} />
                </p>
              </Reveal>
              <Reveal delay={0.12} index={3} seed={28}>
                <p className="mt-4 text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                  <RichText value={data.contact.supportLine} />
                </p>
              </Reveal>
              <Reveal delay={0.14} index={4} seed={28}>
                <div className="mt-6 inline-flex max-w-xl flex-wrap items-center gap-3 rounded-[1.6rem] border border-[var(--outline-soft)] bg-[var(--surface-alpha)] px-4 py-4">
                  <span className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Current availability
                  </span>
                  <span className="font-display text-lg font-bold tracking-[-0.04em] text-[var(--text-primary)]">
                    {availability?.shortLabel}
                  </span>
                  <span className="text-sm leading-7 text-[var(--text-soft)]">
                    {availability?.description}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.18} index={5} seed={28}>
                <div className="mt-9 flex flex-wrap gap-4">
                  <ButtonLink href={data.contact.primaryCta.href} variant="primary">
                    {data.contact.primaryCta.label}
                  </ButtonLink>
                  <ButtonLink
                    href={data.contact.secondaryCta.href}
                    variant="secondary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {data.contact.secondaryCta.label}
                  </ButtonLink>
                </div>
              </Reveal>
              <Reveal delay={0.22} index={6} seed={28}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={`mailto:${data.site.email}`} className="neu-flat rounded-full px-4 py-3 text-sm text-[var(--text-muted)]">
                    {data.site.email}
                  </a>
                  {data.site.phone ? (
                    <a href={`tel:${data.site.phone}`} className="neu-flat rounded-full px-4 py-3 text-sm text-[var(--text-muted)]">
                      {data.site.phone}
                    </a>
                  ) : null}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
