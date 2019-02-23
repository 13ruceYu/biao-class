<template>
  <div>
    <div class="sidebar">
      <router-link active-class="active" to="/admin/post">文章管理</router-link>
      <router-link active-class="active" to="/admin/comment">评论管理</router-link>
      <router-link active-class="active" to="/admin/cat">分类管理</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import "../css/admin.css";
export default {};
</script>

<style scoped>
.sidebar > * {
  margin: .5em 1em;
  display: inline-block;
}

.sidebar a:first-child{
  margin-left: 0em;
}

.active {
  background: tomato;
}
</style>


