<template>
  <div class="preloader" ref="preloaderRef">
    <div class="preloader-content">
      <div class="logo">
        <h2>Loading...</h2>
      </div>
      <div class="loading-bar">
        <span class="loading-bar-progress"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const preloaderRef = ref<HTMLElement | null>(null)

defineExpose({
  preloaderRef,
})
</script>
