import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { resolvedTheme, setThemePreference } = useTheme()
  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setThemePreference(nextTheme)}
      className="neu-flat neu-toggle group inline-flex h-11 min-w-11 items-center justify-center rounded-[var(--radius-button)] px-3 text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
    >
      <span className="material-symbols-outlined text-[18px] text-[var(--theme-toggle-icon)]">
        {resolvedTheme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
      <span className="ml-2 hidden text-[10px] font-semibold uppercase tracking-[0.2em] md:inline">
        {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  )
}
