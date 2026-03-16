<template>
  <ul class="notifications-container hide-in-preloading">
    <transition-group name="notify">
      <li
        v-for="notify of notifications"
        :key="notify.id"
        :id="notify.id"
        :class="['notification', 'show', notify.className, notify.time && 'timer']"
      >
        {{ notify.msg }}
        <i class="fa fa-times link-hover" aria-hidden="true" @click="dismissNotify(notify.id)"></i>
        <span
          v-if="notify.time"
          class="disappearing-time"
          :style="{ 'animation-duration': notify.time + 'ms' }"
        ></span>
      </li>
    </transition-group>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface Notification {
  id: string
  className: string
  msg: string
  time?: number
}

const notifications = ref<Notification[]>([])

function setNotify(opts: { id?: string; className: string; msg: string; time?: number }) {
  const notify: Notification = {
    id: opts.id || `${Date.now()}${notifications.value.length}`,
    className: opts.className,
    msg: opts.msg,
    time: opts.time,
  }
  if (opts.id && !notifications.value.some((e) => e.id === opts.id)) {
    notifications.value.push(notify)
  } else if (!opts.id) {
    notifications.value.push(notify)
  }
  if (opts.time) {
    setTimeout(() => dismissNotify(notify.id), opts.time)
  }
}

function dismissNotify(id: string) {
  const index = notifications.value.findIndex((n) => n.id === id)
  if (index > -1) notifications.value.splice(index, 1)
}

defineExpose({ setNotify, dismissNotify })
</script>
