<template>
  <div id="portfolio" class="portfolio-section section" tabindex="-1">
    <div class="container">
      <div class="section-content">
        <ul class="portfolio-items has-works" ref="portfolioItemsRef" data-no-works-msg="No works to load">
          <li>
            <div class="text-box-inline">
              <span class="subtitle">my works</span>
              <h2>See My Works Which<br />Will Amaze You!</h2>
              <p>
                I develop the best quality website that serves for the long term. Well-documented,
                clean, easy and the elegant interface helps non-technical clients.
              </p>
            </div>
          </li>
          <template v-for="work in filteredPortfolioItems" :key="work.title.en">
            <li class="portfolio-item">
              <div class="item-details">
                <h3 class="title">{{ work.title.en }}</h3>
                <div class="date">{{ work.date.en }}</div>
                <p class="description" v-if="work.desc">{{ work.desc.en }}</p>
                <div class="meta-info">
                  <span class="category" v-if="work.category">{{ work.category }}</span>
                  <div class="tools" v-if="work.tools?.length">
                    <span v-for="tool in work.tools" :key="tool" class="tool-tag">{{ tool }}</span>
                  </div>
                  <div class="actions">
                    <a class="visit-btn" :href="work.url" target="_blank" rel="noopener">Visit</a>
                  </div>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { allPortfolioItems } from '@/data/portfolio'
import { siteConfig } from '@/data/site-config'
import VanillaTilt from 'vanilla-tilt'

const portfolioItemsRef = ref<HTMLElement | null>(null)
const portfolioItemsPage = ref(3)
const currentFilter = ref('All')

const filteredPortfolioItems = computed(() => {
  const items = allPortfolioItems.filter((item) => {
    if (!item.show) return false
    const urlParams = new URLSearchParams(window.location.search)
    const tax = urlParams.get('tax')
    if (tax === 'cat') {
      const cat = urlParams.get('cat')
      return item.category === cat
    }
    if (tax === 'tools') {
      const tool = urlParams.get('tools')
      return item.tools.includes(tool || '')
    }
    return currentFilter.value === 'All' || item.category === currentFilter.value
  })
  const start = 0
  const end = portfolioItemsPage.value * siteConfig.itemsPerPage
  return items.slice(start, end)
})

function initializeTilt() {
  const container = portfolioItemsRef.value
  if (!container) return
  VanillaTilt.init([...container.querySelectorAll<HTMLElement>('.portfolio-item')], {
    max: 8,
    speed: 400,
    glare: true,
    'max-glare': 0.3,
  })
}

onMounted(() => {
  initializeTilt()
})
watch(filteredPortfolioItems, () => {
  if (portfolioItemsPage.value > 1) initializeTilt()
})

defineExpose({ portfolioItemsRef })
</script>
