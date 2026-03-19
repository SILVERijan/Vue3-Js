<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const store = useStore()
const count = computed(() => store.state.count)

// Form Logic
const isSubmitted = ref(false)

const schema = yup.object({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  email: yup.string().required('Email is required').email('Must be a valid email'),
  role: yup.string().required('Please select a role'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number'),
  terms: yup.boolean().oneOf([true], 'You must accept the terms')
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    role: '',
    password: '',
    terms: false
  }
})

const { value: name, errorMessage: nameErr } = useField('name')
const { value: email, errorMessage: emailErr } = useField('email')
const { value: role, errorMessage: roleErr } = useField('role')
const { value: password, errorMessage: passwordErr } = useField('password')
const { value: terms, errorMessage: termsErr } = useField('terms')

const onFormSubmit = handleSubmit(async (values) => {
  console.log('Form Submitted:', values)
  // Simulate API Call
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSubmitted.value = true
  resetForm()
})
</script>

<template>
  <div class="day-page animate-in">
    <div class="day-header">
      <h1 class="day-title">State & <span>Forms</span></h1>
      <p class="day-desc">Vuex and Form Validation.</p>
    </div>

    <div class="grid-2">
      <!-- Vuex -->
      <div class="card h-full">
        <h2 class="section-title">Vuex Store</h2>
        <p class="text-dim mb-2">Centralized state management example.</p>
        <div class="flex items-center gap-1 demo-box justify-between">
          <div class="count-display">{{ count }}</div>
          <div class="flex gap-1">
            <button class="btn btn-primary" @click="store.dispatch('increment')">+</button>
            <button class="btn btn-outline" @click="store.dispatch('decrement')">−</button>
          </div>
        </div>
        
        <div class="mt-4 p-4 border border-dashed border-color rounded">
          <p class="text-xs text-dim">Store current state is reactive across all components using this state.</p>
        </div>
      </div>

      <!-- Practice Form -->
      <div class="card">
        <h2 class="section-title">Practice Form</h2>
        <p class="text-dim mb-2">Advanced validation with VeeValidate & Yup.</p>
        
        <div v-if="isSubmitted" class="success-box animate-in">
          <div class="success-icon">✓</div>
          <h3>Registration Successful!</h3>
          <p>Your practice account has been created.</p>
          <button class="btn btn-outline btn-sm mt-2" @click="isSubmitted = false">Create Another</button>
        </div>

        <form v-else @submit.prevent="onFormSubmit" class="practice-form">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input 
              v-model="name" 
              type="text" 
              class="form-input" 
              placeholder="John Doe"
              :class="{ 'input-error': nameErr }"
            />
            <span v-if="nameErr" class="form-error">{{ nameErr }}</span>
          </div>

          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input 
              v-model="email" 
              type="email" 
              class="form-input" 
              placeholder="john@example.com"
              :class="{ 'input-error': emailErr }"
            />
            <span v-if="emailErr" class="form-error">{{ emailErr }}</span>
          </div>

          <div class="form-group">
            <label class="form-label">Role</label>
            <select v-model="role" class="form-input" :class="{ 'input-error': roleErr }">
              <option value="" disabled selected>Select your role</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
            </select>
            <span v-if="roleErr" class="form-error">{{ roleErr }}</span>
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input 
              v-model="password" 
              type="password" 
              class="form-input" 
              placeholder="••••••••"
              :class="{ 'input-error': passwordErr }"
            />
            <span v-if="passwordErr" class="form-error">{{ passwordErr }}</span>
          </div>

          <div class="form-group mb-2">
            <label class="checkbox-label">
              <input type="checkbox" v-model="terms" />
              <span>I agree to the terms and conditions</span>
            </label>
            <span v-if="termsErr" class="form-error">{{ termsErr }}</span>
          </div>

          <button type="submit" class="btn btn-primary w-full justify-center" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="loader-sm"></span>
            <span v-else>Register Now</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.h-full { height: 100%; }
.count-display {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--red-primary);
  font-family: 'JetBrains Mono', monospace;
}

.practice-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  accent-color: var(--red-primary);
}

.success-box {
  background: rgba(34, 197, 94, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.2);
  padding: 2rem;
  border-radius: var(--radius);
  text-align: center;
}

.success-icon {
  width: 48px;
  height: 48px;
  background: #22c55e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
}

.loader-sm {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.border-dashed { border-style: dashed; }
.border-color { border-color: var(--border-color); }
.rounded { border-radius: var(--radius); }
.text-xs { font-size: 0.75rem; }
.mt-4 { margin-top: 1rem; }
.p-4 { padding: 1rem; }

@keyframes spin {
  to { transform: rotate(360deg); }
}

select.form-input option {
  background: var(--bg-card);
  color: white;
}
</style>
