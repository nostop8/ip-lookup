import { ref, computed, readonly } from 'vue'
import type { IpInput } from '../types'

export function useIpInputFields() {
  const inputs = ref<IpInput[]>([
    { id: 1, value: '', isLoading: false, error: null, result: null }
  ])
  const nextId = ref(2)

  const inputCount = computed(() => inputs.value.length)
  const hasInputs = computed(() => inputCount.value > 0)
  const canRemoveInputs = computed(() => inputCount.value > 1)
  const activeInputs = computed(() => 
    inputs.value.filter(input => input.value.trim() !== '')
  )

  const addInput = () => {
    inputs.value.push({
      id: nextId.value,
      value: '',
      isLoading: false,
      error: null,
      result: null
    })
    nextId.value++
  }

  const removeInput = (id: number) => {
    if (!canRemoveInputs.value) return
    
    const index = inputs.value.findIndex(input => input.id === id)
    if (index !== -1) {
      inputs.value.splice(index, 1)
    }
  }

  const updateInput = (updatedInput: IpInput) => {
    const index = inputs.value.findIndex(input => input.id === updatedInput.id)
    if (index !== -1) {
      inputs.value[index] = { ...updatedInput }
    }
  }

  const clearAllInputs = () => {
    inputs.value = [
      { id: 1, value: '', isLoading: false, error: null, result: null }
    ]
    nextId.value = 2
  }

  return {
    inputs: readonly(inputs),
    
    inputCount,
    hasInputs,
    canRemoveInputs,
    activeInputs,
    
    addInput,
    removeInput,
    updateInput,
    clearAllInputs
  }
}