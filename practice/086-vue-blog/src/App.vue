<template>
  <div id="app">
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/admin">管理页</router-link>
    <router-view></router-view>
    </nav>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  }
};
</script>

<style>
</style>
