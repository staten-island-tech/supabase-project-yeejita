<template>
  <div class ="bg-gray-100 min-h-screen py-8">
    <div>
      <h1 class="text-5xl text-center pb-6 mt-6">
        Hello, {{ username }}!
      </h1>
    </div>

    <h2 class="text-center text-3xl pb-8">Posts: {{ user.posttotal }}</h2>

    <div>
      <h1 class="text-4xl text-center pb-4">Your Posts:</h1>
    </div>

    <div v-if="userPosts.length" class="flex flex-col items-center gap-3 mt-6">
      <div
        v-for="post in userPosts"
        :key="post.id"
        class="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full"
          >
      <p class="text-gray-800 whitespace-pre-line">{{ post.content }}</p>
      </div>
    </div>


    <div v-else class="text-center text-gray-500 mt-6 text-lg">
      You haven’t made any posts yet.
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { supabase } from '@/supabaseClient'
  import { useAuthStore } from '@/stores/pinia'

  const userPosts = ref([])
  const usestore = useAuthStore()
  const username = computed(() => usestore.username)
  
  onMounted(() => {
  fetchUserPosts()
  })

  const user = {
    likes: ref(0),
    posttotal: ref(0)
  }

  async function fetchUserPosts() {
  const {
    data: { user: currentUser },
    error
  } = await supabase.auth.getUser()

  if (error || !currentUser) {
    console.error('User fetch failed:', error?.message)
    return
  }

  const { data, error: postsError } = await supabase
    .from('posts')
    .select('id, content, created_at')
    .eq('reluserid', currentUser.id)
    .order('created_at', { ascending: false })

  if (postsError) {
    console.error('Error fetching user posts:', postsError.message)
    return
  }

  userPosts.value = data
  user.posttotal.value = data.length
  }


  </script>
  
  <style scoped>
  </style>
  