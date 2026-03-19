<template>
  <div style="padding: 2rem; animation: fadeInUp 0.3s ease;">
    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
      <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #a855f7, #7c3aed); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">ℹ️</div>
      <div>
        <h2 style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary);">About Page</h2>
        <p style="font-size: 0.8rem; color: var(--text-muted);">Route: /day3/about — Nested child route</p>
      </div>
    </div>

    <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.25rem; line-height: 1.7;">
      This page demonstrates <strong style="color: #a855f7;">nested routing</strong> in Vue Router. The parent component (Day3.vue) defines
      a <code style="background: var(--surface-2); padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.85rem;">&lt;router-view&gt;</code> tag,
      and nested child routes are rendered inside it.
    </p>

    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <div v-for="(point, i) in points" :key="i"
        style="display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.75rem; background: var(--surface-1); border: 1px solid var(--border-color); border-radius: 8px;"
      >
        <span style="padding: 0.2rem 0.6rem; background: rgba(168,85,247,0.15); border-radius: 4px; font-size: 0.75rem; font-weight: 700; color: #a855f7; flex-shrink: 0;">{{ String(i+1).padStart(2,'0') }}</span>
        <span style="font-size: 0.88rem; color: var(--text-secondary);">{{ point }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const points = [
  'createRouter() sets up the router with history mode and route definitions',
  'Nested routes use the children: [] array in the parent route config',
  'The parent component must have a <router-view> to render child routes',
  'router-link provides declarative navigation without page reloads',
  'useRouter() and useRoute() hooks give programmatic access to routing',
  'Route params, query strings, and meta fields add flexibility'
]
</script>
