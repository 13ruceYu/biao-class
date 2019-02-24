<template>
  <div class="container">
    <h1>Admin</h1>
    <div class="admin-cat">
      <router-link to="/admin/post">文章管理</router-link>
      <router-link to="/admin/cat">分类管理</router-link>
      <router-link to="/admin/comment">评论管理</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.admin-cat a {
  margin-right: .5em;
}
</style>
