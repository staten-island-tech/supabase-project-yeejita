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
      class="mt-4 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
    >
      Submit
    </button>

    <div v-if="posts.length" class="mt-6 space-y-4">
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="p-4 bg-gray-100 rounded shadow relative"
      >
        <h2 class="font-bold text-lg mb-2">{{ user.name }}</h2>
        <p class="whitespace-pre-line m-8">{{ post.text }}</p>

        <div class="mt-6 flex items-center space-x-4">
          <button
            @click="likePost(index)"
            class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-lg"
          >
            👍 {{ post.likes }}
          </button>

          <button
            @click="dislikePost(index)"
            class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-lg"
          >
            👎 {{ post.dislikes }}
          </button>
        </div>

        <button
          @click="deletePost(index)"
          class="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          ✖
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>


import { ref } from 'vue'

const postText = ref('')
const posts = ref([])


const user = { name: 'placeholder' }


const userVotes = ref({})

function submitPost() {
  const trimmed = postText.value.trim()
  if (trimmed) {
    posts.value.push({
      text: trimmed,
      likes: 0,
      dislikes: 0,
    })
    postText.value = ''
  }
}

function deletePost(index) {
  posts.value.splice(index, 1)
  delete userVotes.value[index]
}

function likePost(index) {
  const currentVote = userVotes.value[index]

  if (currentVote === 'liked') return // Already liked

  if (currentVote === 'disliked') {
    posts.value[index].dislikes--
  }

  posts.value[index].likes++
  userVotes.value[index] = 'liked'
}

function dislikePost(index) {
  const currentVote = userVotes.value[index]

  if (currentVote === 'disliked') return // Already disliked

  if (currentVote === 'liked') {
    posts.value[index].likes--
  }

  posts.value[index].dislikes++
  userVotes.value[index] = 'disliked'
}

</script>
