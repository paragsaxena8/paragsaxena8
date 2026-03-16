<template>
  <div id="about" class="about-section section" tabindex="-1" ref="aboutSectionRef">
    <div class="container">
      <div class="section-content split">
        <div class="about-img media-pane">
          <div class="layer" v-clone>
            <img :src="images.about" loading="lazy" alt="about_parag" />
          </div>
        </div>
        <div class="about-text text-pane">
          <div class="text-box-inline">
            <span class="subtitle">about me</span>
            <h2>Need a Creative Product?<br />I can Help You!</h2>
            <p v-html="aboutText"></p>
            <div class="btns-container">
              <a
                download
                :href="siteConfig.cvUrl"
                class="btn btn-outline-light"
                target="_blank"
                rel="noopener"
                >Download CV</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { images } from '@/assets'
import { siteConfig } from '@/data/site-config'
import { getAboutText } from '@/data/about'

const aboutSectionRef = ref<HTMLElement | null>(null)
const aboutText = getAboutText()

defineExpose({ aboutSectionRef })
</script>
