<template>
  <div id="app">
    <GlobalNav></GlobalNav>
    <router-view></router-view>
    <Footer></Footer>
    <div class="line">
      <div class="line line-left-1"></div>
      <div class="line line-left-2"></div>
      <div class="line line-left-3"></div>
      <div class="line line-center"></div>
      <div class="line line-right-3"></div>
      <div class="line line-right-2"></div>
      <div class="line line-right-1"></div>
    </div>
  </div>
</template>

<script>
import GlobalNav from "./components/GlobalNav";
import Footer from "./components/Footer";
export default {
  name: "app",
  components: {
    GlobalNav,Footer
  }
};
</script>

<style scoped>
.line {
  display: block;
  width: 1px;
  height: 100vh;
  background-color: #e7e7e8;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  z-index: -2;
}

.line-left-1 {
  transform: translateX(-900px)
}

.line-left-2 {
  transform: translateX(-600px)
}

.line-left-3 {
  transform: translateX(-300px)
}

.line-right-1 {
  transform: translateX(300px)
}

.line-right-2 {
  transform: translateX(600px)
}

.line-right-3 {
  transform: translateX(900px)
}
</style>
