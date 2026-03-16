<template>
  <div id="experience" class="experience-section section" tabindex="-1">
    <div class="container">
      <div class="section-content split reverse">
        <div class="experience-timeline media-pane">
          <div class="timepath" ref="experienceTimepathRef">
            <span class="line"></span>
            <template v-for="line in experienceChunks" :key="line">
              <span class="semicircle"></span>
              <span class="line"></span>
            </template>
          </div>
          <ul class="timeline-items">
            <li
              class="has-ultimate-tooltip"
              tabindex="0"
              v-for="item in experienceItems"
              :key="item.date + item.companyName.en"
            >
              <template v-if="Object.keys(item).length > 0">
                <h3>{{ item.date }}</h3>
                <div class="ultimate-tooltip">
                  <h4 class="ultimate-tooltip-title">{{ item.companyName.en }}</h4>
                  <h5 class="ultimate-tooltip-subtitle">{{ item.jobTitle.en }}</h5>
                  [<span class="small ultimate-tooltip-subtitle">{{ item.period }}</span>]
                  <p>{{ item.desc.en }}</p>
                </div>
                <div class="ultimate-tooltip-arrow"></div>
              </template>
            </li>
          </ul>
        </div>
        <div class="experience-text text-pane">
          <div class="text-box-inline">
            <span class="subtitle">experience</span>
            <h2>{{ experienceYears }}+ Years of Experience</h2>
            <p>
              I have been developing websites and apps for {{ experienceYears }} years, and I have a
              deep understanding of the latest trends and directions in modern design. I am a visionary
              software engineer who creates apps that are both functional and user-friendly. I am
              passionate about creating experiences that people enjoy, and I always look for new ways
              to improve the user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { experienceItems } from '@/data/experience'
import { siteConfig } from '@/data/site-config'

const experienceTimepathRef = ref<HTMLElement | null>(null)

const experienceYears = computed(
  () =>
    new Date(
      new Date().getTime() - new Date(String(siteConfig.careerStartDate)).getTime()
    ).getFullYear() - 1970
)

const experienceChunks = computed(
  () => [...Array(Math.floor((experienceItems.length - 1) / 3))]
)

defineExpose({ experienceTimepathRef })
</script>
