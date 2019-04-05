<template>
  <div id="app">
    <GlobalNav></GlobalNav>
    <CatNav></CatNav>
    <router-view></router-view>
  </div>
</template>

<script>
import GlobalNav from "./components/GlobalNav";
import CatNav from "./components/CatNav";
export default {
  name: "app",
  components: { GlobalNav, CatNav }
};
</script>

<style>
#app {
  background: #fafbfc;
}
</style>
