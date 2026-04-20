import { expect, test } from '@playwright/test'

test('renders the neumorphic portfolio shell and mounts deferred sections on scroll', async ({
  page,
}) => {
  await page.goto('/')

  await expect(page.locator('header')).toBeVisible()
  await expect(page.locator('#hero')).toBeVisible()
  await expect(page.locator('#experience')).toHaveAttribute('data-loaded', 'false')

  await page.locator('#experience').scrollIntoViewIfNeeded()
  await expect(page.locator('#experience')).toHaveAttribute('data-loaded', 'true')
  await expect(page.getByText(/Senior Engineer/i)).toBeVisible()
})

test('toggles dark mode from the header and keeps focused navigation', async ({ page }) => {
  await page.goto('/')

  const nav = page.getByRole('navigation', { name: /primary/i })
  await expect(nav.getByRole('link', { name: 'Hero' })).toBeVisible()
  await expect(nav.getByRole('link', { name: 'Experience' })).toBeVisible()
  await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible()

  const hadDarkClass = ((await page.locator('html').getAttribute('class')) ?? '').includes('dark')

  await page.getByRole('button', { name: /toggle dark mode/i }).click()

  if (hadDarkClass) {
    await expect(page.locator('html')).not.toHaveClass(/dark/)
  } else {
    await expect(page.locator('html')).toHaveClass(/dark/)
  }

  await expect(page.locator('.accent-gradient-text').first()).toBeVisible()
})

test('updates accent and availability from the live customizer', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: /open live customization/i }).click()
  await page.getByRole('radio', { name: /sunrise/i }).click()
  await page.getByRole('radio', { name: /considering/i }).click()

  await expect(page.getByText(/Warmly considering future moves/i)).toBeVisible()

  await expect
    .poll(() => page.evaluate(() => document.documentElement.style.getPropertyValue('--accent-green')))
    .toBe('#ff9a62')
})

test('supports navbar behavior presets from the live customizer', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: /open live customization/i }).click()
  await page.getByRole('radio', { name: /hide on move down/i }).click()

  await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'auto' }))
  await expect(page.locator('header')).toHaveClass(/-translate-y-\[calc\(100%\+1rem\)\]/)

  await page.evaluate(() => window.scrollTo({ top: 140, behavior: 'auto' }))
  await expect(page.locator('header')).not.toHaveClass(/-translate-y-\[calc\(100%\+1rem\)\]/)

  await page.getByRole('radio', { name: /absolute/i }).click()
  await expect(page.locator('header')).toHaveClass(/absolute/)
})

test('navigates to a skill placeholder route and back to the portfolio', async ({ page }) => {
  await page.goto('/')

  await page.locator('#summary').scrollIntoViewIfNeeded()
  await page.getByRole('link', { name: 'Java' }).first().click()

  await expect(page).toHaveURL(/\/skills\/java$/)
  await expect(page.getByRole('heading', { name: /java engineering notes/i })).toBeVisible()

  await page.getByRole('link', { name: /back to portfolio/i }).click()

  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('navigation', { name: /primary/i })).toBeVisible()
})

test('moves core technologies by pager buttons without a horizontal scroll rail', async ({ page }) => {
  await page.goto('/')

  await page.locator('#core-technologies').scrollIntoViewIfNeeded()

  const nextButton = page.getByRole('button', { name: /next technology card/i })
  const viewport = page.locator('#core-technologies .overflow-hidden').first()

  await expect(viewport).toBeVisible()
  await expect(viewport).not.toHaveClass(/overflow-x-auto/)
  await expect(nextButton).toBeEnabled()
  await nextButton.click()
  await expect(page.getByRole('button', { name: /previous technology card/i })).toBeEnabled()
})
