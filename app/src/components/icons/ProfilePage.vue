<template>
    <div>
<h1 class = "text-3xl text-center ">
    Hello, {{ user.name }}!
</h1>
<h2 class = "text-2xl">Rating: {{ user.rating }}</h2>
<h2 class = "text-2xl">Posts: {{ user.posttotal }}</h2>
    </div>


    <div>
        <h1 class = "text-2xl"> Your Posts </h1>
    </div>
</template>

<script setup>
//placeholder text
const user ={
    name: "Dustin",
    rating: 4,
    posttotal: 3
}
</script>

<style scoped>

</style>