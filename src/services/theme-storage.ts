/**
 * Theme persistence in localStorage. Framework-agnostic.
 */
import { siteConfig } from '@/data/site-config'

const STORAGE_KEY = 'nafieSavedTheme'

export type ThemeOption = (typeof siteConfig.themeOptions)[number]

export function getStoredTheme(): ThemeOption {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && siteConfig.themeOptions.includes(stored as ThemeOption)) {
    return stored as ThemeOption
  }
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark_theme'
  }
  return 'light_theme'
}

export function setStoredTheme(theme: ThemeOption): void {
  localStorage.setItem(STORAGE_KEY, theme)
}
