import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import type { ResolvedTheme, ThemePreference } from '../types/portfolio'

const STORAGE_KEY = 'dqtri-theme'

interface ThemeContextValue {
  themePreference: ThemePreference
  resolvedTheme: ResolvedTheme
  setThemePreference: (value: ThemePreference) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialThemePreference(): ThemePreference {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY)

  if (storedValue === 'light' || storedValue === 'dark') {
    return storedValue
  }

  return getSystemTheme()
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themePreference, setThemePreference] = useState<ThemePreference>(getInitialThemePreference)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', themePreference === 'dark')
    root.dataset.theme = themePreference
    window.localStorage.setItem(STORAGE_KEY, themePreference)
  }, [themePreference])

  const value = useMemo(
    () => ({
      themePreference,
      resolvedTheme: themePreference,
      setThemePreference,
    }),
    [themePreference],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return context
}
