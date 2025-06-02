<template>
  <div class="p-6">
    <div>
      <textarea
        class="pt-2 pb-4 border w-full h-40 resize-none"
        v-model="postText"
        placeholder="Write your post here"
      />
    </div>
    <button
      @click="submitPost"
      :disabled="!authStore.user"
      class="mt-4 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
    >
      Submit
    </button>

    <!-- Display All Submitted Posts -->
    <div v-if="posts.length" class="mt-6 space-y-4">
      <div
        v-for="(post, index) in posts"
        :key="post.id"
        class="p-4 bg-gray-100 rounded shadow relative"
      >
        <h2 class="font-bold text-lg mb-2">Post by:</h2>
        <p class="whitespace-pre-line m-8">{{ post.content }}</p>

        <div class="mt-6">
          <button class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-lg">👍</button>
          <button class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-lg">👎</button>
        </div>

        <button
          @click="deletePost(post.id)"
          class="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          ✖
        </button>
      </div>
    </div>

    <div v-else class="mt-4 text-gray-500 text-center">
      No posts yet.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/supabaseClient'
import { useAuthStore } from '@/stores/pinia'

const postText = ref('')
const posts = ref([])
const authStore = useAuthStore()

onMounted(() => {
  if (authStore.user) {
    fetchUserPosts()
  }
})

async function fetchUserPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, content, created_at, reluserid')
    .eq('reluserid', authStore.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch posts:', error.message)
  } else {
    posts.value = data
  }
}

async function submitPost() {
  const trimmed = postText.value.trim()
  if (!trimmed || !authStore.user) return

  const { error } = await supabase.from('posts').insert([
    {
      content: trimmed,
      reluserid: authStore.user.id,
    }
  ])

  if (error) {
    console.error('Failed to submit post:', error.message)
    return
  }

  postText.value = ''
  await fetchUserPosts()

  const { data: session } = await supabase.auth.getSession()
  console.log('Session:', session) //remove later
}

async function deletePost(postId) {
  const { error } = await supabase.from('posts').delete().eq('id', postId)

  if (error) {
    console.error('Failed to delete post:', error.message)
    return
  }

  await fetchUserPosts()
}
</script>

<style scoped>
</style>
