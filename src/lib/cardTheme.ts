import type { CSSProperties } from 'react'

import type { CardThemeConfig, ResolvedTheme, SiteData } from '../types/portfolio'

export function getCardThemeStyle(
  site: SiteData,
  resolvedTheme: ResolvedTheme,
  config?: CardThemeConfig,
): CSSProperties | undefined {
  if (!config) {
    return undefined
  }

  const style: CSSProperties = {}
  const customVars = style as Record<string, string>

  if (config.accentPreset) {
    const accentPreset = site.accentPresets.find((preset) => preset.id === config.accentPreset)

    if (accentPreset) {
      customVars['--accent-green'] = accentPreset.start
      customVars['--accent-blue'] = accentPreset.end
      customVars['--accent-glow'] = accentPreset.glow
      customVars['--accent-soft'] = accentPreset.soft
    }
  }

  if (config.raisedSurface) {
    const raisedSurfacePreset = site.raisedSurfacePresets.find((preset) => preset.id === config.raisedSurface)

    if (raisedSurfacePreset) {
      const raisedColor = resolvedTheme === 'dark' ? raisedSurfacePreset.dark : raisedSurfacePreset.light
      customVars['--surface-raised'] = raisedColor
      customVars['--surface-extruded-start'] = raisedColor
    }
  }

  if (config.insetSurface) {
    const insetSurfacePreset = site.insetSurfacePresets.find((preset) => preset.id === config.insetSurface)

    if (insetSurfacePreset) {
      const insetColor = resolvedTheme === 'dark' ? insetSurfacePreset.dark : insetSurfacePreset.light
      customVars['--surface-inset'] = insetColor
      customVars['--surface-extruded-end'] = insetColor
    }
  }

  return Object.keys(style).length > 0 ? style : undefined
}
