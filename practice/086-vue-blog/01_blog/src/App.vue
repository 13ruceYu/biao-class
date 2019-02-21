<template>
  <div id="app">
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/admin/post">管理页</router-link>
      <router-view></router-view>
    </nav>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
import "./css/global.css";

// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    // HelloWorld
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

input,
button,
textarea {
  font-family: inherit;
}

button:hover {
  cursor: pointer;
}

.container {
  max-width: 500px;
  margin: 0 auto;
}

nav > * {
  padding: 0.2em;
}
</style>
