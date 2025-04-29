<template>
  <div class="register">
    <h2 class="text-2xl text-center mb-4">Sign Up</h2>
    <form @submit.prevent="registerUser" class="space-y-4">
      <div>
        <label>Username</label>
        <input v-model="username" type="text" required />
      </div>
      <div>
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/supabaseClient'

const username = ref('')
const email = ref('')
const password = ref('')

const registerUser = async () => {
  // Sign up with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  });

  if (error) {
    console.error('Signup error:', error.message)
    alert('Signup failed.')
    return
  }

  const userId = data.user.id

  // Insert additional user data into your 'users' table
  const { error: insertError } = await supabase
    .from('users')
    .insert([
      {
        uid: userId,
        username: username.value
      }
    ]);

  if (insertError) {
    console.error('Insert error:', insertError.message)
    alert('Failed to save user data.')
    return
  }

  alert('Signup successful! Check your email to confirm.')
  username.value = ''
  email.value = ''
  password.value = ''
}
</script>

