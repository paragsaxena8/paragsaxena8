import type { App, DirectiveBinding } from 'vue'

export const vClone = {
  mounted(el: HTMLElement) {
    el.parentNode?.insertBefore(el.cloneNode(true), el.nextSibling)
  },
}

export const vStaggerdelay = {
  mounted(el: HTMLElement, binding: DirectiveBinding<number>) {
    const delay = binding.value ?? 100
    ;[...el.children].forEach((child, i) => {
      child.setAttribute('style', `animation-delay: ${(i + 1) * delay}ms`)
    })
  },
}

export const vTooltip = {
  mounted(el: HTMLElement, binding: DirectiveBinding<{ text: string; dir: string }>) {
    const { text, dir } = binding.value || {}
    if (!text) return
    el.classList.add('has-tooltip')
    el.insertAdjacentHTML(
      'beforeend',
      `<div class="custom-tooltip custom-tooltip-${dir || 'top'}">${text}</div>`
    )
  },
}

export function registerDirectives(app: App) {
  app.directive('clone', vClone)
  app.directive('staggerdelay', vStaggerdelay)
  app.directive('tooltip', vTooltip)
}
