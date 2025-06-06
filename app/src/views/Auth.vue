<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-4xl font-extrabold text-center mb-8 text-gray-800">Sign Up</h2>
      <form @submit.prevent="registerUser" class="space-y-6">
        <div>
          <label class="block text-xl font-semibold text-gray-700 mb-2" for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label class="block text-xl font-semibold text-gray-700 mb-2" for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label class="block text-xl font-semibold text-gray-700 mb-2" for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full text-lg font-bold bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white py-3 rounded-md transition-colors duration-300 mt-6"
            >
          {{ loading ? 'Signing up...' : 'Sign Up' }}
        </button>
      </form>
      <p class="text-center text-sm text-gray-600 mt-6">
        Already have an account? Log in
        <a href="/login" class="text-green-600 hover:underline font-medium"> here.</a>
      </p>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import '@/components/AuthPage.vue'
import { supabase } from '@/supabaseClient'


const loading = ref(false)



const registerUser = async () => {
  loading.value = true

  
  const { data: existingUsers, error: checkError } = await supabase
    .from('users')
    .select('uid')
    .eq('email', email.value)
    .limit(1)

  if (checkError) {
    alert('Error checking existing users: ' + checkError.message)
    loading.value = false
    return
  }

  if (existingUsers && existingUsers.length > 0) {
    alert('Signup failed: Email is already registered.')
    loading.value = false
    return
  }


  const { data, error: signupError } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (signupError) {
    alert('Error during signup: ' + signupError.message)
    loading.value = false
    return
  }

  const authUser = data.user

  if (!authUser) {
    alert('Signup failed: No user returned.')
    loading.value = false
    return
  }

 
  const { error: insertError } = await supabase
    .from('users')
    .insert([
      {
        username: username.value,
        email: email.value,
        uid: authUser.id,
        created: new Date().toISOString(),
      },
    ])

  if (insertError) {
    alert('Failed to save user data: ' + insertError.message)
    loading.value = false
    return
  }

  alert('Signup successful!')
  username.value = ''
  email.value = ''
  password.value = ''
  loading.value = false
}

</script>

<style scoped>

</style>
