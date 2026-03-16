<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="logo" title="Parag">
            <h1><a href="/">Parag</a></h1>
          </div>
        </div>
        <div class="col-lg-6">&copy; {{ copyrightDate }} Parag Saxena</div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { siteConfig } from '@/data/site-config'

const copyrightDate = computed(() => {
  const years = new Date(new Date().getTime() - new Date(String(siteConfig.copyrightStartDate)).getTime()).getFullYear() - 1970
  return years === 0
    ? siteConfig.copyrightStartDate
    : `${siteConfig.copyrightStartDate} - ${siteConfig.copyrightStartDate + years}`
})
</script>
