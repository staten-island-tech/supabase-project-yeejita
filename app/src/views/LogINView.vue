<template>
  <div
    ref="containerRef"
    class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300"
  >
    <div
      ref="formRef"
      class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 class="text-4xl font-extrabold text-center mb-8 text-gray-800 dark:text-white">Login</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Email</label>
          <input
            id="email"
            v-model="auth.email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Password</label>
          <input
            id="password"
            v-model="auth.password"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div v-if="auth.error || loginFailed" class="text-red-600 text-sm text-center dark:text-red-400">
          {{ auth.error }}
        </div>

        <button
          type="submit"
          :disabled="auth.loading"
          class="w-full text-lg font-bold bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white py-3 rounded-md transition-colors duration-300 mt-6"
        >
          {{ auth.loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
        Don't have an account? Create one
        <a href="/signup" class="text-green-600 hover:underline font-medium"> here.</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useAuthStore } from '@/stores/pinia'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const loginFailed = ref(false)


const containerRef = ref(null)
const formRef = ref(null)

const handleLogin = async () => {
  const success = await auth.loginUser()
  loginFailed.value = !success
  if (success) {
    router.push('/')
  }
}

onMounted(() => {
  gsap.from(containerRef.value, {
    opacity: 0,
    y: 40,
    duration: 0.5,
    ease: 'power2.out'
  })
  gsap.from(formRef.value, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out'
  })
})
</script>
