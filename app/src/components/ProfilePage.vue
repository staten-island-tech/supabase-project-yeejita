<template>
  <div class = "">
    <div>
      <h1 class="text-5xl text-center pb-6 mt-6">
        Hello, {{ username }}!
      </h1>
    </div>
  
    <h2 class="text-center text-3xl pb-8">Posts: {{ user.posttotal }}</h2>
  
    <div>
      <h1 class="text-4xl text-center"> Your Posts: </h1>
    </div>
  
    <div>
      <userpost />
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useAuthStore } from '@/stores/pinia'

  
  const usestore = useAuthStore()

  const username = computed(() => usestore.username)
  

  const user = {
    likes: ref(0),
    posttotal: ref(0)
  }


  </script>
  
  <style scoped>
  </style>
  