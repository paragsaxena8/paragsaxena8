<template>
  <button
    class="scroll-to-top"
    ref="scrollTopBtnRef"
    title="Back To Top"
    data-show-at="50"
    @click="scrollToTop"
  >
    <svg width="100%" height="100%" viewBox="-1 -1 102 102">
      <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useScroll } from '@/composables/useScroll'

const { scrollToTop } = useScroll()
const scrollTopBtnRef = ref<HTMLElement | null>(null)

defineExpose({ scrollTopBtnRef })
</script>
