<template>
  <div>
    <div class="admin-cat">
      <router-link to="/admin/post">文章管理</router-link>
      <router-link to="/admin/cat">分类管理</router-link>
      <router-link to="/admin/comment">评论管理</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.admin-cat {
  margin-top: 10px;
}

.admin-cat a {
  padding: 5px;
}
</style>
