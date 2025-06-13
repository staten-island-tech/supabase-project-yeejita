<template>
  <div ref="pageRef" class="min-h-screen bg-gray-100 flex justify-center p-6">
    <div class="w-full max-w-6xl">
      <div class="bg-white p-8 rounded-lg shadow-md mb-12 flex flex-col gap-4 shadow-lg">
        <textarea
          v-model="postText"
          placeholder="Write your post here"
          class="w-full h-40 px-4 py-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          @click="submitPost"
          :disabled="!authStore.user"
          class="w-full text-lg font-bold bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white py-3 rounded-md transition-colors duration-300 mt-6"
        >
          Submit
        </button>
      </div>

      <div v-if="posts.length" class="flex flex-col gap-4">
        <div
          v-for="(post, index) in posts"
          :key="post.id"
          ref="postRefs"
          class="bg-white p-7 rounded-lg shadow relative"
        >
          <h3 class="text-lg font-semibold text-gray-700 mb-2">
            Post by: {{ post.users?.username || 'Unknown User' }}
          </h3>
          <p class="whitespace-pre-line text-gray-800 mb-6">{{ post.content }}</p>
          <button
            v-if="authStore.user && post.reluserid === authStore.user.id"
            @click="deletePost(post.id)"
            class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
            title="Delete"
          >
            ✖
          </button>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 mt-8 text-lg">
        You must be signed in to submit/view posts.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { supabase } from '@/supabaseClient'
import { useAuthStore } from '@/stores/pinia'
import { gsap } from 'gsap'

const postText = ref('')
const posts = ref([])
const authStore = useAuthStore()

const pageRef = ref(null)
const postRefs = ref([])

onMounted(() => {
  animatePageIn()
  if (authStore.user) {
    fetchAllPosts()
  }
})

function animatePageIn() {
  gsap.from(pageRef.value, {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: 'power2.out',
  })
}

async function fetchAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      content,
      created_at,
      reluserid,
      users (
        username
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch posts:', error.message)
    return
  }

  posts.value = data

  await nextTick()
  gsap.from(postRefs.value, {
    opacity: 0,
    y: 30,
    duration: 0.15,
    stagger: 0.1,
    ease: 'power2.out',
  })
}

async function submitPost() {
  const trimmed = postText.value.trim()
  if (!trimmed) return

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('No authenticated user found:', userError?.message)
    return
  }

  const { error } = await supabase.from('posts').insert([
    {
      content: trimmed,
      reluserid: user.id,
    },
  ])

  if (error) {
    console.error('Failed to submit post:', error.message)
    return
  }

  postText.value = ''
  await fetchAllPosts()
}

async function deletePost(postId) {
  const { error } = await supabase.from('posts').delete().eq('id', postId)

  if (error) {
    console.error('Failed to delete post:', error.message)
    return
  }

  await fetchAllPosts()
}
</script>

<style scoped>
</style>
