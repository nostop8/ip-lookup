<template>
  <div class="result">
    <img
      :src="`https://flagsapi.com/${result.country}/flat/32.png`"
      :alt="`${result.country} flag`"
      :title="`${result.country} flag`"
      class="flag"
    />
    <TimezoneClockLive :timezone="result.timezone" />
  </div>
</template>

<script setup lang="ts">
import TimezoneClockLive from './TimezoneClockLive.vue'
import type { IpResult } from '../types'

interface Props {
  result: IpResult
}

defineProps<Props>()
</script>