<template>
  <div class="circle-cursor circle-cursor-outer" ref="circleCursorOuterRef"></div>
  <div class="circle-cursor circle-cursor-inner" ref="circleCursorInnerRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{ appEl: HTMLElement | null }>()
const circleCursorOuterRef = ref<HTMLElement | null>(null)
const circleCursorInnerRef = ref<HTMLElement | null>(null)

function setupCursor(app: HTMLElement) {
  const outer = circleCursorOuterRef.value
  const inner = circleCursorInnerRef.value
  if (!app || !outer || !inner) return

  app.addEventListener('mousemove', (e: MouseEvent) => {
    outer.style.left = e.clientX + 'px'
    outer.style.top = e.clientY + 'px'
    inner.style.left = e.clientX + 'px'
    inner.style.top = e.clientY + 'px'
  })
  app.addEventListener('mouseenter', () => {
    outer.classList.add('cursor-visible')
    inner.classList.add('cursor-visible')
  })
  app.addEventListener('mouseleave', () => {
    outer.classList.remove('cursor-visible')
    inner.classList.remove('cursor-visible')
  })
  app.addEventListener('click', () => {
    inner.classList.add('cursor-click-effect')
    setTimeout(() => inner.classList.remove('cursor-click-effect'), 200)
  })
}

onMounted(() => {
  if (props.appEl) setupCursor(props.appEl)
})
watch(() => props.appEl, (el) => {
  if (el) setupCursor(el)
})
</script>
