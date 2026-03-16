<template>
  <div
    id="hero"
    class="hero-section hide-in-preloading"
    data-paneffect="true"
    ref="heroSectionRef"
  >
    <div class="hero-img">
      <div class="layer" v-clone>
        <img :src="images.hero" loading="lazy" alt="hero_image" />
      </div>
    </div>
    <div class="hero-text">
      <h2>PARAG<br />SAXENA</h2>
      <a href="#contact" class="btn">Get In Touch</a>
    </div>
    <div class="social">
      <ul>
        <li v-for="social in socialAccounts" :key="social.link">
          <a
            :href="social.link"
            target="_blank"
            rel="noreferrer"
            v-tooltip="{ text: social.title, dir: 'right' }"
          >
            <i :class="social.icon" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="scroll-down">
      <a href="#about" title="Scroll Down">Scroll</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { images } from '@/assets'
import { socialAccounts } from '@/data/social'

const heroSectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const parent = heroSectionRef.value
  if (!parent || !parent.getAttribute('data-paneffect')) return
  const layers = parent.querySelectorAll('.layer')
  const layer1 = layers[0]
  const layer2 = layers[1]
  parent.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = parent.getBoundingClientRect()
    const x = ((e.x - rect.x) / parent.offsetWidth) * 100
    const y = ((e.y - rect.y) / parent.offsetHeight) * 100
    parent.classList.add('parallax-animation')
    layer1?.setAttribute('style', `transform-origin: ${x}vw ${y}vh;`)
    layer2?.setAttribute('style', `transform-origin: ${x}vw ${y}vh;`)
  })
})

defineExpose({ heroSectionRef })
</script>
