<template>
  <div>
    <GlobalNav></GlobalNav>
    <div>
      <router-view></router-view>
    </div>
    <GlobalFooter></GlobalFooter>
  </div>
</template>

<script>
import GlobalNav from "./components/GlobalNav";
import GlobalFooter from "./components/GlobalFooter";
export default {
  components: { GlobalNav, GlobalFooter }
};
</script>

<style>
</style>
