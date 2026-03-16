<template>
  <div id="statistics" class="statistics-section section">
    <div class="section-content">
      <div class="container">
        <ul class="statistics-items stats-grid">
          <li>
            <a href="#experience">
              <div class="icon">
                <img :src="images.icons.emblem" alt="Years of Experience" />
              </div>
              <div class="text">
                <h3>{{ experienceYears }}+</h3>
                <strong>Years of Experience</strong>
              </div>
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="#portfolio">
              <div class="icon">
                <img :src="images.icons.checkMark" alt="Completed Projects" />
              </div>
              <div class="text">
                <h3>{{ completedProjects }}+</h3>
                <strong>Completed Projects</strong>
              </div>
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="#blogs">
              <div class="icon">
                <img :src="images.icons.happy" alt="Blogs Written" />
              </div>
              <div class="text">
                <h3 id="postCount">{{ blogPostCount }}+</h3>
                <strong>Blogs Written</strong>
              </div>
              <i class="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { images } from '@/assets'
import { siteConfig } from '@/data/site-config'
import { allPortfolioItems } from '@/data/portfolio'
import { useBlogPosts } from '@/composables/useBlogPosts'

const experienceYears = computed(
  () =>
    new Date(
      new Date().getTime() - new Date(String(siteConfig.careerStartDate)).getTime()
    ).getFullYear() - 1970
)
const completedProjects = computed(
  () => allPortfolioItems.filter((i) => i.show).length
)
const { blogPostCount } = useBlogPosts()
</script>
