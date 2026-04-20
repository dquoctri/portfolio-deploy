import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import type {
  AccentPreset,
  AvailabilityId,
  AvailabilityOption,
  CustomizationDefaults,
  FontPresetId,
  InsetSurfacePreset,
  NavbarMode,
  NavbarStyle,
  NavbarStyleOption,
  RaisedSurfacePreset,
} from '../types/portfolio'
import { useTheme } from './ThemeProvider'

const FONT_PRESETS = [
  {
    id: 'modern',
    label: 'Modern',
    description: 'Manrope + Space Grotesk',
    sans: '"Manrope", ui-sans-serif, sans-serif',
    display: '"Space Grotesk", ui-sans-serif, sans-serif',
  },
  {
    id: 'system',
    label: 'System',
    description: 'System UI stack',
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  {
    id: 'technical',
    label: 'Technical',
    description: 'Trebuchet + Verdana',
    sans: '"Verdana", "Geneva", sans-serif',
    display: '"Trebuchet MS", "Segoe UI", sans-serif',
  },
] as const

type FontPreset = (typeof FONT_PRESETS)[number]

const FONT_STORAGE_KEY = 'dqtri-font-preset'
const RADIUS_STORAGE_KEY = 'dqtri-border-radius'
const ACCENT_STORAGE_KEY = 'dqtri-accent-preset'
const RAISED_SURFACE_STORAGE_KEY = 'dqtri-raised-surface-preset'
const INSET_SURFACE_STORAGE_KEY = 'dqtri-inset-surface-preset'
const AVAILABILITY_STORAGE_KEY = 'dqtri-availability'
const NAVBAR_MODE_STORAGE_KEY = 'dqtri-navbar-mode'
const NAVBAR_STYLE_STORAGE_KEY = 'dqtri-navbar-style'
const DEFAULT_FONT_PRESET: FontPresetId = 'modern'
const MIN_BORDER_RADIUS = 10
const MAX_BORDER_RADIUS = 28

const NAVBAR_MODES = [
  {
    id: 'static',
    label: 'Static',
    description: 'Keep the navbar fixed and always visible.',
  },
  {
    id: 'hide_on_scroll',
    label: 'Hide on move down',
    description: 'Hide while scrolling down and show again when scrolling up.',
  },
  {
    id: 'absolute',
    label: 'Absolute',
    description: 'Place the navbar over the hero and let it scroll away with the page.',
  },
] as const

type NavbarModeOption = (typeof NAVBAR_MODES)[number]

interface CustomizationContextValue {
  accentPresetId: string
  accentPresets: readonly AccentPreset[]
  raisedSurfacePresetId: string
  raisedSurfacePresets: readonly RaisedSurfacePreset[]
  insetSurfacePresetId: string
  insetSurfacePresets: readonly InsetSurfacePreset[]
  availabilityId: AvailabilityId
  availabilityOptions: readonly AvailabilityOption[]
  borderRadius: number
  fontPreset: FontPresetId
  fontPresets: readonly FontPreset[]
  navbarMode: NavbarMode
  navbarModes: readonly NavbarModeOption[]
  navbarStyle: NavbarStyle
  navbarStyles: readonly NavbarStyleOption[]
  setAccentPresetId: (value: string) => void
  setRaisedSurfacePresetId: (value: string) => void
  setInsetSurfacePresetId: (value: string) => void
  setAvailabilityId: (value: AvailabilityId) => void
  setBorderRadius: (value: number) => void
  setFontPreset: (value: FontPresetId) => void
  setNavbarMode: (value: NavbarMode) => void
  setNavbarStyle: (value: NavbarStyle) => void
  resetCustomization: () => void
}

const CustomizationContext = createContext<CustomizationContextValue | null>(null)

function isFontPresetId(value: string | null): value is FontPresetId {
  return FONT_PRESETS.some((preset) => preset.id === value)
}

function clampBorderRadius(value: number) {
  return Math.min(MAX_BORDER_RADIUS, Math.max(MIN_BORDER_RADIUS, value))
}

function isNavbarMode(value: string | null): value is NavbarMode {
  return NAVBAR_MODES.some((mode) => mode.id === value)
}

function isNavbarStyle(value: string | null, navbarStyles: readonly NavbarStyleOption[]): value is NavbarStyle {
  return navbarStyles.some((style) => style.id === value)
}

function getInitialStoredValue(storageKey: string) {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage.getItem(storageKey)
}

interface CustomizationProviderProps {
  accentPresets: readonly AccentPreset[]
  raisedSurfacePresets: readonly RaisedSurfacePreset[]
  insetSurfacePresets: readonly InsetSurfacePreset[]
  availabilityOptions: readonly AvailabilityOption[]
  navbarStyles: readonly NavbarStyleOption[]
  defaults: CustomizationDefaults
  children: ReactNode
}

export function CustomizationProvider({
  accentPresets,
  raisedSurfacePresets,
  insetSurfacePresets,
  availabilityOptions,
  navbarStyles,
  defaults,
  children,
}: CustomizationProviderProps) {
  const { resolvedTheme } = useTheme()
  const defaultAccentPreset =
    accentPresets.find((preset) => preset.id === defaults.accentPresetId) ?? accentPresets[0]
  const defaultRaisedSurfacePreset =
    raisedSurfacePresets.find((preset) => preset.id === defaults.raisedSurfacePresetId) ?? raisedSurfacePresets[0]
  const defaultInsetSurfacePreset =
    insetSurfacePresets.find((preset) => preset.id === defaults.insetSurfacePresetId) ?? insetSurfacePresets[0]
  const defaultAvailability =
    availabilityOptions.find((option) => option.id === defaults.availabilityId) ?? availabilityOptions[0]
  const [fontPreset, setFontPreset] = useState<FontPresetId>(() => {
    if (typeof window === 'undefined') {
      return defaults.fontPreset
    }

    const storedValue = window.localStorage.getItem(FONT_STORAGE_KEY)

    return isFontPresetId(storedValue) ? storedValue : defaults.fontPreset
  })
  const [borderRadius, setBorderRadius] = useState<number>(() => {
    if (typeof window === 'undefined') {
      return clampBorderRadius(defaults.borderRadius)
    }

    const storedValue = window.localStorage.getItem(RADIUS_STORAGE_KEY)
    const parsedValue = storedValue ? Number.parseInt(storedValue, 10) : Number.NaN

    return Number.isFinite(parsedValue) ? clampBorderRadius(parsedValue) : clampBorderRadius(defaults.borderRadius)
  })
  const [accentPresetId, setAccentPresetId] = useState<string>(() => {
    const storedValue = getInitialStoredValue(ACCENT_STORAGE_KEY)

    return accentPresets.some((preset) => preset.id === storedValue)
      ? storedValue!
      : defaultAccentPreset?.id ?? defaults.accentPresetId
  })
  const [raisedSurfacePresetId, setRaisedSurfacePresetId] = useState<string>(() => {
    const storedValue = getInitialStoredValue(RAISED_SURFACE_STORAGE_KEY)

    return raisedSurfacePresets.some((preset) => preset.id === storedValue)
      ? storedValue!
      : defaultRaisedSurfacePreset?.id ?? defaults.raisedSurfacePresetId
  })
  const [insetSurfacePresetId, setInsetSurfacePresetId] = useState<string>(() => {
    const storedValue = getInitialStoredValue(INSET_SURFACE_STORAGE_KEY)

    return insetSurfacePresets.some((preset) => preset.id === storedValue)
      ? storedValue!
      : defaultInsetSurfacePreset?.id ?? defaults.insetSurfacePresetId
  })
  const [availabilityId, setAvailabilityId] = useState<AvailabilityId>(() => {
    const storedValue = getInitialStoredValue(AVAILABILITY_STORAGE_KEY)
    const matchingOption = availabilityOptions.find((option) => option.id === storedValue)

    return matchingOption?.id ?? defaultAvailability?.id ?? defaults.availabilityId
  })
  const [navbarMode, setNavbarMode] = useState<NavbarMode>(() => {
    const storedValue = getInitialStoredValue(NAVBAR_MODE_STORAGE_KEY)

    return isNavbarMode(storedValue) ? storedValue : defaults.navbarMode
  })
  const [navbarStyle, setNavbarStyle] = useState<NavbarStyle>(() => {
    const storedValue = getInitialStoredValue(NAVBAR_STYLE_STORAGE_KEY)

    return isNavbarStyle(storedValue, navbarStyles) ? storedValue : defaults.navbarStyle
  })

  useEffect(() => {
    const root = document.documentElement
    const selectedFontPreset =
      FONT_PRESETS.find((preset) => preset.id === fontPreset) ??
      FONT_PRESETS.find((preset) => preset.id === DEFAULT_FONT_PRESET)!

    root.style.setProperty('--font-sans', selectedFontPreset.sans)
    root.style.setProperty('--font-display', selectedFontPreset.display)
    window.localStorage.setItem(FONT_STORAGE_KEY, selectedFontPreset.id)
  }, [fontPreset])

  useEffect(() => {
    const root = document.documentElement
    const clampedRadius = clampBorderRadius(borderRadius)

    root.style.setProperty('--radius-base', `${clampedRadius}px`)
    root.style.setProperty('--radius-shell', `${Math.max(clampedRadius + 18, 30)}px`)
    root.style.setProperty('--radius-panel', `${Math.max(clampedRadius + 10, 22)}px`)
    root.style.setProperty('--radius-card', `${Math.max(clampedRadius + 2, 16)}px`)
    root.style.setProperty('--radius-soft', `${Math.max(clampedRadius - 2, 12)}px`)
    root.style.setProperty('--radius-button', `${Math.max(clampedRadius + 16, 28)}px`)
    root.style.setProperty('--radius-chip', `${Math.max(clampedRadius + 8, 20)}px`)
    window.localStorage.setItem(RADIUS_STORAGE_KEY, String(clampedRadius))
  }, [borderRadius])

  useEffect(() => {
    const root = document.documentElement
    const selectedPreset =
      accentPresets.find((preset) => preset.id === accentPresetId) ?? defaultAccentPreset

    if (!selectedPreset) {
      return
    }

    root.style.setProperty('--accent-green', selectedPreset.start)
    root.style.setProperty('--accent-blue', selectedPreset.end)
    root.style.setProperty('--accent-glow', selectedPreset.glow)
    root.style.setProperty('--accent-soft', selectedPreset.soft)
    window.localStorage.setItem(ACCENT_STORAGE_KEY, selectedPreset.id)
  }, [accentPresetId, accentPresets, defaultAccentPreset])

  useEffect(() => {
    const root = document.documentElement
    const selectedPreset =
      raisedSurfacePresets.find((preset) => preset.id === raisedSurfacePresetId) ?? defaultRaisedSurfacePreset

    if (!selectedPreset) {
      return
    }

    root.style.setProperty(
      '--surface-raised',
      resolvedTheme === 'dark' ? selectedPreset.dark : selectedPreset.light,
    )
    window.localStorage.setItem(RAISED_SURFACE_STORAGE_KEY, selectedPreset.id)
  }, [defaultRaisedSurfacePreset, raisedSurfacePresetId, raisedSurfacePresets, resolvedTheme])

  useEffect(() => {
    const root = document.documentElement
    const selectedPreset =
      insetSurfacePresets.find((preset) => preset.id === insetSurfacePresetId) ?? defaultInsetSurfacePreset

    if (!selectedPreset) {
      return
    }

    root.style.setProperty(
      '--surface-inset',
      resolvedTheme === 'dark' ? selectedPreset.dark : selectedPreset.light,
    )
    window.localStorage.setItem(INSET_SURFACE_STORAGE_KEY, selectedPreset.id)
  }, [defaultInsetSurfacePreset, insetSurfacePresetId, insetSurfacePresets, resolvedTheme])

  useEffect(() => {
    window.localStorage.setItem(AVAILABILITY_STORAGE_KEY, availabilityId)
  }, [availabilityId])

  useEffect(() => {
    window.localStorage.setItem(NAVBAR_MODE_STORAGE_KEY, navbarMode)
  }, [navbarMode])

  useEffect(() => {
    window.localStorage.setItem(NAVBAR_STYLE_STORAGE_KEY, navbarStyle)
  }, [navbarStyle])

  const resetCustomization = () => {
    setFontPreset(defaults.fontPreset)
    setBorderRadius(clampBorderRadius(defaults.borderRadius))
    setAccentPresetId(defaultAccentPreset?.id ?? defaults.accentPresetId)
    setRaisedSurfacePresetId(defaultRaisedSurfacePreset?.id ?? defaults.raisedSurfacePresetId)
    setInsetSurfacePresetId(defaultInsetSurfacePreset?.id ?? defaults.insetSurfacePresetId)
    setAvailabilityId(defaultAvailability?.id ?? defaults.availabilityId)
    setNavbarMode(defaults.navbarMode)
    setNavbarStyle(defaults.navbarStyle)
  }

  const value = useMemo(
    () => ({
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
      fontPresets: FONT_PRESETS,
      navbarMode,
      navbarModes: NAVBAR_MODES,
      navbarStyle,
      navbarStyles,
      setAccentPresetId,
      setRaisedSurfacePresetId,
      setInsetSurfacePresetId,
      setAvailabilityId,
      setBorderRadius: (value: number) => setBorderRadius(clampBorderRadius(value)),
      setFontPreset,
      setNavbarMode,
      setNavbarStyle,
      resetCustomization,
    }),
    [
      accentPresetId,
      accentPresets,
      raisedSurfacePresetId,
      raisedSurfacePresets,
      insetSurfacePresetId,
      insetSurfacePresets,
      availabilityId,
      availabilityOptions,
      borderRadius,
      defaultAccentPreset,
      defaultAvailability,
      defaultInsetSurfacePreset,
      defaultRaisedSurfacePreset,
      defaults,
      fontPreset,
      navbarMode,
      navbarStyle,
      navbarStyles,
    ],
  )

  return <CustomizationContext.Provider value={value}>{children}</CustomizationContext.Provider>
}

export function useCustomization() {
  const context = useContext(CustomizationContext)

  if (!context) {
    throw new Error('useCustomization must be used inside CustomizationProvider')
  }

  return context
}
