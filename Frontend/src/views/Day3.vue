<script setup>
import { ref } from 'vue'

const parentMessage = ref('Awaiting child...')
function handleEmit(payload) {
  parentMessage.value = payload.text
}

const activeComponent = ref('Dashboard')
</script>

<template>
  <div class="day-page animate-in">
    <div class="day-header">
      <h1 class="day-title">Advanced <span>Communication</span></h1>
      <p class="day-desc">Events, Slots, and Dynamic Components.</p>
    </div>

    <!-- $emit -->
    <div class="card">
      <h2 class="section-title">Child → Parent ($emit)</h2>
      <div class="grid-2">
        <div class="demo-box" style="background: #0a0a0a;">
          <p class="text-dim mb-1">Child Component</p>
          <button class="btn btn-primary btn-sm" @click="handleEmit({ text: 'Hello from child!' })">Emit Message</button>
        </div>
        <div class="demo-box">
          <p class="text-dim">Parent received:</p>
          <p class="mt-1" style="color: var(--red-primary); font-weight: 600;">{{ parentMessage }}</p>
        </div>
      </div>
    </div>

    <!-- Slots -->
    <div class="card">
      <h2 class="section-title">Slots</h2>
      <div class="demo-box">
        <div style="border: 1px dashed var(--border-color); padding: 1rem;">
          <p class="text-dim">This content is injected via slot from parent.</p>
        </div>
      </div>
    </div>

    <!-- Dynamic Components -->
    <div class="card">
      <h2 class="section-title">Dynamic Components</h2>
      <div class="flex gap-1 mb-2">
        <button v-for="c in ['Dashboard', 'Settings']" :key="c" 
          :class="['btn', 'btn-sm', activeComponent === c ? 'btn-primary' : 'btn-outline']"
          @click="activeComponent = c">{{ c }}</button>
      </div>
      <div class="demo-box">
        <p v-if="activeComponent === 'Dashboard'">🏠 Dashboard View</p>
        <p v-else>⚙️ Settings View</p>
      </div>
    </div>
  </div>
</template>
