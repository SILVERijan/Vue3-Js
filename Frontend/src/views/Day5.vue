<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'

const posts = ref([])
const loading = ref(false)
const todoLoading = ref(false)
const newTodo = ref('')
const todos = ref([])
const editingId = ref(null)
const editText = ref('')

onMounted(async () => {
  fetchPosts()
  fetchTodos()
})

async function fetchPosts() {
  loading.value = true
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
    posts.value = await res.json()
  } catch (error) {
    console.error('Error fetching posts:', error)
  } finally {
    loading.value = false
  }
}

async function fetchTodos() {
  todoLoading.value = true
  try {
    const res = await api.get('/todos')
    todos.value = res.data.data
  } catch (error) {
    console.error('Error fetching todos:', error)
  } finally {
    todoLoading.value = false
  }
}

async function addTodo() {
  if (newTodo.value.trim()) {
    try {
      const res = await api.post('/todos', { text: newTodo.value })
      todos.value.unshift(res.data.data)
      newTodo.value = ''
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }
}

async function toggleTodo(todo) {
  try {
    const res = await api.patch(`/todos/${todo.id}`, { done: todo.done })
    
  } catch (error) {
    console.error('Error toggling todo:', error)
    todo.done = !todo.done // Revert on failure
  }
}

async function deleteTodo(id) {
  try {
    await api.delete(`/todos/${id}`)
    todos.value = todos.value.filter(t => t.id !== id)
  } catch (error) {
    console.error('Error deleting todo:', error)
  }
}

function startEdit(todo) {
  editingId.value = todo.idw
  editText.value = todo.text
}

async function updateTodo() {
  if (!editText.value.trim()) return;
  
  try {
    const res = await api.patch(`/todos/${editingId.value}`, { text: editText.value })
    const index = todos.value.findIndex(t => t.id === editingId.value)
    if (index !== -1) {
      todos.value[index].text = res.data.data.text
    }
    cancelEdit()
  } catch (error) {
    console.error('Error updating todo:', error)
  }
}

function cancelEdit() {
  editingId.value = null
  editText.value = ''
}
</script>

<template>
  <div class="day-page animate-in">
    <div class="day-header">
      <h1 class="day-title">Lifecycle & <span>Project</span></h1>
      <p class="day-desc">API calls and a persistent Todo app with update feature.</p>
    </div>

    <!-- Todo App -->
    <div class="card">
      <div class="card-header">
        <h2 class="section-title">Todo App</h2>
        <span v-if="todoLoading" class="loader-sm"></span>
      </div>
      
      <div class="flex gap-1 mb-2">
        <input v-model="newTodo" class="form-input" placeholder="What needs to be done?" @keyup.enter="addTodo" />
        <button class="btn btn-primary" @click="addTodo">Add</button>
      </div>

      <div class="todo-list">
        <div v-if="todos.length === 0 && !todoLoading" class="text-dim text-center py-2">
          No tasks yet. Add one above!
        </div>
        
        <div v-for="todo in todos" :key="todo.id" class="list-item todo-item" :class="{ 'is-done': todo.done }">
          <input type="checkbox" v-model="todo.done" @change="toggleTodo(todo)" class="custom-checkbox-todo" />
          
          <div v-if="editingId === todo.id" class="edit-mode-container">
            <input v-model="editText" class="form-input-inline" @keyup.enter="updateTodo" @keyup.esc="cancelEdit" ref="editInput" />
            <div class="edit-actions">
              <button class="btn-icon text-green" @click="updateTodo">✓</button>
              <button class="btn-icon text-dim" @click="cancelEdit">✕</button>
            </div>
          </div>
          
          <template v-else>
            <span class="todo-text" @dblclick="startEdit(todo)">{{ todo.text }}</span>
            <div class="todo-actions">
              <button class="btn-icon text-dim" @click="startEdit(todo)">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteTodo(todo.id)">✕</button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.2s;
}

.todo-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
}

.todo-text {
  flex: 1;
  font-size: 0.95rem;
  transition: color 0.3s, text-decoration 0.3s;
}

.is-done .todo-text {
  color: var(--text-dim);
  text-decoration: line-through;
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.todo-item:hover .todo-actions {
  opacity: 1;
}

.edit-mode-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-input-inline {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--red-primary);
  border-radius: 4px;
  padding: 0.4rem 0.75rem;
  color: white;
  font-size: 0.95rem;
  outline: none;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-green { color: #10b981; }
.text-dim { color: var(--text-dim); }

.loader-sm {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--red-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.custom-checkbox-todo {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.custom-checkbox-todo:checked {
  background: var(--red-primary);
  border-color: var(--red-primary);
}

.custom-checkbox-todo:checked::after {
  content: "✓";
  position: absolute;
  color: white;
  font-size: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.py-2 { padding-top: 2rem; padding-bottom: 2rem; }
.text-center { text-align: center; }
</style>
