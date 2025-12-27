export type ThemeName = 'default' | 'stone'

export interface ThemeColors {
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  border: string
  input: string
  ring: string
  chart1: string
  chart2: string
  chart3: string
  chart4: string
  chart5: string
  sidebar: string
  sidebarForeground: string
  sidebarPrimary: string
  sidebarPrimaryForeground: string
  sidebarAccent: string
  sidebarAccentForeground: string
  sidebarBorder: string
  sidebarRing: string
}

export const themes: Record<ThemeName, { light: ThemeColors; dark: ThemeColors }> = {
  default: {
    light: {
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.147 0.004 49.25)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.147 0.004 49.25)',
      popover: 'oklch(0.12 0 0)',
      popoverForeground: 'oklch(0.985 0.001 106.423)',
      primary: 'oklch(0.216 0.006 56.043)',
      primaryForeground: 'oklch(0.985 0.001 106.423)',
      secondary: 'oklch(0.97 0.001 106.424)',
      secondaryForeground: 'oklch(0.216 0.006 56.043)',
      muted: 'oklch(0.97 0.001 106.424)',
      mutedForeground: 'oklch(0.553 0.013 58.071)',
      accent: 'oklch(0.97 0.001 106.424)',
      accentForeground: 'oklch(0.216 0.006 56.043)',
      destructive: 'oklch(0.577 0.245 27.325)',
      border: 'oklch(0.923 0.003 48.717)',
      input: 'oklch(0.923 0.003 48.717)',
      ring: 'oklch(0.709 0.01 56.259)',
      chart1: 'oklch(0.646 0.222 41.116)',
      chart2: 'oklch(0.6 0.118 184.704)',
      chart3: 'oklch(0.398 0.07 227.392)',
      chart4: 'oklch(0.828 0.189 84.429)',
      chart5: 'oklch(0.769 0.188 70.08)',
      sidebar: 'oklch(0.985 0.001 106.423)',
      sidebarForeground: 'oklch(0.147 0.004 49.25)',
      sidebarPrimary: 'oklch(0.216 0.006 56.043)',
      sidebarPrimaryForeground: 'oklch(0.985 0.001 106.423)',
      sidebarAccent: 'oklch(0.97 0.001 106.424)',
      sidebarAccentForeground: 'oklch(0.216 0.006 56.043)',
      sidebarBorder: 'oklch(0.923 0.003 48.717)',
      sidebarRing: 'oklch(0.709 0.01 56.259)',
    },
    dark: {
      background: 'oklch(0 0 0)',
      foreground: 'oklch(0.985 0.001 106.423)',
      card: 'oklch(0.12 0 0)',
      cardForeground: 'oklch(0.985 0.001 106.423)',
      popover: 'oklch(0.12 0 0)',
      popoverForeground: 'oklch(0.985 0.001 106.423)',
      primary: 'oklch(0.985 0.001 106.423)',
      primaryForeground: 'oklch(0 0 0)',
      secondary: 'oklch(0.15 0 0)',
      secondaryForeground: 'oklch(0.985 0.001 106.423)',
      muted: 'oklch(0.15 0 0)',
      mutedForeground: 'oklch(0.5 0 0)',
      accent: 'oklch(0.15 0 0)',
      accentForeground: 'oklch(0.985 0.001 106.423)',
      destructive: 'oklch(0.704 0.191 22.216)',
      border: 'oklch(1 0 0 / 10%)',
      input: 'oklch(1 0 0 / 8%)',
      ring: 'oklch(0.5 0 0)',
      chart1: 'oklch(0.488 0.243 264.376)',
      chart2: 'oklch(0.696 0.17 162.48)',
      chart3: 'oklch(0.769 0.188 70.08)',
      chart4: 'oklch(0.627 0.265 303.9)',
      chart5: 'oklch(0.645 0.246 16.439)',
      sidebar: 'oklch(0 0 0)',
      sidebarForeground: 'oklch(0.985 0.001 106.423)',
      sidebarPrimary: 'oklch(0.488 0.243 264.376)',
      sidebarPrimaryForeground: 'oklch(0.985 0.001 106.423)',
      sidebarAccent: 'oklch(0.15 0 0)',
      sidebarAccentForeground: 'oklch(0.985 0.001 106.423)',
      sidebarBorder: 'oklch(1 0 0 / 10%)',
      sidebarRing: 'oklch(0.5 0 0)',
    },
  },
  stone: {
    light: {
      background: 'oklch(0.97 0.002 70)',
      foreground: 'oklch(0.25 0.003 70)',
      card: 'oklch(0.95 0.002 70)',
      cardForeground: 'oklch(0.25 0.003 70)',
      popover: 'oklch(0.93 0.002 70)',
      popoverForeground: 'oklch(0.15 0.002 70)',
      primary: 'oklch(0.40 0.005 70)',
      primaryForeground: 'oklch(0.97 0.002 70)',
      secondary: 'oklch(0.86 0.002 70)',
      secondaryForeground: 'oklch(0.40 0.005 70)',
      muted: 'oklch(0.86 0.002 70)',
      mutedForeground: 'oklch(0.50 0.003 70)',
      accent: 'oklch(0.86 0.002 70)',
      accentForeground: 'oklch(0.40 0.005 70)',
      destructive: 'oklch(0.577 0.245 27.325)',
      border: 'oklch(0.88 0.002 70)',
      input: 'oklch(0.88 0.002 70)',
      ring: 'oklch(0.58 0.005 70)',
      chart1: 'oklch(0.646 0.222 41.116)',
      chart2: 'oklch(0.6 0.118 184.704)',
      chart3: 'oklch(0.398 0.07 227.392)',
      chart4: 'oklch(0.828 0.189 84.429)',
      chart5: 'oklch(0.769 0.188 70.08)',
      sidebar: 'oklch(0.96 0.002 70)',
      sidebarForeground: 'oklch(0.25 0.003 70)',
      sidebarPrimary: 'oklch(0.40 0.005 70)',
      sidebarPrimaryForeground: 'oklch(0.97 0.002 70)',
      sidebarAccent: 'oklch(0.86 0.002 70)',
      sidebarAccentForeground: 'oklch(0.40 0.005 70)',
      sidebarBorder: 'oklch(0.88 0.002 70)',
      sidebarRing: 'oklch(0.58 0.005 70)',
    },
    dark: {
      background: 'oklch(0.23 0.003 70)',
      foreground: 'oklch(0.92 0.002 70)',
      card: 'oklch(0.30 0.003 70)',
      cardForeground: 'oklch(0.92 0.002 70)',
      popover: 'oklch(0.25 0.004 70)',
      popoverForeground: 'oklch(0.92 0.002 70)',
      primary: 'oklch(0.80 0.005 70)',
      primaryForeground: 'oklch(0.23 0.003 70)',
      secondary: 'oklch(0.28 0.002 70)',
      secondaryForeground: 'oklch(0.92 0.002 70)',
      muted: 'oklch(0.28 0.002 70)',
      mutedForeground: 'oklch(0.52 0.002 70)',
      accent: 'oklch(0.28 0.002 70)',
      accentForeground: 'oklch(0.92 0.002 70)',
      destructive: 'oklch(0.704 0.191 22.216)',
      border: 'oklch(0.92 0.002 70 / 15%)',
      input: 'oklch(0.92 0.002 70 / 10%)',
      ring: 'oklch(0.52 0.002 70)',
      chart1: 'oklch(0.488 0.243 264.376)',
      chart2: 'oklch(0.696 0.17 162.48)',
      chart3: 'oklch(0.769 0.188 70.08)',
      chart4: 'oklch(0.627 0.265 303.9)',
      chart5: 'oklch(0.645 0.246 16.439)',
      sidebar: 'oklch(0.23 0.003 70)',
      sidebarForeground: 'oklch(0.92 0.002 70)',
      sidebarPrimary: 'oklch(0.488 0.243 264.376)',
      sidebarPrimaryForeground: 'oklch(0.92 0.002 70)',
      sidebarAccent: 'oklch(0.28 0.002 70)',
      sidebarAccentForeground: 'oklch(0.92 0.002 70)',
      sidebarBorder: 'oklch(0.92 0.002 70 / 15%)',
      sidebarRing: 'oklch(0.52 0.002 70)',
    },
  },
}

export function getThemeName(): ThemeName {
  const envTheme = import.meta.env.VITE_THEME as ThemeName | undefined
  if (envTheme && themes[envTheme]) {
    return envTheme
  }
  return 'default'
}

export function applyTheme(themeName: ThemeName, mode: 'light' | 'dark') {
  const colors = themes[themeName][mode]
  const root = document.documentElement

  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase()
    root.style.setProperty(cssVar, value)
  })
}
