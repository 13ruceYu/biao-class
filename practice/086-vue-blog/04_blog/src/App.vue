<template>
  <div id="app">
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/admin">管理页</router-link>
    </nav>

    <router-view></router-view>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  font-family: sans-serif, 'Microsoft YaHei UI';
}

button {
  background: #fff;
  border: 1px solid #222;
  font-family: inherit;
}

button:hover {
  cursor: pointer;
}

form input,
form textarea {
  width: 100%;
}

.container {
  max-width: 500px;
  margin: 0 auto;
}

nav a {
  padding: .2em;
}
</style>
