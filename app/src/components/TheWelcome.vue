<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
    <div class="bg-white p-10 rounded-lg shadow-md w-full max-w-2xl text-center space-y-4">
      <h1 ref="title" class="text-5xl font-extrabold text-green-500 font-mono">
        Welcome to AP Communication
      </h1>
      <h2 ref="subtitle1" class="text-xl font-medium text-gray-700 font-mono">
        <router-link to="/signup" class="text-green-600 hover:underline">Sign in</router-link>
        and 
        <router-link to="/posts" class="text-green-600 hover:underline">create posts</router-link>
      </h2>
      <h2 ref="subtitle2" class="text-xl font-medium text-gray-700 font-mono">
        View and like/dislike other posts
      </h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const title = ref(null)
const subtitle1 = ref(null)
const subtitle2 = ref(null)

onMounted(() => {
  const timeline = gsap.timeline()
  
  timeline.from(title.value, {
    opacity: 0,
    y: -50,
    duration: 1.5,
    ease: 'power2.out',
  })
  .from(
    [subtitle1.value, subtitle2.value], 
    {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.3,
    },
    "-=0.5"
  )
})
</script>
