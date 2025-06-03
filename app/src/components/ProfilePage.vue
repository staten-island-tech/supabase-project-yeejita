<template>
    <div>
<h1 class = "text-5xl text-center pb-6 ">
    Hello, {{ user.name }}!
</h1>
</div>

<h2 class = "text-center text-3xl pb-8">👍: {{ user.likes }}    Posts: {{ user.posttotal }}</h2>





    <div>
        <h1 class = "text-4xl text-center"> Your Posts: </h1>
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