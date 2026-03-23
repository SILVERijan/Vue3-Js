<script setup>
import { ref, computed } from 'vue'

// Data binding demo
const message = ref('Hello from Vue.js!')
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
    <div class="card premium-card">
      <div class="card-header">
        <h2 class="section-title">Practice Area</h2>
        <span class="badge badge-red">Interactive</span>
      </div>
      <p class="mb-2 text-dim">Experiment with two-way data binding in a structured form.</p>
      
      <transition name="fade-slide" mode="out-in">
        <div v-if="!formSubmitted" class="grid-2 gap-2" key="form">
          <div class="form-container">
            <div class="form-group-premium">
              <label class="form-label-premium">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Full Name
              </label>
              <input v-model="formData.name" class="form-input-premium" placeholder="Enter your name" />
            </div>

            <div class="form-group-premium">
              <label class="form-label-premium">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                Email Address
              </label>
              <input v-model="formData.email" class="form-input-premium" placeholder="name@example.com" />
            </div>

            <div class="form-group-premium">
              <label class="form-label-premium">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                Current Role
              </label>
              <div class="select-wrapper">
                <select v-model="formData.role" class="form-input-premium">
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="product">Product Manager</option>
                </select>
              </div>
            </div>

            <div class="form-group-premium flex items-center gap-1 mt-1">
              <input type="checkbox" id="newsletter" v-model="formData.newsletter" class="custom-checkbox" />
              <label for="newsletter" class="form-label-premium mb-0 cursor-pointer">Subscribe to updates</label>
            </div>

            <button class="btn btn-premium w-full mt-2" @click="submitForm" :disabled="!formData.name || !formData.email">
              <span>Initialize Data</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>

          <div class="monitor-container">
            <div class="monitor-header">
              <div class="monitor-dots">
                <span></span><span></span><span></span>
              </div>
              <div class="monitor-title">LIVE_STATE_MONITOR</div>
            </div>
            <div class="monitor-body">
              <div class="state-row" v-for="(value, key) in formData" :key="key">
                <span class="state-key">{{ key }}:</span>
                <span class="state-value" :class="{ 'value-active': value }">
                  {{ typeof value === 'boolean' ? (value ? 'TRUE' : 'FALSE') : (value || 'null') }}
                </span>
              </div>
              <div class="monitor-cursor"></div>
            </div>
          </div>
        </div>

        <div v-else class="success-container" key="success">
          <div class="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--red-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <h3 class="success-title">Submission Successful</h3>
          <p class="text-dim mb-2">The reactive state has been synchronized with the virtual server.</p>
          <button class="btn btn-outline btn-sm" @click="resetForm">Create New Entry</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.mb-2 { margin-bottom: 1.5rem; }
.gap-2 { gap: 2rem; }
.cursor-pointer { cursor: pointer; }

/* Premium Card Enhancements */
.premium-card {
  position: relative;
  overflow: hidden;
  border-color: rgba(255, 51, 51, 0.1);
  background: linear-gradient(145deg, #141414 0%, #0c0c0c 100%);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

/* Premium Form Elements */
.form-group-premium {
  margin-bottom: 1.25rem;
}

.form-label-premium {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-dim);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
}

.form-label-premium svg {
  color: var(--red-primary);
  opacity: 0.8;
}

.form-input-premium {
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  color: white;
  font-family: inherit;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-input-premium:focus {
  background: rgba(255, 51, 51, 0.02);
  border-color: var(--red-primary);
  box-shadow: 0 0 0 4px rgba(255, 51, 51, 0.1);
  outline: none;
}

/* Custom Select Styling */
.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: "↓";
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-dim);
  pointer-events: none;
  font-size: 0.8rem;
}

.form-input-premium select {
  appearance: none;
}

/* Custom Checkbox */
.custom-checkbox {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid var(--border-color);
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.custom-checkbox:checked {
  background: var(--red-primary);
  border-color: var(--red-primary);
}

.custom-checkbox:checked::after {
  content: "\2713";
  position: absolute;
  color: white;
  font-size: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Premium Button */
.btn-premium {
  background: var(--red-primary);
  color: white;
  padding: 0.8rem 1.5rem;
  justify-content: center;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(255, 51, 51, 0.2);
}

.btn-premium:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(255, 51, 51, 0.3);
}

.btn-premium:active:not(:disabled) {
  transform: translateY(1px);
}

.btn-premium:disabled {
  background: #222;
  color: #444;
  cursor: not-allowed;
  box-shadow: none;
}

/* Live Monitor Style */
.monitor-container {
  background: #050505;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);
}

.monitor-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.monitor-dots {
  display: flex;
  gap: 4px;
}

.monitor-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #333;
}

.monitor-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: var(--text-dim);
  letter-spacing: 2px;
}

.monitor-body {
  padding: 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  flex: 1;
  position: relative;
}

.state-row {
  margin-bottom: 0.75rem;
  display: flex;
  gap: 0.75rem;
}

.state-key {
  color: var(--text-dim);
}

.state-value {
  color: #444;
  transition: color 0.3s;
}

.state-value.value-active {
  color: var(--red-primary);
  text-shadow: 0 0 10px rgba(255, 51, 51, 0.3);
}

.monitor-cursor {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 8px;
  height: 2px;
  background: var(--red-primary);
  animation: blink 1s infinite;
}

/* Success State */
.success-container {
  text-align: center;
  padding: 2rem;
}

.success-icon {
  margin-bottom: 1.5rem;
  animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.success-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

/* Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes scaleIn {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@media (max-width: 768px) {
  .gap-2 { gap: 1.5rem; }
}
</style>
