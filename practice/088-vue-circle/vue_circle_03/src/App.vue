<template>
  <div id="app">
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from './component/Nav'
export default {
  name: 'app',
  components: {
    Nav
  }
}
</script>

<style>

</style>
