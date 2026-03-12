<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const store = useStore()
const router = useRouter()

const schema = yup.object({
  email: yup.string().required('Email is required').email('Must be a valid email'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: ''
  }
})

const { value: email, errorMessage: emailErr } = useField('email')
const { value: password, errorMessage: passwordErr } = useField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    await store.dispatch('loginUser', { 
      name: values.email.split('@')[0], 
      email: values.email 
    })
    router.push('/day1')
  } catch (error) {
    console.error('Login failed:', error)
  }
})
</script>

<template>
  <div class="login-container animate-in">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">Vue<span>Step</span></h1>
        <p class="login-subtitle">Welcome back. Please login to your account.</p>
      </div>

      <form @submit.prevent="onSubmit" class="login-form">
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <div class="input-wrapper">
            <input 
              v-model="email" 
              type="email" 
              class="form-input" 
              placeholder="name@company.com"
              :class="{ 'input-error': emailErr }"
            />
            <span v-if="emailErr" class="form-error">{{ emailErr }}</span>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Password</label>
          <div class="input-wrapper">
            <input 
              v-model="password" 
              type="password" 
              class="form-input" 
              placeholder="••••••••"
              :class="{ 'input-error': passwordErr }"
            />
            <span v-if="passwordErr" class="form-error">{{ passwordErr }}</span>
          </div>
        </div>

        <button type="submit" class="btn btn-primary login-btn" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="loader"></span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <div class="login-footer">
        <p>Don't have an account? <a href="#" class="link">Request access</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(circle at center, #111 0%, #000 100%);
  padding: 1.5rem;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: rgba(15, 15, 15, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin-bottom: 0.5rem;
}

.login-title span {
  color: var(--red-primary);
}

.login-subtitle {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.input-wrapper {
  position: relative;
}

.form-input {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.8rem 1rem;
  border-radius: 8px;
  transition: all 0.2s;
  font-size: 0.95rem;
}

.form-input:focus {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--red-primary);
  box-shadow: 0 0 0 2px rgba(255, 51, 51, 0.1);
}

.input-error {
  border-color: var(--red-primary);
}

.login-btn {
  height: 48px;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  margin-top: 1rem;
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-dim);
}

.link {
  color: var(--red-primary);
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
