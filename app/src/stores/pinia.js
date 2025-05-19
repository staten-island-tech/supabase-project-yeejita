import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabaseClient'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref(null)

  const loginUser = async () => {
    loading.value = true
    error.value = null

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })

      if (loginError) throw loginError

      user.value = data.user
      clearForm()
      return true
    } catch (err) {
      console.error(err)
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }

  const logoutUser = async () => {
    await supabase.auth.signOut()
    user.value = null
    clearForm()
  }

  const clearForm = () => {
    email.value = ''
    password.value = ''
  }

  return {
    user,
    email,
    password,
    loading,
    error,
    loginUser,
    logoutUser
  }
})