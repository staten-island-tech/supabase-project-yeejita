<template>
    <div>
<h1 class = "text-5xl text-center ">
    Hello, {{ user.name }}!
</h1>
</div>

<button class="text-2xl" @click="user.likes.value += 1">👍: {{ user.likes }}</button>

<button class = "text-2xl">Posts: {{ user.posttotal }} </button>




    <div>
        <h1 class = "text-4xl text-center"> Your Posts </h1>
    </div>

    <div>
<userpost/>

    </div>
</template>


<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/pinia';
import { computed } from 'vue'

const usestore = useAuthStore()



const user = {
  name: computed(() => usestore.username),
  likes: ref(0),
  posttotal: ref(0)
}

import userpost from './userpost.vue';
</script>

<style scoped>

</style>