<template>
  <div style="padding: 2rem; animation: fadeInUp 0.3s ease;">
    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
      <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #e63946, #c1121f); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">🏠</div>
      <div>
        <h2 style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary);">Home Page</h2>
        <p style="font-size: 0.8rem; color: var(--text-muted);">Route: /day3/home — Nested child route</p>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.25rem;">
      <div v-for="(stat, i) in stats" :key="i"
        style="padding: 1rem; border-radius: 10px; text-align: center; border: 1px solid;"
        :style="{ background: stat.bg, borderColor: stat.border }"
      >
        <div style="font-size: 1.8rem; margin-bottom: 0.25rem;">{{ stat.icon }}</div>
        <div style="font-size: 1.4rem; font-weight: 800;" :style="{ color: stat.color }">{{ stat.value }}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">{{ stat.label }}</div>
      </div>
    </div>

    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <div v-for="tag in tags" :key="tag"
        style="padding: 0.3rem 0.75rem; background: var(--surface-2); border: 1px solid var(--border-color); border-radius: 99px; font-size: 0.78rem; color: var(--text-muted);">
        {{ tag }}
      </div>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { icon: '🔥', value: '4.9', label: 'Rating', color: '#e63946', bg: 'rgba(230,57,70,0.08)', border: 'rgba(230,57,70,0.2)' },
  { icon: '📚', value: '5', label: 'Days', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)' },
  { icon: '✅', value: '100%', label: 'Hands-on', color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
]
const tags = ['Vue 3', 'Composition API', 'Vuex', 'Vue Router', 'VeeValidate', 'TypeScript']
</script>
