/**
 * Skills and tools - uses asset registry for imgUrl
 */
import { images } from '@/assets'

export const skillsItems = [
  { imgUrl: images.skills.angular, title: 'Angular' },
  { imgUrl: images.skills.javascript, title: 'JavaScript' },
  { imgUrl: images.skills.html5, title: 'HTML5' },
  { imgUrl: images.skills.css3, title: 'CSS3' },
  { imgUrl: images.skills.typescript, title: 'TypeScript' },
  { imgUrl: images.skills.bootstrap, title: 'Bootstrap' },
  { imgUrl: images.skills.react, title: 'React' },
  { imgUrl: images.skills.sass, title: 'SASS' }
] as const

export const toolsItems = [
  { imgUrl: images.tools.git, title: 'Git & Github' },
  { imgUrl: images.tools.npm, title: 'NPM' },
  { imgUrl: images.tools.command, title: 'Command Line' },
  { imgUrl: images.tools.vsCode, title: 'VS Code' },
  
] as const
