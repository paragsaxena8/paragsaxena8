import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type AnimationRefs = {
  preloader: HTMLElement | null
  scrollTopBtn: HTMLElement | null
  aboutSection: HTMLElement | null
  experienceTimepath: HTMLElement | null
  contactForm: HTMLElement | null
}

export function useAnimations() {
  function animPreloaderScreen(preloader: HTMLElement | null) {
    if (!preloader) return
    const preloaderContent = preloader.querySelector('.preloader-content')
    const imgs = [...document.images]
    const imgsLength = imgs.length

    const hidePreloader = () => {
      preloader.setAttribute('style', '--loading-percentage: 100%')
      gsap
        .timeline()
        .set('.hide-in-preloading', { autoAlpha: 1 })
        .to(preloaderContent, { delay: 0.5, autoAlpha: 0 })
        .to(preloader, { y: '-100%', duration: 1, ease: 'expo.in' }, '-=0.5')
        .set(preloader, { autoAlpha: 0 })
    }

    let count = 0
    const imgLoaded = () => {
      count++
      const pct = imgsLength ? ((100 / imgsLength) * count) << 0 : 100
      preloader.setAttribute('style', `--loading-percentage: ${pct}%`)
      if (count >= imgsLength) hidePreloader()
    }

    if (imgsLength) {
      imgs.forEach((img) => {
        const tImg = new Image()
        tImg.onload = imgLoaded
        tImg.onerror = imgLoaded
        tImg.src = img.src
      })
    } else {
      hidePreloader()
    }
  }

  function animBackTopScrollIndicator(backTopBtn: HTMLElement | null) {
    if (!backTopBtn) return

    const showAt = backTopBtn.getAttribute('data-show-at') || '50'
    const path = backTopBtn.querySelector('path')
    if (!path) return
    const pathLength = path.getTotalLength()

    gsap.from(backTopBtn, {
      ease: 'none',
      duration: 0.3,
      autoAlpha: 0,
      y: 10,
      scrollTrigger: {
        trigger: '#app-inner',
        start: `${showAt}px top`,
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
      },
    })
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      scrollTrigger: {
        trigger: '#app-inner',
        start: `${showAt}px top`,
        end: 'bottom bottom',
        onUpdate: (self) => {
          path.style.strokeDashoffset = String(pathLength - self.progress * pathLength)
        },
      },
    })
  }

  function initAnimations(refs: AnimationRefs) {
    animBackTopScrollIndicator(refs.scrollTopBtn)

    const statsItems = gsap.utils.toArray('.statistics-section .statistics-items li')
    if (statsItems.length) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.statistics-items',
          start: 'top 82%',
          end: 'top 50%',
          scrub: 0.3,
        },
      }).from(statsItems, { autoAlpha: 0, y: 50, stagger: 0.2 })
    }

    const textBoxes = gsap.utils.toArray('.text-box-inline') as Element[]
    textBoxes.forEach((box: Element) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: box,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.3,
          },
        })
        .from(box.querySelector('.subtitle'), { autoAlpha: 0, top: 50 })
        .from(box.querySelector('h2'), { autoAlpha: 0, y: 50 }, '-=0.2')
        .from(box.querySelectorAll('h2 ~ *'), { autoAlpha: 0, y: 50, stagger: 0.2 }, '-=0.2')
    })

    if (refs?.aboutSection) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.about-section .about-img',
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.3,
          },
        })
        .from('.about-section .about-img', { autoAlpha: 0, scale: 0.5 })
    }

    const skillsGroups = gsap.utils.toArray('.skills-section .skills-items ul') as Element[]
    skillsGroups.forEach((group: Element) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.skills-section .skills-items',
          start: 'top 85%',
          end: 'top 35%',
          scrub: 0.3,
        },
      }).from(group.querySelectorAll('li'), { autoAlpha: 0, y: 50, stagger: 0.2 })
    })

    const experienceItems = gsap.utils.toArray('.experience-timeline .timeline-items li')
    if (experienceItems.length) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.experience-section .experience-timeline',
          start: 'top 85%',
          end: 'top 35%',
          scrub: 0.3,
        },
      }).from(experienceItems, { autoAlpha: 0, scale: 0.2, stagger: 0.1 })
    }

    const contactInfoItems = gsap.utils.toArray('.contact-section .contact-info li')
    if (contactInfoItems.length) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.contact-section .contact-info',
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.3,
          },
        })
        .from(contactInfoItems, { autoAlpha: 0, y: 50, stagger: 0.2 })
        .from('.contact-section .contact-text .social li', { autoAlpha: 0, y: 50, stagger: 0.2 }, '<')
    }

    if (refs?.contactForm) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.contact-section .contact-form',
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.3,
          },
        })
        .from('.contact-section .contact-form', { autoAlpha: 0, scale: 0.7 })
    }
  }

  function setupAnimations(refs: AnimationRefs) {
    animPreloaderScreen(refs.preloader)
    window.addEventListener('load', () => initAnimations(refs))
  }

  return { animPreloaderScreen, initAnimations, setupAnimations }
}
