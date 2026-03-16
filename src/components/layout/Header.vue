<template>
  <header
    class="hide-in-preloading"
    :class="{
      'big-header': isHeaderBig,
      'small-header': !isHeaderBig,
      'header-hidden': isHeaderHidden,
    }"
  >
    <div class="container container-fluid">
      <div class="logo" title="Parag">
            <h1><a href="/">Parag</a></h1>
          </div>
      <nav :class="{ 'menu-open': isNavMenuOpen }" ref="headerNavRef">
        <ul class="nav-links">
          <li v-for="link in navLinks" :key="link.url">
            <a :href="link.url" @click="closeNavMenu">{{ link.title.en }}</a>
          </li>
        </ul>
      </nav>
      <ul class="options-icons">
        <li class="theme-switcher">
          <button
            :class="savedTheme"
            :data-theme="savedTheme"
            title="Change Mode"
            @click="changeAppTheme"
            :aria-label="`Change theme, current ${savedTheme.split('_').join(' ')}`"
          ></button>
        </li>
        <li class="hamburger-btn" :class="{ open: isNavMenuOpen }">
          <button
            @click="toggleNavMenu"
            title="Toggle Side Menu"
            aria-label="Toggle Side Menu"
            ref="navMenuToggleBtnRef"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { navLinks } from '@/data/nav'
import { useTheme } from '@/composables/useTheme'
import { useScroll } from '@/composables/useScroll'

const { savedTheme, changeAppTheme } = useTheme()
const { isHeaderBig, isHeaderHidden } = useScroll()

const isNavMenuOpen = ref(false)
const headerNavRef = ref<HTMLElement | null>(null)
const navMenuToggleBtnRef = ref<HTMLElement | null>(null)

function toggleNavMenu() {
  isNavMenuOpen.value = !isNavMenuOpen.value
  if (isNavMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.removeAttribute('style')
    navMenuToggleBtnRef.value?.focus()
  }
}

function closeNavMenu() {
  isNavMenuOpen.value = false
  document.body.removeAttribute('style')
  navMenuToggleBtnRef.value?.focus()
}

defineExpose({ headerNavRef })
</script>
