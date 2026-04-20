import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from '../App'
import { portfolioData } from '../data/portfolioData'

describe('Portfolio app', () => {
  it('shows only the focused navigation links in the top nav', () => {
    render(<App />)

    const nav = screen.getByRole('navigation', { name: /primary/i })

    expect(nav).toHaveTextContent('Hero')
    expect(nav).toHaveTextContent('Experience')
    expect(nav).toHaveTextContent('Contact')
    expect(nav).not.toHaveTextContent('Skills')
    expect(nav).not.toHaveTextContent('Projects')
  })

  it('keeps deferred sections unloaded before intersection', () => {
    render(<App />)

    expect(document.querySelector('#experience')).toHaveAttribute('data-loaded', 'false')
    expect(screen.queryByText(/Manage Critical Document/i)).not.toBeInTheDocument()
  })

  it('loads a deferred section when its observer is triggered', async () => {
    render(<App />)

    const projectsSection = document.querySelector('#projects')

    expect(projectsSection).not.toBeNull()

    globalThis.__triggerIntersection(projectsSection!)

    expect((await screen.findAllByText(/Manage Critical Document/i)).length).toBeGreaterThan(0)
    expect(projectsSection).toHaveAttribute('data-loaded', 'true')
  })

  it('persists theme selection and exposes gradient-highlighted text', async () => {
    const user = userEvent.setup()

    render(<App />)

    const initialTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'

    await user.click(screen.getByRole('button', { name: /toggle dark mode/i }))

    const toggledTheme = initialTheme === 'dark' ? 'light' : 'dark'

    expect(window.localStorage.getItem('dqtri-theme')).toBe(toggledTheme)
    expect(document.documentElement.classList.contains('dark')).toBe(toggledTheme === 'dark')
    expect(document.querySelectorAll('.accent-gradient-text').length).toBeGreaterThan(0)
  })

  it('persists live customization choices for font family, accent preset, raised surface, inset surface, availability, navbar mode, navbar style, and border radius', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.click(screen.getByRole('button', { name: /open live customization/i }))
    await user.click(screen.getByRole('radio', { name: /system/i }))
    await user.click(screen.getByRole('radio', { name: /sunrise/i }))
    await user.click(within(screen.getByRole('radiogroup', { name: /raised surface/i })).getAllByRole('radio')[1])
    await user.click(within(screen.getByRole('radiogroup', { name: /inset surface/i })).getByRole('radio', { name: /mist/i }))
    await user.click(screen.getByRole('radio', { name: /considering/i }))
    await user.click(screen.getByRole('radio', { name: /hide on move down/i }))
    await user.click(screen.getByRole('radio', { name: /full glass top/i }))

    fireEvent.change(screen.getByLabelText(/border radius/i), {
      target: { value: '24' },
    })

    expect(window.localStorage.getItem('dqtri-font-preset')).toBe('system')
    expect(window.localStorage.getItem('dqtri-accent-preset')).toBe('sunrise')
    expect(window.localStorage.getItem('dqtri-raised-surface-preset')).toBe('highlight')
    expect(window.localStorage.getItem('dqtri-inset-surface-preset')).toBe('mist')
    expect(window.localStorage.getItem('dqtri-availability')).toBe('considering')
    expect(window.localStorage.getItem('dqtri-navbar-mode')).toBe('hide_on_scroll')
    expect(window.localStorage.getItem('dqtri-navbar-style')).toBe('full_glass_top')
    expect(window.localStorage.getItem('dqtri-border-radius')).toBe('24')
    expect(document.documentElement.style.getPropertyValue('--radius-base')).toBe('24px')
    expect(document.documentElement.style.getPropertyValue('--accent-green')).toBe('#ff9a62')
    expect(document.documentElement.style.getPropertyValue('--surface-raised')).toBe(
      document.documentElement.classList.contains('dark') ? '#20242a' : '#d2e5f7',
    )
    expect(document.documentElement.style.getPropertyValue('--surface-inset')).toBe(
      document.documentElement.classList.contains('dark') ? '#141920' : '#e4eef9',
    )
  })

  it('resets customization back to portfolio data defaults', async () => {
    const user = userEvent.setup()
    const defaults = portfolioData.site.customizationDefaults

    render(<App />)

    await user.click(screen.getByRole('button', { name: /open live customization/i }))
    await user.click(screen.getByRole('radio', { name: /sunrise/i }))
    await user.click(within(screen.getByRole('radiogroup', { name: /raised surface/i })).getAllByRole('radio')[0])
    await user.click(within(screen.getByRole('radiogroup', { name: /inset surface/i })).getByRole('radio', { name: /mist/i }))
    await user.click(screen.getByRole('radio', { name: /system/i }))
    await user.click(screen.getByRole('radio', { name: /minimal line/i }))

    fireEvent.change(screen.getByLabelText(/border radius/i), {
      target: { value: '24' },
    })

    await user.click(screen.getByRole('button', { name: /reset defaults/i }))

    expect(window.localStorage.getItem('dqtri-accent-preset')).toBe(defaults.accentPresetId)
    expect(window.localStorage.getItem('dqtri-raised-surface-preset')).toBe(defaults.raisedSurfacePresetId)
    expect(window.localStorage.getItem('dqtri-inset-surface-preset')).toBe(defaults.insetSurfacePresetId)
    expect(window.localStorage.getItem('dqtri-font-preset')).toBe(defaults.fontPreset)
    expect(window.localStorage.getItem('dqtri-border-radius')).toBe(String(defaults.borderRadius))
    expect(window.localStorage.getItem('dqtri-navbar-mode')).toBe(defaults.navbarMode)
    expect(window.localStorage.getItem('dqtri-navbar-style')).toBe(defaults.navbarStyle)
    expect(window.localStorage.getItem('dqtri-availability')).toBe(defaults.availabilityId)
  })

  it('navigates to a skill placeholder page and back without reloading', async () => {
    const user = userEvent.setup()

    render(<App />)

    const summarySection = document.querySelector('#summary')

    expect(summarySection).not.toBeNull()

    globalThis.__triggerIntersection(summarySection!)

    expect(await screen.findByText(/Architecture-ready docs/i)).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: 'Java' }))

    expect(await screen.findByRole('heading', { name: /java engineering notes/i })).toBeInTheDocument()
    expect(window.location.pathname).toBe('/skills/java')

    await user.click(screen.getByRole('link', { name: /back to portfolio/i }))

    expect(await screen.findByRole('navigation', { name: /primary/i })).toBeInTheDocument()
    expect(window.location.pathname).toBe('/')
  })
})
