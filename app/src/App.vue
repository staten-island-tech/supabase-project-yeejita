<template>
  <div class="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
    <header class="bg-white dark:bg-black text-black dark:text-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <nav class="flex items-center gap-6">
         
          <RouterLink to="/" class="inline-flex hover:text-green-500">Home</RouterLink>
          <RouterLink to="/profile" class="inline-flex hover:text-green-500">{{ auth.username || 'Profile' }}</RouterLink>
          <RouterLink to="/posts" class="inline-flex hover:text-green-500">Posts</RouterLink>
          <RouterLink v-if="!auth.username" to="/signup" class="inline-flex hover:text-green-500">Sign Up</RouterLink>
          <RouterLink v-if="!auth.username" to="/login" class="inline-flex hover:text-green-500">Log In</RouterLink>
          <button v-if="auth.username" @click="auth.logout()" class="inline-flex hover:text-red-500 text-red-500 px-3 py-1 rounded transition">Log Out</button>

         
          <button @click="toggleDark" class="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition">
            {{ isDark ? '☀️ Light' : '🌙 Dark' }}
          </button>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/pinia'

const auth = useAuthStore()
const route = useRoute()
const isDark = ref(false)

const toggleDark = () => {
  isDark.value = !isDark.value
  
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}


</script>


<style scoped>

</style>
