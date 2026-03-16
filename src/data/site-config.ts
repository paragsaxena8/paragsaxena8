/**
 * Site configuration - framework-agnostic
 */
const mediumUsername = '@paragxd'
const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://medium.com/feed/${mediumUsername}`)}`

export const siteConfig = {
  careerStartDate: 2020,
  copyrightStartDate: 2020,
  themeOptions: ['light_theme', 'dark_theme'] as const,
  appTheme: 'dark_theme' as const,
  formspreeEndpoint: 'https://formspree.io/f/xnqknazp',
  /** Direct rss2json URL - used with Vite proxy in dev */
  blogRssUrl: rss2jsonUrl,
  /** In production, use CORS proxy to avoid cross-origin blocking */
  blogRssUrlProxied: `https://corsproxy.io/?${encodeURIComponent(rss2jsonUrl)}`,
  mediumUsername,
  gtagId: 'G-W8DCS6Y2GN',
  cvUrl: 'https://drive.google.com/file/d/1B6FAy_WWhEMWdxaylo3wGNlE69DyGReu/view?usp=sharing',
  itemsPerPage: 6,
  startMinimizingHeaderAt: 100,
} as const
