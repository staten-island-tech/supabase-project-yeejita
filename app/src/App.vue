<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/pinia'

const auth = useAuthStore()
const route = useRoute()

import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()

</script>

<template>
  <body class="">
    <header class="bg-white-800 text-black shadow-md">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
       

        
        <nav class="flex items-center gap-6">
          <RouterLink
            to="/"
            class="inline-flex hover:text-green-500 transition-colors"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/profile"
            class="inline-flex hover:text-green-500 transition-colors"
          >
            {{ auth.username || 'Profile' }}
          </RouterLink>
          <RouterLink
            to="/posts"
            class="inline-flex hover:text-green-500 transition-colors"
          >
            Posts
          </RouterLink>
          <RouterLink
            v-if="!auth.username"
            to="/signup"
            class="inline-flex hover:text-green-500 transition-colors"
          >
            Sign Up
          </RouterLink>
          <RouterLink
            v-if="!auth.username"
            to="/login"
            class="inline-flex hover:text-green-500 transition-colors"
          >
            Log In
          </RouterLink>
          <button
            v-if="auth.username"
            @click="auth.logout()"
            class="hover:text-red-500 px-3 py-1 rounded transition"
          >
            Log Out
          </button>
          <button
            @click="toggleDark"
              class="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition"
            >
            {{ isDark ? '☀️ Light' : '🌙 Dark' }}
          </button>
        </nav>
      </div>
    </header>

    <RouterView />
  </body>
</template>



<style scoped>

</style>
