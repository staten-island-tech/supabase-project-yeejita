<template>
    <div class="register">
    <h2>signup</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">sign up?</button>
    </form>
  </div>
</template>

<script>
import { ref, reactive } from "vue";


</script>