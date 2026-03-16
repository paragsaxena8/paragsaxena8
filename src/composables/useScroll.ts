import { ref, onMounted, onUnmounted } from 'vue'
import { siteConfig } from '@/data/site-config'

export function useScroll() {
  const isHeaderBig = ref(true)
  const isHeaderHidden = ref(false)
  const lastScrollPosition = ref(0)

  function scrollingOptions() {
    const scrollPosition = window.pageYOffset
    isHeaderBig.value = scrollPosition < siteConfig.startMinimizingHeaderAt
    isHeaderHidden.value =
      scrollPosition > 100 && scrollPosition > lastScrollPosition.value
    lastScrollPosition.value = scrollPosition
  }

  function scrollToTop() {
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  function setupScrollListener() {
    scrollingOptions()
    document.addEventListener('scroll', scrollingOptions)
  }

  onMounted(setupScrollListener)
  onUnmounted(() => document.removeEventListener('scroll', scrollingOptions))

  return { isHeaderBig, isHeaderHidden, scrollingOptions, scrollToTop }
}
