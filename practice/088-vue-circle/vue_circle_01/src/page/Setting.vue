<template>
  <div>
    <div class="container">
      <h1>Setting</h1>
      <div class="row">
        <div class="col-6 vertical-nav">
          <router-link to="/setting/me">基础信息</router-link>
          <router-link to="/setting/security">安全设置</router-link>
        </div>
        <div class="col-18 setting-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
h1 {
  text-align: left;
}
</style>
