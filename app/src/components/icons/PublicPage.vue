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
//insert text into textbox ad submit to show on screen
/* insertL 
<button class = "bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-lg">👍 </button>
      <button class = "bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-lg">👎 </button>
      */

import allposts from './allposts.vue';
</script>

<style scoped>

</style>