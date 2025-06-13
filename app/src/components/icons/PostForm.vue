<template>
  <div class="min-h-screen bg-gray-100 flex justify-center p-6">
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
          class="bg-white p-7 rounded-lg shadow relative"
        >
          <h3 class="text-lg font-semibold text-gray-700 mb-2 pb-2">Post by:</h3>
          <p class="whitespace-pre-line text-gray-800 mb-6 pb-3">{{ post.content }}</p>

          

          <button
            v-if="post.reluserid === authStore.user.id"
            @click="deletePost(post.id)"
            class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
            title="Delete"
          >
            ✖
          </button>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 mt-8 text-lg">
        No posts yet.
      </div>
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
    fetchAllPosts()
  }
})

async function fetchAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, content, created_at, reluserid')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch posts:', error.message)
  } else {
    posts.value = data
  }

  
}

async function submitPost() {
  const trimmed = postText.value.trim();
  if (!trimmed) return;

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('No authenticated user found:', userError?.message);
    return;
  }

  console.log('Posting as user ID:', user.id); 

  const { error } = await supabase.from('posts').insert([
    {
      content: trimmed,
      reluserid: user.id,
    }
  ]);

  if (error) {
    console.error('Failed to submit post:', error.message);
    return;
  }

  postText.value = '';
  await fetchAllPosts();
}


async function deletePost(postId) {
  console.log('deletePost called with:', postId)

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
