<template>
  <div class="current-time">
    {{ time }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  timezone: string
}

const props = defineProps<Props>()

const time = ref<string>('')
let interval: NodeJS.Timeout | null = null

const updateTime = () => {
  try {
    const now = new Date()
    const timeString = now.toLocaleTimeString('en-US', {
      timeZone: props.timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    time.value = timeString
  } catch {
    time.value = 'Invalid timezone'
  }
}

const startClock = () => {
  updateTime()
  interval = setInterval(updateTime, 1000)
}

const stopClock = () => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

onMounted(() => {
  startClock()
})

onUnmounted(() => {
  stopClock()
})

watch(() => props.timezone, () => {
  stopClock()
  startClock()
})
</script>