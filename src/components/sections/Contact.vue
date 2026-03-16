<template>
  <div id="contact" class="contact-section section" tabindex="-1">
    <div class="container">
      <div class="section-content split">
        <div class="contact-text text-pane">
          <div class="text-box-inline">
            <span class="subtitle">contact</span>
            <h2>Wanna Talk?<br />Please Drop a Message</h2>
            <p>
              Get in touch and let me know how I can help. Fill out the form and I'll be in touch as
              soon as possible.
            </p>
          </div>
          <ul class="contact-info">
            <li>
              <img :src="images.icons.phone" alt="Phone" />
              <div>
                <strong>Phone:</strong>
                <ul>
                  <li><a href="tel:+919079311392" class="ltr-dir">(+91) 907 931 1392</a></li>
                </ul>
              </div>
            </li>
            <li>
              <img :src="images.icons.email" alt="Email" />
              <div>
                <strong>Email:</strong>
                <ul>
                  <li><a href="mailto:rckngprg@gmail.com">hi@parag</a></li>
                  <li><a href="mailto:iparagsaxena@gmail.com">work@parag</a></li>
                </ul>
              </div>
            </li>
          </ul>
          <ul class="social">
            <li v-for="social in socialAccounts" :key="social.link">
              <a
                :href="social.link"
                target="_blank"
                rel="noreferrer"
                v-tooltip="{ text: social.title, dir: 'top' }"
              >
                <i :class="social.icon" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="contact-form-pane">
          <form
            ref="contactFormRef"
            id="contactForm"
            class="contact-form form-styled"
            data-success-msg="Message sent successfully!"
            data-err-msg="Oops! something went wrong, please try again."
            @submit.prevent="handleFormSubmit"
          >
            <div class="group">
              <label>Name</label>
              <div class="control has-prefix-icon">
                <input type="text" name="name" placeholder="e.g. John Doe" minlength="3" required />
                <i class="fa fa-user-circle prefix-icon" aria-hidden="true"></i>
                <div class="errors-msgs">
                  <input class="required" type="hidden" value="Name is required" />
                  <input class="minLength" type="hidden" value="Name must be at least 3 characters" />
                </div>
              </div>
            </div>
            <div class="group">
              <label>Email</label>
              <div class="control has-prefix-icon">
                <input
                  class="ltr-dir"
                  type="email"
                  inputmode="email"
                  name="email"
                  placeholder="e.g. john.doe@gmail.com"
                  required
                />
                <i class="fa fa-envelope prefix-icon" aria-hidden="true"></i>
                <div class="errors-msgs">
                  <input class="required" type="hidden" value="Email is required" />
                  <input class="invalid" type="hidden" value="Please enter a valid email address" />
                </div>
              </div>
            </div>
            <div class="group phone-number">
              <label>Phone <span class="optional">(Optional)</span></label>
              <div class="control has-prefix-icon">
                <input type="tel" inputmode="tel" name="phone" placeholder="Phone Number" />
                <i class="fa fa-phone prefix-icon" aria-hidden="true"></i>
                <div class="errors-msgs">
                  <input class="invalid" type="hidden" value="Please enter a valid Phone Number" />
                </div>
              </div>
            </div>
            <div class="group">
              <label>Message</label>
              <div class="control has-prefix-icon">
                <textarea name="message" placeholder="Write message..." required></textarea>
                <i class="fa fa-comments prefix-icon" aria-hidden="true"></i>
                <div class="errors-msgs">
                  <input class="required" type="hidden" value="Message is required" />
                </div>
              </div>
            </div>
            <div class="group">
              <div class="control">
                <button type="submit" class="submit-btn btn btn-dark" :disabled="isSubmitting">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { images } from '@/assets'
import { socialAccounts } from '@/data/social'
import { submitContactForm } from '@/services/contact-form'

const contactFormRef = ref<HTMLFormElement | null>(null)
const isSubmitting = ref(false)
const setNotify = inject<(opts: { id?: string; className: string; msg: string; time?: number }) => void>('setNotify')!
const dismissNotify = inject<(id: string) => void>('dismissNotify')!

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im

function validateAndSubmit(form: HTMLFormElement) {
  const name = form.querySelector<HTMLInputElement>('input[name="name"]')!
  const email = form.querySelector<HTMLInputElement>('input[name="email"]')!
  const phone = form.querySelector<HTMLInputElement>('input[name="phone"]')!
  const message = form.querySelector<HTMLTextAreaElement>('textarea[name="message"]')!

  let valid = true

  if (!name.value) {
    setNotify({ id: 'nameRequired', className: 'danger', msg: 'Name is required' })
    name.classList.add('invalid')
    valid = false
  } else {
    dismissNotify('nameRequired')
    name.classList.remove('invalid')
  }
  if (name.value && name.value.length < 3) {
    setNotify({ id: 'nameMinLength', className: 'danger', msg: 'Name must be at least 3 characters' })
    name.classList.add('invalid')
    valid = false
  } else {
    dismissNotify('nameMinLength')
  }

  if (!email.value) {
    setNotify({ id: 'emailRequired', className: 'danger', msg: 'Email is required' })
    email.classList.add('invalid')
    valid = false
  } else {
    dismissNotify('emailRequired')
  }
  if (email.value && !EMAIL_REGEX.test(email.value)) {
    setNotify({ id: 'emailInvalid', className: 'danger', msg: 'Please enter a valid email address' })
    email.classList.add('invalid')
    valid = false
  } else {
    dismissNotify('emailInvalid')
    email.classList.remove('invalid')
  }

  if (phone.value && !PHONE_REGEX.test(phone.value)) {
    setNotify({ id: 'phoneInvalid', className: 'danger', msg: 'Please enter a valid Phone Number' })
    phone.classList.add('invalid')
    valid = false
  } else {
    dismissNotify('phoneInvalid')
    phone.classList.remove('invalid')
  }

  if (!message.value) {
    setNotify({ id: 'messageRequired', className: 'danger', msg: 'Message is required' })
    message.classList.add('invalid')
    valid = false
  } else {
    dismissNotify('messageRequired')
    message.classList.remove('invalid')
  }

  if (valid) {
    isSubmitting.value = true
    submitContactForm(new FormData(form))
      .then((result) => {
        if (result.ok) {
          setNotify({
            className: 'success',
            msg: form.getAttribute('data-success-msg') || 'Message sent successfully!',
            time: 5000,
          })
          form.reset()
          form.querySelectorAll('.valid').forEach((el) => el.classList.remove('valid'))
        } else {
          setNotify({
            className: 'danger',
            msg: form.getAttribute('data-err-msg') || 'Oops! something went wrong.',
            time: 5000,
          })
        }
      })
      .catch(() => {
        setNotify({
          className: 'danger',
          msg: 'Oops! something went wrong, please try again.',
          time: 5000,
        })
      })
      .finally(() => {
        isSubmitting.value = false
      })
  }
}

function handleFormSubmit(e: Event) {
  const form = (e.target as HTMLFormElement)
  validateAndSubmit(form)
}

defineExpose({ contactFormRef })
</script>
