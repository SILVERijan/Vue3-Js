<script setup>
import { ref, computed } from 'vue'

// Data binding demo
const message = ref('Hello from Vue.js! 🚀')
const customMessage = ref('')
const userInput = ref('')
const submittedValue = ref('')

// v-bind demo
const imgSrc = ref('https://vuejs.org/images/logo.png')
const btnClass = ref('btn-primary')
const isDynamic = ref(false)

// Dynamic form
const formData = ref({
  name: '',
  email: '',
  role: 'developer',
  newsletter: false
})
const formSubmitted = ref(false)

// Computed
const wordCount = computed(() => userInput.value.trim().split(/\s+/).filter(Boolean).length)
const charCount = computed(() => userInput.value.length)
const reversedMessage = computed(() => message.value.split('').reverse().join(''))
const uppercaseInput = computed(() => userInput.value.toUpperCase())

function submitForm() {
  if (formData.value.name && formData.value.email) {
    formSubmitted.value = true
    submittedValue.value = JSON.stringify(formData.value, null, 2)
  }
}

function resetForm() {
  formData.value = { name: '', email: '', role: 'developer', newsletter: false }
  formSubmitted.value = false
  submittedValue.value = ''
}
</script>

<template>
  <div class="day-page animate-in">
    <!-- Header -->
    <div class="day-header">
  
      <div class="topics-grid">
        <span class="topic-tag">Template Syntax</span>
        <span class="topic-tag" v-pre>{{ message }} interpolation</span>
        <span class="topic-tag">v-bind</span>
        <span class="topic-tag">v-model</span>
        <span class="topic-tag">Computed Properties</span>
      </div>
    </div>

    <!-- Section 1: Message Display -->
    <div class="card">
      <h2 class="section-title">Interpolation <span v-pre>{{ }}</span></h2>
      <p class="mb-2 text-dim">Render reactive data in your templates.</p>

      <div class="grid-2">
        <div>
          <div class="form-group">
            <label class="form-label">Message</label>
            <input v-model="message" class="form-input" />
          </div>
          <div class="code-block" v-pre>{{ message }}</div>
        </div>
        <div>
          <div class="demo-box">
            <p style="font-size: 1.2rem; font-weight: 700; color: var(--red-primary);">{{ message }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2: v-bind -->
    <div class="card">
      <h2 class="section-title">Attribute Binding</h2>
      <p class="mb-2 text-dim">Bind HTML attributes dynamically.</p>

      <div class="grid-2">
        <div>
          <div class="form-group">
            <label class="form-label">Image source</label>
            <input v-model="imgSrc" class="form-input" />
          </div>
          <div class="code-block" v-pre>&lt;img :src="imgSrc" /&gt;</div>
        </div>
        <div class="demo-box" style="text-align: center;">
          <img :src="imgSrc" style="max-width: 80px; border-radius: 4px;" alt="Bound image" />
        </div>
      </div>
    </div>

    <!-- Section 3: v-model Analysis -->
    <div class="card">
      <h2 class="section-title">Two-Way Binding</h2>
      <p class="mb-2 text-dim">Sync input values with data automatically.</p>   

      <div class="grid-2">
        <div>
          <textarea v-model="userInput" class="form-input" rows="3" placeholder="Type here..."></textarea>
          <div class="code-block" v-pre>v-model="input"</div>
        </div>
        <div class="demo-box">
          <div class="flex justify-between">
            <span class="text-dim">Chars:</span> <span>{{ charCount }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-dim">Words:</span> <span>{{ wordCount }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 4: Practice Form -->
    <div class="card">
      <h2 class="section-title">Practice Form</h2>
      
      <div v-if="!formSubmitted" class="grid-2">
        <div class="flex flex-column gap-1">
          <input v-model="formData.name" class="form-input" placeholder="Name" />
          <input v-model="formData.email" class="form-input" placeholder="Email" />
          <select v-model="formData.role" class="form-input">
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
          </select>
          <button class="btn btn-primary" @click="submitForm">Submit</button>
        </div>
        <div class="demo-box text-dim" style="font-size: 0.8rem;">
          <pre>{{ formData }}</pre>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="mb-1">🎉 Submitted!</p>
        <button class="btn btn-outline btn-sm" @click="resetForm">Reset</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mb-2 { margin-bottom: 1.5rem; }
</style>
