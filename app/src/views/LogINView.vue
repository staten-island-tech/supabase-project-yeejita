<template>
 <div class="login-page">
    <h1 class = "text-center text-5xl ">Login</h1>
    <h4 class = "text-center mt-6">Don't have a user? Sign up here.</h4>

    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="auth.email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          v-model="auth.password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <div v-if="auth.error" class="error">
        {{ auth.error }}
      </div>

      <button type="submit" :disabled="auth.loading">
        <span v-if="auth.loading">Logging in...</span>
        <span class = "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" v-else>Login</span>
      </button>

      <div v-if="loginFailed" class="error">
        Login failed: {{ auth.error }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/pinia'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const auth = useAuthStore()
const router = useRouter()
const loginFailed = ref(false)

const handleLogin = async () => {
  const success = await auth.loginUser()

  if (success) {
    loginFailed.value = false
    router.push('/') 
  } else {
    loginFailed.value = true
  }
}
</script>

