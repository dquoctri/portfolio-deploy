import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { cn } from '../lib/cn'
import { useCustomization } from './CustomizationProvider'
import { useTheme } from './ThemeProvider'

export function CustomizationPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  const {
    accentPresetId,
    accentPresets,
    raisedSurfacePresetId,
    raisedSurfacePresets,
    insetSurfacePresetId,
    insetSurfacePresets,
    availabilityId,
    availabilityOptions,
    borderRadius,
    fontPreset,
    fontPresets,
    navbarMode,
    navbarModes,
    navbarStyle,
    navbarStyles,
    setAccentPresetId,
    setRaisedSurfacePresetId,
    setInsetSurfacePresetId,
    setAvailabilityId,
    setBorderRadius,
    setFontPreset,
    setNavbarMode,
    setNavbarStyle,
    resetCustomization,
  } = useCustomization()

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? 'Close live customization' : 'Open live customization'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
        className="customizer-toggle neu-flat fixed right-4 top-[24%] z-[60] inline-flex h-14 w-14 items-center justify-center text-[var(--text-primary)] shadow-[var(--shadow-shell)] transition-transform duration-200 hover:scale-[1.02] sm:right-6"
      >
        <span className="material-symbols-outlined text-[22px]">tune</span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close customization panel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[55] bg-[rgba(17,24,39,0.18)] backdrop-blur-[2px]"
            />

            <motion.aside
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="fixed right-4 top-[calc(var(--header-height)+0.75rem)] z-[60] w-[min(22rem,calc(100vw-2rem))] sm:right-6"
              aria-label="Live customization panel"
            >
              <div className="scrollbar-soft neu-shell neu-panel-radius max-h-[calc(100svh-var(--header-height)-2rem)] overflow-y-auto p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--accent-blue)]">
                      Live Customize
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.05em] text-[var(--text-primary)]">
                      Make it yours
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                      Change typography, accent mood, availability, and corner softness in real time without leaving the page.
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label="Close customization panel"
                    onClick={() => setIsOpen(false)}
                    className="neu-flat neu-soft-radius inline-flex h-11 w-22 items-center justify-center text-[var(--text-primary)]"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={resetCustomization}
                    className="neu-flat neu-soft-radius inline-flex w-full items-center justify-center px-4 py-3 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Reset Defaults
                  </button>
                </div>

                <section className="mt-6">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                    Font Family
                  </p>
                  <div role="radiogroup" aria-label="Font family" className="mt-4 grid gap-3">
                    {fontPresets.map((preset) => {
                      const isActive = preset.id === fontPreset

                      return (
                        <button
                          key={preset.id}
                          type="button"
                          role="radio"
                          aria-checked={isActive}
                          onClick={() => setFontPreset(preset.id)}
                          className={cn(
                            'text-left transition-transform duration-200 hover:-translate-y-0.5',
                            isActive ? 'neu-pressed' : 'neu-flat',
                            'neu-soft-radius px-4 py-3',
                          )}
                        >
                          <span
                            className="block font-display text-base font-bold tracking-[-0.03em] text-[var(--text-primary)]"
                            style={{ fontFamily: preset.display }}
                          >
                            {preset.label}
                          </span>
                          <span
                            className="mt-1 block text-sm text-[var(--text-muted)]"
                            style={{ fontFamily: preset.sans }}
                          >
                            {preset.description}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </section>

                <section className="mt-6">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                    Accent Preset
                  </p>
                  <div role="radiogroup" aria-label="Accent preset" className="mt-4 grid gap-3">
                    {accentPresets.map((preset) => {
                      const isActive = preset.id === accentPresetId

                      return (
                        <button
                          key={preset.id}
                          type="button"
                          role="radio"
                          aria-checked={isActive}
                          onClick={() => setAccentPresetId(preset.id)}
                          className={cn(
                            'text-left transition-transform duration-200 hover:-translate-y-0.5',
                            isActive ? 'neu-pressed' : 'neu-flat',
                            'neu-soft-radius px-4 py-3',
                          )}
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span className="block font-display text-base font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                              {preset.label}
                            </span>
                            <span
                              aria-hidden="true"
                              className="h-3.5 w-16 rounded-full"
                              style={{
                                background: `linear-gradient(135deg, ${preset.start}, ${preset.end})`,
                              }}
                            />
                          </span>
                          <span className="mt-1 block text-sm text-[var(--text-muted)]">
                            {preset.description}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </section>

                <section className="mt-6">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                    Raised Surface
                  </p>
                  <div role="radiogroup" aria-label="Raised surface" className="mt-4 grid gap-3">
                    {raisedSurfacePresets.map((preset) => {
                      const isActive = preset.id === raisedSurfacePresetId
                      const previewColor = resolvedTheme === 'dark' ? preset.dark : preset.light

                      return (
                        <button
                          key={preset.id}
                          type="button"
                          role="radio"
                          aria-checked={isActive}
                          onClick={() => setRaisedSurfacePresetId(preset.id)}
                          className={cn(
                            'text-left transition-transform duration-200 hover:-translate-y-0.5',
                            isActive ? 'neu-pressed' : 'neu-flat',
                            'neu-soft-radius px-4 py-3',
                          )}
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span className="block font-display text-base font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                              {preset.label}
                            </span>
                            <span
                              aria-hidden="true"
                              className="h-8 w-16 rounded-[0.9rem] border border-[var(--outline-soft)] shadow-[var(--shadow-button)]"
                              style={{ background: previewColor }}
                            />
                          </span>
                          <span className="mt-1 block text-sm text-[var(--text-muted)]">
                            {preset.description}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </section>

                <section className="mt-6">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                    Inset Surface
                  </p>
                  <div role="radiogroup" aria-label="Inset surface" className="mt-4 grid gap-3">
                    {insetSurfacePresets.map((preset) => {
                      const isActive = preset.id === insetSurfacePresetId
                      const previewColor = resolvedTheme === 'dark' ? preset.dark : preset.light

                      return (
                        <button
                          key={preset.id}
                          type="button"
                          role="radio"
                          aria-checked={isActive}
                          onClick={() => setInsetSurfacePresetId(preset.id)}
                          className={cn(
                            'text-left transition-transform duration-200 hover:-translate-y-0.5',
                            isActive ? 'neu-pressed' : 'neu-flat',
                            'neu-soft-radius px-4 py-3',
                          )}
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span className="block font-display text-base font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                              {preset.label}
                            </span>
                            <span
                              aria-hidden="true"
                              className="h-8 w-16 rounded-[0.9rem] border border-[var(--outline-soft)] shadow-[inset_4px_4px_6px_rgba(0,0,0,0.08),inset_-4px_-4px_6px_rgba(255,255,255,0.55)]"
                              style={{ background: previewColor }}
                            />
                          </span>
                          <span className="mt-1 block text-sm text-[var(--text-muted)]">
                            {preset.description}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </section>

                <section className="mt-6">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                    Availability
                  </p>
                  <div role="radiogroup" aria-label="Availability" className="mt-4 grid gap-3">
                    {availabilityOptions.map((option) => {
                      const isActive = option.id === availabilityId

                      return (
                        <button
                          key={option.id}
                          type="button"
                          role="radio"
                          aria-checked={isActive}
                          onClick={() => setAvailabilityId(option.id)}
                          className={cn(
                            'text-left transition-transform duration-200 hover:-translate-y-0.5',
                            isActive ? 'neu-pressed' : 'neu-flat',
                            'neu-soft-radius px-4 py-3',
                          )}
                        >
                          <span className="block font-display text-base font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                            {option.shortLabel}
                          </span>
                          <span className="mt-1 block text-sm text-[var(--text-muted)]">
                            {option.description}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </section>

                <section className="mt-6">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                    Navbar Mode
                  </p>
                  <div role="radiogroup" aria-label="Navbar mode" className="mt-4 grid gap-3">
                    {navbarModes.map((mode) => {
                      const isActive = mode.id === navbarMode

                      return (
                        <button
                          key={mode.id}
                          type="button"
                          role="radio"
                          aria-checked={isActive}
                          onClick={() => setNavbarMode(mode.id)}
                          className={cn(
                            'text-left transition-transform duration-200 hover:-translate-y-0.5',
                            isActive ? 'neu-pressed' : 'neu-flat',
                            'neu-soft-radius px-4 py-3',
                          )}
                        >
                          <span className="block font-display text-base font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                            {mode.label}
                          </span>
                          <span className="mt-1 block text-sm text-[var(--text-muted)]">
                            {mode.description}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </section>

                <section className="mt-6">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                    Navbar Style
                  </p>
                  <div role="radiogroup" aria-label="Navbar style" className="mt-4 grid gap-3">
                    {navbarStyles.map((style) => {
                      const isActive = style.id === navbarStyle

                      return (
                        <button
                          key={style.id}
                          type="button"
                          role="radio"
                          aria-checked={isActive}
                          onClick={() => setNavbarStyle(style.id)}
                          className={cn(
                            'text-left transition-transform duration-200 hover:-translate-y-0.5',
                            isActive ? 'neu-pressed' : 'neu-flat',
                            'neu-soft-radius px-4 py-3',
                          )}
                        >
                          <span className="block font-display text-base font-bold tracking-[-0.03em] text-[var(--text-primary)]">
                            {style.label}
                          </span>
                          <span className="mt-1 block text-sm text-[var(--text-muted)]">
                            {style.description}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </section>

                <section className="mt-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-label text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                      Border Radius
                    </p>
                    <div className="neu-flat neu-soft-radius px-3 py-1.5 font-label text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-primary)]">
                      {borderRadius}px
                    </div>
                  </div>

                  <label htmlFor="border-radius-slider" className="sr-only">
                    Border radius
                  </label>
                  <input
                    id="border-radius-slider"
                    aria-label="Border radius"
                    className="customizer-range mt-4 w-full"
                    type="range"
                    min="10"
                    max="28"
                    step="2"
                    value={borderRadius}
                    onChange={(event) => setBorderRadius(Number(event.target.value))}
                  />

                  <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--text-soft)]">
                    <span>Sharper</span>
                    <span>Softer</span>
                  </div>
                </section>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
