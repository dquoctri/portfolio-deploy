import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { SectionShell } from '../../components/SectionShell'
import { DeferredSection } from '../../components/DeferredSection'
import { portfolioData } from '../../data/portfolioData'
import { sectionDefinitions } from '../../sectionDefinitions'

export function PortfolioPage() {
  const eagerSections = sectionDefinitions.filter((section) => section.eager)
  const deferredSections = sectionDefinitions.filter((section) => !section.eager)
  const navigationSections = sectionDefinitions.filter((section) => section.navVisible)

  return (
    <>
      <Header site={portfolioData.site} sections={navigationSections} />

      <main id="content" className="relative z-10">
        {eagerSections.map((definition) => {
          const Component = definition.component

          if (!Component) {
            return null
          }

          return (
            <SectionShell key={definition.id} id={definition.id} tone={definition.themeTone} loaded>
              <Component data={portfolioData} />
            </SectionShell>
          )
        })}

        {deferredSections.map((definition) => (
          <DeferredSection key={definition.id} definition={definition} data={portfolioData} />
        ))}
      </main>

      <Footer site={portfolioData.site} />
    </>
  )
}
