/**
 * Blog API - fetches Medium RSS via rss2json. Framework-agnostic.
 * - Dev: uses Vite proxy (/api/blog) to avoid CORS
 * - Prod: uses CORS proxy (corsproxy.io) for static hosting (e.g. GitHub Pages)
 */
import { siteConfig } from '@/data/site-config'

export interface BlogPost {
  title: string
  link: string
  date: string
  image: string
  description: string
  categories: string[]
}

function getBlogApiUrl(): string {
  return import.meta.env.DEV ? '/api/blog' : siteConfig.blogRssUrlProxied
}

function extractImage(item: { thumbnail?: string; description?: string }): string {
  if (item.thumbnail && item.thumbnail.length > 0) return item.thumbnail
  const doc = new DOMParser().parseFromString(item.description || '', 'text/html')
  const img = doc.querySelector('img')
  return img ? img.src : 'https://via.placeholder.com/400x200?text=Read+on+Medium'
}

function cleanText(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body?.textContent || ''
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const url = getBlogApiUrl()
  const res = await fetch(url)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(
      data.message || `Blog API error: ${res.status} ${res.statusText}`,
    )
  }
  if (data.status !== 'ok') {
    throw new Error(data.message || 'Failed to fetch blog posts')
  }
  if (!Array.isArray(data.items)) {
    throw new Error('Invalid blog API response')
  }
  return data.items.map((item: { title: string; link: string; pubDate: string; thumbnail?: string; description?: string; categories?: string[] }) => ({
    title: item.title,
    link: item.link,
    date: new Date(item.pubDate).toLocaleDateString(),
    image: extractImage(item),
    description: cleanText(item.description || '').substring(0, 120) + '...',
    categories: Array.isArray(item.categories) ? item.categories : [],
  }))
}
