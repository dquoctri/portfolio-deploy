import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useRouter } from '../app/router'
import { cn } from '../lib/cn'
import type { SectionDefinition, SiteData } from '../types/portfolio'
import { AppLink } from './AppLink'
import { useCustomization } from './CustomizationProvider'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  site: SiteData
  sections: SectionDefinition[]
}

export function Header({ site, sections }: HeaderProps) {
  const { pathname } = useRouter()
  const { navbarMode, navbarStyle } = useCustomization()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHiddenOnScroll, setIsHiddenOnScroll] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const lastScrollYRef = useRef(0)
  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections])
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? 'hero')
  const homeHref = pathname === '/' ? '#hero' : '/'

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY - lastScrollYRef.current

      setIsScrolled(currentScrollY > 18)

      if (navbarMode !== 'hide_on_scroll') {
        setIsHiddenOnScroll(false)
        lastScrollYRef.current = currentScrollY
        return
      }

      if (currentScrollY < 64 || isMenuOpen) {
        setIsHiddenOnScroll(false)
      } else if (direction > 10) {
        setIsHiddenOnScroll(true)
      } else if (direction < -6) {
        setIsHiddenOnScroll(false)
      }

      lastScrollYRef.current = currentScrollY
    }

    lastScrollYRef.current = window.scrollY
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMenuOpen, navbarMode])

  useEffect(() => {
    if (navbarMode !== 'hide_on_scroll') {
      setIsHiddenOnScroll(false)
    }
  }, [navbarMode])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!sectionIds.length) {
      return
    }

    const updateFromHash = () => {
      const hashId = window.location.hash.replace('#', '')

      if (sectionIds.includes(hashId)) {
        setActiveSection(hashId)
      }
    }

    updateFromHash()
    window.addEventListener('hashchange', updateFromHash)

    return () => window.removeEventListener('hashchange', updateFromHash)
  }, [sectionIds])

  useEffect(() => {
    if (!sectionIds.length) {
      return
    }

    const observedSections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((element): element is HTMLElement => Boolean(element))

    if (!observedSections.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: '-28% 0px -46% 0px',
      },
    )

    observedSections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [sectionIds])

  const headerPositionClassName =
    navbarMode === 'absolute' ? 'absolute inset-x-0 top-0' : 'fixed inset-x-0 top-0'
  const isShellStyle = navbarStyle === 'shell'
  const isGlassStyle = navbarStyle === 'full_glass_top'
  const isMinimalStyle = navbarStyle === 'minimal_line'
  const useInlineNavLinks = isGlassStyle || isMinimalStyle
  const headerOuterClassName = isShellStyle ? 'px-4 pt-4 sm:px-6' : 'px-0 pt-0'
  const hiddenClassName = isShellStyle ? '-translate-y-[calc(100%+1rem)]' : '-translate-y-full'
  const headerFrameClassName = cn(
    isShellStyle
      ? 'neu-shell neu-shell-radius mx-auto max-w-7xl px-5 py-4 sm:px-6'
      : 'header-band w-full px-4 sm:px-6',
    isGlassStyle && 'header-band-glass',
    navbarStyle === 'full_raised_top' && 'header-band-raised',
    isMinimalStyle && 'header-band-minimal',
    isScrolled && (isShellStyle ? 'px-4 py-3 shadow-[var(--shadow-shell-strong)]' : 'shadow-[var(--shadow-shell)]'),
  )
  const innerClassName = cn(
    'flex items-center justify-between gap-4',
    !isShellStyle && 'mx-auto min-h-[var(--header-height)] max-w-7xl',
  )
  const desktopNavClassName = cn(
    'hidden items-center gap-8 lg:flex',
    useInlineNavLinks && 'gap-7',
  )
  const desktopNavLinkClassName = (isActive: boolean) =>
    cn(
      'font-label text-[11px] font-bold uppercase tracking-[0.18em]',
      useInlineNavLinks ? 'header-inline-link' : 'neu-nav-link',
      isActive && 'is-active',
    )
  const mobileMenuClassName = cn(
    'lg:hidden',
    !isShellStyle && 'mx-auto max-w-7xl pb-4',
  )
  const mobileNavClassName = cn(
    'mt-4 flex flex-col gap-3 pt-4',
    isShellStyle ? 'border-t border-[var(--outline-strong)]' : 'border-t border-[var(--outline-soft)]',
  )
  const mobileMenuButtonClassName = cn(
    'inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-soft)] text-[var(--text-primary)] lg:hidden',
    isMinimalStyle ? 'header-icon-button' : 'neu-flat',
  )
  const brandClassName = cn(
    'font-display text-xl font-bold tracking-[-0.06em] text-[var(--text-primary)]',
    useInlineNavLinks && 'tracking-[-0.08em]',
  )
  const actionGroupClassName = cn('flex items-center gap-3', useInlineNavLinks && 'gap-2.5')

  return (
    <header
      className={cn(
        headerPositionClassName,
        headerOuterClassName,
        'z-50 transition-transform duration-300',
        navbarMode === 'hide_on_scroll' && isHiddenOnScroll && hiddenClassName,
      )}
    >
      <div className={headerFrameClassName}>
        <div className={innerClassName}>
          <AppLink href={homeHref} className="min-w-0">
            <p className={brandClassName}>{site.name}</p>
          </AppLink>

          <nav className={desktopNavClassName} aria-label="Primary">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={activeSection === section.id ? 'page' : undefined}
                onClick={() => setActiveSection(section.id)}
                className={desktopNavLinkClassName(activeSection === section.id)}
              >
                {section.label}
              </a>
            ))}
          </nav>

          <div className={actionGroupClassName}>
            <ThemeToggle />

            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              onClick={() => setIsMenuOpen((value) => !value)}
              className={mobileMenuButtonClassName}
            >
              <span className="material-symbols-outlined text-[18px]">menu</span>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={mobileMenuClassName}
            >
              <nav aria-label="Mobile navigation" className={mobileNavClassName}>
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    aria-current={activeSection === section.id ? 'page' : undefined}
                    onClick={() => {
                      setActiveSection(section.id)
                      setIsMenuOpen(false)
                    }}
                    className={cn(
                      'neu-nav-link neu-flat neu-soft-radius px-4 py-3 font-label text-[11px] font-bold uppercase tracking-[0.18em]',
                      activeSection === section.id && 'is-active',
                    )}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}
