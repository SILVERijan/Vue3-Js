<script setup>
import { ref } from 'vue'

const isVisible = ref(true)
const fruits = ref(['Apple', 'Banana', 'Grape'])
const newFruit = ref('')
const parentTitle = ref('Hello from Parent')
const parentColor = ref('#ff3333')

function addFruit() {
  if (newFruit.value.trim()) {
    fruits.value.push(newFruit.value.trim())
    newFruit.value = ''
  }
}

function removeFruit(index) {
  fruits.value.splice(index, 1)
}
</script>

<template>
  <div class="day-page animate-in">
    <div class="day-header">
      <h1 class="day-title">Directives & <span>Components</span></h1>
      <p class="day-desc">Conditional rendering, list loops, and basic component communication.</p>
    </div>

    <!-- v-if -->
    <div class="card">
      <h2 class="section-title">Conditional Rendering</h2>
      <div class="flex gap-1 mb-2">
        <button class="btn btn-outline btn-sm" @click="isVisible = !isVisible">Toggle Visibility</button>
      </div>
      <div v-if="isVisible" class="demo-box">Content is visible</div>
      <div v-else class="demo-box text-dim">Content is hidden</div>
    </div>

    <!-- v-for -->
    <div class="card">
      <h2 class="section-title">List Rendering</h2>
      <div class="flex gap-1 mb-2">
        <input v-model="newFruit" class="form-input" placeholder="New fruit..." @keyup.enter="addFruit" />
        <button class="btn btn-primary" @click="addFruit">Add</button>
      </div>
      <div class="demo-box">
        <div v-for="(fruit, index) in fruits" :key="index" class="list-item">
          <span>{{ fruit }}</span>
          <button class="btn btn-danger btn-sm" @click="removeFruit(index)">✕</button>
        </div>
      </div>
    </div>

    <!-- Props -->
    <div class="card">
      <h2 class="section-title">Props & Events</h2>
      <div class="grid-2">
        <div class="flex flex-column gap-1">
          <input v-model="parentTitle" class="form-input" />
          <input v-model="parentColor" type="color" />
        </div>
        <div class="demo-box" :style="{ borderColor: parentColor }">
          <h3 :style="{ color: parentColor }">{{ parentTitle }}</h3>
          <p class="text-dim mt-1">This box is themed by parent data.</p>
        </div>
      </div>
    </div>
  </div>
</template>
