import type { ComponentType } from 'react'

export type ThemePreference = 'light' | 'dark'
export type ResolvedTheme = ThemePreference
export type SectionTone = 'hero' | 'surface' | 'surface-alt'
export type AccentVariant = 'emerald' | 'sky' | 'violet' | 'amber'
export type FontPresetId = 'modern' | 'system' | 'technical'
export type AvailabilityId = 'available' | 'open_to_discuss' | 'considering' | 'not_available'
export type AvailabilityTone = 'positive' | 'warm' | 'cool' | 'muted'
export type PlaceholderState = 'work_in_progress' | 'planned' | 'parked'
export type ProjectStatus = 'featured' | 'active' | 'placeholder'
export type NavbarMode = 'static' | 'hide_on_scroll' | 'absolute'
export type NavbarStyle = 'shell' | 'full_glass_top' | 'full_raised_top' | 'minimal_line'

export interface LinkItem {
  label: string
  href: string
}

export interface TextSegment {
  text: string
  accent?: boolean
}

export type TextContent = string | TextSegment[]

export interface CardThemeConfig {
  accentPreset?: string
  raisedSurface?: string
  insetSurface?: string
}

export interface HeroMetric {
  label: string
  value: string
}

export interface MediaAsset {
  src: string
  alt: string
}

export interface AccentPreset {
  id: string
  label: string
  description: string
  start: string
  end: string
  glow: string
  soft: string
}

export interface InsetSurfacePreset {
  id: string
  label: string
  description: string
  light: string
  dark: string
}

export interface RaisedSurfacePreset {
  id: string
  label: string
  description: string
  light: string
  dark: string
}

export interface AvailabilityOption {
  id: AvailabilityId
  label: string
  shortLabel: string
  description: string
  tone: AvailabilityTone
}

export interface NavbarStyleOption {
  id: NavbarStyle
  label: string
  description: string
}

export interface CustomizationDefaults {
  accentPresetId: string
  raisedSurfacePresetId: string
  insetSurfacePresetId: string
  availabilityId: AvailabilityId
  fontPreset: FontPresetId
  navbarMode: NavbarMode
  navbarStyle: NavbarStyle
  borderRadius: number
}

export interface SiteData {
  name: string
  role: string
  futureRole: string
  location: string
  email: string
  phone?: string
  resumeHref: string
  footerNote: string
  socials: LinkItem[]
  accentPresets: AccentPreset[]
  raisedSurfacePresets: RaisedSurfacePreset[]
  insetSurfacePresets: InsetSurfacePreset[]
  customizationDefaults: CustomizationDefaults
  availabilityOptions: AvailabilityOption[]
  navbarStyles: NavbarStyleOption[]
}

export interface HeroData {
  eyebrow: string
  title: TextContent
  subtitle: TextContent
  description: TextContent
  primaryCta: LinkItem
  secondaryCta: LinkItem
  profileImage: MediaAsset
  futureProfileImage: MediaAsset
  floatingKeywords: string[]
  metrics: HeroMetric[]
}

export interface SummaryCard extends CardThemeConfig {
  label: string
  value: string
  detail: string
}

export interface SkillReference {
  label: string
  skillSlug?: string
}

export interface SummaryData {
  eyebrow: string
  title: TextContent
  description: TextContent
  paragraphs: TextContent[]
  focusAreas: SkillReference[]
  cards: SummaryCard[]
  futureStatement: TextContent
}

export interface ProjectItem extends CardThemeConfig {
  title: string
  category: string
  summary: TextContent
  impact: TextContent
  stack: SkillReference[]
  link?: string
  media?: MediaAsset
  themeAccent: string
  icon: string
  focusNote?: string
  status: ProjectStatus
  featured?: boolean
}

export interface ExperienceItem extends CardThemeConfig {
  role: string
  company: string
  period: string
  location: string
  highlights: TextContent[]
  tools: SkillReference[]
}

export interface SkillGroup extends CardThemeConfig {
  label: string
  icon: string
  items: SkillReference[]
  proficiency?: TextContent
  accentVariant?: AccentVariant
}

export interface KnowledgeCategory extends CardThemeConfig {
  label: string
  icon: string
  summary: TextContent
  items: SkillReference[]
  accentVariant?: AccentVariant
}

export interface TechnicalKnowledgeData {
  eyebrow: string
  title: TextContent
  description: TextContent
  categories: KnowledgeCategory[]
}

export interface CoreTechnologyItem extends CardThemeConfig {
  label: string
  icon: string
  summary: TextContent
  emphasis: string
  tags: string[]
  skillSlug?: string
}

export interface CoreTechnologiesData {
  eyebrow: string
  title: TextContent
  description: TextContent
  items: CoreTechnologyItem[]
}

export type CodeTokenTone = 'plain' | 'keyword' | 'class' | 'string' | 'comment' | 'accent'

export interface CodeToken {
  text: string
  tone?: CodeTokenTone
}

export interface CodeLine {
  indent?: number
  tokens: CodeToken[]
}

export interface CodeSample extends CardThemeConfig {
  id: string
  title: string
  language: string
  caption: string
  lines: CodeLine[]
}

export interface SkillRouteItem {
  slug: string
  label: string
  icon: string
  routeTitle: string
  placeholderSummary: TextContent
  placeholderState: PlaceholderState
  heroNote: TextContent
  tags: string[]
}

export interface EducationData {
  eyebrow: string
  title: TextContent
  description: TextContent
  school: string
  degree: string
  period: string
  location: string
  gpa: string
  summary: TextContent
  image: MediaAsset
}

export interface ContactData {
  eyebrow: string
  title: TextContent
  description: TextContent
  supportLine: TextContent
  primaryCta: LinkItem
  secondaryCta: LinkItem
}

export interface PortfolioData {
  site: SiteData
  hero: HeroData
  summary: SummaryData
  experience: ExperienceItem[]
  skills: SkillGroup[]
  coreTechnologies: CoreTechnologiesData
  technicalKnowledge: TechnicalKnowledgeData
  codeSamples: CodeSample[]
  skillRoutes: SkillRouteItem[]
  projects: ProjectItem[]
  education: EducationData
  contact: ContactData
}

export interface PortfolioSectionProps {
  data: PortfolioData
}

export interface SectionDefinition {
  id: string
  label: string
  preloadOffset: string
  placeholderClassName: string
  themeTone: SectionTone
  navVisible: boolean
  eager?: boolean
  component?: ComponentType<PortfolioSectionProps>
  loader?: () => Promise<{ default: ComponentType<PortfolioSectionProps> }>
}
