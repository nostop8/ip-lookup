<template>
  <div class="app">
    <header class="header">
      <h1>IP Lookup Tool</h1>
      <p>Enter one or more IP addresses to get their country</p>
      <button class="add-button" @click="addInput" title="Add IP input">
        + Add
      </button>
    </header>

    <main class="ip-lookup">
      <IpInputField
        v-for="(input, index) in inputs"
        :key="input.id"
        :input="input"
        :index="index + 1"
        :on-update="updateInput"
        :on-remove="canRemoveInputs ? removeInput : undefined"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import IpInputField from './components/IpInputField.vue'
import { useIpInputFields } from './composables/useIpInputFields'

const { inputs, addInput, removeInput, updateInput, canRemoveInputs } = useIpInputFields()
</script>