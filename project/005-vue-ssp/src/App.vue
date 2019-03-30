<template>
  <div id="app">
    <GlobalNav></GlobalNav>
    <CatNav></CatNav>
    <router-view></router-view>
    <GlobalFooter></GlobalFooter>
  </div>
</template>

<script>
import GlobalNav from "./components/GlobalNav";
import CatNav from "./components/CatNav";
import GlobalFooter from "./components/GlobalFooter";
export default {
  name: 'app',
  components: {
    GlobalNav, CatNav, GlobalFooter
  }
}
</script>

<style>
#app {
  background: #fafbfc;
}
</style>
