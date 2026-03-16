import { ref } from 'vue'
import { submitContactForm } from '@/services/contact-form'

export interface NotifyOptions {
  id?: string
  className: string
  msg: string
  time?: number
}

export function useContactForm(onNotify: (opts: NotifyOptions) => void) {
  const isSubmitting = ref(false)

  async function handleSubmit(form: HTMLFormElement) {
    const formData = new FormData(form)
    isSubmitting.value = true
    try {
      const result = await submitContactForm(formData)
      if (result.ok) {
        onNotify({
          className: 'success',
          msg: form.getAttribute('data-success-msg') || 'Message sent successfully!',
          time: 5000,
        })
        form.reset()
        form.querySelectorAll('.valid').forEach((el) => el.classList.remove('valid'))
      } else {
        onNotify({
          className: 'danger',
          msg: form.getAttribute('data-err-msg') || 'Oops! something went wrong.',
          time: 5000,
        })
      }
    } catch (err) {
      onNotify({
        className: 'danger',
        msg: 'Oops! something went wrong, please try again.',
        time: 5000,
      })
      console.error(err)
    } finally {
      isSubmitting.value = false
    }
  }

  return { isSubmitting, handleSubmit }
}
