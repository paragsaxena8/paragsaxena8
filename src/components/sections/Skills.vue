<template>
  <div id="skills" class="skills-section section" tabindex="-1">
    <div class="container">
      <div class="section-content split">
        <div class="skills-text text-pane">
          <div class="text-box-inline">
            <span class="subtitle">my skills</span>
            <h2>What My Programming<br />Skills Included?</h2>
            <p>
              I develop a simple, intuitive, and responsive user interface that helps users get things
              done with less effort and time with those technologies.
            </p>
            <div ref="skillsSwitchBtnRef" class="toggle-switch-btn">
              <input id="skills-list" type="radio" value="skills" v-model="skillsType" />
              <label for="skills-list" class="link-hover">Skills</label>
              <input id="tools-list" type="radio" value="tools" v-model="skillsType" />
              <label for="tools-list" class="link-hover">Tools</label>
              <span class="switcher-toggle" :style="switcherStyle"></span>
            </div>
          </div>
        </div>
        <div class="skills-items media-pane">
          <ul v-staggerdelay="50" v-show="skillsType === 'skills'">
            <li
              tabindex="0"
              v-for="skill in skillsItems"
              :key="skill.title"
              v-tooltip="{ text: skill.title, dir: 'top' }"
            >
              <div class="skill-icon">
                <img :src="skill.imgUrl" :alt="skill.title" />
              </div>
            </li>
          </ul>
          <ul v-staggerdelay="50" v-show="skillsType === 'tools'">
            <li
              tabindex="0"
              v-for="tool in toolsItems"
              :key="tool.title"
              v-tooltip="{ text: tool.title, dir: 'top' }"
            >
              <div class="skill-icon">
                <img :src="tool.imgUrl" :alt="tool.title" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { skillsItems, toolsItems } from '@/data/skills'

const skillsType = ref('skills')
const skillsSwitchBtnRef = ref<HTMLElement | null>(null)

const switcherStyle = computed(() => ({
  width: 'calc((100% - 8px) / 2)',
}))

onMounted(() => {
  const btn = skillsSwitchBtnRef.value
  if (btn) {
    const input = btn.querySelector('input')
    if (input) skillsType.value = input.value
  }
})
</script>
