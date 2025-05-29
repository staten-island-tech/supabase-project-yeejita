<template>
    <div>
<h1 class = "text-5xl text-center ">
    Hello, {{ user.name }}!
</h1>
</div>

<div >
<h2 class = "text-2xl">👍: {{ user.likes }}</h2>
<h2 class = "text-2xl">Posts: {{ user.posttotal }}</h2>
</div>


    <div>
        <h1 class = "text-4xl text-center"> Your Posts </h1>
    </div>

    <div>
<userpost/>

    </div>
</template>


<script setup>
import { useAuthStore } from '@/stores/pinia';

const usestore = useAuthStore()

const user ={
    name: usestore.username,
    likes: 4,
    posttotal: 3
}

import userpost from './userpost.vue';
</script>

<style scoped>

</style>