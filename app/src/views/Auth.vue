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
        <input v-model="password" type="password" required />
      </div>
      <button class = "text-1.5xl bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit" :disabled="loading">
        {{ loading ? 'Signing up...' : 'Sign Up' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import AuthPage from '@/components/icons/AuthPage.vue';


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

  // Insert user info into 'users' table
  const { error: insertError } = await supabase
    .from('users')
    .insert([
      {
        user: username.value,
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
