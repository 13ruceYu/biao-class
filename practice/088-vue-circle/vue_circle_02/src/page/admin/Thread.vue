<template>
  <div>
    <h2>帖子管理</h2>
    <Pagination total="120" limit="10"/>
  </div>
</template>

<script>
import Pagination from "../../component/Pagination";
export default {
  components: {
    Pagination,
  }
}
</script>

<style scoped>
h2 {
  margin-top: 0;
}
</style>
