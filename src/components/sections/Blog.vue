<template>
  <div id="blogs" class="portfolio-section section" tabindex="-1">
    <div class="container">
      <div class="section-content">
        <ul class="portfolio-items has-works" id="blogpost">
          <li>
            <div class="text-box-inline">
              <span class="subtitle">my blogs</span>
              <h2>My Blogs</h2>
              <p>
                I occasionally write blogs about technology, productivity, or any topic which found
                fascinating to me 😀
              </p>
            </div>
          </li>
          <li
            v-for="post in blogPosts"
            :key="post.link"
            class="portfolio-item"
          >
            <div class="item-img">
              <img
                class="portfolio-img"
                loading="lazy"
                :src="post.image"
                :alt="post.title"
                @error="($event.target as HTMLImageElement).src = defaultBlogImage"
              />
            </div>
            <div class="item-details">
              <h3 class="title">{{ post.title }}</h3>
              <div class="date">{{ post.date }}</div>
              <p class="description">{{ post.description }}</p>
              <div class="meta-info">
                <div v-if="post.categories?.length" class="tools">
                  <span v-for="cat in post.categories" :key="cat" class="tool-tag">{{ cat }}</span>
                </div>
                <div class="actions">
                  <a class="visit-btn" :href="post.link" target="_blank" rel="noopener">Visit</a>
                </div>
              </div>
            </div>
          </li>
          <li v-if="blogError" style="grid-column: 1 / -1; text-align: center; padding: 2rem">
            <p>{{ blogError }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBlogPosts } from '@/composables/useBlogPosts'

const { blogPosts, blogError, defaultBlogImage } = useBlogPosts()
</script>
