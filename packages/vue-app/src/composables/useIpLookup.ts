import { ref, readonly } from 'vue'
import type { IpInput } from '../types'
import { isValidIp } from '@ip-lookup/shared'
import { ipLookup, ResponseError } from '../services/api'

export function useIpLookup(updateInput: (input: IpInput) => void) {
  const lookupInProgress = ref<string | null>(null)

  const lookupIp = async (input: IpInput) => {
    const ip = input.value.trim()
    
    if (!ip) {
      updateInput({ ...input, error: null, result: null })
      lookupInProgress.value = null
      return
    }

    if (!isValidIp(ip)) {
      updateInput({
        ...input,
        error: 'Invalid IP address format',
        result: null
      })
      lookupInProgress.value = null
      return
    }

    lookupInProgress.value = input.id.toString()
    updateInput({ ...input, isLoading: true, error: null, result: null })

    try {
      const result = await ipLookup(input.value)
      updateInput({ ...input, isLoading: false, error: null, result })
    } catch (error) {
      const errorMessage = error instanceof ResponseError 
        ? error.message 
        : 'Unknown error, make sure the backend is running'
      
      updateInput({ 
        ...input, 
        isLoading: false, 
        error: errorMessage, 
        result: null 
      })
    } finally {
      lookupInProgress.value = null
    }
  }

  const handleBlur = (input: IpInput, value: string) => {
    const trimmedValue = value.trim()
    lookupIp({ ...input, value: trimmedValue })
  }

  return {
    handleBlur,
    lookupIp,
    // Expose readonly reactive state
    isLookingUp: readonly(lookupInProgress)
  }
}