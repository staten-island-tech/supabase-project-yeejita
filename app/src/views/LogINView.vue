<template>
 <div class="login-page">
    <h2>Login</h2>

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
        <span v-else>Login</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/pinia'

const auth = useAuthStore()

const handleLogin = async () => {
  await auth.loginUser()
}
</script>

