<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/admin">Admin</router-link>
    </nav>
    <div>
      <router-view></router-view>
    </div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

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
  font-family: "Microsoft YaHei UI";
}

form input,
form textarea,
form button {
  width: 100%;
}

form button {
  margin: .5em 0;
}

button:hover {
  cursor: pointer;
}

nav a {
  padding: 5px;
}

.container {
  max-width: 500px;
  margin: 0 auto;
}
</style>
