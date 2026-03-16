<template>
  <div
    id="app-inner"
    ref="appRef"
    :class="[savedTheme, { 'enable-focus-style': isAnyFocus }]"
    @click="isAnyFocus = false"
    @keyup.tab="isAnyFocus = true"
  >
    <CircleCursor v-if="showCircleCursor" :app-el="appRef" />
    <Preloader ref="preloaderRef" />
    <Header />
    <Hero />
    <Statistics />
    <About ref="aboutRef" />
    <Skills />
    <Experience ref="experienceRef" />
    <Portfolio ref="portfolioRef" />
    <Blog />
    <Contact ref="contactRef" />
    <Footer />
    <ScrollToTop ref="scrollTopRef" />
    <ToastNotifications ref="toastRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, provide } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useAnimations, type AnimationRefs } from '@/composables/useAnimations'
import Preloader from '@/components/layout/Preloader.vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Hero from '@/components/sections/Hero.vue'
import Statistics from '@/components/sections/Statistics.vue'
import About from '@/components/sections/About.vue'
import Skills from '@/components/sections/Skills.vue'
import Experience from '@/components/sections/Experience.vue'
import Portfolio from '@/components/sections/Portfolio.vue'
import Blog from '@/components/sections/Blog.vue'
import Contact from '@/components/sections/Contact.vue'
import ScrollToTop from '@/components/ui/ScrollToTop.vue'
import ToastNotifications from '@/components/ui/ToastNotifications.vue'
import CircleCursor from '@/components/ui/CircleCursor.vue'
import GLightbox from 'glightbox'
import { createPopper } from '@popperjs/core'

const { savedTheme } = useTheme()
const { setupAnimations } = useAnimations()

const isAnyFocus = ref(false)
const appRef = ref<HTMLElement | null>(null)
const preloaderRef = ref<InstanceType<typeof Preloader> | null>(null)
const aboutRef = ref<InstanceType<typeof About> | null>(null)
const experienceRef = ref<InstanceType<typeof Experience> | null>(null)
const contactRef = ref<InstanceType<typeof Contact> | null>(null)
const scrollTopRef = ref<InstanceType<typeof ScrollToTop> | null>(null)
const toastRef = ref<InstanceType<typeof ToastNotifications> | null>(null)

const showCircleCursor = computed(() => typeof window !== 'undefined' && window.innerWidth >= 992)

provide(
  'setNotify',
  (opts: { id?: string; className: string; msg: string; time?: number }) => {
    toastRef.value?.setNotify(opts)
  }
)
provide('dismissNotify', (id: string) => {
  toastRef.value?.dismissNotify(id)
})

onMounted(() => {
  const preloaderEl = preloaderRef.value?.$el
  setupAnimations({
    preloader: preloaderEl ?? null,
    scrollTopBtn: scrollTopRef.value?.$el ?? null,
    aboutSection: aboutRef.value?.$el ?? null,
    experienceTimepath: experienceRef.value?.$el?.querySelector('.timepath') ?? null,
    contactForm: contactRef.value?.$el?.querySelector('form') ?? null,
  } as AnimationRefs)

  document.querySelectorAll('.has-ultimate-tooltip').forEach((el) => {
    const tip = el.querySelector('.ultimate-tooltip')
    if (tip) {
      createPopper(el as HTMLElement, tip as HTMLElement, {
        placement: 'top',
        modifiers: [{ name: 'offset', options: { offset: [0, 30] } }],
      })
    }
  })

  GLightbox({ autoplayVideos: false })
})
</script>
