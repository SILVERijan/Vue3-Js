<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const store = useStore()
const count = computed(() => store.state.count)

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6)
})

const { handleSubmit, isSubmitting } = useForm({ validationSchema: schema })
const { value: email, errorMessage: emailErr } = useField('email')
const { value: password, errorMessage: passwordErr } = useField('password')

const onSubmit = () => {
  store.dispatch('increment')
}
</script>

<template>
  <div class="day-page animate-in">
    <div class="day-header">
      <h1 class="day-title">State & <span>Forms</span></h1>
      <p class="day-desc">Vuex and Form Validation.</p>
    </div>

    <!-- Vuex -->
    <div class="card">
      <h2 class="section-title">Vuex Store</h2>
      <div class="flex items-center gap-1">
        <div class="demo-box" style="font-size: 1.5rem; font-weight: 700;">{{ count }}</div>
        <button class="btn btn-primary" @click="store.dispatch('increment')">+</button>
        <button class="btn btn-outline" @click="store.dispatch('decrement')">−</button>
      </div>
    </div>

    <!-- Placeholder for more state management examples -->
    <div class="card">
      <h2 class="section-title">Coming Soon</h2>
      <p class="text-dim">More advanced state management patterns will be added here.</p>
    </div>
  </div>
</template>
