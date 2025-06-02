<template>
    <div class="register">
      <h2 class="text-4xl text-center mb-4">Sign Up</h2>
      <form @submit.prevent="registerUser" class="space-y-4">
        <div>
          <label class = "text-3xl">Username</label>
          <input v-model="username" type="text" required />
        </div>
        <div>
          <label class = "text-3xl">Email</label>
          <input v-model="email" type="email" required />
        </div>
        <div>
          <label class = "text-3xl">Password</label>
          <input v-model="Password" type="password" required />
        </div>
        <button class = "text-1.5xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit" :disabled="loading">
          {{ loading ? 'Signing up...' : 'Sign Up' }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { supabase } from '@/supabaseClient'
  
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  
  const registerUser = async () => {
    loading.value = true
  
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })
  
    if (error) {
      alert('Signup failed: ' + error.message)
      loading.value = false
      return
    }
  
    const userId = data?.user?.id
    if (!userId) {
      alert('Signup failed: No user ID returned.')
      loading.value = false
      return
    }
  
    const { error: insertError } = await supabase
      .from('users')
      .insert([
        {
          uid: userId,
          user: username.value,
          email: email.value,
          created: new Date().toISOString()
        }
      ])
  
    if (insertError) {
      alert('Failed to save user data: ' + insertError.message)
      loading.value = false
      return
    }
  
    alert('Signup successful! Please check your email to confirm your account.')
    username.value = ''
    email.value = ''
    password.value = ''
    loading.value = false
  }
  </script>
  