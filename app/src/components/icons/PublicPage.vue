<template>
    <div>
        <h1>View other user posts:</h1>
        
    </div>

    <div class="relative">
  <select class="...">
    <option class ="text-green-600">Recent</option>
    <option class ="text-green-600">Top</option>
    <option class ="text-green-600">Oldest</option>
  </select>
  </div>

  <div>
    <div><input class = "pt-2 pb-20" type="text" id="input-text" placeholder=" Write your post here"> </div>
    <button  class ="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"> Submit </button>
  </div>

  <div class = "posts">
    <div class = "post">
      <button>Like Post</button>
      <button>Dislike Post</button>
    </div>


  </div>

</template>

<script setup>

</script>

<style scoped>

</style>