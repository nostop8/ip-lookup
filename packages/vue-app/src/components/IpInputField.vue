<template>
  <div class="ip-input-container">
    <div class="ip-input-row">
      <label class="ip-label" :for="`ip-${input.id}`">
        {{ index }}
      </label>
      <input
        :id="`ip-${input.id}`"
        type="text"
        :value="input.value"
        :disabled="input.isLoading"
        :class="inputClasses"
        :aria-describedby="input.error ? `error-${input.id}` : undefined"
        @input="handleInput"
        @blur="handleBlur"
      />
      <button
        v-if="onRemove"
        class="remove-button"
        @click="onRemove(input.id)"
        title="Remove IP input"
      >
        X
      </button>
      <div 
        v-if="input.isLoading" 
        class="spinner" 
        aria-label="Loading" 
        role="status" 
      />
      <IpResult v-if="input.result" :result="input.result" />
    </div>

    <div 
      v-if="input.error" 
      :id="`error-${input.id}`" 
      class="error-message" 
      role="alert"
    >
      {{ input.error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IpResult from './IpResult.vue'
import type { IpInput } from '../types'
import { useIpLookup } from '../composables/useIpLookup'

interface Props {
  input: IpInput
  index: number
  onRemove?: (id: number) => void
  onUpdate: (input: IpInput) => void
}

const props = defineProps<Props>()

const { handleBlur: handleIpBlur } = useIpLookup(props.onUpdate)

let lastProcessedValue = props.input.value

const inputClasses = computed(() => [
  'ip-input',
  {
    'error': props.input.error,
    'success': props.input.result
  }
])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const updatedInput = { ...props.input, value: target.value }
  props.onUpdate(updatedInput)
}

const handleBlur = (event: Event) => {
  const target = event.target as HTMLInputElement
  const trimmedValue = target.value.trim()
  
  if (trimmedValue !== lastProcessedValue.trim()) {
    lastProcessedValue = trimmedValue
    const currentInput = { ...props.input, value: lastProcessedValue }
    handleIpBlur(currentInput, trimmedValue)
  }
}
</script>