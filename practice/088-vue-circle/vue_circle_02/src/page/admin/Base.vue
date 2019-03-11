<template>
  <div>
    <div class="container">
      <h1>Setting</h1>
      <div class="row">
        <div class="col-6 setting-cat vertical-nav">
          <router-link to="/admin/user">用户管理</router-link>
          <router-link to="/admin/thread">帖子管理</router-link>
          <router-link to="/admin/cat">分类管理</router-link>
        </div>
        <div class="col-18">
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
