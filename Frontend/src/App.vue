<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()

const days = [
  { path: '/day1', label: 'Day 1', subtitle: 'Basics' },
  { path: '/day2', label: 'Day 2', subtitle: 'Directives' },
  { path: '/day3', label: 'Day 3', subtitle: 'Advanced' },
  { path: '/day4', label: 'Day 4', subtitle: 'State & Forms' },
  { path: '/day5', label: 'Day 5', subtitle: 'Project' },
]

const isLoggedIn = computed(() => store.getters.isAuthenticated)
const currentUser = computed(() => store.getters.currentUser)
</script>

<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <h1 class="logo-title">Vue<span>Step</span></h1>
      </div>

      <nav class="sidebar-nav">
        <router-link
          v-for="day in days"
          :key="day.path"
          :to="day.path"
          class="nav-item"
          :class="{ active: route.path.startsWith(day.path) }"
        >
          <div class="nav-info">
            <div class="nav-label-item">
              {{ day.label }}
              <svg v-if="day.path === '/day5' && !isLoggedIn" class="lock-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div class="nav-sub">{{ day.subtitle }}</div>
          </div>
        </router-link>
        
        <div class="nav-divider"></div>
        
        <router-link to="/login" class="nav-item login-nav" :class="{ active: route.path === '/login' }" v-if="!isLoggedIn">
          <div class="nav-info">
            <div class="nav-label-item">Login</div>
            <div class="nav-sub">Access your account</div>
          </div>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <div class="user-card" v-if="isLoggedIn">
          <div class="user-avatar">{{ currentUser?.name?.charAt(0) }}</div>
          <div class="user-details">
            <div class="user-name">{{ currentUser?.name }}</div>
            <button class="logout-link" @click="store.dispatch('logout')">Sign out</button>
          </div>
        </div>
        <div class="user-info-brief guest" v-else>
          <span class="user-status-dot offline"></span>
          Guest Mode
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
}

.sidebar-logo {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.logo-title {
  font-size: 1.25rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.logo-title span { color: var(--red-primary); }

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-item {
  display: block;
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s;
}

.nav-item:hover {
  background: #111;
  color: white;
}

.nav-item.active {
  background: var(--red-primary);
  color: white;
}

.nav-label-item { 
  font-weight: 700; 
  font-size: 0.9rem; 
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.lock-icon {
  margin-left: 0.5rem;
  opacity: 0.5;
  color: var(--text-dim);
}
.nav-sub { font-size: 0.75rem; opacity: 0.7; }

.nav-divider {
  height: 1px;
  background: var(--border-color);
  margin: 1rem 1rem;
}

.login-nav {
  margin-top: auto;
  border: 1px dashed var(--border-color);
}

.sidebar-footer {
  padding: 1.25rem;
  border-top: 1px solid var(--border-color);
  font-size: 0.8rem;
  color: var(--text-dim);
}

.user-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: var(--red-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.8rem;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-link {
  background: none;
  border: none;
  color: var(--text-dim);
  font-size: 0.75rem;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
}

.logout-link:hover {
  color: var(--red-primary);
}

.user-info-brief {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
}

.user-status-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
}

.user-status-dot.offline {
  background: #666;
}

.main-content {
  flex: 1;
  background: var(--bg-main);
}
</style>
