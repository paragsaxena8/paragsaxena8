import { ref, onMounted } from 'vue'
import { getStoredTheme, setStoredTheme, type ThemeOption } from '@/services/theme-storage'
import { siteConfig } from '@/data/site-config'

export function useTheme() {
  const savedTheme = ref<ThemeOption>(getStoredTheme())

  function getAppTheme() {
    const theme = getStoredTheme()
    savedTheme.value = theme
    setStoredTheme(theme)
  }

  function changeAppTheme() {
    const currentIndex = siteConfig.themeOptions.indexOf(savedTheme.value!)
    const nextIndex = (currentIndex + 1) % siteConfig.themeOptions.length
    const next = siteConfig.themeOptions[nextIndex]
    savedTheme.value = next
    setStoredTheme(next)
  }

  onMounted(() => {
    getAppTheme()
  })

  return { savedTheme, getAppTheme, changeAppTheme }
}
