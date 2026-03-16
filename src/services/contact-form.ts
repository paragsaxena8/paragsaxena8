/**
 * Contact form submission via Formspree. Framework-agnostic.
 */
import { siteConfig } from '@/data/site-config'

export interface ContactFormResult {
  ok: boolean
  message?: string
}

export async function submitContactForm(formData: FormData): Promise<ContactFormResult> {
  const res = await fetch(siteConfig.formspreeEndpoint, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  })
  return { ok: res.ok }
}
