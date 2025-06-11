import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/supabaseClient'
import router from '@/router/index'

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

      console.log('UID to search:', user.value.id);

      const { data: userData, error: fetchError } = await supabase
        .from('users')
        .select('username')
        .eq('uid', user.value.id);

      if (fetchError) {
        console.log('Could not load username:', fetchError.message);
        username.value = 'NULL';
      } else if (!userData || userData.length === 0) {
        console.log('No user found with that UID:', user.value.id);
        username.value = 'NULL';
      } else {
        console.log('Found username:', userData[0].username);
        username.value = userData[0].username;
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

  const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error.message)
    return
  }
  user.value = null
  username.value = ''
  clearForm()
  router.push('/login')  // or '/'
}

  const clearForm = () => {
    email.value = ''
    password.value = ''
  }

  const getUserFromSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session && session.user) {
      user.value = session.user

      const { data: userData, error } = await supabase
        .from('users')
        .select('username')
        .eq('uid', user.value.id)

      if (!error && userData && userData.length > 0) {
        username.value = userData[0].username
      }
    }
  }

  getUserFromSession()

  return {
    user,
    email,
    password,
    loading,
    error,
    username, // Expose this to components
    loginUser,
    logout
  }
})
