<script setup>
import { ref, onMounted, computed } from 'vue'

const posts = ref([])
const loading = ref(false)
const newTodo = ref('')
const todos = ref([
  { id: 1, text: 'Learn Vue', done: true }
])

onMounted(async () => {
  loading.value = true
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
  posts.value = await res.json()
  loading.value = false
})

function addTodo() {
  if (newTodo.value.trim()) {
    todos.value.push({ id: Date.now(), text: newTodo.value, done: false })
    newTodo.value = ''
  }
}
</script>

<template>
  <div class="day-page animate-in">
    <div class="day-header">
      <h1 class="day-title">Lifecycle & <span>Project</span></h1>
      <p class="day-desc">API calls and a simple Todo app.</p>
    </div>

    <!-- API -->
    <div class="card">
      <h2 class="section-title">API Posts (onMounted)</h2>
      <div v-if="loading" class="text-dim">Loading...</div>
      <div v-else class="flex flex-column gap-1">
        <div v-for="post in posts" :key="post.id" class="demo-box" style="font-size: 0.85rem;">
          <strong>{{ post.title }}</strong>
        </div>
      </div>
    </div>

    <!-- Todo App -->
    <div class="card">
      <h2 class="section-title">Mini Todo App</h2>
      <div class="flex gap-1 mb-2">
        <input v-model="newTodo" class="form-input" placeholder="Task..." @keyup.enter="addTodo" />
        <button class="btn btn-primary" @click="addTodo">Add</button>
      </div>
      <div class="demo-box">
        <div v-for="(todo, i) in todos" :key="todo.id" class="list-item">
          <input type="checkbox" v-model="todo.done" />
          <span :style="{ textDecoration: todo.done ? 'line-through' : 'none' }">{{ todo.text }}</span>
          <button class="btn btn-danger btn-sm" @click="todos.splice(i, 1)" style="margin-left: auto;">✕</button>
        </div>
      </div>
    </div>
  </div>
</template>
