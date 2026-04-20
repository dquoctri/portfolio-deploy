import { CustomizationPanel } from '../components/CustomizationPanel'
import { CustomizationProvider } from '../components/CustomizationProvider'
import { BackToTopButton } from '../components/BackToTopButton'
import { ThemeProvider } from '../components/ThemeProvider'
import { portfolioData } from '../data/portfolioData'
import { PortfolioPage } from '../features/portfolio/PortfolioPage'
import { SkillPlaceholderPage } from '../features/skills/SkillPlaceholderPage'
import { RouterProvider, useRouter } from './router'

function AppRoutes() {
  const { pathname } = useRouter()
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'
  const skillMatch = normalizedPath.match(/^\/skills\/([^/]+)$/)
  const selectedSkill = skillMatch
    ? portfolioData.skillRoutes.find((skill) => skill.slug === decodeURIComponent(skillMatch[1]))
    : undefined

  if (normalizedPath === '/') {
    return <PortfolioPage />
  }

  if (skillMatch) {
    return <SkillPlaceholderPage skill={selectedSkill} />
  }

  return <SkillPlaceholderPage />
}

export default function App() {
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
        <RouterProvider>
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
            <AppRoutes />
          </div>
        </RouterProvider>
      </CustomizationProvider>
    </ThemeProvider>
  )
}
