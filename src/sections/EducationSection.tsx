import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { RichText } from '../components/RichText'
import type { PortfolioSectionProps } from '../types/portfolio'

export default function EducationSection({ data }: PortfolioSectionProps) {
  return (
    <div className="px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={data.education.eyebrow}
          title={data.education.title}
          description={data.education.description}
        />

        <div className="mt-14 grid gap-8 md:grid-cols-[1.05fr_0.95fr]">
          <Reveal index={0} seed={24}>
            <article className="neu-flat h-full rounded-[2.4rem] p-8 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                    Academic foundation
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-bold tracking-[-0.05em] text-[var(--text-primary)]">
                    {data.education.school}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[var(--text-muted)]">
                    {data.education.degree}
                  </p>
                </div>
                <div className="neu-pressed rounded-[1.4rem] px-5 py-4 text-center">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    GPA
                  </p>
                  <p className="mt-1 font-display text-3xl font-bold tracking-[-0.05em] text-[var(--accent-blue)]">
                    {data.education.gpa}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="neu-pressed rounded-[1.6rem] p-5">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Period
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-primary)]">
                    {data.education.period}
                  </p>
                </div>
                <div className="neu-pressed rounded-[1.6rem] p-5">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Location
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-primary)]">
                    {data.education.location}
                  </p>
                </div>
              </div>

              <p className="mt-8 text-base leading-8 text-[var(--text-muted)]">
                <RichText value={data.education.summary} />
              </p>
            </article>
          </Reveal>

          <Reveal index={1} seed={24}>
            <div className="neu-extruded overflow-hidden rounded-[2.4rem] p-4">
              <div className="relative overflow-hidden rounded-[1.8rem]">
                <img
                  src={data.education.image.src}
                  alt={data.education.image.alt}
                  className="h-[28rem] w-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(12,17,25,0.45))]" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
