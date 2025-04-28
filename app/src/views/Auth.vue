<template>
    <div class="register">
    <h2>signup</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username"  />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" @click="signUp">sign up?</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "@/supabaseClient";


const username = ref("")
const password = ref("")
const email = ref("")

const signUp = async () => {

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })

  if (authError) {
    console.error('Auth Error:', authError.message)
    alert('Sign up failed')
    return
  }

  const userId = authData.user.id
  const timeCreated = new Date().toISOString()


  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: userId,
        username: username.value,
        time_created: timeCreated
      }
    ])

  if (profileError) {
    console.error('Profile insert error:', profileError.message)
    alert('Could not save user profile')
    return
  }

  alert('Signed up successfully! Please check your email to confirm.')
  email.value = ''
  password.value = ''
  username.value = ''
}

</script>