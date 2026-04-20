import { BrowserRouter, Route, Routes, useParams } from 'react-router'

import { AppFrame } from './app/App'
import { portfolioData } from './data/portfolioData'
import { PortfolioPage } from './features/portfolio/PortfolioPage'
import { SkillPlaceholderPage } from './features/skills/SkillPlaceholderPage'

function SkillRoute() {
  const { slug } = useParams()
  const skill = portfolioData.skillRoutes.find((item) => item.slug === slug)

  return <SkillPlaceholderPage skill={skill} />
}

export default function App() {
  return (
    <BrowserRouter>
      <AppFrame>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/skills/:slug" element={<SkillRoute />} />
        </Routes>
      </AppFrame>
    </BrowserRouter>
  )
}
