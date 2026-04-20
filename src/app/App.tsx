import type { ReactNode } from 'react'

import { BackToTopButton } from '../components/BackToTopButton'
import { CustomizationPanel } from '../components/CustomizationPanel'
import { CustomizationProvider } from '../components/CustomizationProvider'
import { ThemeProvider } from '../components/ThemeProvider'
import { portfolioData } from '../data/portfolioData'

export function AppFrame({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CustomizationProvider
        accentPresets={portfolioData.site.accentPresets}
        raisedSurfacePresets={portfolioData.site.raisedSurfacePresets}
        insetSurfacePresets={portfolioData.site.insetSurfacePresets}
        availabilityOptions={portfolioData.site.availabilityOptions}
        navbarStyles={portfolioData.site.navbarStyles}
        defaults={portfolioData.site.customizationDefaults}
      >
        <div className="relative min-h-screen overflow-x-clip bg-[var(--page-bg)] text-[var(--text-primary)]">
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-[var(--surface-strong)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--text-primary)]"
          >
            Skip to content
          </a>

          <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="app-glow app-glow-left" />
            <div className="app-glow app-glow-right" />
          </div>

          <CustomizationPanel />
          <BackToTopButton />
          {children}
        </div>
      </CustomizationProvider>
    </ThemeProvider>
  )
}
