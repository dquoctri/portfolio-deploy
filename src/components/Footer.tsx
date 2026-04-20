import { AppLink } from './AppLink'
import type { SiteData } from '../types/portfolio'
import { ButtonLink } from './ButtonLink'

interface FooterProps {
  site: SiteData
}

export function Footer({ site }: FooterProps) {
  return (
    <footer className="px-6 pb-10 pt-8 sm:px-8 lg:px-10">
      <div className="neu-flat mx-auto grid max-w-7xl gap-8 rounded-[2.4rem] px-8 py-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div className="space-y-2 text-left">
          <AppLink href="/" className="inline-flex">
            <div className="font-display text-lg font-bold tracking-[-0.05em] text-[var(--text-primary)]">
              {site.name}
            </div>
          </AppLink>
        </div>

        <div className="text-center">
          <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">{site.footerNote}</p>
        </div>

        <div className="flex flex-col gap-5 lg:items-end">
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
              >
                {social.label}
              </a>
            ))}
          </div>
          <div className="flex lg:justify-end">
            <ButtonLink href={site.resumeHref} target="_blank" rel="noreferrer" variant="secondary">
              Download Resume
            </ButtonLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
