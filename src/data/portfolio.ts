/**
 * Portfolio items - uses asset registry for imgUrl
 */
import { images } from '@/assets'

export const filters = ['All', 'HTML', 'Angular'] as const

export interface PortfolioItem {
  id: number
  url: string
  imgUrl: string
  title: { en: string }
  date: { en: string }
  desc: { en: string }
  category: string
  tools: string[]
  screenshots: Record<string, unknown>
  show: boolean
}

export const allPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    url: 'https://github.com/paragsaxena8/closet-keeper',
    imgUrl: images.portfolio.p3,
    title: { en: 'Closet Keeper' },
    date: { en: 'July 2024' },
    desc: {
      en: "Closet Keeper is a open-source, easy-to-use app that helps you organize your closet and keep track of your clothes. You can add, categorize, and make notes on items, making it easier to plan outfits and get dressed efficiently.",
    },
    category: 'Dashboard',
    tools: ['HTML', 'CSS', 'JavaScript', 'React'],
    screenshots: {},
    show: true,
  },
  {
    id: 2,
    url: 'https://www.behance.net/gallery/175372191/UIUX-Design',
    imgUrl: images.portfolio.p7,
    title: { en: 'UI/UX Design' },
    date: { en: 'May 2023' },
    desc: { en: 'A Job recuritment portal based on UK' },
    category: 'UX',
    tools: ['UX', 'Adobe XD'],
    screenshots: {},
    show: false,
  },
  {
    id: 3,
    url: 'https://github.com/paragsaxena8/smart-space-ui',
    imgUrl: images.portfolio.p5,
    title: { en: 'Smart Space' },
    date: { en: 'April 2022' },
    desc: {
      en: 'A Web Application where you can create Blogs, Share Ideas and connect with like-minded people.',
    },
    category: 'Dashboard',
    tools: ['HTML', 'CSS', 'JavaScript', 'Angular'],
    screenshots: {},
    show: true,
  },
  {
    id: 4,
    url: 'https://paragsaxena8.github.io/coVaccinate/',
    imgUrl: images.portfolio.p3,
    title: { en: 'Co-Vaccinate' },
    date: { en: 'Jan 2021' },
    desc: {
      en: "A Covid-19 Vaccination slot searching Application using Angular and Cowin API's.",
    },
    category: 'Tools',
    tools: ['HTML', 'CSS', 'JavaScript', 'Angular'],
    screenshots: {},
    show: true,
  },
  {
    id: 5,
    url: 'https://github.com/paragsaxena8/Rakshak',
    imgUrl: images.portfolio.p4,
    title: { en: 'Rakshak - A Web App Vulnerability Testing Tool' },
    date: { en: 'September 2020' },
    desc: {
      en: 'Built a PHP- and Python-powered web application for an OWASP vulnerability testing tool, complete with a Web CLI interface for executing security checks.',
    },
    category: 'Security',
    tools: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Python'],
    screenshots: {},
    show: true,
  },
  {
    id: 6,
    url: 'https://mahamudrafarms.com',
    imgUrl: images.portfolio.p1,
    title: { en: 'MahaMudra Farms' },
    date: { en: 'Nov 2018' },
    desc: {
      en: "Built a PHP and HTML–based web application for MahaMudra Farms, supporting their organic farming operations.",
    },
    category: 'Portfolio',
    tools: ['HTML', 'CSS', 'PHP'],
    screenshots: {},
    show: true,
  },
]
