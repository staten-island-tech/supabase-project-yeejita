<template>
    <div>
        <h1 class = "font-sans text-5xl text-gray-800 text-center">All posts:</h1>
        
    </div>

    <div class="relative">
  <select class="...">
    <option class ="text-green-600">Recent</option>
    <option class ="text-green-600">Top</option>
    <option class ="text-green-600">Oldest</option>
  </select>
  </div>

  

  <div>
    
  <allposts />    
   
  </div>

</template>

<script setup>




import allposts from './allposts.vue';
</script>

<style scoped>

</style>