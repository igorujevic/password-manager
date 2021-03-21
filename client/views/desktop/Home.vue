<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">
    <HelloWorld msg="Welcome to Desktop Vue.js App" />
    <router-link :to="{ name: 'Login' }" class="">
      To Login Page
    </router-link>
    <br>
    <router-link :to="{ name: 'Register' }" class="">
      To Register Page
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld
  }
};
</script>
