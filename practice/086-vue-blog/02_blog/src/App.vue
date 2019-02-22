<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/Admin">Admin</router-link>
    </nav>
    <router-view></router-view>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
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
  font-family: "Microsoft YaHei UI";
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

nav a {
  padding: 5px;
}

.container {
  max-width: 500px;
  margin: 0 auto;
}

form input,
form button,
form textarea,
table {
  width: 100%;
}

button {
  background: #fff;
  border: 1px solid #222;
  padding: .1em .3em .2em .3em;
}

button:hover {
  cursor: pointer;
}
</style>
