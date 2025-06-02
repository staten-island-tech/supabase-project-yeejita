import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabaseClient'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const error = ref(null)
  const username = ref('')

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

      const { data: userData, error: fetchError } = await supabase
        .from('users')
        .select('username')
        .eq('uid', user.value.id)
        .single()

      if (fetchError) {
        console.warn('Could not load username:', fetchError.message)
        username.value = 'Profile'
      } else {
        username.value = userData.username
      }


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
    username.value = '' // Clear it
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
    username, // Expose this to components
    loginUser,
    logoutUser
  }
})
