<template>
  <div id="app">
    <Nav/>

    <router-view></router-view>
  </div>
</template>

<script>
import Nav from './component/Nav'

export default {
  name: "app",
  data() {
    return {
    }
  },
  components: {
    Nav
  }
};
</script>

<style>

</style>
