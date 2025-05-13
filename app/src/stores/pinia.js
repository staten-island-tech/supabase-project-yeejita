import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabaseClient'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref(null)

  const registerUser = async () => {
    loading.value = true
    error.value = null

    try {
      const { data: existingUsers, error: checkError } = await supabase
        .from('users')
        .select('uid')
        .eq('email', email.value)
        .limit(1)

      if (checkError) throw checkError
      if (existingUsers.length > 0) throw new Error('Email already registered.')

      const { data: authData, error: signupError } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
      })

      if (signupError) throw signupError

      const { error: insertError } = await supabase.from('users').insert([
        {
          user: username.value,
          email: email.value,
          uid: authData.user.id,
          created: new Date().toISOString()
        }
      ])

      if (insertError) throw insertError

      user.value = authData.user
      clearForm()
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const loginUser = async () => {
    loading.value = true
    error.value = null

    try {
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })

      if (loginError) throw loginError

      user.value = loginData.user

      const { data: userRow, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('uid', loginData.user.id)
        .single()

      if (fetchError) throw fetchError

      username.value = userRow.user
      clearForm()
      return true
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const logoutUser = async () => {
    await supabase.auth.signOut()
    user.value = null
    username.value = ''
    clearForm()
  }

  const clearForm = () => {
    username.value = ''
    email.value = ''
    password.value = ''
  }

  return {
    user,
    username,
    email,
    password,
    loading,
    error,
    registerUser,
    loginUser,
    logoutUser
  }
})