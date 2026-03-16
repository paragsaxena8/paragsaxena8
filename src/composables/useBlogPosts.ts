import { ref, onMounted } from 'vue'
import { fetchBlogPosts, type BlogPost } from '@/services/blog-api'
import { images } from '@/assets'

export function useBlogPosts() {
  const blogPosts = ref<BlogPost[]>([])
  const blogPostCount = ref(0)
  const blogError = ref<string | null>(null)

  async function loadBlogPosts() {
    try {
      const posts = await fetchBlogPosts()
      blogPosts.value = posts
      blogPostCount.value = posts.length
    } catch (err) {
      blogError.value = 'Could not load posts.'
      blogPostCount.value = 0
      console.error(err)
    }
  }

  onMounted(loadBlogPosts)

  return { blogPosts, blogPostCount, blogError, defaultBlogImage: images.testimonials.anonymousUser }
}
