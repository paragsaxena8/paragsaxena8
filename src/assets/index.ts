/**
 * Central asset registry - single source of truth for all asset paths.
 * Import from '@/assets' throughout the app.
 */

import mainImg from './images/main.avif'
import aboutImg from './images/about.avif'
import blobShape from './images/blob-shape.png'

import emblem from './images/icons/emblem.png'
import checkMark from './images/icons/check-mark.png'
import happy from './images/icons/happy.png'
import phone from './images/icons/phone.png'
import email from './images/icons/email.png'
import address from './images/icons/address.png'

import angular from './images/skills/angular.png'
import javascript from './images/skills/javascript.png'
import html5 from './images/skills/html5.png'
import css3 from './images/skills/css3.png'
import typescript from './images/skills/typescript.png'
import bootstrap from './images/skills/bootstrap.png'
import react from './images/skills/react.png'
import sass from './images/skills/sass.png'

import git from './images/tools/git.png'
import npm from './images/tools/npm.png'
import command from './images/tools/command.png'
import vsCode from './images/tools/vs-code.png'
import adobeXd from './images/tools/adobe-xd.png'

import portfolio1 from './images/portfolio/1.avif'
import portfolio3 from './images/portfolio/3.avif'
import portfolio4 from './images/portfolio/4.avif'
import portfolio5 from './images/portfolio/5.avif'
import portfolio7 from './images/portfolio/7.avif'

import anonymousUser from './images/testimonials/anonymous-user.png'

export const images = {
  hero: mainImg,
  about: aboutImg,
  blobShape,
  icons: {
    emblem,
    checkMark,
    happy,
    phone,
    email,
    address,
  },
  skills: {
    angular,
    javascript,
    html5,
    css3,
    typescript,
    bootstrap,
    react,
    sass,
  },
  tools: {
    git,
    npm,
    command,
    vsCode,
    adobeXd,
  },
  portfolio: {
    p1: portfolio1,
    p3: portfolio3,
    p4: portfolio4,
    p5: portfolio5,
    p7: portfolio7,
  },
  testimonials: {
    anonymousUser,
  },
} as const
